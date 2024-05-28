"use client";
import Link from "next/link";
import { initialGame } from "@/lib/data";
import { useState, useEffect } from "react";

export default function Home() {
  const [gameData, setGameData] = useState(initialGame);

  const changeName = (e) => {
    setGameData((prevState) => {
      return {
        game: {
          ...prevState.game,
          [e.target.name]: e.target.value,
        },
      };
    });
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("volleyballGameData", JSON.stringify(gameData));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-10 dark:text-white">
      <div className="flex flex-col gap-4">
        {/* <div className="inline-flex gap-3  items-center">
          <input type="checkbox" />
          <label> Timed Game</label>
        </div>
        <div className="flex flex-col gap-1">
          <div className="inline-flex gap-3  items-center">
            <input type="checkbox" />
            <label> Points per set </label>
          </div>
          <input
            type="number"
            placeholder="25"
            className="rounded-md text-gray-400 focus:text-gray-800 dark:bg-slate-800 dark:focus:text-white "
          />
        </div> */}
        <div className="flex flex-col gap-3 ">
          <label> Home team name</label>
          <input
            type="text"
            placeholder="Home"
            name="homeTeamName"
            onChange={changeName}
            value={gameData.game.homeTeamName}
            className="rounded-md text-gray-400 focus:text-gray-800 dark:bg-slate-800 dark:focus:text-white "
          />
        </div>
        <div className="flex flex-col gap-3 ">
          <label> Away team name</label>
          <input
            type="text"
            placeholder="Away"
            name="awayTeamName"
            onChange={changeName}
            value={gameData.game.awayTeamName}
            className="rounded-md text-gray-400 focus:text-gray-800 dark:bg-slate-800 dark:focus:text-white "
          />
        </div>
      </div>

      <Link
        href="/basic-match"
        className=" bg-blue-600 px-4 py-3 rounded-full text-white"
        onClick={() => saveToLocalStorage()}
      >
        Start New Match
      </Link>
    </main>
  );
}
