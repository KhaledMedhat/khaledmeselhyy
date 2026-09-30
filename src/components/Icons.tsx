export function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Download({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M11 3V15M6 10L11 15L16 10M4 19H18" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
