import { initialGame } from "@/lib/data";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MatchStore, TeamNames } from "./types";

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
        set((state) => ({
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
              },
            },
          },
        }));
      },
      resetMatchData: () => {
        set((state) => ({
          match: {
            ...initialGame,
            homeTeamName: state.match.homeTeamName,
            awayTeamName: state.match.awayTeamName,
          },
          teamSwappedSides: false,
        }));
      },
    }),
    {
      name: "Volleyscore-MatchData",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
