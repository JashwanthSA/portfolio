export function AuroraBackground() {
  return (
    <div className="aurora-wrapper pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="aurora-layer bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.6),transparent_55%)]" />
      <div className="aurora-layer bg-[radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.6),transparent_55%)]" />
      <div className="aurora-layer bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.55),transparent_60%)]" />
    </div>
  );
}

