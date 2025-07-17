import { Match } from "@/store/types";
import React from "react";

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

  const {
    awayTeamName,
    homeTeamName,
    awayTeamSetsWon,
    homeTeamSetsWon,
    sets: matchSets,
  } = modalData.updatedMatch;

  // All possible sets (1-5)
  const allSets = [1, 2, 3, 4, 5];

  // Determine overall winner
  const homeTeamWon = homeTeamSetsWon > awayTeamSetsWon;
  const awayTeamWon = awayTeamSetsWon > homeTeamSetsWon;

  return (
    <div className="p-2">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          End of Set {modalData.currentSet}
        </h2>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Current Score
        </p>
      </div>

      {/* Main Score Display */}
      <div className="mb-8">
        <div className="grid grid-cols-2 divide-x divide-gray-200 overflow-hidden rounded-lg dark:divide-gray-500">
          {/* Home Team Column */}
          <div className="p-6">
            {/* Team Name and Final Score */}
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

            {/* Set Scores */}
            <div className="space-y-4">
              {allSets.map((setNumber) => {
                const setData = matchSets[setNumber];
                const hasStarted = setData !== undefined;
                const setScore = hasStarted ? setData.score.homeTeam : "-";

                return (
                  <div key={setNumber} className="text-right">
                    <span
                      className={`text-xl tabular-nums ${
                        hasStarted && setData.winner === "homeTeam"
                          ? "font-bold text-gray-900 dark:text-white"
                          : hasStarted
                            ? "font-normal text-gray-500 dark:text-gray-400"
                            : "font-normal text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {setScore}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Away Team Column */}
          <div className="p-6">
            {/* Team Name and Final Score */}
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

            {/* Set Scores */}
            <div className="space-y-4">
              {allSets.map((setNumber) => {
                const setData = matchSets[setNumber];
                const hasStarted = setData !== undefined;
                const setScore = hasStarted ? setData.score.awayTeam : "-";

                return (
                  <div key={setNumber} className="text-left">
                    <span
                      className={`text-xl tabular-nums ${
                        hasStarted && setData.winner === "awayTeam"
                          ? "font-bold text-gray-900 dark:text-white"
                          : hasStarted
                            ? "font-normal text-gray-500 dark:text-gray-400"
                            : "font-normal text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {setScore}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => {
            closeModal();
          }}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Start Next Set
        </button>
        <button
          onClick={() => {
            undoSetPoint();
            closeModal();
          }}
          className="w-full rounded-lg bg-gray-200 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          Undo Set Point
        </button>
      </div>
    </div>
  );
};

export default SetCompleteContent;
