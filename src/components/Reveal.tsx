"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

/** Adds `in-view` once the element scrolls into view, which starts every `.draw` line and `.rise` block inside it. */
export function Reveal({
  as: Tag = "div",
  className = "",
  children,
  threshold = 0.2,
  ...rest
}: {
  as?: "div" | "section" | "header" | "article";
  className?: string;
  children: ReactNode;
  threshold?: number;
  id?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag ref={ref} className={`${className} ${seen ? "in-view" : ""}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
