"use client";
import { GameAction, Side } from "@/store/types";
import { ClockIcon } from "@heroicons/react/24/outline";

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
}: {
  item: GameAction;
  leftTeam: Side;
  isLatest: boolean;
}) => {
  const actedLeft = item.team === leftTeam;

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
