export default function RowArrow({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`row-arrow ${className ?? ""}`}>
      <svg className="h-4 w-4" fill="none" viewBox="0 0 14 14">
        <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
