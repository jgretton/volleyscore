import { EndOfSetTimer } from "@/utils/gameLogic";
import { StopCircleIcon } from "@heroicons/react/20/solid";
import { ClockIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";

const Timer = ({ endOfSet, state, setState, props }) => {
  useEffect(() => {
    let timeoutInterval;

    if (state > 0) {
      timeoutInterval = setInterval(() => {
        setState((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => clearInterval(timeoutInterval);
  }, [state]);
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60); // Calculate the minutes
    const seconds = totalSeconds % 60; // Calculate the seconds
    return `${minutes}m ${seconds}s`; // Format as "Xm Ys"
  };

  return (
    <div
      className="flex flex-row items-center justify-center gap-4 max-w-sm w-full col-span-2 sm:col-span-1"
      {...props}
    >
      {!state > 0 ? (
        <button
          onClick={() => EndOfSetTimer(setState, state)}
          disabled={state}
          className="disabled:cursor-not-allowed sm:text-base text-sm inline-flex items-center gap-3 border rounded-lg px-4 py-2  hover:bg-gray-100 self-start tabular-nums"
        >
          <ClockIcon className="size-5 text-gray-800 flex-shrink-0" />
          <span className="block">Start end of set timer</span>
        </button>
      ) : (
        <div className="inline-flex items-center gap-3">
          <button type="button" onClick={() => setState(0)}>
            <StopCircleIcon className="size-10 text-red-600  flex-shrink-0" />
          </button>
          <span className="w-full tabular-nums">{formatTime(state)}</span>
        </div>
      )}
    </div>
  );
};

export default Timer;
