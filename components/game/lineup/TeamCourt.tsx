"use client";
import { COURT_POSITIONS } from "@/lib/constants";
import { useGameStore } from "@/store";
import { Side } from "@/store/types";
import { useShallow } from "zustand/shallow";
import Nameplate from "./Nameplate";
import VolleyballCourt from "./VolleyballCourt";

export default function TeamCourt({
  team,
  onPick,
}: {
  team: Side;
  onPick: (position: number) => void;
}) {
  const { players, lineup, serving, removePlayer } = useGameStore(
    useShallow((state) => ({
      players: state.match[team].players,
      lineup: state.match.sets[state.currentSet].lineup[team],
      serving: state.match.sets[state.currentSet].firstServer === team,
      removePlayer: state.removePlayerFromStartingLineup,
    })),
  );

  return (
    <VolleyballCourt>
      {COURT_POSITIONS.map((zone) => {
        const slot = lineup.find((s) => s.position === zone);
        const player = players.find((p) => p.id === slot?.playerId);

        return (
          <Nameplate
            key={zone}
            zone={zone}
            player={player}
            serving={serving && zone === 1}
            onSelect={() => onPick(zone)}
            onRemove={() => removePlayer(team, zone)}
          />
        );
      })}
    </VolleyballCourt>
  );
}
