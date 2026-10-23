'use client';

import { COURT_POSITIONS } from '@/lib/constants';
import { getUnselectedPlayers } from '@/lib/lineup';
import { useGameStore } from '@/store';
import { ChevronDown } from 'lucide-react';
import { useShallow } from 'zustand/shallow';
import Nameplate from '../Nameplate';
import { Button } from '../ui/button';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '../ui/collapsible';
import VolleyballCourt from '../VolleyballCourt';
import LineupErrorBox from './LineupErrorBox';

type TeamLineupProps = {
	team: 'home' | 'away';
	setTarget: (
		target: { team: 'home' | 'away'; position: number } | null
	) => void;
	errors: { home: number[]; away: number[] };
};

export default function TeamLineup({
	team,
	setTarget,
	errors,
}: TeamLineupProps) {
	const { matchSetup, removePlayerFromStartingLineup } = useGameStore(
		useShallow((state) => ({
			matchSetup: state.matchSetup,
			removePlayerFromStartingLineup: state.removePlayerFromStartingLineup,
		}))
	);
	const removePlayer = (team: 'home' | 'away', position: number) => {
		removePlayerFromStartingLineup(team, position);
	};

	const benchPlayers = getUnselectedPlayers(matchSetup[team]);

	const isLineupComplete = matchSetup[team].lineup.every(
		(slot) => slot.playerId !== null
	);

	return (
		<div className="">
			<fieldset className=" pb-5">
				<legend className="font-medium">
					{matchSetup[team].name} -{' '}
					<span className="text-sm text-muted-foreground font-normal capitalize">
						{team}
					</span>
				</legend>
			</fieldset>

			<VolleyballCourt>
				<div className="grid-cols-3 grid-rows-2 grid size-full">
					{COURT_POSITIONS.map((zone) => {
						const slot = matchSetup[team].lineup.find(
							(s) => s.position === zone
						);

						if (!slot) return null;

						const player = matchSetup[team].players.find(
							(p) => p.id === slot.playerId
						);

						return (
							<Nameplate
								key={zone}
								zone={zone}
								player={player}
								onSelect={() => setTarget({ team: team, position: zone })}
								onRemove={() => removePlayer(team, zone)}
								errors={errors[team]}
							/>
						);
					})}
				</div>
			</VolleyballCourt>
			<LineupErrorBox positions={errors[team]} />
			{isLineupComplete && benchPlayers.length > 0 && (
				<Collapsible>
					<CollapsibleTrigger asChild>
						<Button
							variant="ghost"
							size="sm"
							className="group w-full justify-start transition-none hover:bg-gray-200 "
						>
							Bench players ({benchPlayers.length})
							<ChevronDown className="transition-transform group-data-[state=open]:rotate-180" />
						</Button>
					</CollapsibleTrigger>

					<CollapsibleContent>
						<ul className="grid gap-2 mt-4">
							{benchPlayers.map((player) => (
								<li
									key={player.id}
									className="text-muted-foreground text-sm ml-5 inline-flex items-center gap-3  "
								>
									<span className=" text-sm font-semibold tabular-nums">
										{player.number}
									</span>
									{'-'}
									<span className="text-sm font-medium">{player.name}</span>
								</li>
							))}
						</ul>
					</CollapsibleContent>
				</Collapsible>
			)}
			{matchSetup[team].liberos.length > 0 && (
				<div className="mt-4">
					<p className="text-sm font-medium">
						Liberos ({matchSetup[team].liberos.length})
					</p>
					<ul className="grid gap-2 mt-2">
						{matchSetup[team].liberos.map((libero) => (
							<li
								key={libero.id}
								className="text-muted-foreground text-sm ml-5 inline-flex items-center gap-3  "
							>
								<span className=" text-sm font-semibold tabular-nums">
									{libero.number}
								</span>
								{'-'}
								<span className="text-sm font-medium">{libero.name}</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
