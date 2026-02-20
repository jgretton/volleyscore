"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import PlayerInput from "./PlayerInput";
import {
  MAX_LIBEROS,
  MAX_PLAYERS,
  MIN_PLAYERS,
  useSquadSetup,
} from "./useSquadSetup";

interface SquadInputProps {
  homeTeamName: string;
  awayTeamName: string;
}

const SquadInput = ({ homeTeamName, awayTeamName }: SquadInputProps) => {
  const { squad, addPlayer, handleChange, removePlayer, confirmSquad } =
    useSquadSetup();

  const renderTeamColumn = (
    teamKey: "homeTeam" | "awayTeam",
    label: string,
  ) => {
    const team = squad[teamKey];

    return (
      <div className="p-4">
        <h3 className="mb-4 text-sm font-semibold">{label}</h3>

        <div className="mb-2 flex gap-2 px-1">
          <span className="text-muted-foreground w-12 text-center text-xs font-medium">
            #
          </span>
          <span className="text-muted-foreground flex-1 text-xs font-medium">
            Player Name
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {team.players.map((player, index) => (
            <PlayerInput
              key={player.id}
              player={player}
              onChange={(e) => handleChange(e, teamKey, "players", player.id)}
              onRemove={
                index >= MIN_PLAYERS
                  ? () => removePlayer(teamKey, "players", player.id)
                  : undefined
              }
            />
          ))}
        </div>

        {team.players.length < MAX_PLAYERS && (
          <Button
            variant="secondary"
            className="mt-3 w-full"
            onClick={() => addPlayer(teamKey, "players")}
          >
            <PlusIcon className="size-4" /> Add Player
          </Button>
        )}

        <div className="border-border mt-6 border-t pt-4">
          <h4 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">
            Liberos
          </h4>

          <div className="flex flex-col gap-2">
            {team.liberos.map((player) => (
              <PlayerInput
                key={player.id}
                player={player}
                onChange={(e) => handleChange(e, teamKey, "liberos", player.id)}
                onRemove={() => removePlayer(teamKey, "liberos", player.id)}
              />
            ))}
          </div>

          {team.liberos.length < MAX_LIBEROS && (
            <Button
              variant="secondary"
              className="mt-3 w-full"
              onClick={() => addPlayer(teamKey, "liberos")}
            >
              <PlusIcon className="size-4" /> Add Libero
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-5 space-y-4">
      <div className="grid grid-cols-1 divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
        {renderTeamColumn("homeTeam", homeTeamName)}
        {renderTeamColumn("awayTeam", awayTeamName)}
      </div>
      <div className="flex justify-end">
        <Button onClick={() => confirmSquad()}>Confirm Squad</Button>
      </div>
    </div>
  );
};

export default SquadInput;
