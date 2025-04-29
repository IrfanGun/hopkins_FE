interface PlaceholderLogoProps {
  name: string;
  size?: number;
}

export default function PlaceholderLogo({
  name,
  size = 60,
}: PlaceholderLogoProps) {
  // Get initials from name
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  // Generate a deterministic color based on the name
  const hue =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360;
  const bgColor = `hsl(${hue}, 70%, 80%)`;
  const textColor = `hsl(${hue}, 70%, 30%)`;

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        color: textColor,
      }}
      className="flex items-center justify-center rounded-md font-bold"
    >
      {initials}
    </div>
  );
}
