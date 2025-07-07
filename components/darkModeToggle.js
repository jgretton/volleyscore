"use client";
import React, { useState, Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

const darkMode = [
  { id: 1, name: "light", icon: <SunIcon className="size-5" /> },
  { id: 2, name: "dark", icon: <MoonIcon className="size-5" /> },
];

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const checkWhichTheme = () => {
    return darkMode.find((mode) => mode.name === theme) || darkMode[0];
  };
  const [selected, setSelected] = useState(checkWhichTheme());

  useEffect(() => {
    setSelected(checkWhichTheme());
  }, [theme]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className=" relative w-full">
        <Listbox.Button className=" w-full rounded-lg bg-gray-100 dark:bg-white/5 py-3 pr-8 pl-3 text-left text-sm dark:text-white focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-opacity-75">
          <span className=" inline-flex items-center gap-3 capitalize">
            {selected.icon} {selected.name}
            {/* {theme} */}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5 " aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 w-full rounded-md dark:bg-white/5 bg-gray-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden sm:text-sm">
            {darkMode.map((person, key) => (
              <Listbox.Option
                key={person.id}
                onClick={() => {
                  setTheme(person.name);
                  setSelected(darkMode[key]);
                }}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 flex flex-col px-3 hover:bg-gray-200 dark:hover:bg-slate-900 ${
                    active
                      ? "dark:bg-slate-800 bg-gray-100 "
                      : "dark:text-white bg-gray-100 dark:bg-slate-800"
                  }`
                }
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`inline-flex items-center gap-3 truncate capitalize ${
                        selected ? "font-medium text-blue-300" : "font-normal"
                      }`}
                    >
                      {person.icon} {person.name}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default DarkModeToggle;
