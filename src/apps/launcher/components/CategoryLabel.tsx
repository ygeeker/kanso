export default function CategoryLabel({
  text,
  selected,
  onClick,
}: {
  text: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1.5 text-sm rounded-full border transition-all duration-200
        ${selected
          ? "border-[var(--color-text-primary)] bg-[var(--color-text-primary)] text-[var(--color-background)]"
          : "border-[var(--color-text-secondary)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-primary)] hover:text-[var(--color-text-primary)]"
        }
      `}
    >
      {text}
    </button>
  );
}
