export type TeamOptions = "awayTeam" | "homeTeam" | null;

export interface DarkModeOption {
  id: number;
  name: string;
  icon: React.ReactNode;
}

export interface Match {
  homeTeamName: string;
  awayTeamName: string;
  firstServingTeam: "homeTeam" | "awayTeam" | null;
  servingTeam: "homeTeam" | "awayTeam" | null;
  homeTeamSetsWon: number;
  awayTeamSetsWon: number;
  pointsPerSet: number;
  timedGame: boolean;
  gameComplete: boolean;
  sets: Sets;
}
export interface SetData {
  setStartTime?: string;
  score: Score;
  timeouts: Timeouts;
  actions: GameAction[];
  winner: TeamOptions;
}
export interface Sets {
  [setNumber: number]: SetData;
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
  team: "homeTeam" | "awayTeam" | null;
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

export interface ModalData {
  currentSet: number;
  updatedMatch: Match;
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
  handleGameComplete: (setResult: TeamOptions) => void;

  handleTeamTimeout: (team: TeamOptions) => void;

  resetMatchData: () => void;

  openModal: (type: ModalState["modalType"], data?: any) => void;
  closeModal: () => void;
}
