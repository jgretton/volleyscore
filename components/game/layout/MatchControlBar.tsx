"use client";
import SetButton from "@/components/game/history/SetButton";
import MatchActions from "@/components/game/history/MatchActions";

// Phone portrait only. A rail would eat the width a two digit score needs,
// so below sm the same controls go in a bar underneath instead.
const MatchControlBar = ({ onOpenHistory }: { onOpenHistory: () => void }) => {
  return (
    <div className="flex shrink-0 items-center justify-center gap-4 sm:hidden">
      <SetButton variant="inline" onClick={onOpenHistory} />
      <MatchActions />
    </div>
  );
};

export default MatchControlBar;
