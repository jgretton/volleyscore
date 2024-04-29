import { ArrowUturnLeftIcon, ClockIcon } from "@heroicons/react/24/outline";
import React from "react";
import { undoAction } from "@/utils/gameLogic";

const HistoryCard = ({
  item,
  gameData,
  setGameData,
  currentSet,
  setServingTeam,
  setGameComplete,
  gameComplete,
}) => {
  const team = {
    homeTeam: gameData.game.homeTeamName,
    awayTeam: gameData.game.awayTeamName,
  };

  const Icon = {
    timeout: <ClockIcon className="size-6 text-gray-800 dark:text-white" />,
    // substitution,
    // score,
  };

  return (
    <div className="flex flex-col flex-shrink-0 px-8  items-center gap-4 bg-sky-100 dark:bg-slate-900 rounded-lg py-4 last:bg-red-100 last:dark:bg-slate-800 [&:last-child>button]:inline-flex fadeIn">
      <span> {team[item.team]}</span>
      {/* {item.type === "timeout" && (
        <ClockIcon className="size-6 text-gray-800" />
      )} */}
      {Icon[item.type]}
      {item.type === "score" && (
        <span>
          {item.overallScore.homeTeam ?? null}
          {item.overallScore.awayTeam ?? null}
        </span>
      )}

      <button
        onClick={() =>
          undoAction(
            item,
            gameData,
            setGameData,
            currentSet,
            setServingTeam,
            setGameComplete,
            gameComplete
          )
        }
        className="hidden  items-center gap-3 px-2 py-1 border-slate-800 dark:border-slate-100 border-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
      >
        <ArrowUturnLeftIcon className="size-4 text-gray-800 dark:text-white" />
        <span>Undo action</span>
      </button>
    </div>
  );
};

export default HistoryCard;
