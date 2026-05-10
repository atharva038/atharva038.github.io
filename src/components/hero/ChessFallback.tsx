export function ChessFallback() {
  return (
    <div className="glass-panel p-5 sm:p-6 rounded-3xl min-h-[430px] animate-pulse">
      <div className="h-6 w-44 rounded-md bg-foreground/10 mb-4" />
      <div className="aspect-square w-full rounded-2xl border border-border bg-surface/30" />
      <div className="h-4 w-40 rounded-md bg-foreground/10 mt-4" />
      <div className="h-4 w-56 rounded-md bg-foreground/10 mt-2" />
    </div>
  );
}
