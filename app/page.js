import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link
        href="/basic-match"
        className=" bg-blue-600 px-4 py-3 rounded-full text-white"
      >
        Start Basic Match
      </Link>
    </main>
  );
}
