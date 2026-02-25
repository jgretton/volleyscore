import { Button } from "@/components/ui/button";
import { MatchSetup } from "@/store/types";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
interface ConfirmedSquadProps {
  matchSetup: MatchSetup;
  setStep: () => void;
}
const ConfirmedSquad = ({ matchSetup, setStep }: ConfirmedSquadProps) => {
  return (
    <div className="mt-4 w-full rounded-lg border border-green-500 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircleIcon className="size-4 shrink-0 text-green-500" />
          <h2 className="text-base font-semibold">Squad</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={setStep}>
          Edit
        </Button>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-8 pl-6 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium">
            {matchSetup.teamNames.homeTeamName}
          </p>
          <ul className="mt-3 space-y-2">
            {matchSetup.homeTeamSquad.players.map((player) => (
              <li key={player.id} className="flex items-center gap-4">
                <span className="text-muted-foreground w-6 shrink-0 text-right text-xs tabular-nums">
                  {player.number}
                </span>
                <span className="text-sm">{player.name}</span>
              </li>
            ))}
          </ul>
          {matchSetup.homeTeamSquad.liberos.length > 0 && (
            <div className="mt-5">
              <p className="text-muted-foreground text-xs">Libero</p>
              <ul className="mt-2 space-y-2">
                {matchSetup.homeTeamSquad.liberos.map((player) => (
                  <li key={player.id} className="flex items-center gap-4">
                    <span className="text-muted-foreground w-6 shrink-0 text-right text-xs tabular-nums">
                      {player.number}
                    </span>
                    <span className="text-sm">{player.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-medium">
            {matchSetup.teamNames.awayTeamName}
          </p>
          <ul className="mt-3 space-y-2">
            {matchSetup.awayTeamSquad.players.map((player) => (
              <li key={player.id} className="flex items-center gap-4">
                <span className="text-muted-foreground w-6 shrink-0 text-right text-xs tabular-nums">
                  {player.number}
                </span>
                <span className="text-sm">{player.name}</span>
              </li>
            ))}
          </ul>
          {matchSetup.awayTeamSquad.liberos.length > 0 && (
            <div className="mt-5">
              <p className="text-muted-foreground text-xs">Libero</p>
              <ul className="mt-2 space-y-2">
                {matchSetup.awayTeamSquad.liberos.map((player) => (
                  <li key={player.id} className="flex items-center gap-4">
                    <span className="text-muted-foreground w-6 shrink-0 text-right text-xs tabular-nums">
                      {player.number}
                    </span>
                    <span className="text-sm">{player.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmedSquad;
