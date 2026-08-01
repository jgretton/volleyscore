import { teamHasWarnings } from "@/lib/roster-validation";
import { TeamResult } from "@/store/types";
import RosterErrorList from "./RosterErrorList";
import RosterWarningBox from "./RosterWarningBox";
import TeamRoster from "./TeamRoster";

type TeamColumnProps = {
	team: "home" | "away";
	validation: TeamResult;
	nameWarningIds: string[];
	numberWarningIds: string[];
};

export default function TeamColumn({
	team,
	validation,
	nameWarningIds,
	numberWarningIds,
}: TeamColumnProps) {
	return (
		<div className="flex flex-col gap-5">
			<TeamRoster
				team={team}
				nameInvalidIds={validation.nameInvalidIds}
				numberInvalidIds={validation.numberInvalidIds}
				nameWarningIds={nameWarningIds}
				numberWarningIds={numberWarningIds}
			/>
			{validation.errors.length > 0 && (
				<RosterErrorList errors={validation.errors} />
			)}
			{teamHasWarnings(validation) && (
				<RosterWarningBox validation={validation} />
			)}
		</div>
	);
}
