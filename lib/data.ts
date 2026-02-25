import { Match, MatchSetup, SetData, SquadData } from "@/store/types";

export const initialSetData: SetData = {
  setStartTime: new Date().toISOString(),
  score: {
    homeTeam: 0,
    awayTeam: 0,
  },
  timeouts: {
    awayTeam: 0,
    homeTeam: 0,
  },
  actions: [],
  winner: null,
};

export const initialGame: Match = {
  homeTeamName: "Home",
  awayTeamName: "Away",
  firstServingTeam: null,
  servingTeam: null,
  homeTeamSetsWon: 0,
  awayTeamSetsWon: 0,
  pointsPerSet: 25,
  timedGame: false,
  gameComplete: false,
  sets: {
    1: { ...initialSetData },
  },
};

export const initialMatchSetup: MatchSetup = {
  teamNames: {
    homeTeamName: "",
    awayTeamName: "",
  },
  homeTeamSquad: {
    liberos: [],
    players: [],
  },
  awayTeamSquad: {
    liberos: [],
    players: [],
  },
};

export const initalSquadData: SquadData = {
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
};
