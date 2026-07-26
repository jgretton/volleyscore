import { MIN_PLAYERS } from "@/components/game/setup/useSquadSetup";
import { Player, SquadError, Team } from "@/store/types";

export const validateSquad = (squad: { homeTeam: Team; awayTeam: Team }) => {
  const returnValue: { homeErrors: SquadError[]; awayErrors: SquadError[] } = {
    homeErrors: [],
    awayErrors: [],
  };
  let validHomePlayerCount = 0;
  let validAwayPlayerCount = 0;
  squad.homeTeam.players.forEach((player) => {
    const validateReturn = validatePlayer(player, "player");
    if (validateReturn === null) return;
    if (validateReturn.length === 0) validHomePlayerCount++;
    else return returnValue.homeErrors.push(...validateReturn);
  });
  squad.homeTeam.liberos.forEach((libero) => {
    const validateReturn = validatePlayer(libero, "libero");
    if (validateReturn === null) return;
    else return returnValue.homeErrors.push(...validateReturn);
  });

  squad.awayTeam.players.forEach((player) => {
    const validateReturn = validatePlayer(player, "player");
    if (validateReturn === null) return;
    if (validateReturn.length === 0) validAwayPlayerCount++;
    else return returnValue.awayErrors.push(...validateReturn);
  });
  squad.awayTeam.liberos.forEach((libero) => {
    const validateReturn = validatePlayer(libero, "libero");
    if (validateReturn === null) return;
    else return returnValue.awayErrors.push(...validateReturn);
  });

  if (validHomePlayerCount < MIN_PLAYERS)
    returnValue.homeErrors.push({
      type: "error",
      section: "player",
      message: "Home team requires 6 players",
    });
  if (validAwayPlayerCount < MIN_PLAYERS)
    returnValue.awayErrors.push({
      type: "error",
      section: "player",
      message: "Away team requires 6 players",
    });

  return returnValue;
};

const validatePlayer = (player: Player, section?: "player" | "libero") => {
  const returnArray: SquadError[] = [];
  if (isInputEmpty(player.name) && player.number === 0) return null;
  if (isInputEmpty(player.name))
    returnArray.push({
      type: "error",
      section: section,
      message: "Name field required",
      id: player.id,
      field: "name",
    });

  if (!isValidNumber(player.number))
    returnArray.push({
      type: "error",
      section: section,
      message: "Player number needs to be between 1-99",
      id: player.id,
      field: "number",
    });

  return returnArray;
};

const isValidNumber = (number) => {
  if (number >= 1 && number <= 99) {
    return true;
  } else return false;
};

const isInputEmpty = (value) => {
  if (value.trim() === "") return true;
  else return false;
};
