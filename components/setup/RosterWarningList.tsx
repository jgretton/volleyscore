import { DuplicateWarning, LiberoClash, ShortName } from "@/store/types";

// Shared by the inline warning box and the confirm dialog so the wording can't
// drift apart. Each row leads with the number or name at issue, so a list
// covering both teams stays scannable.
export default function RosterWarningList({
  warnings,
  liberoClashes,
  shortNames,
}: {
  warnings: DuplicateWarning[];
  liberoClashes: LiberoClash[];
  shortNames: ShortName[];
}) {
  return (
    <ul className="mt-2 space-y-1">
      {warnings.map((warning, i) => (
        <li key={i} className="flex gap-3">
          <span className="w-12 shrink-0 font-semibold tabular-nums">
            #{warning.number}
          </span>
          <span>{warning.players.map((player) => player.name).join(", ")}</span>
        </li>
      ))}
      {liberoClashes.map((clash, i) => (
        <li key={i} className="flex gap-3">
          <span className="w-12 shrink-0 font-semibold tabular-nums">
            #{clash.number}
          </span>
          <span>
            {clash.libero.name} (libero),{" "}
            {clash.clashesWith.map((player) => player.name).join(", ")}
          </span>
        </li>
      ))}
      {shortNames.map((shortName, i) => (
        <li key={i} className="flex gap-3">
          <span className="w-12 shrink-0 truncate font-semibold">
            &quot;{shortName.player.name}&quot;
          </span>
          <span>
            {shortName.section === "libero" ? "Libero" : "Player"} name is one
            character
          </span>
        </li>
      ))}
    </ul>
  );
}
