"use client";

import { useGameStore } from "@/store";
import { Match } from "@/store/types";
import { TIMEOUT_DURATION } from "@/utils";
import { ClockIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import useSound from "use-sound";

const TimeoutButton = ({
  team,
  teamSwapped,
  match,
}: {
  team: "home" | "away";
  teamSwapped: boolean;
  match: Match;
}) => {
  const currentSet = useGameStore((state) => state.currentSet);
  const { gameComplete } = useGameStore((state) => state.match);
  const handleTeamTimeout = useGameStore((state) => state.handleTeamTimeout);
  const [timeoutCountdown, setTimeoutCountdown] = useState<number>(0);
  const [play] = useSound("/sounds/buzzer.mp3");
  const teamTimeoutCount = match.sets[currentSet][team].timeouts;
  useEffect(() => {
    let timeoutInterval;
    if (timeoutCountdown > 0) {
      timeoutInterval = setInterval(() => {
        if (timeoutCountdown === 1) play();
        setTimeoutCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => clearInterval(timeoutInterval);
  }, [timeoutCountdown, play]);

  // If the store's timeout count resets to 0 (e.g. game reset), cancel
  // any running local countdown so the timer and buzzer stop.
  useEffect(() => {
    if (teamTimeoutCount === 0) {
      setTimeoutCountdown(0);
    }
  }, [teamTimeoutCount]);
  return (
    <button
      className={`${
        !teamSwapped
          ? team === "home"
            ? "order-2 sm:order-1"
            : "order-1 sm:order-2"
          : team === "home"
            ? "order-1 sm:order-2"
            : "order-2 sm:order-1"
      } inline-flex shrink-0 cursor-pointer items-center gap-3 rounded-lg border border-[#3E5B64] px-4 py-2 tabular-nums hover:bg-gray-100 disabled:cursor-not-allowed dark:border-gray-200 dark:hover:bg-slate-700`}
      onClick={() => {
        setTimeoutCountdown(TIMEOUT_DURATION);
        handleTeamTimeout(team);
      }}
      disabled={
        teamTimeoutCount >= 2 ||
        timeoutCountdown > 0 ||
        gameComplete
      }
    >
      <ClockIcon className="size-5 text-gray-900 sm:size-6 dark:text-white" />
      {timeoutCountdown > 0 ? (
        <span className="text-xs tabular-nums md:text-base">
          {timeoutCountdown} s
        </span>
      ) : (
        // Otherwise, display default button text
        <span className="hidden sm:block">Timeout</span>
      )}
    </button>
  );
};

export default TimeoutButton;
