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
      className="bg-sky-100_ mt-2 w-full flex-grow rounded-xl bg-[#3E5B64] tabular-nums text-gray-50 ring-2 ring-inset ring-slate-800/30 disabled:opacity-30"
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
