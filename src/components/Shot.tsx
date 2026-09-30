import { d } from "./delay";

const line = { stroke: "currentColor", strokeOpacity: 0.28 } as const;

/**
 * A project screenshot set slightly back in 3D; it turns flat on hover.
 * Without an image, a straight-line wireframe draws in its place.
 */
export function Shot({ image, alt }: { image?: string; alt: string }) {
  return (
    <div className="shot-stage">
      <div className="shot">
        <div className="shot-bar" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        {image ? (
          <img src={image} alt={alt} />
        ) : (
          <svg viewBox="0 0 640 360" preserveAspectRatio="none" fill="none" aria-hidden="true">
            <path className="draw" style={d(0.3)} pathLength={1} d="M32 36H300M32 60H220" {...line} strokeOpacity={0.5} />
            <path className="draw" style={d(0.5)} pathLength={1} d="M32 96H400V324H32Z" {...line} />
            <path className="draw" style={d(0.7)} pathLength={1} d="M432 96H608V200H432Z" {...line} />
            <path className="draw" style={d(0.9)} pathLength={1} d="M432 220H608V324H432Z" {...line} />
            <path className="draw" style={d(1.1)} pathLength={1} d="M32 210H400M216 96V324" {...line} strokeOpacity={0.14} />
            <text x="608" y="30" textAnchor="end" className="shot-ph">[SCREENSHOT]</text>
          </svg>
        )}
      </div>
    </div>
  );
}
