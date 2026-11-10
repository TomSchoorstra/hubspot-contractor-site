import Image from "next/image";

// Six lines leave the portrait and run off the edges of the hero.
// Purely decorative: the paths carry no information, the portrait keeps its alt text.
const lines = [
  { line: "integrations", d: "M260 300 H1500" },
  { line: "custom-objects", d: "M260 300 V150 L370 40 H1500" },
  { line: "consultancy", d: "M260 300 L440 480 H1500" },
  { line: "automation", d: "M260 300 L-28 588 H-1500" },
  { line: "custom-app-cards", d: "M260 300 V1200" },
  { line: "pipeline-optimization", d: "M260 300 L120 160 V64" },
];

const stations = [
  [452, 40],
  [476, 300],
  [498, 480],
  [120, 64],
  [56, 504],
];

export default function HeroMap() {
  return (
    <div className="hero-map relative mx-auto aspect-[520/600] w-full max-w-[24rem] lg:max-w-none">
      <svg viewBox="0 0 520 600" aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible">
        {lines.map((item, index) => (
          <path
            key={item.line}
            data-line={item.line}
            d={item.d}
            pathLength={1}
            stroke="var(--line)"
            style={{ "--d": `${0.15 + index * 0.07}s` } as React.CSSProperties}
          />
        ))}
        {stations.map(([cx, cy], index) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={9} style={{ "--d": `${0.75 + index * 0.08}s` } as React.CSSProperties} />
        ))}
      </svg>
      <div className="hero-station absolute left-[21.15%] top-1/4 w-[57.7%] rounded-full border-[10px] border-white bg-white">
        <Image
          src="/about-photo.jpeg"
          alt="Tom Schoorstra, HubSpot and RevOps specialist"
          width={512}
          height={512}
          sizes="(max-width: 1024px) 222px, 300px"
          priority
          className="aspect-square h-auto w-full rounded-full object-cover"
        />
      </div>
    </div>
  );
}
