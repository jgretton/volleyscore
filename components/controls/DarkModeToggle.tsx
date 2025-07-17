"use client";
import React, { useState, Fragment, useEffect } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { DarkModeOption } from "@/store/types";

const darkMode: DarkModeOption[] = [
  { id: 1, name: "light", icon: <SunIcon className="size-5" /> },
  { id: 2, name: "dark", icon: <MoonIcon className="size-5" /> },
  { id: 3, name: "system", icon: <ComputerDesktopIcon className="size-5" /> },
];

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const checkWhichTheme = (): DarkModeOption => {
    return darkMode.find((mode) => mode.name === theme) || darkMode[0];
  };
  const [selected, setSelected] = useState<DarkModeOption>(checkWhichTheme());

  useEffect(() => {
    setSelected(checkWhichTheme());
  }, [theme]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative w-full">
        <ListboxButton className="focus-visible:ring-opacity-75 w-full rounded-lg bg-gray-100 py-3 pr-8 pl-3 text-left text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 dark:bg-white/5 dark:text-white">
          <span className="inline-flex items-center gap-3 capitalize">
            {selected.icon} {selected.name}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        </ListboxButton>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions className="ring-opacity-5 absolute mt-1 w-full rounded-md bg-gray-100 py-1 text-base shadow-lg ring-1 ring-black focus:outline-hidden sm:text-sm dark:bg-white/5">
            {darkMode.map((mode) => (
              <ListboxOption
                key={mode.id}
                onClick={() => {
                  setTheme(mode.name);
                }}
                className={({ active }) =>
                  `relative flex cursor-pointer flex-col px-3 py-2 select-none hover:bg-gray-200 dark:hover:bg-slate-900 ${
                    active
                      ? "bg-gray-100 dark:bg-slate-800"
                      : "bg-gray-100 dark:bg-slate-800 dark:text-white"
                  }`
                }
                value={mode}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`inline-flex items-center gap-3 truncate capitalize ${
                        selected ? "font-medium text-blue-300" : "font-normal"
                      }`}
                    >
                      {mode.icon} {mode.name}
                    </span>
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
};

export default DarkModeToggle;
