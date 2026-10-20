"use client";
import SetButton from "@/components/game/history/SetButton";
import TeamHeader from "@/components/game/scoring/TeamHeader";
import { Side } from "@/store/types";

// Desktop only. Team identity leaves the panels and sits on one row with the
// set number between the two, which is what lets the rail disappear.
const MatchDeskHeader = ({
  leftTeam,
  rightTeam,
  onOpenHistory,
}: {
  leftTeam: Side;
  rightTeam: Side;
  onOpenHistory: () => void;
}) => {
  return (
    <div className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-6 px-2">
      <TeamHeader team={leftTeam} />
      <SetButton variant="inline" onClick={onOpenHistory} />
      <TeamHeader team={rightTeam} />
    </div>
  );
};

export default MatchDeskHeader;
