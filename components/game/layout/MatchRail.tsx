"use client";
import SetButton from "@/components/game/history/SetButton";
import MatchActions from "@/components/game/history/MatchActions";

// Between the two teams from sm up to desktop. It costs width rather than
// height, which is the cheap axis everywhere except a phone held upright.
// Nothing permanent lives in the middle: the history is behind the set
// number, so the rail stays narrow.
const MatchRail = ({ onOpenHistory }: { onOpenHistory: () => void }) => {
  return (
    <div className="hidden w-16 shrink-0 flex-col items-center justify-between py-2 sm:flex lg:w-24">
      <SetButton variant="stacked" onClick={onOpenHistory} />
      <MatchActions className="flex-col" />
    </div>
  );
};

export default MatchRail;
