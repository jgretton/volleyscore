const TIMEOUT_DURATION = 30;
const END_SET_DURATION = 180;
let teamsHaveSwapped = false;
import { initialGame, initialSetData } from "../lib/data";

export const checkIfSetComplete = (
  gameData,
  currentSet,
  setTeamSwapped,
  setServingTeam,
  setGameComplete
) => {
  const currentScore = gameData.game.sets[currentSet].score;
  const homeScore = currentScore.homeTeam;
  const awayScore = currentScore.awayTeam;
  const initialServingTeam = gameData.game.firstServingTeam;
  let nextServingTeam;
  const homeTeamSets = gameData.game.homeTeamSetsWon;
  const awayTeamSets = gameData.game.awayTeamSetsWon;

  if (homeTeamSets >= 3 || awayTeamSets >= 3) {
    setGameComplete(true);
    return true;
  }

  if (initialServingTeam === "homeTeam") nextServingTeam = "awayTeam";
  else nextServingTeam = "homeTeam";

  //Check if 5th set
  if (currentSet === 5) {
    //Swap teams after 8 points.
    if ((homeScore === 8 || awayScore === 8) && !teamsHaveSwapped) {
      teamsHaveSwapped = true;
      setTeamSwapped((prevState) => !prevState);
    }
    //Check if set is complete
    if (
      (homeScore >= 15 || awayScore >= 15) &&
      Math.abs(homeScore - awayScore) >= 2
    ) {
      if (homeScore > awayScore) {
        return "homeTeam";
      } else {
        return "awayTeam";
      }
    }
  }

  // Logic for sets 1-4
  if (
    (homeScore >= 25 || awayScore >= 25) &&
    Math.abs(homeScore - awayScore) >= 2
  ) {
    if (homeScore > awayScore) {
      setServingTeam(nextServingTeam);
      return "homeTeam";
    } else {
      setServingTeam(nextServingTeam);
      return "awayTeam";
    }
  }
  return null;
};

export const checkIfGameComplete = (gameData) => {
  const homeTeamSets = gameData.game.homeTeamSetsWon;
  const awayTeamSets = gameData.game.awayTeamSetsWon;

  if (homeTeamSets >= 3 || awayTeamSets >= 3) {
    return true;
  } else return false;
};

export const increaseScore = (
  team,
  setGameData,
  currentSet,
  setServingTeam
) => {
  setGameData((prevState) => {
    const currentSetData = prevState.game.sets[currentSet] || {
      score: { homeTeam: 0, awayTeam: 0 },
    };
    return {
      ...prevState,
      game: {
        ...prevState.game,
        sets: {
          ...prevState.game.sets,
          [currentSet]: {
            ...currentSetData,
            score: {
              ...currentSetData.score,
              [team]: (currentSetData.score[team] || 0) + 1,
            },
            actions: [
              ...currentSetData.actions,
              {
                type: "score",
                team: team,
                overallScore: { [team]: (currentSetData.score[team] || 0) + 1 },
                timestamp: new Date().toISOString(),
              },
            ],
          },
        },
      },
    };
  });

  setServingTeam(team);
};

export const decreaseScore = (
  team,
  gameData,
  setGameData,
  currentSet,
  setServingTeam
) => {
  if (gameData.game.sets[currentSet]?.score[team] === 0) return;
  else {
    setGameData((prevState) => {
      const currentSetData = prevState.game.sets[currentSet] || {
        score: { homeTeam: 0, awayTeam: 0 },
      };
      return {
        ...prevState,
        game: {
          ...prevState.game,
          sets: {
            ...prevState.game.sets,
            [currentSet]: {
              ...currentSetData,
              score: {
                ...currentSetData.score,
                [team]: (currentSetData.score[team] || 0) - 1,
              },
            },
          },
        },
      };
    });
  }
};

export const timeOut = (
  team,
  currentSet,
  setGameData,
  setTimeoutCountdown,
  setTimeoutTeam
) => {
  setTimeoutCountdown(TIMEOUT_DURATION);
  setTimeoutTeam(team);
  setGameData((prevState) => {
    return {
      ...prevState,
      game: {
        ...prevState.game,
        sets: {
          ...prevState.game.sets,
          [currentSet]: {
            ...prevState.game.sets[currentSet],
            timeouts: {
              ...prevState.game.sets[currentSet].timeouts,
              [team]: prevState.game.sets[currentSet].timeouts[team] + 1,
            },
            actions: [
              ...prevState.game.sets[currentSet].actions,
              {
                type: "timeout",
                team: team,
                overallScore: { ...prevState.game.sets[currentSet].score },
              },
            ],
          },
        },
      },
    };
  });
};

