export default function RosterErrorList({ errors }: { errors: string[] }) {
	return (
		<ul
			role="alert"
			className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700 space-y-0.5"
		>
			{errors.map((msg, i) => (
				<li className="text-red-500 text-sm/tight" key={i}>
					{msg}
				</li>
			))}
		</ul>
	);
}
