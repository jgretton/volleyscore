"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Cog6ToothIcon, CogIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState, Fragment } from "react";
import DarkModeToggle from "./darkModeToggle";

const Settings = ({ gameData, setGameData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const changeName = (e) => {
    setGameData((prevState) => {
      return {
        game: {
          ...prevState.game,
          [e.target.name]: e.target.value,
        },
      };
    });
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("volleyballGameData", JSON.stringify(gameData));
  };

  return (
    <>
      <button
        className="inline-flex transition-all  items-center gap-3 rounded-lg px-4 py-2 dark:bg-slate-800 dark:hover:bg-slate-900 dark:text-white bg-gray-100 hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-50"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Cog6ToothIcon className="size-6" />
      </button>

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
                enterFrom="opacity-0 -right-full"
                enterTo="opacity-100 right-0"
                leave="ease-in duration-200 "
                leaveFrom="opacity-100 right-0 "
                leaveTo="opacity-0 -right-full"
              >
                <Dialog.Panel className="fixed inset-y-0 right-0 overflow-hidden md:rounded-l-3xl bg-white dark:bg-[#15202b] dark:text-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-row w-full justify-between items-center ">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      Settings
                    </Dialog.Title>
                    <button onClick={() => setIsOpen(false)}>
                      <XMarkIcon className="size-6" />
                    </button>
                  </div>
                  <div className="mt-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-3 ">
                        <label> Home team name</label>
                        <input
                          type="text"
                          placeholder="Home"
                          name="homeTeamName"
                          onChange={changeName}
                          value={gameData.game.homeTeamName}
                          className="rounded-md text-gray-400 focus:text-gray-800 dark:bg-slate-800 dark:focus:text-white "
                        />
                      </div>
                      <div className="flex flex-col gap-3 ">
                        <label> Away team name</label>
                        <input
                          type="text"
                          placeholder="Away"
                          name="awayTeamName"
                          onChange={changeName}
                          value={gameData.game.awayTeamName}
                          className="rounded-md text-gray-400 focus:text-gray-800 dark:bg-slate-800 dark:focus:text-white "
                        />
                      </div>
                      <div className=" mt-10">
                        <DarkModeToggle />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Settings;
