import Link from "next/link";

// Setup is saved as you go, so leaving is just navigation. No confirmation.
export default function SetupHeader() {
  return (
    <header className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4">
      <Link
        href="/"
        aria-label="VolleyScore, back to home"
        className="rounded-md px-2 py-1 text-lg font-semibold tracking-tight transition hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden dark:hover:bg-slate-800"
      >
        VS
      </Link>
      <h1 className="text-center text-2xl font-semibold">Match Setup</h1>
      {/* balances the wordmark so the title stays optically centred */}
      <span aria-hidden className="w-9" />
    </header>
  );
}
