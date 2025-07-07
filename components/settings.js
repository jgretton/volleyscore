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
        className="inline-flex items-center gap-3 rounded-lg bg-gray-100 px-4 py-2 transition-all hover:bg-gray-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-50 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-900"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Cog6ToothIcon className="size-6" />
      </button>

      <Transition
        appear
        show={isOpen}
        as={Fragment}
        onClose={() => {
          setIsOpen(!false);
        }}
      >
        <Dialog as="div" className="relative z-10">
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
            <div className="flex min-h-full max-w-md items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 -right-full"
                enterTo="opacity-100 right-0"
                leave="ease-in duration-200 "
                leaveFrom="opacity-100 right-0 "
                leaveTo="opacity-0 -right-full"
              >
                <Dialog.Panel className="fixed inset-y-0 right-0 w-full max-w-sm overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-[#15202b] dark:text-white md:rounded-l-3xl">
                  <div className="flex w-full flex-row items-center justify-between">
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
                      <div className="flex flex-col gap-3">
                        <label> Home team name</label>
                        <input
                          type="text"
                          placeholder="Home"
                          name="homeTeamName"
                          onChange={changeName}
                          value={gameData.game.homeTeamName}
                          className="rounded-md text-gray-400 focus:text-gray-800 dark:bg-slate-800 dark:focus:text-white"
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <label> Away team name</label>
                        <input
                          type="text"
                          placeholder="Away"
                          name="awayTeamName"
                          onChange={changeName}
                          value={gameData.game.awayTeamName}
                          className="rounded-md text-gray-400 focus:text-gray-800 dark:bg-slate-800 dark:focus:text-white"
                        />
                      </div>
                      <div className="mt-10">
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
