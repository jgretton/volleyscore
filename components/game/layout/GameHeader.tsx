"use client";
import FullScreen from "@/components/controls/FullScreen";
import Settings from "@/components/controls/Settings";
import { useGameStore } from "@/store";
import { ArrowsRightLeftIcon, XCircleIcon } from "@heroicons/react/24/outline";

const GameHeader = () => {
  const { swapSides, resetMatchData } = useGameStore();
  return (
    <div className="flex flex-row items-center justify-end gap-3 pt-5 pr-2">
      <button
        onClick={swapSides}
        className="inline-flex shrink-0 cursor-pointer items-center gap-3 self-start rounded-lg border px-4 py-2 text-sm hover:bg-gray-100 sm:text-base dark:hover:bg-gray-900"
      >
        <ArrowsRightLeftIcon className="size-5 text-gray-800 dark:text-white" />
        <span className="hidden md:block">Swap sides</span>
      </button>
      <button
        onClick={resetMatchData}
        className="inline-flex shrink-0 cursor-pointer items-center gap-3 self-start rounded-lg border px-4 py-2 text-sm hover:bg-gray-100 sm:text-base dark:hover:bg-gray-900"
      >
        <XCircleIcon className="size-5 text-gray-800 dark:text-white" />{" "}
        <span className="hidden md:block"> Reset game</span>
      </button>

      <Settings />
      <FullScreen />
    </div>
  );
};

export default GameHeader;
