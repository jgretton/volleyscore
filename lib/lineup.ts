import { Team } from "@/store/types";

export const getUnselectedPlayers = (team: Team) => {
	const selectedIds = team.lineup
		.filter((slot) => slot.playerId !== null)
		.map((slot) => slot.playerId);

	return team.players
		.filter((player) => !selectedIds.includes(player.id))
		.sort((a, b) => (a.number ?? 0) - (b.number ?? 0));
};
