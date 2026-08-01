import { MAX_LIBEROS, MAX_PLAYERS, MIN_PLAYERS } from "@/lib/constants";
import { useGameStore } from "@/store";
import { PlusIcon } from "lucide-react";
import PlayerInputRow from "./PlayerInputRow";
import { Button } from "../ui/button";

export default function TeamRoster({
	team,
	nameInvalidIds,
	numberInvalidIds,
	nameWarningIds,
	numberWarningIds,
}: {
	team: "home" | "away";
	nameInvalidIds: string[];
	numberInvalidIds: string[];
	nameWarningIds: string[];
	numberWarningIds: string[];
}) {
	const players = useGameStore((state) => state.matchSetup[team].players);
	const liberos = useGameStore((state) => state.matchSetup[team].liberos);
	const teamName = useGameStore((state) => state.matchSetup[team].name);
	const { addAdditionalPlayer, addLibero } = useGameStore();

	const count = players.length;
	const atMax = count >= MAX_PLAYERS;

	return (
		<fieldset className="">
			<legend className="font-medium">
				{teamName} -{" "}
				<span className="text-sm text-muted-foreground font-normal capitalize">
					{team}
				</span>
			</legend>
			<div className="grid grid-cols-[auto_1fr_auto] gap-y-5 gap-x-2 py-5 mt-5 border-t">
				<p
					aria-hidden="true"
					className="text-center  text-muted-foreground tracking-wide text-sm"
				>
					No.
				</p>
				<p
					aria-hidden="true"
					className=" text-muted-foreground tracking-wide ml-1 text-sm"
				>
					Name
				</p>
				<span aria-hidden />
				{players.map((player, index) => {
					const hasNameError = nameInvalidIds.includes(player.id);
					const hasNumberError = numberInvalidIds.includes(player.id);
					const hasNameWarning = nameWarningIds.includes(player.id);
					const hasNumberWarning = numberWarningIds.includes(player.id);

					return (
						<PlayerInputRow
							team={team}
							player={player}
							index={index}
							key={player.id}
							hasNameError={hasNameError}
							hasNumberError={hasNumberError}
							hasNameWarning={hasNameWarning}
							hasNumberWarning={hasNumberWarning}
							canRemove={count > MIN_PLAYERS}
						/>
					);
				})}
				<div className="col-span-full">
					<Button
						type="button"
						variant="ghost"
						className="w-full mt-5"
						onClick={() => addAdditionalPlayer(team)}
					>
						<PlusIcon /> Add player
					</Button>
					<p
						role="status"
						aria-live="polite"
						className=" text-sm text-muted-foreground text-center"
					>
						{count} of {MAX_PLAYERS} players
						{atMax && " (maximum reached)"}
						{count <= MIN_PLAYERS && ` (minimum ${MIN_PLAYERS})`}
					</p>
				</div>

				<p className="col-span-full border-t pt-5 text-muted-foreground tracking-wide text-sm font-medium uppercase">
					Liberos
				</p>
				{liberos.map((libero, index) => {
					const hasNameError = nameInvalidIds.includes(libero.id);
					const hasNumberError = numberInvalidIds.includes(libero.id);
					const hasNameWarning = nameWarningIds.includes(libero.id);
					const hasNumberWarning = numberWarningIds.includes(libero.id);

					return (
						<PlayerInputRow
							team={team}
							player={libero}
							index={index}
							key={libero.id}
							section="liberos"
							hasNameError={hasNameError}
							hasNumberError={hasNumberError}
							hasNameWarning={hasNameWarning}
							hasNumberWarning={hasNumberWarning}
							canRemove={true}
						/>
					);
				})}
				<div className="col-span-full">
					{liberos.length < MAX_LIBEROS && (
						<Button
							type="button"
							variant="ghost"
							className="w-full"
							onClick={() => addLibero(team)}
						>
							<PlusIcon /> Add libero
						</Button>
					)}
					<p
						role="status"
						aria-live="polite"
						className=" text-sm text-muted-foreground text-center"
					>
						{liberos.length} of {MAX_LIBEROS} liberos
					</p>
				</div>
			</div>
		</fieldset>
	);
}
