export function Logo({ size = 'default' }: { size?: 'default' | 'sm' }) {
  const iconSize = size === 'sm' ? 20 : 24;
  const textClass =
    size === 'sm'
      ? 'text-base font-semibold tracking-tight'
      : 'text-xl font-semibold tracking-tight';

  return (
    <span className="inline-flex items-center gap-2">
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 2v20M2 12h20M4.929 4.929l14.142 14.142M19.071 4.929L4.929 19.071"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className={textClass}>Skit</span>
    </span>
  );
}