export const undoAction = (
  item,
  gameData,
  setGameData,
  currentSet,
  setServingTeam,
  setGameComplete,
  gameComplete,
  setHasSetBeenProcessed
) => {
  const updatedGameData = { ...gameData };
  //remove last action
  updatedGameData.game.sets[currentSet].actions.pop();
  //now check for most recent action with score.
  const lastServingTeam = gameData.game.sets[currentSet].actions
    .filter((item) => item.type === "score") // Filter only items with type "score"
    .pop();

  if (item.type === "timeout")
    updatedGameData.game.sets[currentSet].timeouts[item.team] = Math.max(
      updatedGameData.game.sets[currentSet].timeouts[item.team] - 1,
      0
    );

  if (item.type === "score") {
    updatedGameData.game.sets[currentSet].score[item.team] =
      updatedGameData.game.sets[currentSet].score[item.team] - 1;

    //set to last serving team, If no previous action then set to team who chose to serve first
    setServingTeam(
      lastServingTeam?.team || updatedGameData.game.firstServingTeam
    );

    if (gameComplete) {
      updatedGameData.game[`${item.team}SetsWon`] =
        updatedGameData.game[`${item.team}SetsWon`] - 1;
      setGameComplete((prevState) => !prevState);
      setHasSetBeenProcessed(false);
    }
  }

  setGameData(updatedGameData);
};

export const resetGame = (
  setGameData,
  setServingTeam,
  setCurrentSet,
  setTeamSwapped,
  setGameComplete,
  setEndOfSetCountdown,
  setTimeoutCountdown,
  gameData
) => {
  const newGame = {
    game: {
      ...initialGame.game,
      homeTeamName: gameData.game.homeTeamName,
      awayTeamName: gameData.game.awayTeamName,
    },
  };
  setCurrentSet(1);
  setGameData(newGame);
  setServingTeam("");
  setTeamSwapped(false);
  setGameComplete(false);
  setEndOfSetCountdown(0);
  setTimeoutCountdown(0);
};

export const EndOfSet = (
  closeModal,
  setCurrentSet,
  currentSet,
  setHasSetBeenProcessed,
  swapSides,
  setGameData
) => {
  // Add new set data for next set
  setGameData((prevState) => ({
    ...prevState,
    game: {
      ...prevState.game,
      sets: {
        ...prevState.game.sets,
        [currentSet + 1]: {
          ...initialSetData,
        },
      },
    },
  }));

  //increment current set
  setCurrentSet((prevState) => prevState + 1);

  // process set
  setHasSetBeenProcessed(true);

  //swap sides
  swapSides();
  //close the modal
  closeModal();
};

export const EndOfSetTimer = (setEndOfSetCountdown, endOfSetCountdown) => {
  setEndOfSetCountdown(END_SET_DURATION);
};

export const undoSetPoint = (
  gameData,
  setGameData,
  currentSet,
  setServingTeam,
  setHasSetBeenProcessed,
  setIsOpen
) => {
  const updatedGameData = { ...gameData };
  //remove last action
  const lastAction = updatedGameData.game.sets[currentSet].actions.pop();

  updatedGameData.game.sets[currentSet].score[lastAction.team] =
    updatedGameData.game.sets[currentSet].score[lastAction.team] - 1;

  const lastServingTeam = gameData.game.sets[currentSet].actions
    .filter((item) => item.type === "score") // Filter only items with type "score"
    .pop();
  //set to last serving team, If no previous action then set to team who chose to serve first
  setServingTeam(
    lastServingTeam?.team || updatedGameData.game.firstServingTeam
  );

  updatedGameData.game[`${lastAction.team}SetsWon`] =
    updatedGameData.game[`${lastAction.team}SetsWon`] - 1;
  setHasSetBeenProcessed(false);

  setGameData(updatedGameData);
  setIsOpen(false);
};
