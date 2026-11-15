import type { CSSProperties } from "react";
import type { Project } from "../data";

const BARS = [38, 56, 44, 70, 92, 64, 78];

const SPRITE = [
  "..x.....x..",
  "...x...x...",
  "..xxxxxxx..",
  ".xxoxxxoxx.",
  "xxxxxxxxxxx",
  "x.xxxxxxx.x",
  "x.x.....x.x",
  "...xx.xx...",
];

export function ProjectArtwork({ type }: { type: Project["visual"] }) {
  if (type === "dashboard") {
    return (
      <div className="artwork artwork-dashboard" aria-hidden="true">
        <span className="art-label">live_metrics.tsx</span>
        <div className="dash-panel">
          <small>Active users</small>
          <strong>24,816</strong>
          <span className="dash-delta">+12.4%</span>
          <div className="dash-bars">
            {BARS.map((height, index) => (
              <span key={index} style={{ height: `${height}%`, "--i": index } as CSSProperties} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "pixel") {
    return (
      <div className="artwork artwork-pixel" aria-hidden="true">
        <div className="pixel-stars" />
        <span className="art-label">player_01</span>
        <div className="pixel-sprite">
          {SPRITE.flatMap((row, y) =>
            row
              .split("")
              .map((cell, x) => (
                <span
                  key={`${x}-${y}`}
                  className={cell === "x" ? "on" : cell === "o" ? "eye" : ""}
                />
              )),
          )}
        </div>
        <div className="pixel-ground" />
        <span className="pixel-score">SCORE 009420</span>
      </div>
    );
  }

  if (type === "system") {
    return (
      <div className="artwork artwork-system" aria-hidden="true">
        <div className="system-grid" />
        <span className="art-label">components / v2.0</span>
        <div className="system-stack">
          <div className="system-button">Get started</div>
          <div className="system-input">
            you@example.com
            <span className="caret" />
          </div>
          <div className="system-toggle" />
        </div>
        <div className="system-aa">Aa</div>
      </div>
    );
  }

  return (
    <div className="artwork artwork-terminal" aria-hidden="true">
      <span className="art-label">~/devnote</span>
      <div className="terminal-window">
        <div>
          <em>$</em> devnote new "deploy checklist"
        </div>
        <div className="terminal-dim">✓ note saved in 12ms</div>
        <div>
          <em>$</em> devnote search api
          <span className="caret" />
        </div>
      </div>
    </div>
  );
}
