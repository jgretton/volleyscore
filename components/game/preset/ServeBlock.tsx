"use client";
import ServeBall from "@/components/game/ServeBall";
import { useGameStore } from "@/store";
import { Side } from "@/store/types";
import { useShallow } from "zustand/shallow";
import CoinChip from "./CoinChip";

const TeamChoice = ({
  team,
  chosen,
  onChoose,
}: {
  team: Side;
  chosen: boolean;
  onChoose: () => void;
}) => {
  const name = useGameStore((state) => state.match[team].name);

  return (
    <button
      type="button"
      aria-pressed={chosen}
      onClick={onChoose}
      className={`flex w-full cursor-pointer items-center gap-2.5 rounded-xl border bg-[#3E5B64] px-3.5 py-3 text-left text-[15px] font-medium text-white transition ${
        chosen ? "border-white/55" : "border-transparent hover:border-white/25"
      }`}
    >
      <ServeBall
        className={`size-5 shrink-0 ${chosen ? "fill-white" : "fill-transparent"}`}
      />
      <span className="truncate">{name}</span>
    </button>
  );
};

export default function ServeBlock() {
  const { firstServer, homeName, awayName, setFirstServer, swapSides } =
    useGameStore(
      useShallow((state) => ({
        firstServer: state.match.sets[state.currentSet].firstServer,
        homeName: state.match.home.name,
        awayName: state.match.away.name,
        setFirstServer: state.setFirstServer,
        swapSides: state.swapSides,
      })),
    );

  // The ends are whoever did not take the serve, so there is nobody to name
  // until a server is picked.
  const endsTeam = firstServer === "home" ? awayName : homeName;

  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <p className="text-[15px] font-medium">Who serves first?</p>
        <CoinChip />
      </div>

      <div className="flex flex-col gap-2 md:flex-row">
        <TeamChoice
          team="home"
          chosen={firstServer === "home"}
          onChoose={() => setFirstServer("home")}
        />
        <TeamChoice
          team="away"
          chosen={firstServer === "away"}
          onChoose={() => setFirstServer("away")}
        />
      </div>

      {firstServer && (
        <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-slate-100 px-3.5 py-2.5 text-sm dark:bg-white/5">
          <span className="truncate text-slate-600 dark:text-white/65">
            {endsTeam} choose ends
          </span>
          <button
            type="button"
            onClick={swapSides}
            className="ml-auto shrink-0 cursor-pointer rounded-full border border-slate-300 px-3.5 py-1.5 text-[13px] font-medium transition hover:bg-slate-200 dark:border-white/25 dark:hover:bg-white/10"
          >
            Swap sides
          </button>
        </div>
      )}
    </div>
  );
}
