"use client";
import { useGameStore } from "@/store";
import TimeoutButton from "../timeout/TimeoutButton";

const TeamTimeoutControl = ({ team }: { team: "home" | "away" }) => {
  const { teamSwappedSides: teamSwapped, match, currentSet } = useGameStore();

  const isRightSide = team === "home" ? teamSwapped : !teamSwapped;

  return (
    <div
      className={`flex shrink-0 flex-row items-center justify-start gap-3 ${
        isRightSide ? "flex-row-reverse" : ""
      }`}
    >
      <div className="shrink-0">
        <TimeoutButton match={match} team={team} teamSwapped={teamSwapped} />
      </div>
      <div className="flex flex-row items-center gap-2">
        {[...Array(2)].map((_, index) => (
          <span
            key={`timeout-${index}`}
            className={`size-5 shrink-0 rounded-md border border-slate-800 dark:border-white ${
              index < match.sets[currentSet]?.[team].timeouts
                ? "bg-[#3E5B64]"
                : "border-slate-800"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default TeamTimeoutControl;
