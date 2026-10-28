"use client";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/store";
import {
	createEmptyValidation,
	teamHasWarnings,
	validateTeam,
} from "@/lib/roster-validation";
import { Errors } from "@/store/types";

import { useState } from "react";

import RosterWarningDialog from "../RosterWarningDialog";
import TeamColumn from "../TeamColumn";

export default function PlayerDetailsStep({
	completeSetup,
}: {
	completeSetup: () => void;
}) {
	const {
		matchSetup: { home, away },
		removeEmptyPlayers,
		removeEmptyLiberos,
		sortSquadByNumber,
	} = useGameStore();

	const [errors, setErrors] = useState<Errors>({
		home: createEmptyValidation(),
		away: createEmptyValidation(),
	});
	const [showWarningDialog, setShowWarningDialog] = useState(false);

	const continueToNextStep = () => {
		removeEmptyPlayers("away");
		removeEmptyPlayers("home");
		removeEmptyLiberos("away");
		removeEmptyLiberos("home");
		// tidy the rosters into shirt-number order before moving on
		sortSquadByNumber("away");
		sortSquadByNumber("home");
		completeSetup();
	};

	const handleTeamRosterSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		const homeTeamValidation = validateTeam(home);
		const awayTeamValidation = validateTeam(away);

		setErrors({ home: homeTeamValidation, away: awayTeamValidation });

		const hasErrors =
			homeTeamValidation.errors.length || awayTeamValidation.errors.length;
		const hasWarnings =
			teamHasWarnings(homeTeamValidation) ||
			teamHasWarnings(awayTeamValidation);

		if (hasErrors) return; // stop — red boxes show (amber box also shows if warnings)
		if (hasWarnings) {
			setShowWarningDialog(true); // confirm — continue anyway?
			return;
		}

		continueToNextStep(); // clean
	};

	// only highlight warnings amber when there are no hard errors
	const hasErrors =
		errors.home.errors.length > 0 || errors.away.errors.length > 0;
	const homeNameWarningIds = hasErrors ? [] : errors.home.nameWarningIds;
	const homeNumberWarningIds = hasErrors ? [] : errors.home.numberWarningIds;
	const awayNameWarningIds = hasErrors ? [] : errors.away.nameWarningIds;
	const awayNumberWarningIds = hasErrors ? [] : errors.away.numberWarningIds;

	return (
		<div className="flex flex-1 flex-col">
			<div>
				<h2 className="text-lg font-medium text-slate-900 dark:text-white">Team Roster</h2>
				<p className="text-slate-600 text-base">
					Please enter the players shirt number and name below. These can be
					changed in the future. Click continue when you are ready to move onto
					the next step.
				</p>
			</div>

			<form onSubmit={(e) => handleTeamRosterSubmit(e)}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
					<TeamColumn
						team="home"
						validation={errors.home}
						nameWarningIds={homeNameWarningIds}
						numberWarningIds={homeNumberWarningIds}
					/>
					<TeamColumn
						team="away"
						validation={errors.away}
						nameWarningIds={awayNameWarningIds}
						numberWarningIds={awayNumberWarningIds}
					/>

					<Button type="submit" className="md:col-start-2">
						Continue
					</Button>
				</div>

				<RosterWarningDialog
					open={showWarningDialog}
					onOpenChange={setShowWarningDialog}
					homeName={home.name}
					awayName={away.name}
					home={errors.home}
					away={errors.away}
					onConfirm={continueToNextStep}
				/>
			</form>
		</div>
	);
}
