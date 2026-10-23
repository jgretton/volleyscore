import { MIN_PLAYERS } from "./constants";
import {
	DuplicateWarning,
	LiberoClash,
	Player,
	ShortName,
	Team,
	TeamResult,
} from "@/store/types";

const isValidNumber = (n: number) => n >= 1 && n <= 99;

const findDuplicateNumbers = (players: Player[]): DuplicateWarning[] => {
	const counts: Record<number, number> = {};

	for (const player of players) {
		if (player.number === null) continue;
		if (!isValidNumber(player.number)) continue;
		if (counts[player.number]) {
			counts[player.number] = counts[player.number] + 1;
		} else {
			counts[player.number] = 1;
		}
	}

	const duplicates: DuplicateWarning[] = [];
	for (const number in counts) {
		if (counts[number] > 1) {
			const fullDuplicatePlayers = players.filter(
				(player) => player.number === Number(number),
			);
			duplicates.push({
				number: Number(number),
				players: fullDuplicatePlayers,
			});
		}
	}
	return duplicates;
};

// A libero should have a number nobody else in the squad is using — including
// the other libero. One entry per clashing number, listing who else has it.
const findLiberoClashes = (team: Team): LiberoClash[] => {
	const clashes: LiberoClash[] = [];
	const reportedNumbers: number[] = [];

	for (const libero of team.liberos) {
		if (libero.number === null) continue;
		if (!isValidNumber(libero.number)) continue;
		if (reportedNumbers.includes(libero.number)) continue;

		const clashesWith: Player[] = [];

		for (const player of team.players) {
			if (player.number === libero.number) clashesWith.push(player);
		}

		for (const otherLibero of team.liberos) {
			if (otherLibero.id === libero.id) continue;
			if (otherLibero.number === libero.number) clashesWith.push(otherLibero);
		}

		if (clashesWith.length > 0) {
			reportedNumbers.push(libero.number);
			clashes.push({
				number: libero.number,
				libero: libero,
				clashesWith: clashesWith,
			});
		}
	}

	return clashes;
};

// One-character names are usually a half-finished entry rather than a real
// name. Legal, so only ever a warning.
const findShortNames = (team: Team): ShortName[] => {
	const shortNames: ShortName[] = [];

	for (const player of team.players) {
		if (player.name.trim().length === 1) {
			shortNames.push({ player: player, section: "player" });
		}
	}

	for (const libero of team.liberos) {
		if (libero.name.trim().length === 1) {
			shortNames.push({ player: libero, section: "libero" });
		}
	}

	return shortNames;
};

export const createEmptyValidation = (): TeamResult => ({
	errors: [],
	nameInvalidIds: [],
	numberInvalidIds: [],
	nameWarningIds: [],
	numberWarningIds: [],
	warnings: [],
	liberoClashes: [],
	shortNames: [],
});

export const teamHasWarnings = (validation: TeamResult) =>
	validation.warnings.length > 0 ||
	validation.liberoClashes.length > 0 ||
	validation.shortNames.length > 0;

export const validateTeam = (team: Team): TeamResult => {
	const errors: string[] = [];
	const nameInvalidIds: string[] = [];
	const numberInvalidIds: string[] = [];
	const emptyIds: string[] = [];
	let filled = 0;

	let nameMissing = 0;
	let numberMissing = 0;
	let rangeInvalid = 0;

	for (const player of team.players) {
		const hasName = player.name.trim() !== "";
		const hasNumber = player.number !== null;

		if (!hasName && !hasNumber) {
			emptyIds.push(player.id);
			continue;
		}

		filled++;

		if (!hasName) {
			nameInvalidIds.push(player.id);
			nameMissing++;
		}

		if (!hasNumber) {
			numberInvalidIds.push(player.id);
			numberMissing++;
		} else if (!isValidNumber(player.number)) {
			numberInvalidIds.push(player.id);
			rangeInvalid++;
		}
	}

	if (rangeInvalid)
		errors.push("A player's number needs to be between 1 and 99");

	if (nameMissing)
		errors.push(
			nameMissing === 1
				? "A player needs a name"
				: `${nameMissing} players need a name`,
		);
	if (numberMissing)
		errors.push(
			numberMissing === 1
				? "A player needs a number"
				: `${numberMissing} players need a number`,
		);

	// short of 6 — flag just enough empty rows to make up the minimum
	// (any started row counts, so it reduces how many empties we flag)
	if (filled < MIN_PLAYERS) {
		const needed = MIN_PLAYERS - filled;
		for (const id of emptyIds.slice(0, needed)) {
			nameInvalidIds.push(id);
			numberInvalidIds.push(id);
		}
		errors.push("You need at least 6 players");
	}

	// Liberos — validated for name + number, but not counted toward the minimum.
	// Empty rows are ignored (they get cleaned on continue).
	let liberoNameMissing = 0;
	let liberoNumberMissing = 0;
	let liberoRangeInvalid = 0;

	for (const libero of team.liberos) {
		const hasName = libero.name.trim() !== "";
		const hasNumber = libero.number !== null;

		if (!hasName && !hasNumber) continue;

		if (!hasName) {
			nameInvalidIds.push(libero.id);
			liberoNameMissing++;
		}

		if (!hasNumber) {
			numberInvalidIds.push(libero.id);
			liberoNumberMissing++;
		} else if (!isValidNumber(libero.number)) {
			numberInvalidIds.push(libero.id);
			liberoRangeInvalid++;
		}
	}

	if (liberoRangeInvalid)
		errors.push("A libero's number needs to be between 1 and 99");

	if (liberoNameMissing)
		errors.push(
			liberoNameMissing === 1
				? "A libero needs a name"
				: `${liberoNameMissing} liberos need a name`,
		);
	if (liberoNumberMissing)
		errors.push(
			liberoNumberMissing === 1
				? "A libero needs a number"
				: `${liberoNumberMissing} liberos need a number`,
		);

	const warnings = findDuplicateNumbers(team.players);
	const liberoClashes = findLiberoClashes(team);
	const shortNames = findShortNames(team);

	// which inputs should show amber — same idea as the red id lists above
	const numberWarningIds: string[] = [];
	const nameWarningIds: string[] = [];

	for (const warning of warnings) {
		for (const player of warning.players) {
			numberWarningIds.push(player.id);
		}
	}

	for (const clash of liberoClashes) {
		numberWarningIds.push(clash.libero.id);
		for (const player of clash.clashesWith) {
			numberWarningIds.push(player.id);
		}
	}

	for (const shortName of shortNames) {
		nameWarningIds.push(shortName.player.id);
	}

	return {
		errors,
		nameInvalidIds,
		numberInvalidIds,
		nameWarningIds,
		numberWarningIds,
		warnings,
		liberoClashes,
		shortNames,
	};
};
