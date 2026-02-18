"use client";
import { initialGame } from "@/lib/data";
import { useGameStore } from "@/store";
import { TeamNames } from "@/store/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [existingGame, setExistingGame] = useState<boolean>(false);

  const { startNewGame, match, currentSet } = useGameStore();

  const [teamNames, setTeamNames] = useState<TeamNames>({
    homeTeamName: "Home",
    awayTeamName: "Away",
  });

  useEffect(() => {
    if (match !== initialGame) {
      setExistingGame(true);
      return;
    }
  }, [match]);
  console.log(match);
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-4 sm:p-8 md:p-16 lg:p-24 dark:text-white">
      <h1 className="text-xl text-[10vw] font-light">Volleyscore</h1>

      {existingGame && (
        <div className="flex w-full max-w-xl flex-col gap-4 rounded-xl bg-slate-800 p-5">
          <div className="flex items-center justify-between">
            <h2 className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-green-500 uppercase">
              <span className="size-2 shrink-0 animate-pulse rounded-full bg-green-500" />
              Live - Set {currentSet}
            </h2>
            <span className="text-xs text-white/40">
              {match.homeTeamSetsWon} - {match.awayTeamSetsWon} Sets
            </span>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <div className="truncate text-left text-sm font-medium">
              {match.homeTeamName}
            </div>
            <div className="text-3xl font-bold tabular-nums">
              {match.sets[currentSet].score.homeTeam}
              <span className="mx-1 text-white/30">-</span>
              {match.sets[currentSet].score.awayTeam}
            </div>
            <div className="truncate text-right text-sm font-medium">
              {match.awayTeamName}
            </div>
          </div>

          <Link
            href="/match"
            className="rounded-lg bg-blue-600 py-2 text-center text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Continue Match
          </Link>
        </div>
      )}

      <Link
        href="/match"
        className="rounded-full bg-blue-600 px-4 py-3 text-white"
        onClick={() => startNewGame(teamNames)}
      >
        Start New Match
      </Link>
    </main>
  );
}
