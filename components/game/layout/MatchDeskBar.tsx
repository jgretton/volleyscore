"use client";
import MatchActions from "@/components/game/history/MatchActions";
import TeamTimeoutControl from "@/components/game/scoring/TeamTimeoutControl";
import { Side } from "@/store/types";

// Desktop only. Everything you press that is not a score shares this row, so
// the timeouts, undo, swap and menu are all in one place.
const MatchDeskBar = ({
  leftTeam,
  rightTeam,
}: {
  leftTeam: Side;
  rightTeam: Side;
}) => {
  return (
    <div className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-6 px-2">
      <div className="flex justify-start">
        <TeamTimeoutControl team={leftTeam} />
      </div>
      <MatchActions />
      <div className="flex justify-end">
        <TeamTimeoutControl team={rightTeam} />
      </div>
    </div>
  );
};

export default MatchDeskBar;
