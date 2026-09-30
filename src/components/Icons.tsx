import { d } from "./delay";

export function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** "KM" monogram that draws itself inside a circle. */
export function Monogram({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <circle className="draw" style={{ ...d(0.2), color: "var(--accent)" }} pathLength={1} cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="1" />
      <path className="draw" style={d(0.8)} pathLength={1} d="M14 13V31M14 22L22 13M17 19L23 31M26 31V13L30 22L34 13V31" stroke="var(--text)" strokeWidth="1.2" />
    </svg>
  );
}
