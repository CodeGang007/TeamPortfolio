// Static site background — server component, zero JS.
// One grid layer + one pre-blurred radial glow (no filter/blur compositing).
export default function AnimatedBackground() {
  return (
    <div className="noise fixed top-0 left-0 w-full h-full -z-50 overflow-hidden bg-brand-bg pointer-events-none">
      {/* Grid pattern, faded out toward the bottom */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#131316_1px,transparent_1px),linear-gradient(to_bottom,#131316_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Ambient emerald glow — a radial gradient instead of a blur filter */}
      <div
        className="absolute -top-[20vh] left-1/2 -translate-x-1/2 w-[120vw] h-[70vh]"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(16,185,129,0.06), transparent 70%)",
        }}
      />
    </div>
  );
}
