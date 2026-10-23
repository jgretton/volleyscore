"use client";

import { useGameStore } from "@/store";
import { TIMEOUT_DURATION } from "@/utils";
import { ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import useSound from "use-sound";

const TimeoutButton = ({ team }: { team: "home" | "away" }) => {
  const { match, currentSet, handleTeamTimeout, undoAction } = useGameStore();
  const [countdown, setCountdown] = useState<number>(0);
  // How many actions the set had once our timeout was recorded. If anything
  // has been recorded since, cancelling must not undo that instead.
  const [actionCount, setActionCount] = useState<number>(0);
  const [play, { stop }] = useSound("/sounds/buzzer.mp3");

  const actions = match.sets[currentSet]?.actions ?? [];
  const timeoutsUsed: number = match.sets[currentSet]?.[team].timeouts;
  const isRunning = countdown > 0;

  useEffect(() => {
    let timeoutInterval;
    if (countdown > 0) {
      timeoutInterval = setInterval(() => {
        if (countdown === 1) play();
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => clearInterval(timeoutInterval);
  }, [countdown, play]);

  // If the store's timeout count resets to 0 (e.g. game reset), cancel
  // any running local countdown so the timer and buzzer stop.
  useEffect(() => {
    if (timeoutsUsed === 0) {
      setCountdown(0);
    }
  }, [timeoutsUsed]);

  const startTimeout = () => {
    handleTeamTimeout(team);
    setActionCount(actions.length + 1);
    setCountdown(TIMEOUT_DURATION);
  };

  // A mis-tap has to be cheap to undo, so cancelling stops the clock, kills
  // the queued buzzer and takes the timeout back off the team.
  const cancelTimeout = () => {
    stop();
    setCountdown(0);
    const lastAction = actions[actions.length - 1];
    if (lastAction && actions.length === actionCount) {
      undoAction(lastAction);
    }
  };

  return (
    <button
      className={`inline-flex min-w-20 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2 tabular-nums disabled:cursor-not-allowed disabled:opacity-40 xl:px-5 xl:py-3 xl:text-lg ${
        isRunning
          ? "border-red-300 text-red-100 xl:border-red-500 xl:text-red-600 xl:dark:text-red-400"
          : "border-white/30 hover:bg-white/10 xl:border-[#3E5B64] xl:hover:bg-gray-100 xl:dark:border-gray-200 xl:dark:hover:bg-slate-700"
      }`}
      onClick={isRunning ? cancelTimeout : startTimeout}
      disabled={!isRunning && (timeoutsUsed >= 2 || match.gameComplete)}
      aria-label={isRunning ? "Cancel timeout" : "Timeout"}
    >
      {isRunning ? (
        <XMarkIcon className="size-5 xl:size-6" />
      ) : (
        <ClockIcon className="size-5 xl:size-6" />
      )}
      {isRunning ? (
        <span className="text-sm tabular-nums xl:text-lg">{countdown} s</span>
      ) : (
        <span className="hidden lg:inline">Timeout</span>
      )}
    </button>
  );
};

export default TimeoutButton;
