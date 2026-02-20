import { useGameStore } from "@/store";
import { Player, Team } from "@/store/types";
import { useState } from "react";
export const MAX_PLAYERS = 12;
export const MAX_LIBEROS = 2;
export const MIN_PLAYERS = 6;

export const useSquadSetup = () => {
  const { setTeamSquad } = useGameStore();
  const [squad, setSquad] = useState<{ homeTeam: Team; awayTeam: Team }>({
    homeTeam: {
      players: Array.from({ length: 6 }, () => ({
        id: crypto.randomUUID(),
        number: 0,
        name: "",
      })),
      liberos: [],
    },
    awayTeam: {
      players: Array.from({ length: 6 }, () => ({
        id: crypto.randomUUID(),
        number: 0,
        name: "",
      })),
      liberos: [],
    },
  });

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

  const confirmSquad = () => {
    const cleanPlayers = (players: Player[]) =>
      players.filter((p) => p.name.trim() !== "" || p.number > 0);

    const cleanedHome = cleanPlayers(squad.homeTeam.players);
    const cleanedAway = cleanPlayers(squad.awayTeam.players);

    if (cleanedHome.length < MIN_PLAYERS || cleanedAway.length < MIN_PLAYERS) {
      console.log("MISSING INPUTS");
      return;
    }

    setTeamSquad(
      { ...squad.homeTeam, players: cleanedHome },
      { ...squad.awayTeam, players: cleanedAway },
    );
  };
  return { squad, addPlayer, removePlayer, handleChange, confirmSquad };
};
