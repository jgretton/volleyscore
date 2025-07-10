import React from "react";

const ScoreButton = ({
  score,
  disabled,
  increaseTeamScore,
}: {
  score: number;
  disabled: boolean;
  increaseTeamScore: () => void;
}) => {
  return (
    <button
      className="bg-sky-100_ mt-2 size-full grow cursor-pointer rounded-xl bg-[#3E5B64] text-gray-50 tabular-nums ring-2 ring-slate-800/30 ring-inset disabled:opacity-30"
      onClick={increaseTeamScore}
      disabled={disabled}
    >
      <span className="text-[min(25vw,20rem)] font-light">{score}</span>
    </button>
  );
};

export default ScoreButton;
