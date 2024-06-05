"use client";
import Link from "next/link";
import { initialGame } from "@/lib/data";
import { useState, useEffect } from "react";

export default function Home() {
  const [gameData, setGameData] = useState(initialGame);
  const [selected, setSelected] = useState(false);
  const [gameTime, setGameTime] = useState(15);

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
    if (selected) {
      setGameData((prevState) => {
        return {
          game: {
            ...prevState.game,
            timedGame: gameTime,
          },
        };
      });
      localStorage.setItem("volleyballGameData", JSON.stringify(gameData));
    }

    console.log("storing", gameData);
  };

  const onChangeTime = (e) => {
    setGameTime(e.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-10 dark:text-white">
      <div className="flex flex-col gap-4">
        {/*
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
        {/* <div className="flex flex-col">
          <div className="inline-flex gap-3  items-center mt-4">
            <input
              type="checkbox"
              className="rounded-md size-5"
              checked={selected}
              onChange={() => setSelected((prevState) => !prevState)}
            />
            <label> Timed Game</label>
          </div>
          <div className=" self-end inline-flex items-end">
            <input
              type="number"
              className=" mt-3 rounded-md disabled:opacity-20 text-gray-400 focus:text-gray-800 dark:bg-slate-800 dark:focus:text-white mr-3"
              value={gameTime}
              disabled={!selected}
              onChange={(e) => onChangeTime(e)}
            />
            <span className="flex-1"> (mins) </span>
          </div>
        </div> */}
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
