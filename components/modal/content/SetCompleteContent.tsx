import { GameAction, Match } from "@/store/types";
import React from "react";
const sets = [1, 2, 3, 4, 5];
const SetCompleteContent = ({
  modalData,
  closeModal,
  undoSetPoint,
}: {
  modalData?: {
    currentSet: number;
    updatedMatch: Match;
  };
  closeModal: () => void;
  undoSetPoint: () => void;
}) => {
  if (!modalData?.updatedMatch) return <div>Error Loading Match Data..</div>;

  const { awayTeamName, homeTeamName, awayTeamSetsWon, homeTeamSetsWon } =
    modalData.updatedMatch;

  return (
    <div className="">
      <h2 className="text-center text-lg">
        End of Set {modalData.currentSet || ""}
      </h2>
      <div className="bg my-10 grid grid-cols-2 divide-x">
        {/* Home Team */}
        <div className="grid w-full grid-flow-row gap-y-5 pr-3">
          <div className="grid grid-cols-[auto_auto] items-center justify-between gap-3">
            <p className="max-w-full truncate capitalize">{homeTeamName}</p>
            <p className="text-right text-4xl font-medium tabular-nums">
              {homeTeamSetsWon}
            </p>
          </div>
          <div className="self-right grid grid-flow-row gap-y-2 pl-3 text-right tabular-nums">
            {sets.map((set) => {
              const winner = modalData.updatedMatch.sets[set]?.winner ?? "";

              const setData =
                modalData.updatedMatch.sets[set]?.score.homeTeam ?? "-";
              return (
                <p
                  className={`${winner === "homeTeam" ? "font-medium dark:text-gray-100" : "text-sm/6 font-normal text-gray-500 dark:text-gray-300"} `}
                  key={set}
                >
                  {setData}
                </p>
              );
            })}
          </div>
        </div>
        <div className="grid w-full grid-flow-row gap-y-5 pl-3">
          <div className="grid grid-cols-[auto_auto] items-center justify-between gap-3">
            <p className="text-right text-4xl font-medium tabular-nums">
              {awayTeamSetsWon}
            </p>
            <p className="max-w-full truncate capitalize">{awayTeamName}</p>
          </div>
          <div className="self-right grid grid-flow-row gap-y-2 text-left tabular-nums">
            {sets.map((set) => {
              const winner = modalData.updatedMatch.sets[set]?.winner ?? "";

              const setData =
                modalData.updatedMatch.sets[set]?.score.awayTeam ?? "-";
              return (
                <p
                  key={set}
                  className={`${winner === "awayTeam" ? "font-medium dark:text-gray-100" : "text-sm/6 font-normal text-gray-500 dark:text-gray-300"} `}
                >
                  {setData}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          closeModal();
        }}
        className="mt-4 w-full cursor-pointer rounded border border-gray-200 bg-white px-4 py-2 text-black hover:bg-gray-200"
      >
        Start next set
      </button>
      <button
        onClick={() => {
          undoSetPoint();
          closeModal();
        }}
        className="mt-4 w-full cursor-pointer rounded border border-gray-200 bg-white px-4 py-2 text-black hover:bg-gray-200"
      >
        Undo set point
      </button>
    </div>
  );
};

export default SetCompleteContent;
