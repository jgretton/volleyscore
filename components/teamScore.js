"use client";
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
}) => {
  const [timeoutCountdown, setTimeoutCountdown] = useState(0);
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
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 flex-row items-center justify-between">
        <span
          className={`${
            !teamSwapped
              ? team === "homeTeam" // If team is not swapped and is home team
                ? "order-1" //apply this
                : "order-2" // if not hometeam, apply this
              : team === "homeTeam" // If team is swapped and is home team
                ? "order-2" //apply this
                : "order-1" // if not hometeam apply this
          } truncate text-base md:text-lg lg:text-3xl`}
        >
          {gameData?.game[`${team}Name`]}
        </span>
        <div
          className={`${
            servingTeam === team
              ? "fill-gray-950 dark:fill-gray-100"
              : "fill-transparent"
          } ${
            !teamSwapped
              ? team === "homeTeam"
                ? "order-2"
                : "order-1"
              : team === "homeTeam"
                ? "order-1"
                : "order-2"
          } size-6rounded-full shrink-0`}
        >
          <svg className="size-6" viewBox="0 0 58 58">
            <path
              d="M29,0C13.01,0,0,13.009,0,29s13.01,29,29,29s29-13.009,29-29S44.99,0,29,0z M56,29c0,1.749-0.173,3.458-0.492,5.115
         c-2.68-11.081-6.982-18.874-17.726-24.449c0.671-0.817,1.375-1.647,2.118-2.52c0.549-0.645,1.121-1.319,1.703-2.015
         C50.157,9.667,56,18.662,56,29z M8.168,46.158c-1.854-2.247-3.347-4.801-4.403-7.569c4.645,1.993,8.561,3.001,12.669,3.001
         c4.88,0,10.052-1.436,17.024-4.311c1.269,2.292,2.348,4.683,3.204,7.184C24.248,49.4,18.779,48.87,8.168,46.158z M16.026,32.007
         c4.546,0,8.78-0.619,12.6-1.84l0.117,0.156c1.374,1.659,2.606,3.398,3.715,5.202c-13.703,5.609-19.664,5.053-29.526,0.499
         c-0.498-1.847-0.808-3.77-0.9-5.749C6.916,31.425,11.616,32.007,16.026,32.007z M30.314,29.086l-0.275-0.367
         c0.404-3.853,1.07-6.867,1.975-9.407C42.76,26.641,47.391,35.536,47.37,48.763c-1.95,1.814-4.165,3.345-6.583,4.524
         C39.541,44.122,36.017,35.973,30.314,29.086z M28.082,28.242c-2.821,0.909-5.889,1.467-9.158,1.671
         c1.57-13.933,5.712-18.927,12.457-27.053l0.576-0.695c2.739,0.3,5.354,1.011,7.786,2.07c-0.465,0.553-0.923,1.093-1.367,1.614
         C33.16,11.975,29.37,16.45,28.082,28.242z M29.486,2.012C22.892,9.96,18.491,15.494,16.905,29.993
         c-2.245,0.041-4.573-0.076-6.972-0.351c1.484-13.674,4.794-17.652,11.244-25.388l1.186-1.427C24.487,2.289,26.71,2,29,2
         C29.163,2,29.323,2.009,29.486,2.012z M18.77,4.019C12.824,11.177,9.436,15.787,7.95,29.38c-1.938-0.288-3.917-0.676-5.93-1.164
         C2.334,17.286,9.17,7.965,18.77,4.019z M10.713,48.842c3.717,0.866,6.88,1.388,10.099,1.388c4.695,0,9.546-1.121,16.441-3.853
         c0.733,2.491,1.276,5.072,1.61,7.748C35.806,55.331,32.481,56,29,56C21.951,56,15.527,53.282,10.713,48.842z M49.342,46.724
         c-0.447-13.008-5.515-21.912-16.576-29.321c1.023-2.304,2.28-4.234,3.747-6.144C47.99,17.091,51.819,25.613,54.374,38.23
         C53.226,41.376,51.503,44.247,49.342,46.724z"
            />
          </svg>
        </div>
      </div>
      <div
        className={`${
          !teamSwapped ? "sm:items-start" : "sm:items-end"
        } flex h-full items-center gap-4 sm:flex-col`}
      >
        <div className="flex h-full w-full flex-col gap-3">
          <ScoreButton
            increaseScore={increaseScore}
            score={gameData?.game?.sets[currentSet]?.score?.[`${team}`]}
            team={team}
            disabled={gameComplete}
            setGameData={setGameData}
            currentSet={currentSet}
            setServingTeam={setServingTeam}
          />
          <div className="flex flex-row justify-between">
            <span
              className={`${
                !teamSwapped
                  ? team === "homeTeam"
                    ? "order-2 self-start"
                    : "order-1 self-start"
                  : team === "homeTeam"
                    ? "order-1 self-start"
                    : "order-2 self-start"
              } rounded-md border border-[#3E5B64] px-4 py-2 text-lg font-light tabular-nums sm:self-center`}
            >
              {gameData.game[`${team}SetsWon`]}
            </span>

            <div
              className={`${
                !teamSwapped
                  ? team === "homeTeam"
                    ? "order-1 self-end"
                    : "order-2 self-start"
                  : team === "homeTeam"
                    ? "order-2 self-start"
                    : "order-1 self-end"
              } flex flex-col items-center gap-3 sm:flex-row sm:self-center`}
            >
              <button
                className={`${
                  !teamSwapped
                    ? team === "homeTeam"
                      ? "order-2 sm:order-1"
                      : "order-1 sm:order-2"
                    : team === "homeTeam"
                      ? "order-1 sm:order-2"
                      : "order-2 sm:order-1"
                } inline-flex shrink-0 items-center gap-3 rounded-lg border border-[#3E5B64] px-4 py-2 tabular-nums hover:bg-gray-100 disabled:cursor-not-allowed dark:border-gray-200 dark:hover:bg-slate-700`}
                onClick={() => {
                  timeOut(
                    team,
                    currentSet,
                    setGameData,
                    setTimeoutCountdown,
                    setTimeoutTeam,
                  );
                }}
                disabled={
                  gameData.game.sets[currentSet].timeouts[team] >= 2 ||
                  (timeoutTeam === team && timeoutCountdown > 0)
                }
              >
                <ClockIcon className="size-5 text-gray-900 dark:text-white sm:size-6" />
                {timeoutTeam === team && timeoutCountdown > 0 ? (
                  <span className="text-xs md:text-base">
                    {timeoutCountdown} s
                  </span>
                ) : (
                  // Otherwise, display default button text
                  <span className="hidden sm:block">Timeout</span>
                )}
              </button>
              <div
                className={`${
                  !teamSwapped
                    ? team === "homeTeam"
                      ? "order-2"
                      : "order-2 sm:order-1"
                    : team === "homeTeam"
                      ? "order-1"
                      : "order-2"
                } flex flex-row items-center gap-2`}
              >
                {[...Array(2)].map((_, index) => (
                  <span
                    key={`timeout-${index}`}
                    className={`${
                      !teamSwapped ? "first:order-0" : "first:order-2"
                    } size-5 shrink-0 rounded-md border border-slate-800 dark:border-white ${
                      index < gameData.game.sets[currentSet].timeouts[`${team}`]
                        ? "bg-[#3E5B64]"
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
