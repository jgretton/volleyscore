"use client";
import MatchMenu from "@/components/game/menu/MatchMenu";
import { useGameStore } from "@/store";
import {
  ArrowsRightLeftIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";

export const matchActionButton =
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#3E5B64] p-3 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30 dark:border-gray-200 dark:hover:bg-slate-700";

const MatchActions = ({ className }: { className?: string }) => {
  const { match, currentSet, undoAction, swapSides } = useGameStore();

  const actions = match.sets[currentSet]?.actions ?? [];
  const lastAction = actions[actions.length - 1];

  return (
    <div className={`flex shrink-0 items-center gap-2 ${className ?? ""}`}>
      <button
        onClick={() => lastAction && undoAction(lastAction)}
        disabled={!lastAction}
        aria-label="Undo"
        className={matchActionButton}
      >
        <ArrowUturnLeftIcon className="size-5" />
      </button>

      <button
        onClick={swapSides}
        aria-label="Swap sides"
        className={matchActionButton}
      >
        <ArrowsRightLeftIcon className="size-5" />
      </button>

      <MatchMenu className={matchActionButton} />
    </div>
  );
};

export default MatchActions;
