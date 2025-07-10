"use client";
import {
  ArrowUturnLeftIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { GameAction } from "@/store/types";
import { useGameStore } from "@/store";

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
  teamSwapped,
  item,
}: {
  teamSwapped: boolean;
  item: GameAction;
}) => {
  const { undoAction } = useGameStore();

  const Icon = {
    timeout: <ClockIcon className="h-6 w-6" />,
    score: <CalendarIcon className="h-6 w-6" />,
  };

  const UndoButton = () => {
    return (
      <button
        onClick={() => undoAction(item)}
        className="hidden cursor-pointer items-center gap-3 rounded-lg px-2 py-1 hover:bg-gray-100 dark:hover:bg-slate-700"
      >
        <ArrowUturnLeftIcon className="h-4 w-4 text-gray-800 dark:text-white" />
        <span className="text-sm">Undo</span>
      </button>
    );
  };

  return (
    <div className="fadeIn flex min-h-12 flex-1 shrink-0 justify-center gap-3">
      <div
        className={`${
          teamSwapped
            ? `order-3 pl-2 text-left ${
                item.team === "homeTeam" ? "border-l-2" : ""
              }`
            : `order-1 pr-3 text-right ${
                item.team !== "homeTeam" ? "" : "border-r-2"
              }`
        } flex-1 self-center`}
      >
        {item.team === "homeTeam" && <Card item={item} />}
        {item.team !== "homeTeam" && <UndoButton />}
      </div>
      <div className="order-2 inline-flex shrink-0 items-center justify-center px-1">
        {Icon[item.type]}
      </div>
      <div
        className={`${
          teamSwapped
            ? `order-1 pr-2 text-right ${
                item.team !== "homeTeam" ? "border-r-2" : ""
              }`
            : `order-3 pl-2 text-left ${
                item.team === "homeTeam" ? "" : "border-l-2"
              }`
        } flex-1 self-center`}
      >
        {item.team !== "homeTeam" && <Card item={item} />}
        {item.team === "homeTeam" && <UndoButton />}
      </div>
    </div>
  );
};

export default History;
