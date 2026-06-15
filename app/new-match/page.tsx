const Page = () => {
  return (
    <div className="flex size-full max-h-svh max-w-svw flex-col">
      <div className="relative grid size-full flex-1 portrait:grid-cols-1 portrait:grid-rows-2 landscape:grid-cols-2">
        <div className="flex h-full flex-col bg-[#e9f1f1]">
          <h2 className="text-medium p-2 text-left text-base">
            Lincoln Cannons
          </h2>
          <p className="flex-1 self-center text-[min(15vw,30rem)] font-medium text-[#2E5E6E] tabular-nums">
            21
          </p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-1/2 rounded-lg bg-white p-5 shadow-lg">
          <p className="text-center text-sm text-gray-500">Set 3</p>
          <p className="text-xl">
            <span className="text-2xl font-medium text-[#2E5E6E]"> 1</span> -
            <span className="text-2xl font-medium text-[#BE6A4C]"> 1</span>
          </p>
        </div>
        <div className="flex size-full flex-col border-l bg-[#f8ece5]">
          <h2 className="text-medium self-end p-2 text-right text-base">
            Lincoln Cannons
          </h2>
          <p className="text-centre self-center text-center align-middle text-[min(15vw,30rem)] font-medium text-[#BE6A4C] tabular-nums">
            20
          </p>
        </div>
      </div>
      <div className="h-10 w-full bg-red-100"></div>
    </div>
  );
};

export default Page;
