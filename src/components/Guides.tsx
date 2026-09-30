/** The 12-column layout grid behind the whole page; its lines draw downward on load. */
export function Guides() {
  return (
    <div className="guides" aria-hidden="true">
      {Array.from({ length: 13 }, (_, i) => (
        <i key={i} style={{ left: `${(i / 12) * 100}%`, animationDelay: `${0.1 + i * 0.07}s` }} />
      ))}
    </div>
  );
}
