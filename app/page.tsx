"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGameStore } from "@/store";
import { TeamNames } from "@/store/types";
import { initialGame } from "@/lib/data";

export default function Home() {
  const [existingGame, setExistingGame] = useState<boolean>(false);

  const { startNewGame, match } = useGameStore();
  const [teamNames, setTeamNames] = useState<TeamNames>({
    homeTeamName: "Home",
    awayTeamName: "Away",
  });

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamNames((prevState) => {
      return {
        ...prevState,
        [e.target.name as keyof TeamNames]: e.target.value,
      };
    });
  };

  useEffect(() => {
    if (match !== initialGame) {
      setExistingGame(true);
      return;
    }
  }, [match]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24 dark:text-white">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <label> Home team name</label>
          <input
            type="text"
            placeholder="Home"
            name="homeTeamName"
            onChange={changeName}
            value={teamNames.homeTeamName}
            className="rounded-md text-gray-400 focus:text-gray-800 dark:bg-slate-800 dark:focus:text-white"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label> Away team name</label>
          <input
            type="text"
            placeholder="Away"
            name="awayTeamName"
            onChange={changeName}
            value={teamNames.awayTeamName}
            className="rounded-md text-gray-400 focus:text-gray-800 dark:bg-slate-800 dark:focus:text-white"
          />
        </div>
      </div>

      <Link
        href="/basic-match"
        className="rounded-full bg-blue-600 px-4 py-3 text-white"
        onClick={() => startNewGame(teamNames)}
      >
        Start New Match
      </Link>

      {existingGame && (
        <div className="mt-10 flex w-full max-w-sm flex-col gap-4 text-center">
          <p>
            Looks like you have already started a game, would you like to
            continue?
          </p>
          <Link
            href="/basic-match"
            className="self-center rounded-full bg-blue-600 px-4 py-3 text-white"
          >
            Contiue Match
          </Link>
        </div>
      )}
    </main>
  );
}
