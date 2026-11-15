import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { AndroidLab } from "./components/AndroidLab";
import { BootScreen } from "./components/BootScreen";
import { ProjectArtwork } from "./components/ProjectArtwork";
import { Reveal } from "./components/Reveal";
import { ScrambleText, Typewriter } from "./components/TextEffects";
import { prefersReducedMotion, trackPointer } from "./components/motion";
import { EMAIL, GITHUB, marquee, projects, roles, services, stack, type Category } from "./data";

const NAV = [
  ["01", "work", "#work"],
  ["02", "about", "#about"],
  ["03", "android", "#android"],
  ["04", "contact", "#contact"],
] as const;

const FILTERS = ["All", "Web", "Software", "Games"] as const;

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    className={`arrow size-5 ${diagonal ? "-rotate-45" : ""}`}
  >
    <path d="M5 12h14M14 6l6 6-6 6" />
  </svg>
);

const manilaTime = new Intl.DateTimeFormat("en-PH", {
  timeZone: "Asia/Manila",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return <time>{manilaTime.format(now)}</time>;
}

function readBooted() {
  try {
    return prefersReducedMotion() || sessionStorage.getItem("mjm-booted") === "1";
  } catch {
    return true;
  }
}

export default function App() {
  const [booted, setBooted] = useState(readBooted);
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);

  const finishBoot = useCallback(() => {
    try {
      sessionStorage.setItem("mjm-booted", "1");
    } catch {
      // Storage can be unavailable in private browsing; the intro simply replays.
    }
    setBooted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = booted && !menuOpen ? "" : "hidden";
  }, [booted, menuOpen]);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current?.style.setProperty(
        "transform",
        `scaleX(${max > 0 ? window.scrollY / max : 0})`,
      );
      setScrolled(window.scrollY > 24);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const visibleProjects =
    filter === "All" ? projects : projects.filter((project) => project.category === filter);
  const countFor = (item: (typeof FILTERS)[number]) =>
    item === "All" ? projects.length : projects.filter((p) => p.category === item).length;

  return (
    <div className={`app ${booted ? "booted" : ""}`}>
      {!booted && <BootScreen onDone={finishBoot} />}

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a href="#home" className="logo" aria-label="Mark Jeremy Marcellana, home">
          <span className="logo-bracket">&lt;</span>MJM<span className="logo-bracket">/&gt;</span>
        </a>
        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
          {NAV.map(([number, label, href]) => (
            <a href={href} key={label} onClick={() => setMenuOpen(false)}>
              <span className="nav-number">{number}.</span>
              <ScrambleText text={label} replayOnHover start={booted} />
            </a>
          ))}
        </nav>
        <a className="availability" href={`mailto:${EMAIL}`}>
          <span className="dot" />
          Open to full-time roles
        </a>
        <button
          className={`menu-button ${menuOpen ? "is-open" : ""}`}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span />
          <span />
        </button>
        <span className="scroll-progress" ref={progressRef} aria-hidden="true" />
      </header>

      <main>
        <section className="hero" id="home" onPointerMove={trackPointer}>
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-orb" aria-hidden="true" />

          <div className="hero-content">
            <p className="prompt hero-fade" style={{ "--d": "0ms" } as CSSProperties}>
              <ScrambleText text="mark@klein-sys:~$ whoami" start={booted} />
            </p>
            <h1 className="hero-title">
              <span className="line">
                <span>Mark Jeremy</span>
              </span>
              <span className="line">
                <span className="glitch" data-text="Marcellana.">
                  Marcellana<b>.</b>
                </span>
              </span>
            </h1>
            <p className="hero-role hero-fade" style={{ "--d": "450ms" } as CSSProperties}>
              <span className="hero-role-prefix">&gt;</span>
              <Typewriter words={roles} start={booted} />
            </p>
            <p className="hero-text hero-fade" style={{ "--d": "600ms" } as CSSProperties}>
              I design and build fast web apps, thoughtful interfaces, and playful games, from the
              first pixel to production.
            </p>
            <div className="hero-actions hero-fade" style={{ "--d": "750ms" } as CSSProperties}>
              <a className="btn btn-primary" href="#work">
                View my work <Arrow />
              </a>
              <a className="btn btn-ghost" href={GITHUB} target="_blank" rel="noreferrer">
                GitHub <Arrow diagonal />
              </a>
            </div>
          </div>

          <div className="hero-status hero-fade" style={{ "--d": "900ms" } as CSSProperties}>
            <span>
              <span className="dot" /> Status: open to full-time roles
            </span>
            <span>
              Philippines / <Clock /> PHT
            </span>
            <a href="#work" className="scroll-cue">
              Scroll <span aria-hidden="true" />
            </a>
          </div>
        </section>

        <div className="marquee" aria-label="Technologies I use">
          <div className="marquee-track">
            {[...marquee, ...marquee].map((item, index) => (
              <span key={index} aria-hidden={index >= marquee.length}>
                {item}
                <i>//</i>
              </span>
            ))}
          </div>
        </div>

        <section className="section work" id="work">
          <div className="section-heading">
            <Reveal>
              <span className="label">// 01 — selected work</span>
              <h2>
                Selected
                <br />
                <em>work.</em>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p>
                A mix of web apps, software tools, and games. Each one built with care for how it
                looks, feels, and performs.
              </p>
            </Reveal>
          </div>

          <div className="filters" role="group" aria-label="Filter projects">
            {FILTERS.map((item) => (
              <button
                type="button"
                key={item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
              >
                {item}
                <sup>{String(countFor(item)).padStart(2, "0")}</sup>
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {visibleProjects.map((project, index) => (
              <Reveal key={`${filter}-${project.title}`} delay={index * 90}>
                <a
                  className="project-card"
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                  onPointerMove={trackPointer}
                  aria-label={`${project.title}, view on GitHub`}
                >
                  <div className="project-visual">
                    <ProjectArtwork type={project.visual} />
                    <span className="project-number">{project.number}</span>
                  </div>
                  <div className="project-info">
                    <div>
                      <span className="project-category">{project.category}</span>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                    <span className="project-arrow" aria-hidden="true">
                      <Arrow diagonal />
                    </span>
                  </div>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section about" id="about">
          <Reveal className="about-side">
            <span className="label">// 02 — about</span>
          </Reveal>
          <div className="about-content">
            <Reveal>
              <h2>
                Building the web
                <br />
                with <em>intent.</em>
              </h2>
            </Reveal>
            <div className="about-columns">
              <Reveal delay={100}>
                <p className="about-intro">
                  I'm Mark, a full-stack and frontend developer from the Philippines who loves
                  turning ideas into polished, working products.
                </p>
              </Reveal>
              <Reveal delay={200} className="about-body">
                <p>
                  I work across the stack, from responsive interfaces in React and TypeScript to the
                  APIs and databases that keep everything running. Design matters to me as much as
                  the code behind it.
                </p>
                <p>
                  Outside of web work, I build games and tinker with Android. I'm looking for a
                  full-time role on a team that cares about great products.
                </p>
                <a href={`mailto:${EMAIL}?subject=Let's work together`} className="text-link">
                  Let's work together <Arrow />
                </a>
              </Reveal>
            </div>

            <Reveal className="stack-file" delay={100}>
              <div className="file-tab">
                <span className="term-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                stack.ts
              </div>
              <div className="code">
                <div className="code-line">
                  <span className="ln">1</span>
                  <span>
                    <span className="kw">export const</span> stack = {"{"}
                  </span>
                </div>
                {stack.map(([group, items], index) => (
                  <div className="code-line" key={group}>
                    <span className="ln">{index + 2}</span>
                    <span className="code-entry">
                      <span className="key">{group}</span>: [
                      {items.map((item, itemIndex) => (
                        <span className="str" key={item}>
                          '{item}'{itemIndex < items.length - 1 ? "," : ""}
                        </span>
                      ))}
                      ],
                    </span>
                  </div>
                ))}
                <div className="code-line">
                  <span className="ln">{stack.length + 2}</span>
                  <span>{"}"}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <AndroidLab />

        <section className="section services">
          <Reveal>
            <span className="label">// 04 — what I do</span>
          </Reveal>
          <div className="services-list">
            {services.map(([number, title, detail], index) => (
              <Reveal key={number} delay={index * 80}>
                <div className="service-row">
                  <span className="service-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                  <Arrow diagonal />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="contact" id="contact" onPointerMove={trackPointer}>
          <div className="hero-glow" aria-hidden="true" />
          <Reveal>
            <span className="label">// 05 — contact</span>
            <p className="contact-kicker">Have a role or project in mind?</p>
          </Reveal>
          <Reveal delay={100}>
            <a
              href={`mailto:${EMAIL}`}
              className="contact-title glitch-hover"
              data-text="Let's talk"
            >
              Let's talk
              <span className="caret" aria-hidden="true" />
            </a>
          </Reveal>
          <Reveal delay={200} className="contact-actions">
            <button type="button" className="btn btn-primary" onClick={copyEmail}>
              {copied ? "Copied to clipboard" : "Copy email"}
            </button>
            <a className="btn btn-ghost" href={`mailto:${EMAIL}`}>
              Send an email <Arrow />
            </a>
          </Reveal>
          <div className="contact-details">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href={GITHUB} target="_blank" rel="noreferrer">
              github.com/klein-sys
            </a>
          </div>
          <span className="sr-only" aria-live="polite">
            {copied ? "Email copied to clipboard" : ""}
          </span>
        </section>
      </main>

      <footer>
        <span className="logo">
          <span className="logo-bracket">&lt;</span>MJM<span className="logo-bracket">/&gt;</span>
        </span>
        <p>© {new Date().getFullYear()} Mark Jeremy Marcellana — Built with React</p>
        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  );
}
