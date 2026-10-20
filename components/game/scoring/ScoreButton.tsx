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
    // Below xl the panel around this button carries the background, so the
    // button itself is transparent. From xl the panel unfolds and the
    // background moves here, leaving the button meaning only "the score".
    <button
      className="flex min-h-0 flex-1 cursor-pointer items-center justify-center rounded-xl text-gray-50 tabular-nums [container-type:size] disabled:opacity-30 xl:bg-[#3E5B64] xl:ring-2 xl:ring-slate-800/30 xl:ring-inset"
      onClick={increaseTeamScore}
      disabled={disabled}
    >
      {/* Sized off the button rather than the viewport so the digit fills
          whatever box the layout leaves it. leading-none collapses the line
          box to the font size, which is what keeps the digit centred. */}
      <span className="text-[min(130cqh,70cqw)] leading-none font-light">
        {score}
      </span>
    </button>
  );
};

export default ScoreButton;
