import { Team } from "@/store/types";

export const validateSquad = (squad: { homeTeam: Team; awayTeam: Team }) => {
  /*
  Hard Errors:
    - minimum 6 players on each team
    - every player needs a name
    - every player needs a number between 1-99
  */
  const cleanPlayers = (players: Player[]) =>
    players.filter((p) => p.name.trim() !== "" || p.number > 0);
};

/*

[{
type: 'warning',
message: 'You have 2 players with the same number',
id:[ '123', '321']
},
{
type: 'error',
message: 'This player has an invalid number. Needs to be between 1 and 99',
id:[ '123']
}]


*/
