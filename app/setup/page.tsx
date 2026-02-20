"use client";

import SquadInput from "@/components/game/setup/SquadInput";
import TeamNamesInput from "@/components/game/setup/TeamNamesInput";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/store";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Page = () => {
  const [step, setStep] = useState<"teamNames" | "squad">("teamNames");
  const { match } = useGameStore();
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-4 text-slate-900 sm:p-8 md:p-16 dark:text-white">
      <h1 className="text-2xl font-semibold">Match Setup</h1>

      <div className="w-full max-w-6xl p-4">
        {step === "teamNames" ? (
          <div className="w-full rounded-lg border p-8">
            <h2 className="text-base font-semibold">Team Names</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Please enter the names for both teams
            </p>
            <TeamNamesInput onConfirm={() => setStep("squad")} />
          </div>
        ) : (
          <div className="w-full rounded-lg border border-green-500 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="size-4 shrink-0 text-green-500" />
                <h2 className="text-base font-semibold">Team Names</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep("teamNames")}
              >
                Edit
              </Button>
            </div>
            <div className="text-muted-foreground mt-1 flex items-center gap-2 pl-6 text-sm">
              <span>{match.homeTeamName}</span>
              <span>·</span>
              <span>{match.awayTeamName}</span>
            </div>
          </div>
        )}

        <div className="mt-4 w-full rounded-lg border p-8">
          <h2 className="text-base font-semibold">Squad</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Once you have confirmed the team names you will be able to input
            squad details for both teams.
          </p>
          {step === "squad" && (
            <SquadInput
              homeTeamName={match.homeTeamName}
              awayTeamName={match.awayTeamName}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
