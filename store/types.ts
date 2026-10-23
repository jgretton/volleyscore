export type Side = "home" | "away";
export type TeamOptions = Side | null;

export interface DarkModeOption {
  id: number;
  name: string;
  icon: React.ReactNode;
}

export interface MatchTeam {
  name: string;
  players: Player[];
  liberos: Player[];
  setsWon: number;
}
export interface Match {
  mode: "basic" | "advanced";
  home: MatchTeam;
  away: MatchTeam;
  servingTeam: TeamOptions;
  gameComplete: boolean;
  sets: Sets;
}
export interface SetTeamState {
  score: number;
  timeouts: number;
}
export interface SetData {
  setStartTime?: string;
  home: SetTeamState;
  away: SetTeamState;
  actions: GameAction[];
  winner: TeamOptions;
}
export interface Sets {
  [setNumber: number]: SetData;
}
export interface GameAction {
  type: "score" | "timeout";
  team: TeamOptions;
  overallScore: { home: number; away: number };
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

export interface MatchSetup {
  home: Team;
  away: Team;
  currentStep: number;
}

export interface MatchStore {
  match: Match;
  matchSetup: MatchSetup;
  teamSwappedSides: boolean;
  currentSet: number;
  modal: ModalState;

  // Setup actions (ported from volleyrotation)
  setCurrentStep: (step: number) => void;
  setTeamName: (team: "home" | "away", teamName: string) => void;
  setTeamNames: (home: string, away: string) => void;
  removeAdditionalPlayer: (team: "home" | "away", playerID: string) => void;
  addAdditionalPlayer: (team: "home" | "away") => void;
  removeEmptyPlayers: (team: "home" | "away") => void;
  updatePlayer: (
    team: "home" | "away",
    playerID: string,
    changes: Partial<Player>,
  ) => void;
  addLibero: (team: "home" | "away") => void;
  removeLibero: (team: "home" | "away", playerID: string) => void;
  updateLibero: (
    team: "home" | "away",
    playerID: string,
    changes: Partial<Player>,
  ) => void;
  removeEmptyLiberos: (team: "home" | "away") => void;
  sortSquadByNumber: (team: "home" | "away") => void;
  setStartingLineups: (startingLineups: {
    home: Team["lineup"];
    away: Team["lineup"];
  }) => void;
  assignPlayerToStartingLineup: (
    team: "home" | "away",
    position: number,
    playerId: string,
  ) => void;
  removePlayerFromStartingLineup: (
    team: "home" | "away",
    position: number,
  ) => void;

  startMatch: () => void;

  swapSides: () => void;
  updateTeamName: (teamNames: TeamNames) => void;
  initialiseMatchSetup: () => void;
  startNewGame: (teamNames?: TeamNames) => void;

  increaseTeamScore: (teamKey: Side, currentSet: number) => void;
  undoAction: (action: GameAction) => void;
  undoSetPoint: () => void;

  handleSetCompletion: (setResult: TeamOptions) => void;
  handleGameComplete: (setResult: TeamOptions) => void;

  handleTeamTimeout: (team: TeamOptions) => void;

  resetMatchData: () => void;

  openModal: (type: ModalState["modalType"], data?: any) => void;
  closeModal: () => void;
}

export interface Player {
  id: string;
  number: number | null;
  name: string;
}

export interface Team {
  name: string;
  players: Player[];
  liberos: Player[];
  lineup: LineupSlot[];
}
export type LineupSlot = { position: number; playerId: string | null };

// Roster validation types (ported from volleyrotation)
export type DuplicateWarning = {
  number: number;
  players: Player[];
};

// A libero whose number is already taken by someone else in the squad.
export type LiberoClash = {
  number: number;
  libero: Player;
  clashesWith: Player[];
};

// A name that is only one character — usually a half-finished entry.
export type ShortName = {
  player: Player;
  section: "player" | "libero";
};

export type TeamResult = {
  errors: string[];
  // red — these block continuing
  nameInvalidIds: string[];
  numberInvalidIds: string[];
  // amber — these only warn
  nameWarningIds: string[];
  numberWarningIds: string[];
  warnings: DuplicateWarning[];
  liberoClashes: LiberoClash[];
  shortNames: ShortName[];
};

export type Errors = {
  home: TeamResult;
  away: TeamResult;
};

export interface SquadData {
  homeTeam: Team;
  awayTeam: Team;
}

export interface SquadErrors {
  homeErrors: SquadError[];
  awayErrors: SquadError[];
}

export interface SquadError {
  type: "error" | "warning";
  section?: "player" | "libero";
  message: string;
  id?: string;
  field?: "name" | "number" | "both";
}
