import ContentIcon from "@/components/ui/ContentIcon";

// The coloured disc that names a line. With `tail`, the line runs in from the screen edge.
export default function LineBullet({
  icon,
  tail = false,
  size = "md",
  className,
}: {
  icon: string;
  tail?: boolean;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <span aria-hidden="true" className={`bullet ${tail ? "bullet--tail" : ""} ${size === "lg" ? "bullet--lg" : ""} ${className ?? ""}`}>
      <ContentIcon name={icon} />
    </span>
  );
}
