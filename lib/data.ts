import { LineupSlot, Match, MatchSetup, SetData, Team } from "@/store/types";
import { MIN_PLAYERS } from "./constants";

export const makeLineup = (): LineupSlot[] => [
  { position: 1, playerId: null },
  { position: 2, playerId: null },
  { position: 3, playerId: null },
  { position: 4, playerId: null },
  { position: 5, playerId: null },
  { position: 6, playerId: null },
];

// No setStartTime. startSet stamps it, and its absence is how the match page
// knows an advanced set still needs its lineup and server.
export const createInitialSetData = (): SetData => ({
  home: { score: 0, timeouts: 0 },
  away: { score: 0, timeouts: 0 },
  actions: [],
  winner: null,
  lineup: { home: makeLineup(), away: makeLineup() },
  firstServer: null,
});

export const createInitialGame = (): Match => ({
  mode: "basic",
  home: { name: "Home", players: [], liberos: [], setsWon: 0 },
  away: { name: "Away", players: [], liberos: [], setsWon: 0 },
  servingTeam: null,
  gameComplete: false,
  sets: {
    1: createInitialSetData(),
  },
});
export const makePlayer = () => ({
  id: crypto.randomUUID(),
  number: null,
  name: "",
});

export const makeTeam = (): Team => ({
  name: "",
  players: Array.from({ length: MIN_PLAYERS }, makePlayer),
  liberos: [],
});

export const createInitialMatchSetup = (): MatchSetup => ({
  home: makeTeam(),
  away: makeTeam(),
  currentStep: 1,
});
