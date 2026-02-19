"use client";

import TeamNamesInput from "@/components/game/setup/TeamNamesInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Page = () => {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-4 text-slate-900 sm:p-8 md:p-16 dark:text-white">
      <h1 className="text-xl font-light">Match Setup</h1>
      <div className="w-full max-w-3xl p-4">
        <TeamNamesInput />
        <div className="w-full max-w-3xl">
          <h2>Squad </h2>
          <div className="mt-5 grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <div className="flex w-full grid-cols-1 flex-row gap-2 md:grid-cols-2">
                <label
                  className="grid w-auto place-items-center gap-1"
                  // htmlFor={`playerNumer - ${index}`}
                >
                  <span className="text-sm font-medium"> #</span>
                  <Input
                    type="number"
                    className="w-full max-w-12 [appearance:textfield] disabled:cursor-not-allowed disabled:opacity-45 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    // name={`playerNumber-${index}`}
                    // id={`playerNumber-${index}`}
                    // defaultValue={defaultValue?.number}
                  />
                </label>
                <label
                  className="grid w-full gap-1"
                  // htmlFor={`playerName-${index}`}
                >
                  <span className="text-sm font-medium">Player Name</span>
                  <Input
                    type="text"
                    className="w-full disabled:cursor-not-allowed disabled:opacity-45"
                    // name={`playerName-${index}`}
                    // id={`playerName-${index}`}
                    // defaultValue={defaultValue?.name}
                  />
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex w-full grid-cols-1 flex-row gap-2 md:grid-cols-2">
                <label
                  className="grid w-auto place-items-center gap-1"
                  // htmlFor={`playerNumer - ${index}`}
                >
                  <span className="text-sm font-medium"> #</span>
                  <Input
                    type="number"
                    className="w-full max-w-12 [appearance:textfield] disabled:cursor-not-allowed disabled:opacity-45 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    // name={`playerNumber-${index}`}
                    // id={`playerNumber-${index}`}
                    // defaultValue={defaultValue?.number}
                  />
                </label>
                <label
                  className="grid w-full gap-1"
                  // htmlFor={`playerName-${index}`}
                >
                  <span className="text-sm font-medium">Player Name</span>
                  <Input
                    type="text"
                    className="w-full disabled:cursor-not-allowed disabled:opacity-45"
                    // name={`playerName-${index}`}
                    // id={`playerName-${index}`}
                    // defaultValue={defaultValue?.name}
                  />
                </label>
              </div>
            </div>
            <Button className="col-start-2">Confirm</Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
