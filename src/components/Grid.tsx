import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "./Reveal";

export const external = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {});
export const pad2 = (n: number) => String(n).padStart(2, "0");

/**
 * One cell of a section grid. Its top and left edges draw with scroll; `i` sets how far
 * behind the others it starts. `x` puts a + on its top-left corner.
 */
export function Cell({ span, i = 0, x, className = "", style, children, id }: { span: number; i?: number; x?: boolean; className?: string; style?: CSSProperties; children?: ReactNode; id?: string }) {
  return (
    <div id={id} className={`cell s${span} ${className}`} style={{ "--o": Math.min(0.4, i * 0.05).toFixed(2), ...style } as CSSProperties}>
      {x && <i className="x" aria-hidden="true" />}
      {children}
    </div>
  );
}

/** A section grid whose lines follow the scroll. */
export function Grid({ className = "", children, id }: { className?: string; children: ReactNode; id?: string }) {
  return (
    <Reveal className={`grid ${className}`} scrub id={id}>
      {children}
    </Reveal>
  );
}
