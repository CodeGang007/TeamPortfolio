// Seamless marquee: the track holds two copies of the content and
// translates -50%. The second copy is aria-hidden so screen readers
// hear the items once.
export default function Marquee({
  children,
  duration = "40s",
  reverse = false,
  className = "",
}: {
  children: React.ReactNode;
  duration?: string;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}
        style={{ "--marquee-dur": duration } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
