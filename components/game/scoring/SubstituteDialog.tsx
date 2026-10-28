"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { COURT_POSITIONS, SUBS_PER_SET } from "@/lib/constants";
import { useGameStore } from "@/store";
import { Side } from "@/store/types";
import {
  eligibleFor,
  occupantOfSlot,
  rotationsOf,
  slotInZone,
  subsInSlot,
  subsUsedBy,
} from "@/utils/rotation";
import { useState } from "react";
import { useShallow } from "zustand/shallow";

const ROMAN: Record<number, string> = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
};

const SubstituteDialog = ({
  team,
  open,
  onOpenChange,
}: {
  team: Side;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { setData, squad, teamName, substitutePlayer } = useGameStore(
    useShallow((state) => ({
      setData: state.match.sets[state.currentSet],
      squad: state.match[team].players,
      teamName: state.match[team].name,
      substitutePlayer: state.substitutePlayer,
    })),
  );

  const [slot, setSlot] = useState<number | null>(null);

  const playerOf = (playerId: string | null) =>
    squad.find((player) => player.id === playerId);

  const rotations = rotationsOf(setData.actions, setData.firstServer, team);
  const used = subsUsedBy(setData.actions, team);
  const options = slot ? eligibleFor(setData, team, slot, squad) : [];
  const leaving = slot ? playerOf(occupantOfSlot(setData, team, slot)) : null;

  const close = () => {
    setSlot(null);
    onOpenChange(false);
  };

  const choose = (playerIn: string) => {
    if (!slot) return;
    substitutePlayer(team, slot, playerIn);
    close();
  };

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? null : close())}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {slot && leaving
              ? `Who comes on for ${leaving.number} ${leaving.name}?`
              : "Substitution"}
          </DialogTitle>
        </DialogHeader>

        <p className="-mt-2 text-[13px] text-slate-500 dark:text-white/45">
          {slot
            ? `Zone ${ROMAN[slot ? COURT_POSITIONS.find((zone) => slotInZone(zone, rotations) === slot) ?? 1 : 1]}, ${teamName}`
            : "Tap the player coming off."}
        </p>

        {slot === null ? (
          <div className="grid grid-cols-3 justify-center gap-x-2 gap-y-1.5">
            <span className="col-span-3 mb-1 h-0.5 rounded-sm bg-slate-300 dark:bg-white/30" />
            {COURT_POSITIONS.map((zone) => {
              const zoneSlot = slotInZone(zone, rotations);
              const player = playerOf(occupantOfSlot(setData, team, zoneSlot));
              // Two changes and the slot is closed for the set.
              const closed = subsInSlot(setData.actions, team, zoneSlot).length >= 2;

              return (
                <button
                  key={zone}
                  type="button"
                  disabled={closed}
                  onClick={() => setSlot(zoneSlot)}
                  className="cursor-pointer rounded-lg py-2 text-center transition disabled:cursor-not-allowed disabled:opacity-30 enabled:hover:bg-slate-100 dark:enabled:hover:bg-white/10"
                >
                  <span className="block text-[9px] font-semibold tracking-wide text-slate-400 dark:text-white/30">
                    {ROMAN[zone]}
                  </span>
                  <span className="text-xl tabular-nums">{player?.number}</span>
                  <span className="block truncate text-[10px] text-slate-500 dark:text-white/45">
                    {closed ? "closed" : player?.name}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            {options.length === 0 ? (
              <p className="py-4 text-center text-sm text-slate-500 dark:text-white/45">
                Nobody may come on for this position.
              </p>
            ) : (
              options.map((player) => (
                <button
                  key={player.id}
                  type="button"
                  onClick={() => choose(player.id)}
                  className="flex cursor-pointer items-center gap-3 rounded-lg bg-[#3E5B64] px-3 py-2.5 text-left text-sm text-white transition hover:brightness-110"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-black/20 text-[13px] font-semibold tabular-nums">
                    {player.number}
                  </span>
                  {player.name}
                </button>
              ))
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-3 text-[13px] dark:border-white/10">
          <span className="text-slate-500 dark:text-white/45">
            {teamName}{" "}
            <b
              className={`font-medium ${used >= SUBS_PER_SET ? "text-amber-500" : "text-slate-900 dark:text-white"}`}
            >
              {used} of {SUBS_PER_SET}
            </b>{" "}
            used
          </span>
          <button
            type="button"
            onClick={slot ? () => setSlot(null) : close}
            className="cursor-pointer rounded-lg bg-slate-100 px-3.5 py-2 font-medium dark:bg-white/10"
          >
            {slot ? "Back" : "Cancel"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubstituteDialog;
