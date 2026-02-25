"use client";
import ConfirmedSquad from "@/components/game/setup/ConfirmedSquad";
import SquadInput from "@/components/game/setup/SquadInput";
import TeamNamesInput from "@/components/game/setup/TeamNamesInput";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/store";
import { CheckCircleIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const { matchSetup } = useGameStore();
  const [step, setStep] = useState<"teamNames" | "squad" | "confirm">(() => {
    if (matchSetup?.homeTeamSquad.players.length >= 6) return "confirm";
    else if (
      matchSetup?.teamNames.awayTeamName.trim() !== "" &&
      matchSetup?.teamNames.homeTeamName.trim() !== ""
    )
      return "squad";
    else return "teamNames";
  });

  const router = useRouter();
  return (
    <main className="relative flex min-h-screen flex-col items-center gap-10 p-4 text-slate-900 sm:p-8 md:p-16 dark:text-white">
      <Button variant="ghost" onClick={() => router.back()}>
        <ChevronLeftIcon /> Back
      </Button>
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
              <span>{matchSetup?.teamNames.homeTeamName}</span>
              <span>·</span>
              <span>{matchSetup?.teamNames.awayTeamName}</span>
            </div>
          </div>
        )}
        {step === "squad" ? (
          <div className="mt-4 w-full rounded-lg border p-8">
            <h2 className="text-base font-semibold">Squad</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Once you have confirmed the team names you will be able to input
              squad details for both teams.
            </p>
            <SquadInput
              homeTeamName={matchSetup?.teamNames.homeTeamName ?? ""}
              awayTeamName={matchSetup?.teamNames.awayTeamName ?? ""}
              onConfirm={() => setStep("confirm")}
            />
          </div>
        ) : step === "confirm" ? (
          <ConfirmedSquad
            matchSetup={matchSetup}
            setStep={() => setStep("squad")}
          />
        ) : (
          <div className="mt-4 w-full rounded-lg border p-8">
            <h2 className="text-base font-semibold">Squad</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Once you have confirmed the team names you will be able to input
              squad details for both teams.
            </p>
          </div>
        )}
        <div className="mt-6 flex w-full items-center justify-between">
          {step === "confirm" ? (
            <p className="text-muted-foreground text-sm">
              You&apos;ll be prompted to enter lineups before the first set.
            </p>
          ) : (
            <span />
          )}
          <div className="flex flex-col items-end gap-1">
            <Button size="lg" disabled={step !== "confirm"} variant="default">
              Start Match
            </Button>
            {step !== "confirm" && (
              <p className="text-muted-foreground mt-1 text-xs">
                Complete the steps above to start the match.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
