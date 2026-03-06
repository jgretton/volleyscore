import { SquadError, Team } from "@/store/types";

export const validateSquad = (squad: { homeTeam: Team; awayTeam: Team }) => {
  /*
  Hard Errors:
    - minimum 6 players on each team
    - every player needs a name
    - every player needs a number between 1-99
  */
  console.log(squad);
  const returnValue: SquadError[] = [];
  const isValidNumber = (number) => {
    if (number >= 1 && number <= 99) {
      return true;
    } else return false;
  };

  const isInputEmpty = (value) => {
    if (value.trim() === "") return true;
    else return false;
  };

  squad.homeTeam.players.forEach((player) => {
    if (!isValidNumber(player.number)) {
      returnValue.push({
        type: "error",
        message: "Invalid number",
        id: player.id,
        field: "number",
      });
    }
    if (isInputEmpty(player.name)) {
      returnValue.push({
        type: "error",
        message: "Empty input",
        id: player.id,
        field: "name",
      });
    }
  });
  squad.awayTeam.players.forEach((player) => {
    if (!isValidNumber(player.number)) {
      returnValue.push({
        type: "error",
        message: "Invalid number",
        id: player.id,
        field: "number",
      });
    }
    if (isInputEmpty(player.name)) {
      returnValue.push({
        type: "error",
        message: "Empty input",
        id: player.id,
        field: "name",
      });
    }
  });

  return returnValue;

  //   const cleanPlayers = (players: Player[]) =>
  //     players.filter((p) => p.name.trim() !== "" || p.number > 0);
  //   console.log(squad);
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
