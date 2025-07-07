export const initialGame = {
  homeTeamName: "Home",
  awayTeamName: "Away",
  firstServingTeam: "homeTeam",
  homeTeamSetsWon: 0,
  awayTeamSetsWon: 0,
  pointsPerSet: 25,
  timedGame: false,
  sets: {
    1: {
      homeTeamLineup: [],
      awayTeamLineup: [],
      setStartTime: "2024-04-16T12:00:00Z",
      score: {
        homeTeam: 0,
        awayTeam: 0,
      },
      timeouts: {
        awayTeam: 0,
        homeTeam: 0,
      },
      actions: [],
    },
  },
};

export const initialSetData = {
  homeTeamLineup: [],
  awayTeamLineup: [],
  setStartTime: "",
  score: {
    homeTeam: 0,
    awayTeam: 0,
  },
  timeouts: {
    awayTeam: 0,
    homeTeam: 0,
  },
  actions: [],
};

const actions = [
  {
    type: "score",
    team: "homeTeam",
    overallScore: { homeTeam: 1, awayTeam: 0 },
    timestamp: "2024-04-16T12:05:00Z",
  },
  {
    type: "substitution",
    team: "homeTeam",
    overallScore: { homeTeam: 2, awayTeam: 1 },
    timestamp: "2024-04-16T12:10:00Z",
  },
  {
    type: "timeout",
    team: "awayTeam",
    overallScore: { homeTeam: 2, awayTeam: 2 },
    timestamp: "2024-04-16T12:15:00Z",
  },
];

export const fullGame = {
  game: {
    homeTeamName: "Lincoln Cannons",
    awayTeamName: "Nottingham Rockets",
    firstServingTeam: "homeTeam",
    homeTeamSetsWon: 2,
    awayTeamSetsWon: 1,
    sets: {
      1: {
        homeTeamLineup: [
          "Player1",
          "Player2",
          "Player3",
          "Player4",
          "Player5",
          "Player6",
        ],
        awayTeamLineup: [
          "PlayerA",
          "PlayerB",
          "PlayerC",
          "PlayerD",
          "PlayerE",
          "PlayerF",
        ],
        setStartTime: "2024-04-16T12:00:00Z",
        score: {
          homeTeam: 25,
          awayTeam: 22,
        },
        timeouts: {
          awayTeam: 2,
          homeTeam: 1,
        },
        actions: [
          {
            type: "score",
            team: "homeTeam",
            overallScore: { homeTeam: 10, awayTeam: 8 },
            timestamp: "2024-04-16T12:15:00Z",
          },
          {
            type: "timeout",
            team: "awayTeam",
            overallScore: { homeTeam: 12, awayTeam: 10 },
            timestamp: "2024-04-16T12:20:00Z",
          },
          {
            type: "substitution",
            team: "homeTeam",
            overallScore: { homeTeam: 18, awayTeam: 16 },
            timestamp: "2024-04-16T12:35:00Z",
          },
          {
            type: "score",
            team: "homeTeam",
            overallScore: { homeTeam: 25, awayTeam: 22 },
            timestamp: "2024-04-16T12:55:00Z",
          },
        ],
      },
      2: {
        homeTeamLineup: [
          "Player1",
          "Player2",
          "Player3",
          "Player4",
          "Player5",
          "Player6",
        ],
        awayTeamLineup: [
          "PlayerA",
          "PlayerB",
          "PlayerC",
          "PlayerD",
          "PlayerE",
          "PlayerF",
        ],
        setStartTime: "2024-04-16T13:05:00Z",
        score: {
          homeTeam: 23,
          awayTeam: 25,
        },
        timeouts: {
          awayTeam: 1,
          homeTeam: 2,
        },
        actions: [
          {
            type: "score",
            team: "awayTeam",
            overallScore: { homeTeam: 7, awayTeam: 12 },
            timestamp: "2024-04-16T13:15:00Z",
          },
          {
            type: "timeout",
            team: "homeTeam",
            overallScore: { homeTeam: 10, awayTeam: 15 },
            timestamp: "2024-04-16T13:20:00Z",
          },
          {
            type: "substitution",
            team: "awayTeam",
            overallScore: { homeTeam: 20, awayTeam: 21 },
            timestamp: "2024-04-16T13:45:00Z",
          },
          {
            type: "score",
            team: "awayTeam",
            overallScore: { homeTeam: 23, awayTeam: 25 },
            timestamp: "2024-04-16T14:00:00Z",
          },
        ],
      },
      3: {
        homeTeamLineup: [
          "Player1",
          "Player2",
          "Player3",
          "Player4",
          "Player5",
          "Player6",
        ],
        awayTeamLineup: [
          "PlayerA",
          "PlayerB",
          "PlayerC",
          "PlayerD",
          "PlayerE",
          "PlayerF",
        ],
        setStartTime: "2024-04-16T14:10:00Z",
        score: {
          homeTeam: 25,
          awayTeam: 20,
        },
        timeouts: {
          awayTeam: 2,
          homeTeam: 1,
        },
        actions: [
          {
            type: "score",
            team: "homeTeam",
            overallScore: { homeTeam: 12, awayTeam: 8 },
            timestamp: "2024-04-16T14:25:00Z",
          },
          {
            type: "timeout",
            team: "awayTeam",
            overallScore: { homeTeam: 16, awayTeam: 12 },
            timestamp: "2024-04-16T14:30:00Z",
          },
          {
            type: "substitution",
            team: "homeTeam",
            overallScore: { homeTeam: 20, awayTeam: 16 },
            timestamp: "2024-04-16T14:45:00Z",
          },
          {
            type: "score",
            team: "homeTeam",
            overallScore: { homeTeam: 25, awayTeam: 20 },
            timestamp: "2024-04-16T14:55:00Z",
          },
        ],
      },
    },
  },
};
