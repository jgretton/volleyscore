"use client";
import { Match, Side } from "@/store/types";

// Teams are rows and sets are columns, the way a televised result is laid
// out. It stays the same height whether one set has been played or five.
const ResultScoreboard = ({
  match,
  lastSet,
}: {
  match: Match;
  lastSet: number;
}) => {
  const setNumbers: number[] = [];
  for (let setNumber = 1; setNumber <= lastSet; setNumber++) {
    if (match.sets[setNumber]) setNumbers.push(setNumber);
  }

  // The deciding set never gets a winner written to it, so read the result
  // off the scores rather than SetData.winner.
  const wonSet = (setNumber: number, team: Side) => {
    const setData = match.sets[setNumber];
    const other: Side = team === "home" ? "away" : "home";
    return setData[team].score > setData[other].score;
  };

  const columns = {
    gridTemplateColumns: `1fr repeat(${setNumbers.length}, 2.25rem) 3rem`,
  };

  const teams: Side[] = ["home", "away"];

  return (
    <div>
      <div style={columns} className="grid items-center gap-x-1 pb-1.5">
        <span />
        {setNumbers.map((setNumber) => (
          <span
            key={setNumber}
            className="text-center text-[10px] tracking-[0.12em] text-gray-400 dark:text-gray-500"
          >
            {setNumber}
          </span>
        ))}
        <span className="text-center text-[10px] tracking-[0.12em] text-gray-400 dark:text-gray-500">
          SETS
        </span>
      </div>

      {teams.map((team) => {
        const other: Side = team === "home" ? "away" : "home";
        const leading = match[team].setsWon > match[other].setsWon;

        return (
          <div
            key={team}
            style={columns}
            className="grid items-center gap-x-1 border-t border-gray-200 dark:border-white/10"
          >
            <span
              className={`truncate pr-2 text-sm ${
                leading
                  ? "font-medium text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {match[team].name}
            </span>

            {setNumbers.map((setNumber) => (
              <span
                key={setNumber}
                className={`py-2.5 text-center tabular-nums ${
                  wonSet(setNumber, team)
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {match.sets[setNumber][team].score}
              </span>
            ))}

            <span
              className={`border-l border-gray-200 py-2.5 text-center text-xl tabular-nums dark:border-white/10 ${
                leading
                  ? "font-medium text-gray-900 dark:text-white"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {match[team].setsWon}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ResultScoreboard;
