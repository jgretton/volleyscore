"use client";
import { useGameStore } from "@/store";
import TimeoutButton from "../timeout/TimeoutButton";

const TeamTimeoutControl = ({ team }: { team: "home" | "away" }) => {
  const { teamSwappedSides: teamSwapped, match, currentSet } = useGameStore();

  const isRightSide = team === "home" ? teamSwapped : !teamSwapped;
  const timeoutsUsed: number = match.sets[currentSet]?.[team].timeouts;

  return (
    <div
      className={`flex shrink-0 items-center gap-3 ${
        isRightSide ? "flex-row-reverse" : ""
      }`}
    >
      <TimeoutButton team={team} />
      <div
        className={`flex items-center gap-2 ${
          isRightSide ? "flex-row-reverse" : ""
        }`}
      >
        {[...Array(2)].map((_, index) => (
          <span
            key={`timeout-${index}`}
            className={`size-5 shrink-0 rounded-md border xl:size-6 ${
              index < timeoutsUsed
                ? "border-white bg-white xl:border-[#3E5B64] xl:bg-[#3E5B64]"
                : "border-white/40 xl:border-slate-800 xl:dark:border-white"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default TeamTimeoutControl;
