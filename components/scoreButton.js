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
      className="w-full p-10 flex-grow h-1/3 bg-sky-100 dark:bg-[#3E5B64] rounded-xl mt-2 disabled:opacity-30 tabular-nums"
      onClick={() =>
        increaseScore(team, setGameData, currentSet, setServingTeam)
      }
      disabled={disabled}
    >
      <span className="text-7xl md:text-9xl font-light ">{score}</span>
    </button>
  );
};

export default ScoreButton;
