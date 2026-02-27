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

export const testSquad = {
  homeTeam: {
    players: [
      { id: "h1", number: 1, name: "James Carter" },
      { id: "h2", number: 2, name: "Luke Bennett" },
      { id: "h3", number: 3, name: "Tom Hughes" },
      { id: "h4", number: 4, name: "Dan Marsh" },
      { id: "h5", number: 5, name: "Ryan Cole" },
      { id: "h6", number: 6, name: "Sam Fisher" },
      { id: "h7", number: 7, name: "Alex Moore" },
      { id: "h8", number: 8, name: "Chris Lane" },
      { id: "h9", number: 9, name: "Ben Turner" },
      { id: "h10", number: 10, name: "Jake Hill" },
    ],
    liberos: [
      { id: "hl1", number: 11, name: "Matt Stone" },
      { id: "hl2", number: 12, name: "Paul Reed" },
    ],
  },
  awayTeam: {
    players: [
      { id: "a1", number: 1, name: "Joe Walsh" },
      { id: "a2", number: 2, name: "Mark Ellis" },
      { id: "a3", number: 3, name: "Sean Grant" },
      { id: "a4", number: 4, name: "Kyle Webb" },
      { id: "a5", number: 5, name: "Liam Ford" },
      { id: "a6", number: 6, name: "Owen Nash" },
      { id: "a7", number: 7, name: "Finn Shaw" },
      { id: "a8", number: 8, name: "Zach King" },
      { id: "a9", number: 9, name: "Cole Hart" },
      { id: "a10", number: 10, name: "Drew Ross" },
      { id: "a11", number: 11, name: "Evan Boyd" },
      { id: "a12", number: 12, name: "Joel Park" },
    ],
    liberos: [{ id: "al1", number: 13, name: "Ian Cross" }],
  },
};
