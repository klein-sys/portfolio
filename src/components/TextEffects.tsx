import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./motion";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

type ScrambleProps = {
  text: string;
  start?: boolean;
  delay?: number;
  replayOnHover?: boolean;
  className?: string;
};

/** Decodes text from random glyphs. Use with monospace text so width stays stable. */
export function ScrambleText({
  text,
  start = true,
  delay = 0,
  replayOnHover = false,
  className = "",
}: ScrambleProps) {
  const [output, setOutput] = useState(text);
  const frame = useRef(0);

  const run = useCallback(() => {
    cancelAnimationFrame(frame.current);
    if (prefersReducedMotion()) {
      setOutput(text);
      return;
    }
    const startedAt = performance.now();
    const duration = 500 + text.length * 22;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const revealed = Math.floor(progress * text.length);
      setOutput(
        text
          .split("")
          .map((char, index) =>
            index < revealed || char === " "
              ? char
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(""),
      );
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => {
    if (!start) return;
    const timer = window.setTimeout(run, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame.current);
    };
  }, [run, start, delay]);

  return (
    <span className={className} onMouseEnter={replayOnHover ? run : undefined}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{output}</span>
    </span>
  );
}

/** Types and deletes each word in a loop. */
export function Typewriter({ words, start = true }: { words: string[]; start?: boolean }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!start) return;
    const word = words[index];
    let timer: number;

    if (!deleting && text === word) {
      timer = window.setTimeout(() => setDeleting(true), 1900);
    } else if (deleting && text === "") {
      timer = window.setTimeout(() => {
        setDeleting(false);
        setIndex((current) => (current + 1) % words.length);
      }, 250);
    } else {
      timer = window.setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? 30 : 65,
      );
    }

    return () => window.clearTimeout(timer);
  }, [text, deleting, index, words, start]);

  return (
    <span className="typewriter">
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">{text}</span>
      <span className="caret" aria-hidden="true" />
    </span>
  );
}
