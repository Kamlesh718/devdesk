function SkeletonNewsCard() {
  return (
    <div className="bg-zinc-800/60 p-3 rounded-lg h-28 flex gap-3 animate-pulse">
      <div className="w-20 h-20 bg-zinc-700 rounded-md flex-shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-4 bg-zinc-700 rounded w-3/4" />
        <div className="h-3 bg-zinc-700 rounded w-full" />
        <div className="h-3 bg-zinc-700 rounded w-5/6" />
        <div className="h-3 bg-zinc-700 rounded w-1/2 mt-auto" />
      </div>
    </div>
  );
}

export default SkeletonNewsCard;
