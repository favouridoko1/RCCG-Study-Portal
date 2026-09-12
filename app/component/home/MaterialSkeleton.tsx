function MaterialSkeleton() {
  return (
    <article className="overflow-hidden rounded-[5px] border border-slate-300 bg-white p-3 shadow-sm">
      <div className="animate-pulse">
        <div className="h-52.5 rounded-xs bg-slate-200 sm:h-55" />

        <div className="mt-3 h-4 w-3/4 rounded bg-slate-200" />

        <div className="mt-2 h-3 w-1/2 rounded bg-slate-200" />

        <div className="mt-3 h-8 w-full rounded-[9px] bg-slate-200" />
      </div>
    </article>
  );
}

export default MaterialSkeleton;