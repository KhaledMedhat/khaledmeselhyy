/** The 12-column layout grid behind the whole page; the lines grow downward with your scroll. */
export function Guides() {
  return (
    <div className="guides" aria-hidden="true">
      {Array.from({ length: 13 }, (_, i) => (
        <i key={i} style={{ left: `${(i / 12) * 100}%` }} />
      ))}
    </div>
  );
}
