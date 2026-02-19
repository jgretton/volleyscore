"use client";
import { useGameStore } from "@/store";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [existingGame, setExistingGame] = useState<boolean>(false);

  const { startNewGame, match, currentSet } = useGameStore();

  useEffect(() => {
    if (match.sets[1].actions.length > 0) {
      setExistingGame(true);
      return;
    }
  }, [match]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-4 text-slate-900 sm:p-8 md:p-16 dark:text-white">
      <h1 className="text-xl text-[min(10vw,7rem)] font-light">Volleyscore</h1>

      {existingGame && (
        <div className="flex w-full max-w-xl flex-col gap-4 rounded-xl bg-[#3E5B64] p-5">
          <div className="flex items-center justify-between">
            <h2 className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-green-500 uppercase">
              <span className="size-2 shrink-0 animate-pulse rounded-full bg-green-500" />
              Live - Set {currentSet}
            </h2>
            <span className="text-xs text-white/70">
              {match.homeTeamSetsWon} - {match.awayTeamSetsWon} Sets
            </span>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-white">
            <div className="truncate text-left text-sm font-medium">
              {match.homeTeamName}
            </div>
            <div className="text-3xl font-bold tabular-nums">
              {match.sets[currentSet].score.homeTeam}
              <span className="mx-1 text-slate-300 dark:text-white/30">-</span>
              {match.sets[currentSet].score.awayTeam}
            </div>
            <div className="truncate text-right text-sm font-medium">
              {match.awayTeamName}
            </div>
          </div>

          <Link
            href="/match"
            className="rounded-lg bg-slate-800 py-2 text-center text-sm font-medium text-white transition hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            Continue Match
          </Link>
        </div>
      )}

      <div className="mt-10 flex w-full max-w-xl flex-col gap-5">
        <h2 className="text-xl font-medium">Score New Match</h2>
        <div className="flex w-full flex-col gap-3">
          <Link
            href="/match"
            onClick={() => startNewGame()}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white p-5 transition hover:bg-slate-50 dark:border-transparent dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Quick Match</p>
              <p className="text-sm text-slate-500 dark:text-white/50">
                Just the score, no setup needed
              </p>
            </div>
            <ChevronRightIcon className="size-5 shrink-0 text-slate-400 dark:text-white/30" />
          </Link>

          <Link
            href="/setup"
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white p-5 transition hover:bg-slate-50 dark:border-transparent dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Official Match</p>
              <ul className="flex flex-col gap-1 text-sm text-slate-500 dark:text-white/50">
                <li>Player squads & shirt numbers</li>
                <li>Lineup sheet per set</li>
                <li>Rotation tracking</li>
              </ul>
            </div>
            <ChevronRightIcon className="size-5 shrink-0 text-slate-400 dark:text-white/30" />
          </Link>
        </div>
      </div>
    </main>
  );
}
