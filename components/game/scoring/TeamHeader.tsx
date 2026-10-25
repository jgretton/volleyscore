"use client";
import ServeBall from "@/components/game/ServeBall";
import { useGameStore } from "@/store";

const ServeIndicator = ({ serving }: { serving: boolean }) => (
  <ServeBall
    className={`${
      serving
        ? "fill-white xl:fill-gray-950 xl:dark:fill-gray-100"
        : "fill-transparent"
    } size-5 shrink-0 xl:size-7`}
  />
);

const TeamHeader = ({ team }: { team: "home" | "away" }) => {
  const { teamSwappedSides: teamSwapped, match } = useGameStore();

  const teamName: string = match[team].name;
  const setsWon: number = match[team].setsWon;
  const isServing = match.servingTeam === team;

  const isRightSide = team === "home" ? teamSwapped : !teamSwapped;

  return (
    <div
      className={`flex shrink-0 items-center justify-between gap-2 ${
        isRightSide ? "flex-row-reverse" : ""
      }`}
    >
      <span className="truncate text-base md:text-lg lg:text-2xl xl:text-3xl">
        {teamName}
      </span>
      <div
        className={`flex shrink-0 items-center gap-2 xl:gap-4 ${
          isRightSide ? "flex-row-reverse" : ""
        }`}
      >
        <ServeIndicator serving={isServing} />
        <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-white/30 px-2 text-2xl font-light tabular-nums md:h-11 md:min-w-11 md:text-3xl xl:h-14 xl:min-w-14 xl:border-[#3E5B64] xl:text-4xl">
          {setsWon}
        </span>
      </div>
    </div>
  );
};

export default TeamHeader;
