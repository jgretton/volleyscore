"use client";
import HistoryRow from "@/components/game/history/HistoryRow";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGameStore } from "@/store";
import { GameAction, SetData } from "@/store/types";

const MatchHistoryDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const {
    match,
    currentSet,
    teamSwappedSides: teamSwapped,
  } = useGameStore();

  const leftTeam = teamSwapped ? "away" : "home";
  const rightTeam = teamSwapped ? "home" : "away";
  const actions: GameAction[] = match.sets[currentSet]?.actions ?? [];

  // Subs record who, the timeline shows shirt numbers, and both squads are
  // here, so the lookup lives at this level rather than in every row.
  const shirtOf = (playerId: string | null | undefined) => {
    if (!playerId) return undefined;
    const squads = [...match.home.players, ...match.away.players];
    return squads.find((player) => player.id === playerId)?.number ?? undefined;
  };

  // Everything before the live set has finished, so its score is final.
  const finishedSets = [];
  for (let setNumber = 1; setNumber < currentSet; setNumber++) {
    const setData: SetData = match.sets[setNumber];
    if (setData) {
      finishedSets.push({ setNumber, setData });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set {currentSet}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-[1fr_1px_1fr] gap-4 border-b border-gray-200 pb-2 dark:border-white/10">
          <span className="truncate text-right text-sm text-gray-500 dark:text-gray-400">
            {match[leftTeam].name}
          </span>
          <span />
          <span className="truncate text-left text-sm text-gray-500 dark:text-gray-400">
            {match[rightTeam].name}
          </span>
        </div>

        {actions.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
            No points yet this set
          </p>
        ) : (
          // flex-col-reverse puts the newest row at the top and justify-end
          // pins it there, so new points push the list down and nothing has
          // to be scrolled into place.
          <div className="flex max-h-80 flex-col-reverse justify-end overflow-y-auto">
            {actions.map((item: GameAction, index: number) => (
              <HistoryRow
                key={index}
                item={item}
                leftTeam={leftTeam}
                isLatest={index === actions.length - 1}
                shirtOf={shirtOf}
              />
            ))}
          </div>
        )}

        {finishedSets.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 border-t border-gray-200 pt-4 dark:border-white/10">
            {finishedSets.map(({ setNumber, setData }) => {
              const leftWon = setData.winner === leftTeam;
              return (
                <span
                  key={setNumber}
                  className="inline-flex items-baseline gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm tabular-nums dark:border-white/15"
                >
                  <span className="mr-1 text-[10px] tracking-[0.1em] text-gray-400 dark:text-gray-500">
                    SET {setNumber}
                  </span>
                  <span className={leftWon ? "font-medium" : "text-gray-400 dark:text-gray-500"}>
                    {setData[leftTeam].score}
                  </span>
                  <span className="text-gray-300 dark:text-gray-600">-</span>
                  <span className={leftWon ? "text-gray-400 dark:text-gray-500" : "font-medium"}>
                    {setData[rightTeam].score}
                  </span>
                </span>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MatchHistoryDialog;
