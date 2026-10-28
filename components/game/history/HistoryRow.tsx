"use client";
import { GameAction, Side } from "@/store/types";
import {
  ArrowsRightLeftIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const Spine = () => (
  <span className="self-stretch bg-gray-200 dark:bg-white/10" />
);

// One rally. Only the team that won it puts a number in their column, so a
// run reads as consecutive numbers down one side and the gaps are where the
// other team scored.
const HistoryRow = ({
  item,
  leftTeam,
  isLatest,
  shirtOf,
}: {
  item: GameAction;
  leftTeam: Side;
  isLatest: boolean;
  shirtOf: (playerId: string | null | undefined) => number | undefined;
}) => {
  const actedLeft = item.team === leftTeam;

  // Rotations are not rows. A side-out is already visible as the column
  // changing, and that is the only thing that rotates a team, so a row per
  // rotation would double the list and say nothing new.
  if (item.type === "sub") {
    const mark = (
      <span className="flex items-center gap-1.5 text-[11px] text-gray-500 tabular-nums dark:text-white/50">
        <ArrowsRightLeftIcon className="size-3 shrink-0" />
        {shirtOf(item.playerOut)}
        <span className="text-gray-300 dark:text-white/25">&rarr;</span>
        {shirtOf(item.playerIn)}
      </span>
    );

    return (
      <div className="grid min-h-9 grid-cols-[1fr_1px_1fr] items-center gap-4">
        <span className="flex flex-row-reverse items-center justify-start">
          {actedLeft && mark}
        </span>
        <Spine />
        <span className="flex items-center justify-start">
          {!actedLeft && mark}
        </span>
      </div>
    );
  }

  if (item.type === "timeout") {
    const mark = (
      <span className="flex items-center gap-1.5 text-[10px] tracking-[0.1em] text-gray-400 uppercase dark:text-white/40">
        <ClockIcon className="size-3 shrink-0" />
        Timeout
      </span>
    );

    return (
      <div className="grid min-h-9 grid-cols-[1fr_1px_1fr] items-center gap-4">
        <span className="flex flex-row-reverse items-center justify-start">
          {actedLeft && mark}
        </span>
        <Spine />
        <span className="flex items-center justify-start">
          {!actedLeft && mark}
        </span>
      </div>
    );
  }

  const score = actedLeft
    ? item.overallScore[leftTeam]
    : item.overallScore[leftTeam === "home" ? "away" : "home"];

  const value = (
    <span
      className={
        isLatest
          ? "text-2xl leading-none font-medium text-gray-950 tabular-nums dark:text-white"
          : "text-base leading-none text-gray-500 tabular-nums dark:text-white/60"
      }
    >
      {score}
    </span>
  );

  return (
    <div className="grid min-h-8 grid-cols-[1fr_1px_1fr] items-center gap-4">
      <span className="flex items-center justify-end">{actedLeft && value}</span>
      <Spine />
      <span className="flex items-center justify-start">
        {!actedLeft && value}
      </span>
    </div>
  );
};

export default HistoryRow;
