"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect, useRef, forwardRef } from "react";

import { initialGame } from "@/lib/data";
import { resetGame, EndOfSet, undoSetPoint } from "@/utils/gameLogic";
import GameReview from "@/components/gameReview";
import TeamScore from "@/components/game/scoring/TeamScore";
import Timer from "@/components/timer";
import History from "@/components/game/history/History";
import GameHeader from "@/components/game/layout/GameHeader";
import { useGameStore } from "@/store";
import ModalManager from "@/components/modal/ModalManager";

const Page = () => {
  const { teamSwappedSides: teamSwapped, match, currentSet } = useGameStore();
  const { gameComplete } = match;

  //   const [currentSet, setCurrentSet] = useState(loadCurrentSet);
  const [isOpen, setIsOpen] = useState(false);
  const [endOfSetCountdown, setEndOfSetCountdown] = useState(0);
  const [timeoutCountdown, setTimeoutCountdown] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const containerRef = useRef(null);

  function closeModal() {
    setIsOpen(false);
  }

  // everytime container gains children make sure it scrolls up.
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = -containerRef.current.scrollHeight;
    }
  }, [match]);

  useEffect(() => {
    // Set flag to true after initial render to indicate client-side execution
    setIsClient(true);
  }, []);
  if (!isClient) {
    // Render a placeholder or loading state until client-side code runs
    return (
      <div role="status" className="grid h-dvh w-dvw place-items-center">
        <svg
          aria-hidden="true"
          className="h-8 w-8 animate-spin fill-white text-gray-200 dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col gap-4 text-gray-800 dark:text-white">
      <GameHeader />

      <div className="grid h-[calc(100dvh-5rem)] max-h-full grid-cols-2 grid-rows-[2fr_auto_1fr] gap-4">
        <div
          className={`${
            !teamSwapped ? "col-start-1 pl-2" : "col-start-2 pr-2"
          } col-span-1 row-span-1 row-start-1`}
        >
          <TeamScore team="homeTeam" />
        </div>
        <div
          className={`${
            !teamSwapped ? "pr-2 sm:col-start-2" : "pl-2 sm:col-start-1"
          } sm:col-span-1 sm:row-span-1 sm:row-start-1`}
        >
          <TeamScore team="awayTeam" />
        </div>

        <h2 className="col-span-2 text-center text-3xl">Set {currentSet}</h2>
        <div
          ref={containerRef}
          className="col-span-2 flex h-full flex-col-reverse gap-2 overflow-y-scroll py-2 sm:py-10"
        >
          {match?.sets[currentSet]?.actions?.map((item, index) => (
            <div
              key={index}
              className="text-base text-gray-950/30 last:border-gray-950 last:text-2xl last:leading-10 last:text-gray-950 md:last:text-3xl dark:border-gray-500 dark:text-gray-500 dark:last:border-gray-100 dark:last:text-gray-100 [&:last-child>div>div>button]:inline-flex"
            >
              <History
                item={item}
                currentSet={currentSet}
                teamSwapped={teamSwapped}
              />
            </div>
          ))}
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
                    className="text-lg leading-6 font-medium text-gray-900"
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
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => {
                            closeModal();
                          }}
                        >
                          End the Game
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => {
                            resetGame(
                              setGameData,
                              setServingTeam,
                              setCurrentSet,
                              setGameComplete,
                              setEndOfSetCountdown,
                              setTimeoutCountdown,
                              gameData,
                            );
                            setIsOpen(false);
                          }}
                        >
                          Reset Game
                        </button>
                      </div>
                    ) : (
                      <div className="grid gap-3">
                        <Timer
                          state={endOfSetCountdown}
                          setState={setEndOfSetCountdown}
                          endOfSet={() =>
                            EndOfSet(
                              closeModal,
                              setCurrentSet,
                              currentSet,
                              setHasSetBeenProcessed,
                              swapSides,
                              setGameData,
                            )
                          }
                        />
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => {
                            EndOfSet(
                              closeModal,
                              setCurrentSet,
                              currentSet,
                              setHasSetBeenProcessed,
                              swapSides,
                              setGameData,
                            );
                            setEndOfSetCountdown(0);
                          }}
                        >
                          Start next set
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => {
                            undoSetPoint(
                              gameData,
                              setGameData,
                              currentSet,
                              setServingTeam,
                              setHasSetBeenProcessed,
                              setIsOpen,
                            );
                            setEndOfSetCountdown(0);
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

      <ModalManager />
    </div>
  );
};

export default Page;
