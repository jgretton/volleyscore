"use client";
import { TOTAL_STEPS } from "@/lib/constants";
import { useGameStore } from "@/store";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HydrationZustand from "../HydrationZustand";
import StepProgress from "./StepProgress";
import PlayerDetailsStep from "./steps/PlayerDetailsStep";
import StartingLineupStep from "./steps/StartingLineupStep";
import TeamNameStep from "./steps/TeamNameStep";

export default function SetupWizard() {
  const currentStep = useGameStore((state) => state.matchSetup.currentStep);
  const setCurrentStep = useGameStore((state) => state.setCurrentStep);
  const startMatch = useGameStore((state) => state.startMatch);
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);

  // /match is only fetched when it is pushed, so warm it while the lineup is
  // being filled in
  useEffect(() => {
    if (currentStep === TOTAL_STEPS) router.prefetch("/match");
  }, [currentStep, router]);

  const nextStep = () => {
    if (currentStep >= TOTAL_STEPS) return;
    setCurrentStep(currentStep + 1);
  };

  // startMatch clears matchSetup, which would drop the wizard back to step 1
  // while the navigation is still in flight, so stop rendering steps first
  const completeSetup = () => {
    setIsStarting(true);
    startMatch();
    router.push("/match");
  };

  const previousStep = () => {
    if (currentStep <= 1) return;

    setCurrentStep(currentStep - 1);
  };

  if (isStarting) {
    return (
      <div className="flex size-full flex-1 items-center justify-center gap-2">
        Starting match <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <HydrationZustand>
      <div className="flex w-full flex-1 flex-col">
        <StepProgress step={currentStep} previousStep={previousStep} />
        <div className="mt-5 flex w-full flex-1 flex-col">
          {currentStep === 1 && <TeamNameStep nextStep={nextStep} />}
          {currentStep === 2 && <PlayerDetailsStep nextStep={nextStep} />}
          {currentStep === 3 && (
            <StartingLineupStep completeSetup={completeSetup} />
          )}
        </div>
      </div>
    </HydrationZustand>
  );
}
