"use client";

import { ArrowPathIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect, useRef } from "react";

import { initialGame } from "@/lib/data";
import {
  checkIfSetComplete,
  resetGame,
  EndOfSet,
  undoSetPoint,
} from "@/utils/gameLogic";
import HistoryCard from "@/components/historyCard";
import GameReview from "@/components/gameReview";
import TeamScore from "@/components/teamScore";
import Timer from "@/components/timer";

const Page = () => {
  const [currentSet, setCurrentSet] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [servingTeam, setServingTeam] = useState("homeTeam");
  const [gameComplete, setGameComplete] = useState(false);
  const [gameData, setGameData] = useState(initialGame);
  const [endOfSetCountdown, setEndOfSetCountdown] = useState(0);
  const [timeoutCountdown, setTimeoutCountdown] = useState(0);
  const [timeoutTeam, setTimeoutTeam] = useState("");
  const [teamSwapped, setTeamSwapped] = useState(false);
  const [hasSetBeenProcessed, setHasSetBeenProcessed] = useState(false);

  const containerRef = useRef(null);

  function closeModal() {
    setIsOpen(false);
  }

  const swapSides = () => {
    setTeamSwapped((prevState) => !prevState);
  };

  useEffect(() => {
    const winningTeam = checkIfSetComplete(
      gameData,
      currentSet,
      setTeamSwapped,
      setServingTeam,
      setGameComplete
    );

    // If set is complete and the set hasn't already been processed.
    // Add 1 Set point to the winning team.
    //Set process to complete
    if (!hasSetBeenProcessed && winningTeam) {
      setGameData((prevState) => ({
        ...prevState,
        game: {
          ...prevState.game,
          [`${winningTeam}SetsWon`]:
            prevState.game[`${winningTeam}SetsWon`] + 1,
        },
      }));
      setHasSetBeenProcessed(true);
    }

    if (!isOpen && winningTeam && !gameComplete) {
      // console.log("called and adding set.");
      setIsOpen(true);
    }
  }, [gameData, isOpen]);

  // everytime container gains children, scroll left.
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [gameData]);

  //When current set is updated, new set is unprocessed
  useEffect(() => {
    setHasSetBeenProcessed(false);
  }, [currentSet]);

  return (
    <div className="flex flex-col gap-7 text-gray-800 dark:text-white min-h-screen">
      <h2 className="text-center text-3xl">Set {currentSet}</h2>
      <div className="flex flex-row w-full flex-wrap gap-3">
        <button
          onClick={() => swapSides()}
          className="inline-flex items-center gap-3 border rounded-lg px-4 py-2 hover:bg-gray-900 self-start mx-auto"
        >
          <ArrowPathIcon className="size-5 text-gray-800 dark:text-white" />{" "}
          Swap sides
        </button>
        <Timer
          state={endOfSetCountdown}
          setState={setEndOfSetCountdown}
          endOfSet
        />
        <button
          onClick={() =>
            resetGame(
              setGameData,
              setServingTeam,
              setCurrentSet,
              setTeamSwapped,
              setGameComplete,
              setEndOfSetCountdown,
              setTimeoutCountdown
            )
          }
          className="inline-flex items-center gap-3 border rounded-lg px-4 py-2 hover:bg-gray-900 self-start mx-auto"
        >
          <XCircleIcon className="size-5 text-gray-800 dark:text-white" /> Reset
          game
        </button>
      </div>
      <div className=" grid grid-cols-2 grid-flow-row gap-4 gap-y-10 px-10 h-full">
        {/* <div className=" grid grid-rows-2 grid-cols-1 sm:grid-cols-2 gap-4 gap-y-10 px-10 h-full flex-1"> */}
        <div
          className={`${
            !teamSwapped ? "col-start-1" : "col-start-2"
          } w-full h-full row-span-1 col-span-1 row-start-1`}
        >
          <TeamScore
            teamSwapped={teamSwapped}
            servingTeam={servingTeam}
            gameData={gameData}
            gameComplete={gameComplete}
            setGameData={setGameData}
            currentSet={currentSet}
            setServingTeam={setServingTeam}
            timeoutTeam={timeoutTeam}
            setTimeoutTeam={setTimeoutTeam}
            team="homeTeam"
            timeoutCountdown={timeoutCountdown}
            setTimeoutCountdown={setTimeoutCountdown}
          />
        </div>
        <div
          className={`${
            !teamSwapped ? "sm:col-start-2" : "sm:col-start-1"
          } w-full h-full sm:row-span-1 sm:col-span-1 sm:row-start-1`}
        >
          <TeamScore
            teamSwapped={teamSwapped}
            servingTeam={servingTeam}
            gameData={gameData}
            gameComplete={gameComplete}
            setGameData={setGameData}
            currentSet={currentSet}
            setServingTeam={setServingTeam}
            timeoutTeam={timeoutTeam}
            setTimeoutTeam={setTimeoutTeam}
            team="awayTeam"
            timeoutCountdown={timeoutCountdown}
            setTimeoutCountdown={setTimeoutCountdown}
          />
        </div>
        <div className="text-center col-span-2 h-full">
          {/* <div className="text-center sm:col-span-2 h-full"> */}
          <p className="">History</p>
          <div
            className="flex flex-row w-full overflow-x-auto py-4 items-center gap-2 px-10"
            ref={containerRef}
          >
            {gameData.game.sets[currentSet].actions.map((item, index) => (
              <HistoryCard
                item={item}
                key={index}
                gameData={gameData}
                setGameData={setGameData}
                currentSet={currentSet}
                setServingTeam={setServingTeam}
                setGameComplete={setGameComplete}
                gameComplete={gameComplete}
                setHasSetBeenProcessed={setHasSetBeenProcessed}
              />
            ))}
          </div>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Set {currentSet} Finished.
                  </Dialog.Title>
                  <div className="mt-2">
                    {gameComplete ? (
                      <div className="text-sm text-gray-500">
                        <GameReview gameData={gameData} />
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        If you are happy and ready to start the next set press
                        continue.
                      </p>
                    )}
                  </div>

                  <div className="mt-4">
                    {gameComplete ? (
                      <div className="grid gap-3">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => {
                            closeModal();
                          }}
                        >
                          End the Game
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => {
                            resetGame(
                              setGameData,
                              setServingTeam,
                              setCurrentSet,
                              setTeamSwapped,
                              setGameComplete,
                              setEndOfSetCountdown,
                              setTimeoutCountdown
                            );
                            setIsOpen(false);
                          }}
                        >
                          Reset Game
                        </button>
                      </div>
                    ) : (
                      <div className="grid gap-3">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => {
                            EndOfSet(
                              closeModal,
                              setCurrentSet,
                              currentSet,
                              setHasSetBeenProcessed,
                              swapSides,
                              setGameData
                            );
                          }}
                        >
                          Start next set
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => {
                            undoSetPoint(
                              gameData,
                              setGameData,
                              currentSet,
                              setServingTeam,
                              setHasSetBeenProcessed,
                              setIsOpen
                            );
                          }}
                        >
                          Undo set point
                        </button>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Set {currentSet} Finished.
                  </Dialog.Title>
                  <div className="mt-2">
                    <GameReview gameData={gameData} />
                  </div>

                  <div className="mt-4">
                    <div className="grid gap-3">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {}}
                      >
                        End of{" "}
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          resetGame(
                            setGameData,
                            setServingTeam,
                            setCurrentSet,
                            setTeamSwapped,
                            setGameComplete
                          );
                          setIsOpen(false);
                        }}
                      >
                        Reset Game
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition> */}
    </div>
  );
};

export default Page;
