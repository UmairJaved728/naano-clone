const defaultLogos = [
  "BlogSEO",
  "lemlist",
  "folk",
  "Leadbay",
  "Ringover",
  "Attio",
  "La Growth Machine",
  "gojiberry",
  "ChatSEO",
  "Abyssale",
];

export default function LogoMarquee({
  logos = defaultLogos,
  dark = false,
}: {
  logos?: string[];
  dark?: boolean;
}) {
  const items = [...logos, ...logos];
  return (
    <div
      className={`relative w-full overflow-hidden ${
        dark
          ? "[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
          : "[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
      }`}
    >
      <div className="marquee-track flex w-max items-center gap-12 py-2">
        {items.map((logo, i) => (
          <span
            key={`${logo}-${i}`}
            className={`whitespace-nowrap font-display text-xl font-bold tracking-tight ${
              dark ? "text-white/35" : "text-ink/30"
            }`}
          >
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}