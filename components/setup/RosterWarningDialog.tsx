import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { teamHasWarnings } from "@/lib/roster-validation";
import { TeamResult } from "@/store/types";
import RosterWarningList from "./RosterWarningList";

type RosterWarningDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  homeName: string;
  awayName: string;
  home: TeamResult;
  away: TeamResult;
  onConfirm: () => void;
};

export default function RosterWarningDialog({
  open,
  onOpenChange,
  homeName,
  awayName,
  home,
  away,
  onConfirm,
}: RosterWarningDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Just checking the numbers</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              <p>
                We noticed some players share a shirt number. You can carry on,
                we just wanted to check it was intentional first.
              </p>
              <div className="mt-4 space-y-4">
                {teamHasWarnings(home) && (
                  <div>
                    <p className="text-xs font-semibold tracking-wide uppercase">
                      {homeName}
                    </p>
                    <RosterWarningList
                      warnings={home.warnings}
                      liberoClashes={home.liberoClashes}
                      shortNames={home.shortNames}
                    />
                  </div>
                )}
                {teamHasWarnings(away) && (
                  <div>
                    <p className="text-xs font-semibold tracking-wide uppercase">
                      {awayName}
                    </p>
                    <RosterWarningList
                      warnings={away.warnings}
                      liberoClashes={away.liberoClashes}
                      shortNames={away.shortNames}
                    />
                  </div>
                )}
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Go back</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Continue anyway
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
