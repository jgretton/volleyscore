"use client";
import {
  ArrowUturnLeftIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import React, { useCallback, useRef, useEffect } from "react";
import { undoAction } from "@/utils/gameLogic";

const Card = ({ item }) => {
  const team = item.team;
  const score = item.overallScore[team];
  return (
    <span className={`${team === "homeTeam" ? "order-2" : "order-1"}`}>
      {item.type === "score" ? score : "Timeout"}
    </span>
  );
};

const History = ({
  gameData,
  currentSet,
  teamSwapped,
  item,
  setGameData,
  setServingTeam,
  setGameComplete,
  gameComplete,
  setHasSetBeenProcessed,
}) => {
  const handleUndoAction = useCallback(() => {
    undoAction(
      item,
      gameData,
      setGameData,
      currentSet,
      setServingTeam,
      setGameComplete,
      gameComplete,
      setHasSetBeenProcessed
    );
  }, [
    item,
    gameData,
    currentSet,
    setGameData,
    setServingTeam,
    setGameComplete,
    gameComplete,
    setHasSetBeenProcessed,
  ]);

  const Icon = {
    timeout: <ClockIcon className="w-6 h-6" />,
    score: <CalendarIcon className="w-6 h-6" />,
  };

  const UndoButton = () => {
    return (
      <button
        onClick={handleUndoAction}
        className="hidden items-center gap-3 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
      >
        <ArrowUturnLeftIcon className="w-4 h-4 text-gray-800 dark:text-white" />
        <span className="text-sm">Undo</span>
      </button>
    );
  };

  return (
    <div className="flex gap-3 min-h-12 flex-1 justify-center flex-shrink-0 fadeIn">
      <div
        className={`${
          teamSwapped
            ? `order-3 text-left pl-2 ${
                item.team === "homeTeam" ? "border-l-2" : ""
              }`
            : `order-1 text-right pr-3 ${
                item.team !== "homeTeam" ? "" : "border-r-2"
              }`
        } self-center flex-1`}
      >
        {item.team === "homeTeam" && <Card item={item} />}
        {item.team !== "homeTeam" && <UndoButton />}
      </div>
      <div className="inline-flex items-center justify-center flex-shrink-0 order-2 px-1">
        {Icon[item.type]}
      </div>
      <div
        className={`${
          teamSwapped
            ? `order-1 text-right pr-2 ${
                item.team !== "homeTeam" ? "border-r-2" : ""
              }`
            : `order-3 text-left pl-2 ${
                item.team === "homeTeam" ? "" : "border-l-2"
              }`
        } self-center flex-1`}
      >
        {item.team !== "homeTeam" && <Card item={item} />}
        {item.team === "homeTeam" && <UndoButton />}
      </div>
    </div>
  );
};

export default History;
