import { Player } from "@/store/types";
import { XIcon } from "lucide-react";
import ServeBall from "@/components/game/ServeBall";

// Positions are roman so they can never be read as a shirt number, which is
// how a lineup sheet marks them too.
const ROMAN: Record<number, string> = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
};

type NameplateProps = {
  zone: number;
  player?: Player;
  serving: boolean;
  onSelect: () => void;
  onRemove: () => void;
};

export default function Nameplate({
  zone,
  player,
  serving,
  onSelect,
  onRemove,
}: NameplateProps) {
  return (
    <div className="relative border-r border-b border-dashed border-white/45 last:border-r-0 nth-[3n]:border-r-0 nth-[n+4]:border-b-0">
      <button
        type="button"
        onClick={onSelect}
        aria-label={
          player
            ? `Position ${zone}, ${player.number} ${player.name}`
            : `Position ${zone}, choose a player`
        }
        className="flex size-full cursor-pointer items-center justify-center text-white transition-colors hover:bg-white/15"
      >
        <span className="absolute top-1 left-1.5 text-[10px] font-semibold tracking-wide text-white/55">
          {ROMAN[zone]}
        </span>

        {player ? (
          <span className="flex w-full flex-col items-center px-1 leading-none">
            <span className="text-2xl font-semibold tabular-nums sm:text-3xl">
              {player.number}
            </span>
            <span className="mt-1 w-full truncate text-center text-[11px] text-white/90">
              {player.name}
            </span>
          </span>
        ) : (
          // Always visible. A hover-only hint left an empty position looking
          // like nothing at all on a phone.
          <span className="flex size-7 items-center justify-center rounded-full border-[1.5px] border-dashed border-white/70 text-lg font-light text-white/85">
            +
          </span>
        )}
      </button>

      {serving && (
        <ServeBall className="pointer-events-none absolute top-1.5 right-1.5 size-[18px] fill-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" />
      )}

      {player && (
        <button
          type="button"
          aria-label={`Remove ${player.name}`}
          onClick={onRemove}
          className="absolute right-1 bottom-1 flex size-6 cursor-pointer items-center justify-center rounded-full text-white/70 hover:bg-white/20 hover:text-white"
        >
          <XIcon className="size-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
