"use client";
import MatchHistoryDialog from "@/components/game/history/MatchHistoryDialog";
import MatchControlBar from "@/components/game/layout/MatchControlBar";
import MatchDeskBar from "@/components/game/layout/MatchDeskBar";
import MatchDeskHeader from "@/components/game/layout/MatchDeskHeader";
import MatchRail from "@/components/game/layout/MatchRail";
import TeamPanel from "@/components/game/scoring/TeamPanel";
import ModalManager from "@/components/modal/ModalManager";
import { useIsDesktop } from "@/lib/useIsDesktop";
import { useGameStore } from "@/store";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const Page = () => {
  const teamSwapped = useGameStore((state) => state.teamSwappedSides);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [historyOpen, setHistoryOpen] = useState<boolean>(false);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    // Set flag to true after initial render to indicate client-side execution
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex h-full items-center justify-center gap-2 text-gray-800 dark:text-white">
        Loading <Loader2 className="animate-spin" />
      </div>
    );
  }

  // Rendering the panels in display order keeps the swap in one place. Every
  // child mirrors its own contents off teamSwappedSides, so nothing below
  // here needs to know which side it ended up on.
  const leftTeam = teamSwapped ? "away" : "home";
  const rightTeam = teamSwapped ? "home" : "away";
  const openHistory = () => setHistoryOpen(true);

  return (
    <div className="flex h-full flex-col gap-2 p-2 text-gray-800 sm:gap-3 sm:p-3 xl:gap-4 xl:p-4 dark:text-white">
      {isDesktop && (
        <MatchDeskHeader
          leftTeam={leftTeam}
          rightTeam={rightTeam}
          onOpenHistory={openHistory}
        />
      )}

      <div className="flex min-h-0 flex-1 gap-2 sm:gap-3 xl:gap-3">
        <TeamPanel team={leftTeam} showDetails={!isDesktop} />
        {!isDesktop && <MatchRail onOpenHistory={openHistory} />}
        <TeamPanel team={rightTeam} showDetails={!isDesktop} />
      </div>

      {isDesktop ? (
        <MatchDeskBar leftTeam={leftTeam} rightTeam={rightTeam} />
      ) : (
        <MatchControlBar onOpenHistory={openHistory} />
      )}

      <MatchHistoryDialog open={historyOpen} onOpenChange={setHistoryOpen} />
      <ModalManager />
    </div>
  );
};

export default Page;
