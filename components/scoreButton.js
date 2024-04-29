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
      className="w-full flex-grow h-1/3 bg-sky-100 dark:bg-sky-800 rounded-xl mt-2 disabled:opacity-30"
      onClick={() =>
        increaseScore(team, setGameData, currentSet, setServingTeam)
      }
      disabled={disabled}
    >
      <span className="text-7xl font-light ">{score}</span>
    </button>
  );
};

export default ScoreButton;
