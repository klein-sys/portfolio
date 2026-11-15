import { useEffect, useState } from "react";

const BOOT_LINES = [
  "Unlocking bootloader",
  "Mounting /system",
  "Loading modules: react, node, unity",
  "Starting portfolio.service",
];

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (leaving) return;
    if (count < BOOT_LINES.length) {
      const timer = window.setTimeout(() => setCount((value) => value + 1), 230);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => setLeaving(true), 450);
    return () => window.clearTimeout(timer);
  }, [count, leaving]);

  useEffect(() => {
    if (!leaving) return;
    const timer = window.setTimeout(onDone, 650);
    return () => window.clearTimeout(timer);
  }, [leaving, onDone]);

  useEffect(() => {
    const skip = () => setLeaving(true);
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, []);

  return (
    <div className={`boot ${leaving ? "boot-leave" : ""}`} role="status" aria-live="polite">
      <div className="boot-inner">
        <div className="boot-logo">
          MJM_OS <span>v2.5 / build klein-sys</span>
        </div>
        <div className="boot-lines">
          {BOOT_LINES.slice(0, count).map((line) => (
            <p key={line}>
              <span className="boot-ok">[ OK ]</span> {line}
            </p>
          ))}
          {count === BOOT_LINES.length && <p className="boot-welcome">&gt; Welcome, visitor.</p>}
        </div>
        <div className="boot-progress">
          <span style={{ transform: `scaleX(${count / BOOT_LINES.length})` }} />
        </div>
        <button type="button" className="boot-skip" onClick={() => setLeaving(true)}>
          Press any key to skip
        </button>
      </div>
    </div>
  );
}
