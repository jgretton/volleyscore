import { ClockIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState, useRef } from "react";
import ScoreButton from "./scoreButton";

import { increaseScore, timeOut } from "@/utils/gameLogic";

const TeamScore = ({
  teamSwapped,
  servingTeam,
  gameData,
  gameComplete,
  setGameData,
  currentSet,
  setServingTeam,
  timeoutTeam,
  setTimeoutTeam,
  team,
  timeoutCountdown,
  setTimeoutCountdown,
}) => {
  useEffect(() => {
    let timeoutInterval;

    if (timeoutCountdown > 0) {
      timeoutInterval = setInterval(() => {
        setTimeoutCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => clearInterval(timeoutInterval);
  }, [timeoutCountdown]);

  return (
    <div className="flex flex-col h-full ">
      <div className="flex flex-row justify-between items-center">
        <span
          className={`${
            !teamSwapped
              ? team === "homeTeam" // If team is not swapped and is home team
                ? "order-1" //apply this
                : "order-2" // if not hometeam, apply this
              : team === "homeTeam" // If team is swapped and is home team
              ? "order-2" //apply this
              : "order-1" // if not hometeam apply this
          }`}
        >
          {gameData?.game[`${team}Name`]}
        </span>
        <div
          className={`${
            servingTeam === team
              ? "bg-red-300 dark:bg-red-200"
              : "bg-transparent"
          } ${
            !teamSwapped
              ? team === "homeTeam"
                ? "order-2"
                : "order-1"
              : team === "homeTeam"
              ? "order-1"
              : "order-2"
          }
           size-4 rounded-full`}
        />
      </div>
      <div
        className={`${
          !teamSwapped ? "sm:items-start" : "sm:items-end"
        }  flex sm:flex-col gap-4 h-full items-center`}
      >
        <div className="flex flex-col w-full h-full gap-3">
          <ScoreButton
            increaseScore={increaseScore}
            score={gameData?.game?.sets[currentSet]?.score?.[`${team}`]}
            team={team}
            disabled={gameComplete}
            setGameData={setGameData}
            currentSet={currentSet}
            setServingTeam={setServingTeam}
          />
          <div className="flex sm:flex-row flex-col justify-between">
            <span
              className={`${
                !teamSwapped
                  ? team === "homeTeam"
                    ? "sm:order-2 self-end"
                    : "sm:order-1 self-start"
                  : team === "homeTeam"
                  ? "sm:order-1 self-start"
                  : "sm:order-2 self-end"
              } border-sky-200 border rounded-md px-4 py-2 text-lg font-light tabular-nums sm:self-center`}
            >
              {gameData.game[`${team}SetsWon`]}
            </span>

            <div
              className={`${
                !teamSwapped
                  ? team === "homeTeam"
                    ? "sm:order-1 self-end"
                    : "sm:order-2 self-start"
                  : team === "homeTeam"
                  ? "sm:order-2 self-start"
                  : "sm:order-1 self-end"
              } flex flex-row items-center gap-3 sm:self-center `}
            >
              <button
                className={`${
                  !teamSwapped
                    ? team === "homeTeam"
                      ? "sm:order-1 order-2"
                      : "sm:order-2 order-1"
                    : team === "homeTeam"
                    ? "sm:order-2 order-1"
                    : "sm:order-1 order-2"
                } border rounded-lg px-4 py-2 mt-2 inline-flex gap-3 items-center  disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-slate-700 flex-shrink-0 tabular-nums`}
                onClick={() => {
                  timeOut(
                    team,
                    currentSet,
                    setGameData,
                    setTimeoutCountdown,
                    setTimeoutTeam
                  );
                }}
                disabled={
                  gameData.game.sets[currentSet].timeouts.homeTeam >= 2 ||
                  (timeoutTeam === team && timeoutCountdown > 0)
                }
              >
                <ClockIcon className="size-6 dark:text-white text-gray-900" />
                {timeoutTeam === team && timeoutCountdown > 0 ? (
                  <span>{timeoutCountdown} s</span>
                ) : (
                  // Otherwise, display default button text
                  <span className="hidden sm:block">Timeout</span>
                )}
              </button>
              <div
                className={`${
                  !teamSwapped
                    ? team === "homeTeam"
                      ? "sm:order-2 order-1"
                      : "sm:order-1 order-2"
                    : team === "homeTeam"
                    ? "sm:order-2 order-1"
                    : "sm:order-1 order-2"
                } flex flex-row gap-2 items-center`}
              >
                {[...Array(2)].map((_, index) => (
                  <span
                    key={`timeout-${index}`}
                    className={`${
                      !teamSwapped ? "first:order-0" : "first:order-2"
                    } size-5 border border-slate-800 dark:border-white rounded-md flex-shrink-0 ${
                      index < gameData.game.sets[currentSet].timeouts[`${team}`]
                        ? "bg-sky-800"
                        : "border-slate-800"
                    }`}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default TeamScore;
