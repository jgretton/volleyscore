"use client";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState, Fragment } from "react";
import { useGameStore } from "@/store";
import { TeamNames } from "@/store/types";
import DarkModeToggle from "./DarkModeToggle";

const Settings = () => {
  const { match, updateTeamName } = useGameStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [teamNames, setTeamNames] = useState<TeamNames>({
    homeTeamName: match.homeTeamName,
    awayTeamName: match.awayTeamName,
  });

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamNames((prevState) => {
      return {
        ...prevState,
        [e.target.name as keyof TeamNames]: e.target.value,
      };
    });
  };

  const handleTeamNameUpdate = () => {
    const validatedTeamNames: TeamNames = {
      homeTeamName: teamNames.homeTeamName.trim() || "Home",
      awayTeamName: teamNames.awayTeamName.trim() || "Away",
    };

    setTeamNames(validatedTeamNames);
    updateTeamName(validatedTeamNames);
  };
  return (
    <>
      <button
        className="focus-visible:ring-opacity-50 inline-flex cursor-pointer items-center gap-3 rounded-lg bg-gray-100 px-4 py-2 transition-all hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden dark:bg-slate-800 dark:text-white dark:hover:bg-slate-900"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Cog6ToothIcon className="size-6" aria-hidden="true" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full max-w-md items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 -right-full"
                enterTo="opacity-100 right-0"
                leave="ease-in duration-200 "
                leaveFrom="opacity-100 right-0 "
                leaveTo="opacity-0 -right-full"
              >
                <DialogPanel className="fixed inset-y-0 right-0 w-full max-w-sm overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all md:rounded-l-3xl dark:bg-[#15202b] dark:text-white">
                  <div className="flex w-full flex-row items-center justify-between">
                    <DialogTitle
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                    >
                      Settings
                    </DialogTitle>
                    <button onClick={() => setIsOpen(false)}>
                      <XMarkIcon
                        className="size-6 cursor-pointer"
                        aria-hidden="true"
                      />
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
                          value={teamNames.homeTeamName}
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
                          value={teamNames.awayTeamName}
                          className="rounded-md text-gray-400 focus:text-gray-800 dark:bg-slate-800 dark:focus:text-white"
                        />
                      </div>
                      <button
                        className="w-full cursor-pointer rounded-lg bg-blue-600 py-2 text-white disabled:cursor-not-allowed disabled:opacity-30"
                        disabled={
                          match.awayTeamName === teamNames.awayTeamName &&
                          match.homeTeamName === teamNames.homeTeamName
                        }
                        onClick={() => handleTeamNameUpdate()}
                      >
                        Update
                      </button>
                      <div className="mt-10">
                        <DarkModeToggle />
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Settings;
