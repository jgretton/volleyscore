"use client";
import { SUBS_PER_SET } from "@/lib/constants";
import { useGameStore } from "@/store";
import { Side } from "@/store/types";
import { subsUsedBy } from "@/utils/rotation";
import { useState } from "react";
import { useShallow } from "zustand/shallow";
import SubstituteDialog from "./SubstituteDialog";

// A word rather than a button: the underline carries the affordance, so it
// stays quiet enough to sit under a court drawn to recede. The count is here
// because it is the one thing you would otherwise have to open a dialog for.
const SubstituteControl = ({ team }: { team: Side }) => {
  const { used, squadSize } = useGameStore(
    useShallow((state) => ({
      used: subsUsedBy(state.match.sets[state.currentSet].actions, team),
      squadSize: state.match[team].players.length,
    })),
  );
  const [open, setOpen] = useState(false);

  // Six players means nobody is ever off court, so there is nothing to offer.
  if (squadSize <= 6) {
    return (
      <p className="shrink-0 text-center text-[11px] text-slate-400 dark:text-white/20">
        No substitutes
      </p>
    );
  }

  return (
    <div className="flex shrink-0 justify-center">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex cursor-pointer items-baseline gap-1.5 text-[11.5px] text-white/55 underline underline-offset-[3px] transition hover:text-white sm:text-xs"
      >
        Substitute
        <span
          className={`tabular-nums no-underline ${
            used >= SUBS_PER_SET ? "text-amber-400" : "text-white/35"
          }`}
        >
          {used}/{SUBS_PER_SET}
        </span>
      </button>
      <SubstituteDialog team={team} open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default SubstituteControl;
