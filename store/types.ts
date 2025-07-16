export type TeamOptions = "awayTeam" | "homeTeam" | null;

export interface Match {
  homeTeamName: string;
  awayTeamName: string;
  firstServingTeam: string;
  homeTeamSetsWon: number;
  awayTeamSetsWon: number;
  pointsPerSet: number;
  timedGame: boolean;
  gameComplete: boolean;
  sets: Sets;
}
export interface Sets {
  [setNumber: number]: {
    setStartTime?: string;
    score: Score;
    timeouts: Timeouts;
    actions: GameAction[];
    winner: TeamOptions;
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
  type: "score" | "timeout";
  team: string;
  overallScore: Score;
  timestamp: string;
}
export interface TeamNames {
  homeTeamName: string;
  awayTeamName: string;
}

interface ModalState {
  isOpen: boolean;
  modalType: "SET_COMPLETE" | "MATCH_COMPLETE" | null;
  modalData?: any;
}

export interface MatchStore {
  match: Match;
  teamSwappedSides: boolean;
  currentSet: number;
  modal: ModalState;

  swapSides: () => void;
  updateTeamName: (teamNames: TeamNames) => void;

  startNewGame: (teamNames?: TeamNames) => void;

  increaseTeamScore: (
    teamKey: "awayTeam" | "homeTeam",
    currentSet: number,
  ) => void;
  undoAction: (action: GameAction) => void;
  undoSetPoint: () => void;
  handleSetCompletion: (setResult: TeamOptions) => void;

  handleTeamTimeout: (team: TeamOptions) => void;

  resetMatchData: () => void;

  openModal: (type: ModalState["modalType"], data?: any) => void;
  closeModal: () => void;
}
