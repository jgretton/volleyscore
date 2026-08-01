"use client";
import SetupWizard from "@/components/setup/SetupWizard";

const Page = () => {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center gap-10 p-4 text-slate-900 sm:p-8 md:p-16 dark:text-white">
      <h1 className="text-2xl font-semibold">Match Setup</h1>
      <div className="mt-5 flex w-full flex-1 flex-col">
        <SetupWizard />
      </div>
    </div>
  );
};

export default Page;
