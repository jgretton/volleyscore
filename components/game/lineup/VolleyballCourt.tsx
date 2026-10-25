// Six equal cells. This is a lineup grid rather than a scale drawing, so the
// 3m line is left off: it fell between the rows and drew a second line
// alongside the one the cells already make.
export default function VolleyballCourt({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="h-[7px] rounded bg-slate-200 dark:bg-slate-300" />
      <div className="grid aspect-[25/18] grid-cols-3 grid-rows-2 rounded-b-md border-[3px] border-t-0 border-white bg-[#ff915c]">
        {children}
      </div>
    </div>
  );
}
