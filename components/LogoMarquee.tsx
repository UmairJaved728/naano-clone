const defaultNames = [
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
  logos = defaultNames,
  imgs,
  dark = false,
  leadingLabel,
}: {
  logos?: string[];
  imgs?: { src: string; alt: string }[];
  dark?: boolean;
  leadingLabel?: string;
}) {
  const base = imgs
    ? [
        ...(leadingLabel
          ? [{ kind: "label" as const, text: leadingLabel }]
          : []),
        ...imgs.map((i, idx) => ({ kind: "img" as const, src: i.src, alt: i.alt, key: `${i.src}-${idx}` })),
      ]
    : logos.map((l, idx) => ({ kind: "text" as const, text: l, key: `${l}-${idx}` }));

  const items = [...base, ...base];
  return (
    <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div className="marquee-track flex w-max items-center gap-14 py-1">
        {items.map((it, i) =>
          it.kind === "label" ? (
            <span
              key={`${it.text}-${i}`}
              className={`whitespace-nowrap text-[15px] font-bold uppercase tracking-[0.02em] ${
                dark ? "text-white/50" : "text-ink/45"
              }`}
            >
              {it.text}
            </span>
          ) : it.kind === "img" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={it.key}
              src={it.src}
              alt={it.alt}
              className={`h-[30px] w-auto object-contain ${
                dark ? "opacity-60" : "opacity-45"
              }`}
            />
          ) : (
            <span
              key={`${it.text}-${i}`}
              className={`whitespace-nowrap font-display text-xl font-bold tracking-tight ${
                dark ? "text-white/35" : "text-ink/30"
              }`}
            >
              {it.text}
            </span>
          )
        )}
      </div>
    </div>
  );
}