import { Match } from "@/store/types";
import { ClockIcon } from "@heroicons/react/24/outline";
import React from "react";

const TimeoutButton = ({ team, teamSwapped, match, timeoutCountdown }) => {
  const { currentSet } = match;
  const timeoutTeam = "";
  return (
    <button
      className={`${
        !teamSwapped
          ? team === "homeTeam"
            ? "order-2 sm:order-1"
            : "order-1 sm:order-2"
          : team === "homeTeam"
            ? "order-1 sm:order-2"
            : "order-2 sm:order-1"
      } inline-flex shrink-0 cursor-pointer items-center gap-3 rounded-lg border border-[#3E5B64] px-4 py-2 tabular-nums hover:bg-gray-100 disabled:cursor-not-allowed dark:border-gray-200 dark:hover:bg-slate-700`}
      //   onClick={() => {
      //     timeOut(team, currentSet, setTimeoutCountdown);
      //   }}
      //   disabled={
      //     match.sets[currentSet].timeouts[team] >= 2 ||
      //     (timeoutTeam === team && timeoutCountdown > 0)
      //   }
    >
      <ClockIcon className="size-5 text-gray-900 sm:size-6 dark:text-white" />
      {timeoutTeam === team && timeoutCountdown > 0 ? (
        <span className="text-xs md:text-base">{timeoutCountdown} s</span>
      ) : (
        // Otherwise, display default button text
        <span className="hidden sm:block">Timeout</span>
      )}
    </button>
  );
};

export default TimeoutButton;
