"use client";
import ServeBall from "@/components/game/ServeBall";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGameStore } from "@/store";
import { Side } from "@/store/types";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useShallow } from "zustand/shallow";
import LineupBoard from "./LineupBoard";
import ServeBlock from "./ServeBlock";
import StartBar from "./StartBar";

// Sets 2, 3 and 4 derive their server, so there is nothing to ask. The block
// collapses to a line until someone wants to override it.
const ServeSummary = ({ onChange }: { onChange: () => void }) => {
  const name = useGameStore(
    (state) =>
      state.match[state.match.sets[state.currentSet].firstServer as Side].name,
  );

  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-[#3E5B64] px-3.5 py-3 text-sm font-medium text-white">
      <ServeBall className="size-[18px] shrink-0 fill-white" />
      <span className="truncate">{name} serve first</span>
      <button
        type="button"
        onClick={onChange}
        className="ml-auto shrink-0 cursor-pointer text-[13px] font-normal text-white/60 underline underline-offset-[3px] hover:text-white"
      >
        Change
      </button>
    </div>
  );
};

// A set cannot be scored without a lineup, so this cannot be dismissed. The
// scoreboard stays visible behind it, which is where the match context lives.
export default function PreSetDialog() {
  const {
    currentSet,
    firstServer,
    teamSwapped,
    match,
    startSet,
    openModal,
    returnToSetup,
  } = useGameStore(
    useShallow((state) => ({
      currentSet: state.currentSet,
      firstServer: state.match.sets[state.currentSet].firstServer,
      teamSwapped: state.teamSwappedSides,
      match: state.match,
      startSet: state.startSet,
      openModal: state.openModal,
      returnToSetup: state.returnToSetup,
    })),
  );
  const router = useRouter();

  // Back always goes to wherever you came from. Set 1 came from the squads in
  // setup; every later set came through the previous set's result.
  const previousSet = currentSet - 1;
  const backToSquads = previousSet < 1;
  const backLabel = backToSquads
    ? "Back to team sheet"
    : `Back to set ${previousSet} result`;
  const goBack = () => {
    if (backToSquads) {
      returnToSetup();
      router.push("/setup");
      return;
    }
    openModal("SET_COMPLETE", { currentSet: previousSet, updatedMatch: match });
  };

  // Sets 1 and 5 are tossed, so the picker stays up: choosing a server is what
  // reveals the ends row, and you can still change your mind until Start.
  const [editingServe, setEditingServe] = useState(false);
  const isTossSet = currentSet === 1 || currentSet === 5;
  const showPicker = isTossSet || editingServe || !firstServer;

  const leftTeam: Side = teamSwapped ? "away" : "home";
  const rightTeam: Side = teamSwapped ? "home" : "away";

  return (
    <Dialog open>
      <DialogContent
        showCloseButton={false}
        onEscapeKeyDown={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
        className="flex max-h-[92dvh] flex-col gap-0 sm:max-w-3xl"
      >
        <DialogHeader className="shrink-0">
          {/* Spelled out rather than a bare chevron: where back goes changes
              between set 1 and the rest, so the button has to say so. */}
          <button
            type="button"
            onClick={goBack}
            className="-ml-1 mb-1.5 inline-flex w-fit cursor-pointer items-center gap-1 rounded-md py-0.5 pr-2 pl-1 text-[13px] text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-white/55 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <ChevronLeftIcon className="size-4 shrink-0" aria-hidden="true" />
            {backLabel}
          </button>
          <DialogTitle>Starting lineup, set {currentSet}</DialogTitle>
        </DialogHeader>

        <div className="my-3 min-h-0 flex-1 overflow-y-auto">
          {showPicker ? (
            <ServeBlock />
          ) : (
            <ServeSummary onChange={() => setEditingServe(true)} />
          )}
          <div className="my-4 h-px bg-slate-200 dark:bg-white/10" />
          <LineupBoard leftTeam={leftTeam} rightTeam={rightTeam} />
        </div>

        <StartBar leftTeam={leftTeam} rightTeam={rightTeam} onStart={startSet} />
      </DialogContent>
    </Dialog>
  );
}
