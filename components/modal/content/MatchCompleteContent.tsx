import { GameAction, ModalData } from "@/store/types";
import React from "react";

const MatchCompleteContent = ({
  modalData,
  closeModal,
  undoAction,
  resetMatchData,
}: {
  modalData?: ModalData;
  closeModal: () => void;
  undoAction: (action: GameAction) => void;
  resetMatchData: () => void;
}) => {
  if (!modalData?.updatedMatch) return <div>Error Loading Match Data..</div>;

  const {
    awayTeamName,
    homeTeamName,
    awayTeamSetsWon,
    homeTeamSetsWon,
    sets: matchSets,
  } = modalData.updatedMatch;

  // Get only the played sets
  const playedSets = Object.entries(matchSets).filter(
    ([_, setData]) => setData,
  );

  // Determine overall winner
  const homeTeamWon = homeTeamSetsWon > awayTeamSetsWon;
  const awayTeamWon = awayTeamSetsWon > homeTeamSetsWon;

  const lastAction =
    modalData.currentSet && matchSets[modalData.currentSet]?.actions?.length > 0
      ? matchSets[modalData.currentSet].actions[
          matchSets[modalData.currentSet].actions.length - 1
        ]
      : null;

  return (
    <div className="p-2">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Match Complete
        </h2>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Final Result
        </p>
      </div>

      <div className="mb-8">
        <div className="grid grid-cols-2 divide-x divide-gray-200 overflow-hidden rounded-lg dark:divide-gray-500">
          <div className="p-6">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <h3
                  className={`mr-4 truncate text-xl ${
                    homeTeamWon
                      ? "font-bold text-gray-900 dark:text-white"
                      : "font-medium text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {homeTeamName}
                </h3>
                <div
                  className={`text-6xl tabular-nums ${
                    homeTeamWon
                      ? "font-black text-gray-900 dark:text-white"
                      : "font-semibold text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {homeTeamSetsWon}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {playedSets.map(([setNumber, setData]) => (
                <div key={setNumber} className="text-right">
                  <span
                    className={`text-xl tabular-nums ${
                      setData.winner === "homeTeam"
                        ? "font-bold text-gray-900 dark:text-white"
                        : "font-normal text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {setData.score.homeTeam}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div
                  className={`text-6xl tabular-nums ${
                    awayTeamWon
                      ? "font-black text-gray-900 dark:text-white"
                      : "font-semibold text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {awayTeamSetsWon}
                </div>
                <h3
                  className={`ml-4 truncate text-right text-xl ${
                    awayTeamWon
                      ? "font-bold text-gray-900 dark:text-white"
                      : "font-medium text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {awayTeamName}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {playedSets.map(([setNumber, setData]) => (
                <div key={setNumber} className="text-left">
                  <span
                    className={`text-xl tabular-nums ${
                      setData.winner === "awayTeam"
                        ? "font-bold text-gray-900 dark:text-white"
                        : "font-normal text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {setData.score.awayTeam}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => {
            resetMatchData();
            closeModal();
          }}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Start New Match
        </button>
        {lastAction && (
          <button
            onClick={() => {
              undoAction(lastAction);
              closeModal();
            }}
            className="w-full rounded-lg bg-gray-200 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Undo Last Point
          </button>
        )}
      </div>
    </div>
  );
};

export default MatchCompleteContent;
