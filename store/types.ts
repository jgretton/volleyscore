export interface Match {
  homeTeamName: string;
  awayTeamName: string;
  firstServingTeam: string;
  homeTeamSetsWon: number;
  awayTeamSetsWon: number;
  pointsPerSet: number;
  timedGame: boolean;
  sets: Sets;
}
export interface Sets {
  [setNumber: number]: {
    setStartTime: string;
    score: Score;
    timeouts: Timeouts;
    actions: GameAction[];
  };
}
export interface Score {
  homeTeam: number;
  awayTeam: number;
}
export interface Timeouts {
  homeTeam: number;
  awayTeam: number;
}
export interface GameAction {
  id: string;
  type: "score" | "timeout";
  overallScore: Score;
  timestamp: string;
}
export interface TeamNames {
  homeTeamName: string;
  awayTeamName: string;
}

export interface MatchStore {
  match: Match;
  teamSwappedSides: boolean;
  swapSides: () => void;
  updateTeamName: (teamNames: TeamNames) => void;

  resetMatchData: () => void;
}
