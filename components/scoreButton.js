"use client";
import React from "react";

const ScoreButton = ({
  increaseScore,
  score,
  team,
  disabled,
  setGameData,
  currentSet,
  setServingTeam,
}) => {
  return (
    <button
      className="w-full flex-grow bg-sky-100 dark:bg-[#3E5B64] rounded-xl mt-2 disabled:opacity-30 tabular-nums ring-2 ring-sky-200/30 dark:ring-slate-800/30 ring-inset"
      onClick={() =>
        increaseScore(team, setGameData, currentSet, setServingTeam)
      }
      disabled={disabled}
    >
      <span className="text-[min(25vw,20rem)] font-light">{score}</span>
      {/* <span className="text-7xl md:text-9xl font-light">{score}</span> */}
    </button>
  );
};

export default ScoreButton;
