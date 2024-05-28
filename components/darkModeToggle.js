"use client";
import React, { useState, Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

const darkMode = [
  { id: 1, name: "Light", icon: <SunIcon className="size-5" /> },
  { id: 2, name: "Dark", icon: <MoonIcon className="size-5" /> },
];

const DarkModeToggle = () => {
  const [selected, setSelected] = useState(darkMode[1]);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setSelected(darkMode[1]);
      document.documentElement.classList.add("dark");
    } else {
      setSelected(darkMode[0]);
      document.documentElement.classList.remove("dark");
    }
  }, [selected]);

  const handleThemeChange = (mode) => {
    setSelected(mode);
    if (mode.name === "Dark") {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <Listbox value={selected} onChange={handleThemeChange}>
      <div className=" relative w-full">
        <Listbox.Button className=" w-full rounded-lg bg-gray-100 dark:bg-white/5 py-3 pr-8 pl-3 text-left text-sm dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-opacity-75">
          <span className=" inline-flex items-center gap-3">
            {selected.icon} {selected.name}
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
          <Listbox.Options className="absolute mt-1 w-full rounded-md dark:bg-white/5 bg-gray-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {darkMode.map((person, key) => (
              <Listbox.Option
                key={person.id}
                onClick={() => setSelected(darkMode[key])}
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
                      className={`inline-flex items-center gap-3 truncate  ${
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
