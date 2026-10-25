"use client";
import { useGameStore } from "@/store";
import { Side } from "@/store/types";
import { CheckIcon } from "lucide-react";
import { useShallow } from "zustand/shallow";

const Counter = ({ team }: { team: Side }) => {
  const { name, placed } = useGameStore(
    useShallow((state) => ({
      name: state.match[team].name,
      placed: state.match.sets[state.currentSet].lineup[team].filter(
        (slot) => slot.playerId !== null,
      ).length,
    })),
  );

  const done = placed === 6;

  return (
    <span
      className={`inline-flex min-w-0 items-center gap-1.5 ${
        done ? "text-slate-400 dark:text-white/40" : "text-slate-900 dark:text-white"
      }`}
    >
      <span className="truncate">{name}</span>
      {done ? (
        <CheckIcon className="size-3.5 shrink-0 text-green-500" />
      ) : (
        <span className="shrink-0 tabular-nums">{placed}/6</span>
      )}
    </span>
  );
};

export default function StartBar({
  leftTeam,
  rightTeam,
  onStart,
}: {
  leftTeam: Side;
  rightTeam: Side;
  onStart: () => void;
}) {
  const { currentSet, ready } = useGameStore(
    useShallow((state) => {
      const setData = state.match.sets[state.currentSet];
      const complete = (team: Side) =>
        setData.lineup[team].every((slot) => slot.playerId !== null);

      return {
        currentSet: state.currentSet,
        ready: !!setData.firstServer && complete("home") && complete("away"),
      };
    }),
  );

  return (
    <div className="flex shrink-0 flex-col gap-2.5 border-t border-slate-200 pt-3 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
      <div className="flex items-center gap-4 overflow-hidden text-[13px]">
        <Counter team={leftTeam} />
        <Counter team={rightTeam} />
      </div>
      <button
        type="button"
        disabled={!ready}
        onClick={onStart}
        className="h-12 w-full cursor-pointer rounded-xl bg-slate-900 text-[15px] font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 sm:h-11 sm:w-auto sm:min-w-56 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:disabled:bg-white/10 dark:disabled:text-white/35"
      >
        Start set {currentSet}
      </button>
    </div>
  );
}
