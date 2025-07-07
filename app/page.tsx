"use client";
import Link from "next/link";
import { useState } from "react";
import { useGameStore } from "@/store";

export default function Home() {
  const [selected, setSelected] = useState(false);
  const [gameTime, setGameTime] = useState(15);

  const { updateTeamName } = useGameStore();
  const [teamNames, setTeamNames] = useState({
    homeTeamName: "Home",
    awayTeamName: "Away",
  });

  const changeName = (e) => {
    setTeamNames((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onChangeTime = (e) => {
    setGameTime(e.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24 dark:text-white">
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
        className="rounded-full bg-blue-600 px-4 py-3 text-white"
        onClick={() => updateTeamName(teamNames)}
      >
        Start New Match
      </Link>
    </main>
  );
}
