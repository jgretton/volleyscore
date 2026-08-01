"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGameStore } from "@/store";
// import { useMatchStore } from "@/lib/matchStore";
import { useState } from "react";
import { useShallow } from "zustand/shallow";

export default function TeamNameStep({ nextStep }: { nextStep: () => void }) {
const { home, away, setTeamNames } = useGameStore(
  useShallow((state) => ({
    home: state.matchSetup.home,
    away: state.matchSetup.away,
    setTeamNames: state.setTeamNames,
  }))
);

	const [error, setError] = useState("");

	const handleTeamNameSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		const data = new FormData(e.currentTarget);
		const homeTeamName = data.get("homeTeamName");
		const awayTeamName = data.get("awayTeamName");

		if (
			awayTeamName?.toString().trim() === "" && homeTeamName?.toString().trim()
		) {
			setError("Please enter team names");
		}

		setTeamNames(homeTeamName?.toString() ?? "", awayTeamName?.toString() ?? "");
		nextStep();
	};
	return (
		<div className="flex flex-1 flex-col">
			<div>
				<h2 className="text-lg font-medium text-slate-900">Team names</h2>
				<p className="text-slate-600 text-base">
					Please enter the team names below. These can be changed in the future.
					Click continue when you are ready to move onto the next step.
				</p>
			</div>

			<form
				onSubmit={(e) => handleTeamNameSubmit(e)}
				className="flex flex-1 flex-col "
			>
				<div className="grid grid-cols-1 grid-rows-[auto_auto_1fr] md:grid-cols-2 md:grid-rows-[auto_1fr] gap-5 mt-10 flex-1 pb-5">
					<div className="grid gap-1.5">
						<Label htmlFor="homeTeamName">Home Team Name</Label>
						<Input
							id="homeTeamName"
							type="text"
							required
							name="homeTeamName"
							defaultValue={home.name}
						/>
					</div>
					<div className="grid gap-1.5">
						<Label htmlFor="awayTeamName">Away Team Name</Label>
						<Input
							id="awayTeamName"
							type="text"
							name="awayTeamName"
							required
							defaultValue={away.name}
						/>
					</div>
					<div className="flex flex-col gap-2 md:items-end md:col-start-2 h-full  ">
						{error && <p className="text-sm text-red-600">{error}</p>}
						<Button
							type="submit"
							className="w-full py-5 self-end mt-auto md:mt-0"
						>
							Continue
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}
