import type { CSSProperties } from "react";
import type { Project } from "../data";
import { prefersReducedMotion } from "./motion";

const indexed = (count: number) => Array.from({ length: count }, (_, index) => index);
const vars = (values: Record<string, string | number>) => values as CSSProperties;

// Sine wave for Ashen Tangent; the tangent marker rides along it.
const SINE_PATH = indexed(73)
  .map((step) => {
    const x = 20 + step * 5;
    const y = 165 - 78 * Math.sin(((x - 20) / 360) * Math.PI * 2.5);
    return `${step === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  })
  .join(" ");

function Motion({ path, duration }: { path: string; duration: string }) {
  if (prefersReducedMotion()) return null;
  return <animateMotion dur={duration} repeatCount="indefinite" rotate="auto" path={path} />;
}

function AshenArt() {
  return (
    <div className="artwork art-ashen" aria-hidden="true">
      <span className="art-label">f'(θ) = cos θ</span>
      <svg viewBox="0 0 400 320" className="art-svg">
        <path d="M20 165H380" className="ashen-axis" />
        <path d={SINE_PATH} className="ashen-wave" />
        <g>
          <line x1="-70" y1="0" x2="70" y2="0" className="ashen-tangent" />
          <circle r="6" className="ashen-point" />
          <Motion path={SINE_PATH} duration="7s" />
        </g>
      </svg>
      <div className="embers">
        {indexed(10).map((index) => (
          <span key={index} style={vars({ "--i": index, "--x": `${(index * 37) % 100}%` })} />
        ))}
      </div>
      <span className="art-title ashen-title">ASHEN TANGENT</span>
    </div>
  );
}

const LYRICS = ["drop the track,", "watch it sync,", "export in 1080p"];

function BratzArt() {
  return (
    <div className="artwork art-bratz" aria-hidden="true">
      <span className="art-label">bratzify.fm / editor</span>
      <div className="bratz-word">bratzify</div>
      <div className="bratz-lyrics">
        {LYRICS.map((line, index) => (
          <span key={line} style={vars({ "--i": index })}>
            {line}
          </span>
        ))}
      </div>
      <div className="bratz-wave">
        {indexed(32).map((index) => (
          <span key={index} style={vars({ "--i": index, "--h": `${25 + ((index * 53) % 70)}%` })} />
        ))}
      </div>
    </div>
  );
}

const PARTITIONS = ["boot_a", "vendor_boot", "dtbo", "super"];

function FlashDockArt() {
  return (
    <div className="artwork art-flashdock" aria-hidden="true">
      <div className="fd-panel">
        <div className="fd-head">
          <strong>FlashDock</strong>
          <span className="fd-switch">
            <span>Write: Safe</span>
            <span>Write: Armed</span>
          </span>
        </div>
        <div className="fd-island">
          <i /> fastboot · slot _a · battery 82%
        </div>
        {PARTITIONS.map((name, index) => (
          <div className="fd-row" key={name} style={vars({ "--i": index })}>
            <span>{name}</span>
            <span className="fd-bar">
              <span />
            </span>
            <span className="fd-ok">OKAY</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const SEALS = [
  { cx: 200, cy: 98, label: "I" },
  { cx: 128, cy: 222, label: "II" },
  { cx: 272, cy: 222, label: "III" },
];

function SealsArt() {
  return (
    <div className="artwork art-seals" aria-hidden="true">
      <span className="art-label">dungeon / seal ward</span>
      <svg viewBox="0 0 400 320" className="art-svg">
        <polygon points="200,98 128,222 272,222" className="seal-link" />
        {SEALS.map((seal, index) => (
          <g key={seal.label} style={vars({ "--i": index })}>
            <circle cx={seal.cx} cy={seal.cy} r="44" className="seal-ring seal-ring-outer" />
            <circle cx={seal.cx} cy={seal.cy} r="32" className="seal-ring seal-ring-inner" />
            <circle cx={seal.cx} cy={seal.cy} r="18" className="seal-core" />
            <text x={seal.cx} y={seal.cy + 5} className="seal-label">
              {seal.label}
            </text>
          </g>
        ))}
      </svg>
      <span className="art-title seals-title">THE THREE ANCIENT SEALS</span>
    </div>
  );
}

function RailArt() {
  return (
    <div className="artwork art-rail" aria-hidden="true">
      <span className="art-label">sector 03 / limit x→2⁻</span>
      <div className="rail-sun" />
      <div className="rail-floor" />
      <div className="rail-shots">
        {indexed(3).map((index) => (
          <span key={index} style={vars({ "--i": index })} />
        ))}
      </div>
      <span className="art-title rail-title">CYBER-RAIL DEFENDER</span>
    </div>
  );
}

// Isometric cube helper for the voxel scene.
function Cube({ x, y, size, tone }: { x: number; y: number; size: number; tone: string }) {
  const h = size / 2;
  return (
    <g className={`cube cube-${tone}`}>
      <polygon
        points={`${x},${y} ${x + size},${y + h} ${x},${y + size} ${x - size},${y + h}`}
        className="cube-top"
      />
      <polygon
        points={`${x - size},${y + h} ${x},${y + size} ${x},${y + size * 2} ${x - size},${y + size * 1.5}`}
        className="cube-left"
      />
      <polygon
        points={`${x + size},${y + h} ${x},${y + size} ${x},${y + size * 2} ${x + size},${y + size * 1.5}`}
        className="cube-right"
      />
    </g>
  );
}

const ARC_PATH = "M92 196 Q 200 20 312 182";
const CUBES = [
  { x: 92, y: 200, tone: "grass" },
  { x: 60, y: 216, tone: "grass" },
  { x: 124, y: 216, tone: "dirt" },
  { x: 312, y: 186, tone: "grass" },
  { x: 280, y: 202, tone: "dirt" },
  { x: 344, y: 202, tone: "grass" },
];

function VoxelArt() {
  return (
    <div className="artwork art-voxel" aria-hidden="true">
      <span className="art-label">launch angle θ = 42°</span>
      <svg viewBox="0 0 400 320" className="art-svg">
        <path d={ARC_PATH} className="voxel-arc" />
        {CUBES.map((cube, index) => (
          <Cube key={index} size={32} {...cube} />
        ))}
        <g>
          <polygon points="-7,-4 9,0 -7,4" className="voxel-carrot" />
          <Motion path={ARC_PATH} duration="2.6s" />
        </g>
      </svg>
      <span className="art-title voxel-title">THROW FOOD 3D</span>
    </div>
  );
}

export function ProjectArtwork({ type }: { type: Project["visual"] }) {
  switch (type) {
    case "ashen":
      return <AshenArt />;
    case "bratz":
      return <BratzArt />;
    case "flashdock":
      return <FlashDockArt />;
    case "seals":
      return <SealsArt />;
    case "rail":
      return <RailArt />;
    case "voxel":
      return <VoxelArt />;
  }
}
