"use client";
import ConfirmedSquad from "@/components/game/setup/ConfirmedSquad";
import SquadInput from "@/components/game/setup/SquadInput";
import TeamNamesInput from "@/components/game/setup/TeamNamesInput";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/store";
import { CheckCircleIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { matchSetup, startNewOfficialGame, initialiseMatchSetup } =
    useGameStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [step, setStep] = useState<"teamNames" | "squad" | "confirm">(() => {
    if (matchSetup?.homeTeamSquad.players.length >= 6) return "confirm";
    else if (
      matchSetup?.teamNames.awayTeamName.trim() !== "" &&
      matchSetup?.teamNames.homeTeamName.trim() !== ""
    )
      return "squad";
    else return "teamNames";
  });
  const [squadConfirmed, setSquadConfirmed] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const startNewMatch = () => {
    setError(null);
    const officialGameResponse = startNewOfficialGame();

    if (!officialGameResponse.success) {
      setError(officialGameResponse.message);
      return;
    }
    setStep("teamNames");
    router.push("/match");
    initialiseMatchSetup();
  };

  if (!isClient) {
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
    <main className="relative flex min-h-screen flex-col items-center gap-10 p-4 text-slate-900 sm:p-8 md:p-16 dark:text-white">
      <Button variant="ghost" asChild>
        <Link href={"/"}>
          <ChevronLeftIcon /> Back
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">Match Setup</h1>

      <div className="w-full max-w-6xl p-4">
        {step === "teamNames" ? (
          <div className="w-full rounded-lg border p-8">
            <h2 className="text-base font-semibold">Team Names</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Please enter the names for both teams
            </p>
            <TeamNamesInput
              onConfirm={() => {
                if (squadConfirmed === false) setStep("squad");
                else setStep("confirm");
              }}
            />
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
              onConfirm={() => {
                setStep("confirm");
                setSquadConfirmed(true);
              }}
            />
          </div>
        ) : step === "confirm" ? (
          <ConfirmedSquad
            matchSetup={matchSetup}
            setStep={() => {
              setStep("squad");
              setSquadConfirmed(false);
            }}
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
            <Button
              size="lg"
              disabled={step !== "confirm"}
              variant="default"
              onClick={startNewMatch}
            >
              Start Match
            </Button>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
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
