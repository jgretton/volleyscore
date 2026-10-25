"use client";
import ResultScoreboard from "@/components/game/results/ResultScoreboard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGameStore } from "@/store";
import { ModalData } from "@/store/types";
import Link from "next/link";

// Both results share the same object: a scoreboard and a couple of actions.
// Only the heading and the buttons differ.
const ModalManager = () => {
  const { modal, match, closeModal, undoSetPoint, undoAction, resetMatchData } =
    useGameStore();

  const modalData: ModalData | undefined = modal.modalData;
  if (!modal.modalType || !modalData) return null;

  // The set that just finished. By now the store has already moved on to the
  // next one, so this is what says how much of the match to show.
  const finishedSet = modalData.currentSet;
  const isMatchComplete = modal.modalType === "MATCH_COMPLETE";
  // An advanced match needs its lineup before it can be scored, so the button
  // says where it actually goes.
  const nextSet = finishedSet + 1;
  const continueLabel =
    match.mode === "advanced"
      ? `Lineups for set ${nextSet}`
      : `Start set ${nextSet}`;

  const actions = match.sets[finishedSet]?.actions ?? [];
  const lastAction = actions[actions.length - 1];
  const winner =
    match.home.setsWon > match.away.setsWon ? match.home.name : match.away.name;

  return (
    <Dialog
      open={modal.isOpen}
      onOpenChange={(open) => {
        if (!open) closeModal();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isMatchComplete ? "Match complete" : `End of set ${finishedSet}`}
          </DialogTitle>
        </DialogHeader>

        {isMatchComplete && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-white">
              {winner}
            </span>{" "}
            wins the match
          </p>
        )}

        <ResultScoreboard match={match} lastSet={finishedSet} />

        <div className="flex flex-col gap-2">
          {isMatchComplete ? (
            <>
              <Button
                onClick={() => {
                  resetMatchData();
                  closeModal();
                }}
              >
                New match
              </Button>
              {lastAction && (
                <Button
                  variant="outline"
                  onClick={() => {
                    undoAction(lastAction);
                    closeModal();
                  }}
                >
                  Undo last point
                </Button>
              )}
              <Button variant="ghost" asChild>
                <Link href="/">Back to home</Link>
              </Button>
            </>
          ) : (
            <>
              <Button onClick={closeModal}>{continueLabel}</Button>
              <Button
                variant="outline"
                onClick={() => {
                  undoSetPoint();
                  closeModal();
                }}
              >
                Undo set point
              </Button>
              {/* Deliberately not a button: leaving is a way out, not one of
                  the choices. The match is saved either way. */}
              <Link
                href="/"
                className="mt-1 text-center text-[13px] text-slate-500 underline underline-offset-[3px] transition hover:text-slate-900 dark:text-white/45 dark:hover:text-white"
              >
                Leave match
              </Link>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalManager;
