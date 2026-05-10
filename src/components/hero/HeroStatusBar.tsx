export function HeroStatusBar() {
  return (
    <div className="flex items-center justify-between px-5 sm:px-8 py-2.5 border-x border-b border-border font-mono text-[10px] uppercase tracking-[0.2em]">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: "#4ade80" }}
        />
        Status: All Systems Operational
      </div>
      <div className="hidden sm:flex gap-8 text-muted-foreground/60">
        <span>Full-Stack</span>
        <span>Agentic AI</span>
        <span>Chess</span>
      </div>
      <span className="text-muted-foreground/60">
        © {new Date().getFullYear()}
      </span>
    </div>
  );
}
