import { initialGame } from "@/lib/data";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MatchStore, TeamNames } from "./types";

export const useGameStore = create<MatchStore>()(
  persist(
    (set, get) => ({
      match: initialGame,
      updateTeamName: (teamNames: TeamNames) => {
        set((state) => ({
          match: {
            ...state.match,
            homeTeamName: teamNames.homeTeamName,
            awayTeamName: teamNames.awayTeamName,
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
