import { Match, SetData } from "@/store/types";

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
  firstServingTeam: "homeTeam",
  homeTeamSetsWon: 0,
  awayTeamSetsWon: 0,
  pointsPerSet: 25,
  timedGame: false,
  gameComplete: false,
  sets: {
    1: { ...initialSetData },
  },
};
