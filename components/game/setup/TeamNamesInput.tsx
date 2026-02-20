"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGameStore } from "@/store";
import { TeamNames } from "@/store/types";
import { useEffect, useState } from "react";

const TeamNamesInput = ({ onConfirm }: { onConfirm: () => void }) => {
  const { updateTeamName, match } = useGameStore();
  const [teamNames, setTeamNames] = useState<TeamNames>({
    homeTeamName: "",
    awayTeamName: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTeamNames({
      homeTeamName: match.homeTeamName,
      awayTeamName: match.awayTeamName,
    });
  }, [match.homeTeamName, match.awayTeamName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setTeamNames((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      teamNames.homeTeamName.toLowerCase().trim() ===
      teamNames.awayTeamName.toLowerCase().trim()
    ) {
      setError("Team names must be different.");
      return;
    }

    updateTeamName(teamNames);
    onConfirm();
  };

  return (
    <form className="mt-5 grid grid-cols-2 gap-5" onSubmit={handleConfirm}>
      <div className="space-y-2">
        <Label htmlFor="homeTeamName"> Home team</Label>
        <Input
          id="homeTeamName"
          value={teamNames.homeTeamName}
          name="homeTeamName"
          required
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="awayTeamName"> Away team</Label>
        <Input
          id="awayTeamName"
          value={teamNames.awayTeamName}
          name="awayTeamName"
          required
          onChange={handleChange}
        />
      </div>
      {error && <p className="col-start-1 text-sm text-red-500">{error}</p>}
      <Button className="col-start-2">Confirm</Button>
    </form>
  );
};

export default TeamNamesInput;
