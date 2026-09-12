export default function Avatar({
  name,
  color,
  size = "md",
  className = "",
}: {
  name: string;
  color: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "size-8 text-xs",
    md: "size-10 text-sm",
    lg: "size-14 text-base",
  };
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-full bg-gradient-to-br font-semibold text-white ${color} ${sizes[size]} ${className}`}
    >
      {initials}
    </span>
  );
}