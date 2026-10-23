"use client";
import { useGameStore } from "@/store";
import { History } from "lucide-react";

// The only way into the match history, so it has to read as a button. The
// icon says what it opens; the border says it is pressable at all.
const SetButton = ({
  variant,
  onClick,
}: {
  variant: "inline" | "stacked";
  onClick: () => void;
}) => {
  const currentSet = useGameStore((state) => state.currentSet);

  if (variant === "inline") {
    return (
      <button
        onClick={onClick}
        aria-label="Match history"
        className="inline-flex shrink-0 cursor-pointer items-center gap-3 rounded-xl border border-[#3E5B64] px-4 py-2 hover:bg-gray-100 dark:border-gray-200 dark:hover:bg-slate-700"
      >
        <History className="size-4 text-gray-500 dark:text-gray-400" />
        <span className="text-xs tracking-[0.18em] text-gray-500 dark:text-gray-400">
          SET
        </span>
        <span className="text-3xl leading-none font-light tabular-nums">
          {currentSet}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      aria-label="Match history"
      className="flex shrink-0 cursor-pointer flex-col items-center gap-1.5 rounded-xl px-2 py-1 hover:bg-gray-100 dark:hover:bg-slate-700"
    >
      <span className="text-2xl leading-none font-light tabular-nums lg:text-4xl">
        {currentSet}
      </span>
      <span className="inline-flex items-center gap-1 rounded-md border border-[#3E5B64] px-1.5 py-1 text-[10px] tracking-[0.18em] text-gray-500 dark:border-gray-200 dark:text-gray-400">
        <History className="size-3" />
        <span className="hidden lg:inline">SET</span>
      </span>
    </button>
  );
};

export default SetButton;
