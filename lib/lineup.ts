import { LineupSlot, Player } from "@/store/types";

export const getUnselectedPlayers = (
  players: Player[],
  lineup: LineupSlot[],
) => {
  const selectedIds = lineup
    .filter((slot) => slot.playerId !== null)
    .map((slot) => slot.playerId);

  return players
    .filter((player) => !selectedIds.includes(player.id))
    .sort((a, b) => (a.number ?? 0) - (b.number ?? 0));
};
