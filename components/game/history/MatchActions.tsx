"use client";
import { useGameStore } from "@/store";
import {
  ArrowsRightLeftIcon,
  ArrowUturnLeftIcon,
  Bars3Icon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const MatchActions = () => {
  const { match, currentSet, undoAction, swapSides, resetMatchData } =
    useGameStore();
  const actions = match.sets[currentSet]?.actions ?? [];
  const lastAction = actions[actions.length - 1];
  const isBasic = match.mode === "basic";

  return (
    <div className="flex w-full max-w-40 shrink-0 items-center gap-2 md:max-w-56">
      <button
        onClick={swapSides}
        aria-label="Swap sides"
        className="hidden shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#3E5B64] p-2 tabular-nums hover:bg-gray-100 disabled:cursor-not-allowed md:inline-flex dark:border-gray-200 dark:hover:bg-slate-700"
      >
        <ArrowsRightLeftIcon className="h-4 w-4" />
      </button>

      <button
        onClick={() => lastAction && undoAction(lastAction)}
        disabled={!lastAction}
        className="inline-flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#3E5B64] p-3 tabular-nums hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30 dark:border-gray-200 dark:hover:bg-slate-700"
      >
        <ArrowUturnLeftIcon className="h-5 w-5" />
        <span className="hidden md:inline">Undo</span>
      </button>

      {isBasic && (
        <button
          onClick={resetMatchData}
          aria-label="Reset game"
          className="hidden shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#3E5B64] p-2 tabular-nums hover:bg-gray-100 disabled:cursor-not-allowed md:inline-flex dark:border-gray-200 dark:hover:bg-slate-700"
        >
          <XCircleIcon className="h-4 w-4" />
        </button>
      )}

      <button
        aria-label="More options"
        className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#3E5B64] p-2 tabular-nums hover:bg-gray-100 disabled:cursor-not-allowed md:hidden dark:border-gray-200 dark:hover:bg-slate-700"
      >
        <Bars3Icon className="h-4 w-4" />
      </button>
    </div>
  );
};

export default MatchActions;
