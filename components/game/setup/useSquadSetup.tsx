import { testSquad } from "@/lib/data";
import { useGameStore } from "@/store";
import { Player, Team } from "@/store/types";
import { validateSquad } from "@/utils/squadErrorHandling";
import { useState } from "react";
export const MAX_PLAYERS = 12;
export const MAX_LIBEROS = 2;
export const MIN_PLAYERS = 6;

export const useSquadSetup = () => {
  const { setMatchSetupSquad, matchSetup } = useGameStore();
  //   const [squad, setSquad] = useState<{ homeTeam: Team; awayTeam: Team }>(
  //     matchSetup?.homeTeamSquad.players.length >= 6
  //       ? {
  //           homeTeam: matchSetup.homeTeamSquad,
  //           awayTeam: matchSetup.awayTeamSquad,
  //         }
  //       : initalSquadData,
  //   );

  const [squad, setSquad] = useState<{ homeTeam: Team; awayTeam: Team }>(
    matchSetup?.homeTeamSquad.players.length >= 6
      ? {
          homeTeam: matchSetup.homeTeamSquad,
          awayTeam: matchSetup.awayTeamSquad,
        }
      : testSquad,
  );

  const addPlayer = (
    teamKey: "homeTeam" | "awayTeam",
    type: "players" | "liberos",
  ) => {
    setSquad((prev) => ({
      ...prev,
      [teamKey]: {
        ...prev[teamKey],
        [type]: [
          ...prev[teamKey][type],
          { id: crypto.randomUUID(), number: 0, name: "" },
        ],
      },
    }));
  };

  const removePlayer = (
    teamKey: "homeTeam" | "awayTeam",
    type: "players" | "liberos",
    playerId: string,
  ) => {
    setSquad((prev) => ({
      ...prev,
      [teamKey]: {
        ...prev[teamKey],
        [type]: prev[teamKey][type].filter((p) => p.id !== playerId),
      },
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    teamKey: "homeTeam" | "awayTeam",
    type: "players" | "liberos",
    playerId: string,
  ) => {
    const { name, value } = e.target;
    setSquad((prevState) => ({
      ...prevState,
      [teamKey]: {
        ...prevState[teamKey],
        [type]: prevState[teamKey][type].map((player) =>
          player.id === playerId
            ? { ...player, [name]: name === "number" ? Number(value) : value }
            : player,
        ),
      },
    }));
  };

  const confirmSquad = (onConfirm: () => void) => {
    const cleanPlayers = (players: Player[]) =>
      players.filter((p) => p.name.trim() !== "" || p.number > 0);

    const cleanedHome = cleanPlayers(squad.homeTeam.players);
    const cleanedAway = cleanPlayers(squad.awayTeam.players);

    const cleanedHomeLiberos = cleanPlayers(squad.homeTeam.liberos);
    const cleanedAwayLiberos = cleanPlayers(squad.awayTeam.liberos);

    const cleanedSquad = {
      homeTeam: { players: cleanedHome, liberos: cleanedHomeLiberos },
      awayTeam: { players: cleanedAway, liberos: cleanedAwayLiberos },
    };

    // validateSquad(cleanedSquad);
    validateSquad(squad);

    setMatchSetupSquad(
      { ...squad.homeTeam, players: cleanedHome, liberos: cleanedHomeLiberos },
      { ...squad.awayTeam, players: cleanedAway, liberos: cleanedAwayLiberos },
    );
    // onConfirm();
  };
  return { squad, addPlayer, removePlayer, handleChange, confirmSquad };
};
