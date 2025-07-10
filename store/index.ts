import { initialGame, initialSetData } from "@/lib/data";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { GameAction, MatchStore, TeamNames } from "./types";
import { isSetComplete } from "@/utils";

export const useGameStore = create<MatchStore>()(
  persist(
    (set, get) => ({
      match: initialGame,
      teamSwappedSides: false,
      currentSet: 1,
      swapSides: () => {
        set((state) => ({
          teamSwappedSides: !state.teamSwappedSides,
        }));
      },
      updateTeamName: (teamNames: TeamNames) => {
        set((state) => ({
          match: {
            ...state.match,
            homeTeamName: teamNames.homeTeamName,
            awayTeamName: teamNames.awayTeamName,
          },
        }));
      },
      increaseTeamScore: (
        teamKey: "awayTeam" | "homeTeam",
        currentSet: number,
      ) => {
        set((state) => {
          const currentSetData = state.match.sets[currentSet].score || {
            homeTeam: 0,
            awayTeam: 0,
          };
          const newAction = {
            type: "score" as const,
            team: teamKey,
            overallScore: {
              homeTeam:
                teamKey === "homeTeam"
                  ? (currentSetData.homeTeam || 0) + 1
                  : currentSetData.homeTeam || 0,
              awayTeam:
                teamKey === "awayTeam"
                  ? (currentSetData.awayTeam || 0) + 1
                  : currentSetData.awayTeam || 0,
            },
            timestamp: new Date().toISOString(),
          };
          return {
            match: {
              ...state.match,
              sets: {
                ...state.match.sets,
                [currentSet]: {
                  ...state.match.sets[currentSet],
                  score: {
                    ...state.match.sets[currentSet].score,
                    [teamKey]: state.match.sets[currentSet].score[teamKey] + 1,
                  },
                  actions: [...state.match.sets[currentSet].actions, newAction],
                },
              },
            },
          };
        });
        const updatedState = get();
        const checkingSet = isSetComplete(
          updatedState.match,
          updatedState.currentSet,
        );
        if (checkingSet) get().handleSetCompletion(checkingSet);
      },
      resetMatchData: () => {
        set((state) => ({
          match: {
            ...initialGame,
            homeTeamName: state.match.homeTeamName,
            awayTeamName: state.match.awayTeamName,
          },
          teamSwappedSides: false,
          currentSet: 1,
        }));
      },
      undoAction: (action: GameAction) => {
        const currentState = get();
        const { currentSet } = currentState;

        const updatedActions = [...currentState.match.sets[currentSet].actions];
        updatedActions.pop();

        set((state) => {
          const setUpdates = {
            ...state.match.sets[currentSet],
            actions: updatedActions,
          };

          if (action.type === "timeout") {
            setUpdates.timeouts = {
              ...state.match.sets[currentSet].timeouts,
              [action.team]:
                state.match.sets[currentSet].timeouts[action.team] - 1,
            };
          }

          if (action.type === "score") {
            setUpdates.score = {
              ...state.match.sets[currentSet].score,
              [action.team]:
                state.match.sets[currentSet].score[action.team] - 1,
            };
          }
          return {
            match: {
              ...state.match,
              sets: {
                ...state.match.sets,
                [currentSet]: setUpdates,
              },
            },
          };
        });

        //Logic for if the game was complete, you undo action it keeps the game going.
        // find last array with score to figure out who is currently serving
      },
      handleSetCompletion: (setResult: "awayTeam" | "homeTeam" | null) => {
        // figure out whoch team has won.
        // update their sets won,
        //update current set,
        //add new set with default set data.
        const currentState = get();
        const { match, currentSet } = currentState;
        const updatedMatch = { ...match };
        const newSetNumber = currentSet + 1;

        if (setResult === "homeTeam") {
          updatedMatch.homeTeamSetsWon += 1;
        }
        if (setResult === "awayTeam") {
          updatedMatch.awayTeamSetsWon += 1;
        }
        set((state) => {
          return {
            match: {
              ...updatedMatch,
              sets: { ...updatedMatch.sets, [newSetNumber]: initialSetData },
            },
            currentSet: newSetNumber,
          };
        });

        console.log("setResult", setResult);
      },
    }),
    {
      name: "Volleyscore-MatchData",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
