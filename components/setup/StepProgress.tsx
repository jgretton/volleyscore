import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";

import { TOTAL_STEPS } from "@/lib/constants";

export default function StepProgress({
  step,
  previousStep,
}: {
  step: number;
  previousStep: () => void;
}) {
  return (
    <div className="flex flex-row items-center">
      {step > 1 && (
        <Button
          className="h-full bg-transparent py-2"
          type="button"
          variant="outline"
          onClick={previousStep}
        >
          <ChevronLeft /> back
        </Button>
      )}

      <div className="ml-auto inline-flex items-center gap-2 rounded-lg bg-gray-200 px-3 py-2 text-sm dark:bg-slate-800 dark:text-white">
        <p>Step</p>
        <p>
          {step}/{TOTAL_STEPS}
        </p>
      </div>
    </div>
  );
}
