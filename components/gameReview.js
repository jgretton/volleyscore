import React from "react";

import { fullGame } from "@/lib/data";

const GameReview = ({ gameData }) => {
  // const { homeTeamName, awayTeamName, homeTeamSetsWon, awayTeamSetsWon, sets } =
  //   fullGame.game;
  const { homeTeamName, awayTeamName, homeTeamSetsWon, awayTeamSetsWon, sets } =
    gameData.game;

  return (
    <div className="">
      <div className="">
        <div className="grid grid-cols-[2fr_1fr_2fr]">
          <p>{homeTeamName}</p>
          <div className="text-center">
            <span>{homeTeamSetsWon}</span>
            <span> - </span>
            <span>{awayTeamSetsWon}</span>
          </div>
          <p className="text-end">{awayTeamName}</p>
        </div>
        <div className=" pt-10 pb-3">
          <h3>Summary</h3>
        </div>

        <table className="p-4 ">
          <thead className="">
            <tr className="">
              <th className="pr-10">Team</th>
              {Object.keys(sets).map((_, index) => {
                return (
                  <th className="px-3" key={index}>
                    S{index + 1}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="xl p-4">
            <tr className="">
              <td className="pr-10">{homeTeamName}</td>
              {Object.entries(sets).map((item, index) => {
                console.log(item[1].score);
                const { homeTeam: setScore } = item[1].score;
                return (
                  <td className="px-3" key={index}>
                    {setScore}
                  </td>
                );
              })}
            </tr>
            <tr className=" divide-y">
              <td className="pr-10">{awayTeamName}</td>
              {Object.entries(sets).map((item, index) => {
                console.log(item[1].score);
                const { awayTeam: setScore } = item[1].score;
                return (
                  <td className="px-3" key={index}>
                    {setScore}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameReview;
