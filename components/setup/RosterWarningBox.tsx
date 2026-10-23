import { TeamResult } from "@/store/types";
import RosterWarningList from "./RosterWarningList";

export default function RosterWarningBox({
  validation,
}: {
  validation: TeamResult;
}) {
  return (
    <div
      role="status"
      className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900"
    >
      <p className="font-medium">Heads up, you can still continue</p>
      <p className="text-amber-800">
        Some players share a shirt number. That is allowed. Just check it is
        intentional.
      </p>
      <RosterWarningList
        warnings={validation.warnings}
        liberoClashes={validation.liberoClashes}
        shortNames={validation.shortNames}
      />
    </div>
  );
}
