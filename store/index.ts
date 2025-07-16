import { initialGame, initialSetData } from "@/lib/data";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { GameAction, MatchStore, TeamNames, TeamOptions } from "./types";
import { isSetComplete } from "@/utils";

export const useGameStore = create<MatchStore>()(
  persist(
    (set, get) => ({
      match: initialGame,
      teamSwappedSides: false,
      currentSet: 1,
      modal: { isOpen: false, modalType: null, modalData: null },
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
      startNewGame: (teamNames?: TeamNames) => {
        const newGame = teamNames
          ? { ...initialGame, ...teamNames }
          : { ...initialGame };

        set(() => ({
          match: newGame,
          currentSet: 1,
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
        const result = isSetComplete(
          updatedState.match,
          updatedState.currentSet,
        );
        if (result.isSetCompleted === false && result.shouldSwapSides) {
          get().swapSides(); // Call your Zustand function
        }

        if (result.setWinner && !result.isGameComplete) {
          get().handleSetCompletion(result.setWinner);
        } else {
          console.log("Game over");
          //game over logic.
        }
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
      undoSetPoint: () => {
        const currentState = get();
        if (currentState.currentSet <= 1)
          throw new Error("Set hasn not been completed yet");

        set((state) => {
          const updatedMatch = { ...state.match };
          const { actions, winner } = updatedMatch.sets[state.currentSet - 1];

          updatedMatch.sets[state.currentSet - 1].actions = updatedMatch.sets[
            state.currentSet - 1
          ].actions.slice(0, -1);

          //who won last set and -1 from their set wins
          if (winner === "homeTeam") {
            updatedMatch.homeTeamSetsWon = updatedMatch.homeTeamSetsWon - 1;
            updatedMatch.sets[state.currentSet - 1].score.homeTeam =
              updatedMatch.sets[state.currentSet - 1].score.homeTeam - 1;
          } else {
            updatedMatch.awayTeamSetsWon = updatedMatch.awayTeamSetsWon - 1;
            updatedMatch.sets[state.currentSet - 1].score.awayTeam =
              updatedMatch.sets[state.currentSet - 1].score.awayTeam - 1;
          }

          //set winner to null
          updatedMatch.sets[state.currentSet - 1].winner = null;

          // delete sets[currentset]
          //Object destructuring, take the array position from currentSet and assign the value of that property to the variable name removedSet, extracts all other data using rest operator into a variable called remainingsets.
          const { [state.currentSet]: removedSet, ...remainingSets } =
            updatedMatch.sets;

          updatedMatch.sets = remainingSets;

          return {
            ...state,
            currentSet: state.currentSet - 1,
            match: updatedMatch,
          };
        });
        get().swapSides();
      },
      handleSetCompletion: (setResult: "awayTeam" | "homeTeam" | null) => {
        const currentState = get();
        const { match, currentSet } = currentState;
        const updatedMatch = { ...match };
        const newSetNumber = currentSet + 1;

        if (setResult === "homeTeam") {
          updatedMatch.sets[currentSet].winner = "homeTeam";
          updatedMatch.homeTeamSetsWon += 1;
        }
        if (setResult === "awayTeam") {
          updatedMatch.sets[currentSet].winner = "awayTeam";
          updatedMatch.awayTeamSetsWon += 1;
        }

        get().swapSides();

        set((state) => {
          return {
            match: {
              ...updatedMatch,
              sets: { ...updatedMatch.sets, [newSetNumber]: initialSetData },
            },
            currentSet: newSetNumber,
          };
        });

        //Somewhere i need to trigger the modal and then all this function to start new set, allows users to undo set point.

        const matchData = {
          currentSet,
          updatedMatch,
        };

        get().openModal("SET_COMPLETE", matchData);
      },
      handleTeamTimeout: (team: TeamOptions) => {
        const currentState = get();
        set((state) => {
          const updatedMatch = { ...state.match };
          if (updatedMatch.sets[state.currentSet].timeouts[team] >= 2) {
            throw new Error("Team has had their two timeouts.");
          }
          //add time out to team.
          updatedMatch.sets[state.currentSet].timeouts[team] =
            updatedMatch.sets[state.currentSet].timeouts[team] + 1;
          //add action for timeout
          updatedMatch.sets[state.currentSet].actions.push({
            type: "timeout" as const,
            team: team,
            overallScore: {
              ...state.match.sets[state.currentSet].score,
            },
            timestamp: new Date().toISOString(),
          });

          return {
            ...state,
            match: updatedMatch,
          };
        });
      },

      openModal: (type, data) => {
        set((state) => ({
          ...state,
          modal: {
            isOpen: true,
            modalType: type,
            modalData: data,
          },
        }));
      },
      closeModal: () => {
        set((state) => ({
          ...state,
          modal: {
            isOpen: false,
            modalType: null,
            modalData: null,
          },
        }));
      },
    }),
    {
      name: "Volleyscore-MatchData",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
