"use client";
import ServeBall from "@/components/game/ServeBall";
import { useGameStore } from "@/store";
import { Side } from "@/store/types";
import { courtFor } from "@/utils/rotation";
import { useShallow } from "zustand/shallow";

// Roman so a zone can never be read as a shirt number, the same as the
// lineup court.
const ROMAN: Record<number, string> = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
};

// The six where they stand, drawn as numbers on space: a hairline for the
// net, a zone above each number, and the server the only one at full white.
// No cells and no fills, so it stays a footnote to the score.
const RotationCourt = ({ team }: { team: Side }) => {
  const { setData, players } = useGameStore(
    useShallow((state) => ({
      setData: state.match.sets[state.currentSet],
      players: state.match[team].players,
    })),
  );

  const zones = courtFor(setData, team);
  const numberOf = (playerId: string | null) =>
    players.find((player) => player.id === playerId)?.number;

  return (
    <div className="grid shrink-0 grid-cols-[repeat(3,2.125rem)] justify-center gap-x-2.5 gap-y-1 sm:grid-cols-[repeat(3,3.25rem)] sm:gap-x-5 sm:gap-y-1.5 xl:grid-cols-[repeat(3,4.375rem)] xl:gap-x-8 xl:gap-y-2.5">
      <span className="col-span-3 mb-1.5 h-0.5 rounded-sm bg-white/30 sm:mb-2 xl:mb-3" />
      {zones.map(({ zone, playerId, serving }) => (
        <span key={zone} className="text-center">
          <span className="block text-[8px] leading-none font-semibold tracking-wide text-white/25 sm:text-[10px] xl:text-xs">
            {ROMAN[zone]}
          </span>
          <span
            className={`relative mt-0.5 inline-block text-lg leading-tight tabular-nums sm:mt-1 sm:text-2xl xl:text-[2.125rem] ${
              serving ? "font-semibold text-white" : "text-white/40"
            }`}
          >
            {numberOf(playerId) ?? "–"}
            {serving && (
              <ServeBall className="absolute top-1/2 -right-3 size-2.5 -translate-y-1/2 fill-white sm:-right-4 sm:size-3.5 xl:-right-6 xl:size-[18px]" />
            )}
          </span>
        </span>
      ))}
    </div>
  );
};

export default RotationCourt;
