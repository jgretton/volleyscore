import {
  MAX_LIBEROS,
  MAX_PLAYERS,
  MIN_PLAYERS,
  TOTAL_STEPS,
} from "@/lib/constants";
import {
    createInitialGame,
    createInitialMatchSetup,
    createInitialSetData,
    makeLineup,
    makePlayer,
    makeTeam
} from "@/lib/data";
import { isSetComplete, oppositeTeam, reachedEighthPoint } from "@/utils";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
    GameAction,
    MatchStore,
    ModalData,
    Player,
    Side,
    TeamNames,
    TeamOptions
} from "./types";

// Starting a match has to close whatever result modal the last one left
// open, or it reopens over a match it no longer describes.
const closedModal = (): MatchStore["modal"] => ({
  isOpen: false,
  modalType: null,
  modalData: null,
});

export const useGameStore = create<MatchStore>()(
  persist(
    (set, get) => ({
      match: createInitialGame(),
      matchSetup: {
        home: makeTeam(),
        away:makeTeam(),
        currentStep: 1,
      },
      teamSwappedSides: false,
      currentSet: 1,
      modal: closedModal(),

      setCurrentStep: (step: number) =>
        set((state) => {
          return {
            matchSetup: {
              ...state.matchSetup,
              currentStep: step,
            },
          };
        }),

      setTeamNames: (home, away) =>
        set((state) => ({
          matchSetup: {
            ...state.matchSetup,
            home: { ...state.matchSetup.home, name: home.trim() },
            away: { ...state.matchSetup.away, name: away.trim() },
          },
        })),
      removeAdditionalPlayer: (team, playerID) =>
        set((state) => {
          if (state.matchSetup[team].players.length <= MIN_PLAYERS)
            return state;

          return {
            matchSetup: {
              ...state.matchSetup,
              [team]: {
                ...state.matchSetup[team],
                players: state.matchSetup[team].players.filter(
                  (player) => player.id !== playerID,
                ),
              },
            },
          };
        }),
      addAdditionalPlayer: (team) =>
        set((state) => {
          if (state.matchSetup[team].players.length >= MAX_PLAYERS)
            return state;
          return {
            matchSetup: {
              ...state.matchSetup,
              [team]: {
                ...state.matchSetup[team],
                players: [...state.matchSetup[team].players, makePlayer()],
              },
            },
          };
        }),
      updatePlayer: (team, playerID, value) =>
        set((state) => {
          const updatedPlayers = state.matchSetup[team].players.map((player) =>
            player.id === playerID
              ? {
                  ...player,
                  ...value,
                }
              : player,
          );

          return {
            matchSetup: {
              ...state.matchSetup,
              [team]: { ...state.matchSetup[team], players: updatedPlayers },
            },
          };
        }),
      removeEmptyPlayers: (team) =>
        set((state) => {
          const players = state.matchSetup[team].players;
          const nonEmpty = players.filter(
            (player) => player.name.trim() !== "" || player.number !== null,
          );

          // safety: if we don't have 6 real players, leave the roster alone
          if (nonEmpty.length < MIN_PLAYERS) return state;

          return {
            matchSetup: {
              ...state.matchSetup,
              [team]: { ...state.matchSetup[team], players: nonEmpty },
            },
          };
        }),
      addLibero: (team) =>
        set((state) => {
          if (state.matchSetup[team].liberos.length >= MAX_LIBEROS)
            return state;
          return {
            matchSetup: {
              ...state.matchSetup,
              [team]: {
                ...state.matchSetup[team],
                liberos: [...state.matchSetup[team].liberos, makePlayer()],
              },
            },
          };
        }),
      removeLibero: (team, playerID) =>
        set((state) => ({
          matchSetup: {
            ...state.matchSetup,
            [team]: {
              ...state.matchSetup[team],
              liberos: state.matchSetup[team].liberos.filter(
                (libero) => libero.id !== playerID,
              ),
            },
          },
        })),
      updateLibero: (team, playerID, value) =>
        set((state) => {
          const updatedLiberos = state.matchSetup[team].liberos.map((libero) =>
            libero.id === playerID
              ? {
                  ...libero,
                  ...value,
                }
              : libero,
          );

          return {
            matchSetup: {
              ...state.matchSetup,
              [team]: { ...state.matchSetup[team], liberos: updatedLiberos },
            },
          };
        }),
      removeEmptyLiberos: (team) =>
        set((state) => {
          const liberos = state.matchSetup[team].liberos;
          const nonEmpty = liberos.filter(
            (libero) => libero.name.trim() !== "" || libero.number !== null,
          );

          return {
            matchSetup: {
              ...state.matchSetup,
              [team]: { ...state.matchSetup[team], liberos: nonEmpty },
            },
          };
        }),
      sortSquadByNumber: (team) =>
        set((state) => {
          const byNumber = (a: Player, b: Player) =>
            (a.number ?? 0) - (b.number ?? 0);

          return {
            matchSetup: {
              ...state.matchSetup,
              [team]: {
                ...state.matchSetup[team],
                players: [...state.matchSetup[team].players].sort(byNumber),
                liberos: [...state.matchSetup[team].liberos].sort(byNumber),
              },
            },
          };
        }),
      // The lineup lives on the current set now, so these write into
      // match.sets[currentSet] rather than matchSetup.
      assignPlayerToStartingLineup: (team, position, playerId) =>
        set((state) => {
          const { currentSet } = state;
          const setData = state.match.sets[currentSet];
          const updatedLineup = setData.lineup[team].map((slot) =>
            slot.position === position ? { position, playerId } : slot,
          );

          return {
            match: {
              ...state.match,
              sets: {
                ...state.match.sets,
                [currentSet]: {
                  ...setData,
                  lineup: { ...setData.lineup, [team]: updatedLineup },
                },
              },
            },
          };
        }),
      removePlayerFromStartingLineup: (team, position) =>
        set((state) => {
          const { currentSet } = state;
          const setData = state.match.sets[currentSet];
          const updatedLineup = setData.lineup[team].map((slot) =>
            slot.position === position ? { ...slot, playerId: null } : slot,
          );

          return {
            match: {
              ...state.match,
              sets: {
                ...state.match.sets,
                [currentSet]: {
                  ...setData,
                  lineup: { ...setData.lineup, [team]: updatedLineup },
                },
              },
            },
          };
        }),
      setFirstServer: (team) =>
        set((state) => {
          const { currentSet } = state;
          return {
            match: {
              ...state.match,
              sets: {
                ...state.match.sets,
                [currentSet]: {
                  ...state.match.sets[currentSet],
                  firstServer: team,
                },
              },
            },
          };
        }),

      swapSides: () => {
        set((state) => ({
          teamSwappedSides: !state.teamSwappedSides,
        }));
      },
      updateTeamName: (teamNames: TeamNames) => {
        set((state) => ({
          match: {
            ...state.match,
            home: { ...state.match.home, name: teamNames.homeTeamName },
            away: { ...state.match.away, name: teamNames.awayTeamName },
          },
        }));
      },

      startNewGame: (teamNames?: TeamNames) => {
        const base = createInitialGame();
        const newGame = teamNames
          ? {
              ...base,
              home: { ...base.home, name: teamNames.homeTeamName },
              away: { ...base.away, name: teamNames.awayTeamName },
            }
          : base;

        newGame.sets[1].setStartTime = new Date().toISOString();

        set(() => ({
          match: newGame,
          currentSet: 1,
          teamSwappedSides: false,
          modal: closedModal(),
        }));
      },
      initialiseMatchSetup: () => {
        set(() => ({
          matchSetup: createInitialMatchSetup(),
        }));
      },
      startMatch: () =>
        set((state) => {
          // Copy the completed setup into a fresh match. Set 1 is deliberately
          // left unstarted: the pre-set screen collects the first server and
          // the lineup before any scoring happens.
          const newMatch = {
            ...createInitialGame(),
            mode: "advanced" as const,
            home: {
              name: state.matchSetup.home.name,
              players: state.matchSetup.home.players,
              liberos: state.matchSetup.home.liberos,
              setsWon: 0,
            },
            away: {
              name: state.matchSetup.away.name,
              players: state.matchSetup.away.players,
              liberos: state.matchSetup.away.liberos,
              setsWon: 0,
            },
          };

          return {
            match: newMatch,
            matchSetup: createInitialMatchSetup(),
            currentSet: 1,
            teamSwappedSides: false,
            modal: closedModal(),
          };
        }),
      // Going back from set 1's lineup means changing the squad, so setup is
      // rebuilt from the match it produced rather than kept hanging around.
      // Finishing setup again replaces the match, and set 1 never started.
      returnToSetup: () =>
        set((state) => ({
          matchSetup: {
            home: {
              name: state.match.home.name,
              players: state.match.home.players,
              liberos: state.match.home.liberos,
            },
            away: {
              name: state.match.away.name,
              players: state.match.away.players,
              liberos: state.match.away.liberos,
            },
            currentStep: TOTAL_STEPS,
          },
        })),
      // Leaves the pre-set screen and opens the scoreboard. The first server
      // is known by now, so servingTeam is right from 0-0 rather than being
      // guessed from whoever happens to win the first rally.
      startSet: () =>
        set((state) => {
          const { currentSet } = state;
          return {
            match: {
              ...state.match,
              servingTeam: state.match.sets[currentSet].firstServer,
              sets: {
                ...state.match.sets,
                [currentSet]: {
                  ...state.match.sets[currentSet],
                  setStartTime: new Date().toISOString(),
                },
              },
            },
          };
        }),
      increaseTeamScore: (teamKey: Side, currentSet: number) => {
        set((state) => {
          const setData = state.match.sets[currentSet];
          const homeScore = setData.home.score + (teamKey === "home" ? 1 : 0);
          const awayScore = setData.away.score + (teamKey === "away" ? 1 : 0);
          const newAction = {
            type: "score" as const,
            team: teamKey,
            overallScore: { home: homeScore, away: awayScore },
            timestamp: new Date().toISOString(),
          };

          return {
            match: {
              ...state.match,
              servingTeam: teamKey,
              sets: {
                ...state.match.sets,
                [currentSet]: {
                  ...setData,
                  [teamKey]: {
                    ...setData[teamKey],
                    score: setData[teamKey].score + 1,
                  },
                  actions: [...setData.actions, newAction],
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
        } else if (result.setWinner && result.isGameComplete) {
          get().handleGameComplete(result.setWinner);

          const matchEndState = get();
          const matchData: ModalData = {
            currentSet,
            updatedMatch: matchEndState.match,
          };

          get().openModal("MATCH_COMPLETE", matchData);
          //game over logic.
        }
      },
      resetMatchData: () => {
        set((state) => {
          const fresh = createInitialGame();
          fresh.sets[1].setStartTime = new Date().toISOString();
          return {
            match: {
              ...fresh,
              mode: state.match.mode,
              home: { ...state.match.home, setsWon: 0 },
              away: { ...state.match.away, setsWon: 0 },
            },
            teamSwappedSides: false,
            currentSet: 1,
            modal: closedModal(),
          };
        });
      },
      undoAction: (action: GameAction) => {
        const currentState = get();
        const { currentSet } = currentState;
        const updatedActions = [...currentState.match.sets[currentSet].actions];
        updatedActions.pop();
        let updatedServingTeam = currentState.match.servingTeam;

        set((state) => {
          const setUpdates = {
            ...state.match.sets[currentSet],
            actions: updatedActions,
          };

          if (action.type === "timeout" && action.team) {
            setUpdates[action.team] = {
              ...state.match.sets[currentSet][action.team],
              timeouts: state.match.sets[currentSet][action.team].timeouts - 1,
            };
          }

          if (action.type === "score" && action.team) {
            setUpdates[action.team] = {
              ...state.match.sets[currentSet][action.team],
              score: state.match.sets[currentSet][action.team].score - 1,
            };
            updatedServingTeam =
              updatedActions.findLast((a) => a.type === "score")?.team ?? null;

            // Undoing the match point reopens the set, so the winner it was
            // given when the game completed has to come off with it.
            if (state.match.gameComplete) setUpdates.winner = null;
          }

          const updatedMatch = {
            ...state.match,
            servingTeam: updatedServingTeam,
            gameComplete: false,
            sets: {
              ...state.match.sets,
              [currentSet]: setUpdates,
            },
          };

          if (action.type === "score" && state.match.gameComplete) {
            if (action.team === "home")
              updatedMatch.home = {
                ...updatedMatch.home,
                setsWon: updatedMatch.home.setsWon - 1,
              };
            else
              updatedMatch.away = {
                ...updatedMatch.away,
                setsWon: updatedMatch.away.setsWon - 1,
              };
          }
          return {
            ...state,
            match: updatedMatch,
          };
        });

        // Undoing the point that triggered the fifth set switch has to put
        // the sides back. Without this the next point reaches 8 again, the
        // "first time" check passes a second time, and the teams end up
        // swapped for the rest of the match.
        if (currentSet === 5 && reachedEighthPoint(action)) {
          let anotherStillReaches = false;
          for (const remaining of updatedActions) {
            if (reachedEighthPoint(remaining)) {
              anotherStillReaches = true;
              break;
            }
          }
          if (!anotherStillReaches) get().swapSides();
        }
      },
      undoSetPoint: () => {
        const currentState = get();
        if (currentState.currentSet <= 1)
          throw new Error("Set has not been completed yet");

        set((state) => {
          const updatedMatch = { ...state.match };
          const { winner } = updatedMatch.sets[state.currentSet - 1];

          updatedMatch.sets[state.currentSet - 1].actions = updatedMatch.sets[
            state.currentSet - 1
          ].actions.slice(0, -1);

          //who won last set and -1 from their set wins
          if (winner === "home") {
            updatedMatch.home.setsWon = updatedMatch.home.setsWon - 1;
            updatedMatch.sets[state.currentSet - 1].home.score =
              updatedMatch.sets[state.currentSet - 1].home.score - 1;
          } else {
            updatedMatch.away.setsWon = updatedMatch.away.setsWon - 1;
            updatedMatch.sets[state.currentSet - 1].away.score =
              updatedMatch.sets[state.currentSet - 1].away.score - 1;
          }

          //set winner to null
          updatedMatch.sets[state.currentSet - 1].winner = null;

          // delete sets[currentset]
          //Object destructuring, take the array position from currentSet and assign the value of that property to the variable name removedSet, extracts all other data using rest operator into a variable called remainingsets.
          const { [state.currentSet]: removedSet, ...remainingSets } =
            updatedMatch.sets;

          updatedMatch.sets = remainingSets;

          updatedMatch.gameComplete = false;

          updatedMatch.servingTeam =
            updatedMatch.sets[state.currentSet - 1].actions.findLast(
              (a) => a.type === "score",
            )?.team ?? null;

          return {
            ...state,
            currentSet: state.currentSet - 1,
            match: updatedMatch,
          };
        });

        // Mirrors handleSetCompletion: no swap happened on the way into an
        // advanced decider, so there is none to reverse on the way out.
        const skippedSwap =
          currentState.match.mode === "advanced" &&
          currentState.currentSet === 5;
        if (!skippedSwap) get().swapSides();
      },
      handleSetCompletion: (setResult: TeamOptions) => {
        const currentState = get();
        const { match, currentSet } = currentState;
        const updatedMatch = { ...match };
        const newSetNumber = currentSet + 1;

        if (setResult === "home") {
          updatedMatch.sets[currentSet].winner = "home";
          updatedMatch.home.setsWon += 1;
        }
        if (setResult === "away") {
          updatedMatch.sets[currentSet].winner = "away";
          updatedMatch.away.setsWon += 1;
        }

        updatedMatch.servingTeam = null;

        // An advanced decider gets a fresh toss, and that toss settles the ends
        // too, so the usual swap is skipped rather than fought over afterwards.
        // Basic has no toss, so it keeps alternating as always.
        const tossDecidesEnds =
          updatedMatch.mode === "advanced" && newSetNumber === 5;
        if (!tossDecidesEnds) get().swapSides();

        const nextSet = createInitialSetData();

        if (updatedMatch.mode === "basic") {
          // Basic never shows the pre-set screen, so the set starts right away.
          nextSet.setStartTime = new Date().toISOString();
        } else if (newSetNumber < 5) {
          // Whoever did not serve first in this set serves first in the next.
          // The deciding set gets a fresh toss, so it stays null.
          const servedFirst = updatedMatch.sets[currentSet].firstServer;
          if (servedFirst) nextSet.firstServer = oppositeTeam(servedFirst);
        }

        set(() => {
          return {
            match: {
              ...updatedMatch,
              sets: { ...updatedMatch.sets, [newSetNumber]: nextSet },
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
      handleGameComplete: (setResults: TeamOptions) => {
        // set game is complete, update the team sets won but do not update current set otherwise data will be removed.
        const { match, currentSet } = get();
        const updatedMatch = { ...match };
        //game complete
        updatedMatch.gameComplete = true;
        // The deciding set ends here rather than through handleSetCompletion,
        // so record its winner too or it stays null for the rest of the match.
        updatedMatch.sets[currentSet].winner = setResults;
        // update sets won
        if (setResults === "home")
          updatedMatch.home.setsWon = updatedMatch.home.setsWon + 1;
        else updatedMatch.away.setsWon = updatedMatch.away.setsWon + 1;

        set((state) => ({
          ...state,
          match: updatedMatch,
        }));
      },
      handleTeamTimeout: (team: TeamOptions) => {
        set((state) => {
          if (!team) return state;
          const updatedMatch = { ...state.match };
          const setData = updatedMatch.sets[state.currentSet];
          // The button is already disabled at two, so this is only a guard.
          // Throwing from a store setter would take the page down over a
          // rule the UI has enforced anyway.
          if (setData[team].timeouts >= 2) return state;
          //add time out to team.
          setData[team].timeouts = setData[team].timeouts + 1;
          //add action for timeout
          setData.actions.push({
            type: "timeout" as const,
            team: team,
            overallScore: {
              home: setData.home.score,
              away: setData.away.score,
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
      version: 3,
      migrate: (persistedState: any, version: number) => {
        // The match + setup shapes changed incompatibly (flat home*/away* fields
        // → home/away objects). Old persisted data can't be salvaged, so start
        // clean on any pre-v2 state to avoid crashes on rehydrate.
        if (version < 2) {
          return {
            ...persistedState,
            match: createInitialGame(),
            matchSetup: createInitialMatchSetup(),
            // The spread carries these across, and a fresh match only has
            // set 1. Left alone, a saved currentSet of 3 points at a set
            // that does not exist and scoring throws on the first tap.
            currentSet: 1,
            teamSwappedSides: false,
          };
        }

        // v3 moved the lineup onto each set, added firstServer, and made
        // setStartTime mean "this set has started". Fill the new fields in
        // rather than resetting: an existing set already has a start time, so
        // a match in progress stays on the scoreboard instead of being thrown
        // back to the pre-set screen.
        if (version < 3) {
          const sets = persistedState?.match?.sets ?? {};
          for (const setNumber of Object.keys(sets)) {
            const setData = sets[setNumber];
            if (!setData.lineup) {
              setData.lineup = { home: makeLineup(), away: makeLineup() };
            }
            if (setData.firstServer === undefined) setData.firstServer = null;
            if (!setData.setStartTime) {
              setData.setStartTime = new Date().toISOString();
            }
          }
          return {
            ...persistedState,
            matchSetup: createInitialMatchSetup(),
          };
        }

        return persistedState;
      },
    },
  ),
);
