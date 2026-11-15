import { useEffect, useState } from "react";
import { androidDone, androidLearning } from "../data";
import { prefersReducedMotion } from "./motion";
import { Reveal, useInView } from "./Reveal";

type ScriptLine = { kind: "cmd" | "out" | "note"; text: string };

const SCRIPT: ScriptLine[] = [
  { kind: "cmd", text: "adb reboot bootloader" },
  { kind: "out", text: "Rebooting into fastboot mode..." },
  { kind: "cmd", text: "fastboot flashing unlock" },
  { kind: "out", text: "OKAY [  0.041s]" },
  { kind: "cmd", text: "fastboot flash recovery twrp.img" },
  { kind: "out", text: "Sending 'recovery' (32768 KB)   OKAY" },
  { kind: "out", text: "Writing 'recovery'              OKAY" },
  { kind: "cmd", text: "adb sideload custom-rom.zip" },
  { kind: "out", text: "Total xfer: 1.00x   Install complete" },
  { kind: "cmd", text: "repo sync -c -j8" },
  { kind: "note", text: "# next up: building ROMs from source" },
];

function TerminalPlayer() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setLine(SCRIPT.length);
      return;
    }

    let timer: number;
    if (line >= SCRIPT.length) {
      timer = window.setTimeout(() => {
        setLine(0);
        setChars(0);
      }, 4500);
    } else {
      const current = SCRIPT[line];
      if (current.kind === "cmd" && chars < current.text.length) {
        timer = window.setTimeout(() => setChars((value) => value + 1), 38);
      } else {
        timer = window.setTimeout(
          () => {
            setLine((value) => value + 1);
            setChars(0);
          },
          current.kind === "cmd" ? 380 : 240,
        );
      }
    }
    return () => window.clearTimeout(timer);
  }, [inView, line, chars]);

  const renderLine = (item: ScriptLine, text: string, active: boolean, key: number) => (
    <div className={`term-line term-${item.kind}`} key={key}>
      {item.kind === "cmd" && <span className="term-prompt">$</span>}
      {text}
      {active && <span className="caret" />}
    </div>
  );

  return (
    <div
      className="term"
      ref={ref}
      aria-label="Terminal showing a phone being flashed with a custom ROM"
    >
      <div className="term-bar">
        <span className="term-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>bash — adb / fastboot</span>
      </div>
      <div className="term-body" aria-hidden="true">
        {SCRIPT.slice(0, line).map((item, index) => renderLine(item, item.text, false, index))}
        {line < SCRIPT.length &&
          SCRIPT[line].kind === "cmd" &&
          renderLine(SCRIPT[line], SCRIPT[line].text.slice(0, chars), true, line)}
        {line >= SCRIPT.length && (
          <div className="term-line term-cmd">
            <span className="term-prompt">$</span>
            <span className="caret" />
          </div>
        )}
      </div>
    </div>
  );
}

function FastbootPhone() {
  return (
    <div className="phone" aria-hidden="true">
      <div className="phone-screen">
        <div className="fb-start">
          START <span>▸</span>
        </div>
        <div className="fb-robot">
          <span className="fb-antenna" />
          <span className="fb-head" />
          <span className="fb-body" />
        </div>
        <div className="fb-info">
          <p className="fb-title">FASTBOOT MODE</p>
          <p>PRODUCT_NAME - klein</p>
          <p>VARIANT - user</p>
          <p>BOOTLOADER VERSION - 2.5</p>
          <p>SECURE BOOT - yes</p>
          <p>
            DEVICE STATE - <b>unlocked</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export function AndroidLab() {
  return (
    <section className="section lab" id="android">
      <div className="lab-copy">
        <Reveal>
          <span className="label">// 04 — android lab</span>
          <h2>
            I got curious by
            <br />
            <em>flashing</em> my phones.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="lab-intro">
            Rooting and flashing custom ROMs on my own devices is how I first got curious about what
            happens under the hood. It taught me how Android works below the app layer: bootloaders,
            partitions, recoveries, and the command line.
          </p>
        </Reveal>

        <div className="lab-lists">
          <Reveal delay={150}>
            <h3 className="list-title">Hands-on</h3>
            <ul className="check-list">
              {androidDone.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">[x]</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={250}>
            <h3 className="list-title">Currently learning</h3>
            <ul className="learning-list">
              {androidLearning.map((item) => (
                <li key={item}>
                  <div>
                    <span aria-hidden="true">[ ]</span>
                    {item}
                    <small>in progress</small>
                  </div>
                  <span className="learning-bar" aria-hidden="true">
                    <span />
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <Reveal className="lab-visual" delay={150}>
        <FastbootPhone />
        <TerminalPlayer />
      </Reveal>
    </section>
  );
}
