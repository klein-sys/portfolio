import { useState } from "react";

const EMAIL = "markjeremymarcellana@gmail.com";
const GITHUB = "https://github.com/klein-sys";

type Category = "Web" | "Software" | "Games";

type Project = {
  number: string;
  title: string;
  category: Category;
  description: string;
  tags: string[];
  visual: "dashboard" | "pixel" | "system" | "terminal";
};

const projects: Project[] = [
  {
    number: "01",
    title: "Pulse",
    category: "Web",
    description:
      "A real-time analytics dashboard that turns messy product data into clear decisions.",
    tags: ["React", "Node.js", "PostgreSQL", "2025"],
    visual: "dashboard",
  },
  {
    number: "02",
    title: "Pixel Drift",
    category: "Games",
    description: "A fast-paced retro arcade game built for the browser, with handcrafted levels.",
    tags: ["TypeScript", "Canvas", "Game design", "2025"],
    visual: "pixel",
  },
  {
    number: "03",
    title: "Atlas UI",
    category: "Web",
    description:
      "An accessible component library and design system for shipping consistent interfaces.",
    tags: ["React", "Tailwind", "Storybook", "2024"],
    visual: "system",
  },
  {
    number: "04",
    title: "Devnote",
    category: "Software",
    description:
      "A keyboard-first notes and snippets tool for developers who live in the terminal.",
    tags: ["Electron", "TypeScript", "SQLite", "2024"],
    visual: "terminal",
  },
];

const services = [
  ["01", "Frontend engineering", "React / TypeScript / Performance"],
  ["02", "Full-stack products", "APIs / Databases / Deployment"],
  ["03", "Web design", "UI / UX / Responsive layouts"],
  ["04", "Game development", "Gameplay / Prototyping / Web games"],
];

const stack = [
  ["Frontend", ["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML & CSS"]],
  ["Backend", ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"]],
  ["Games & Tools", ["Unity", "C#", "Canvas API", "Git", "Figma"]],
] as const;

const sprite = [
  "..x.....x..",
  "...x...x...",
  "..xxxxxxx..",
  ".xxoxxxoxx.",
  "xxxxxxxxxxx",
  "x.xxxxxxx.x",
  "x.x.....x.x",
  "...xx.xx...",
];

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    className={`size-5 ${diagonal ? "-rotate-45" : ""}`}
  >
    <path d="M5 12h14M14 6l6 6-6 6" />
  </svg>
);

function ProjectArtwork({ type }: { type: Project["visual"] }) {
  if (type === "dashboard") {
    return (
      <div className="artwork artwork-dashboard" aria-hidden="true">
        <span className="art-label">Live metrics</span>
        <div className="dash-panel">
          <small>Active users</small>
          <strong>24,816</strong>
          <div className="dash-bars">
            {[38, 56, 44, 70, 92, 64, 78].map((height, index) => (
              <span key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "pixel") {
    return (
      <div className="artwork artwork-pixel" aria-hidden="true">
        <span className="art-label">Player 01</span>
        <div className="pixel-sprite">
          {sprite.flatMap((row, y) =>
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
        <span className="pixel-score">Score 009,420</span>
      </div>
    );
  }

  if (type === "system") {
    return (
      <div className="artwork artwork-system" aria-hidden="true">
        <div className="system-grid" />
        <span className="art-label">Components / v2.0</span>
        <div className="system-stack">
          <div className="system-button">Get started</div>
          <div className="system-input">you@example.com</div>
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
        <div>✓ Note saved in 12ms</div>
        <div>
          <em>$</em> devnote search api
          <span className="terminal-cursor" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const filters = ["All", "Web", "Software", "Games"] as const;
  const visibleProjects =
    filter === "All" ? projects : projects.filter((project) => project.category === filter);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a href="#home" className="logo" aria-label="Mark Jeremy Marcellana, home">
          MJM<span>®</span>
        </a>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>
            Work
          </a>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </nav>
        <a className="availability" href={`mailto:${EMAIL}`}>
          <span />
          Open to full-time roles
        </a>
        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero" id="home">
        <div className="eyebrow">Mark Jeremy Marcellana — Full-stack developer — Philippines</div>
        <h1>
          Code that
          <br />
          <span className="hero-indent">
            feels <i>alive.</i>
          </span>
        </h1>
        <div className="hero-bottom">
          <p>
            I design and build fast web apps, thoughtful interfaces, and playful games, from the
            first pixel to production.
          </p>
          <a href="#work" className="circle-link" aria-label="View work">
            <Arrow />
          </a>
        </div>
        <div className="hero-mark" aria-hidden="true">
          ✦
        </div>
      </section>

      <section className="projects-section" id="work">
        <div className="section-heading">
          <div>
            <span className="section-number">(01)</span>
            <h2>
              Selected
              <br />
              work
            </h2>
          </div>
          <p>
            A mix of web apps, software tools, and games. Each one was built with care for how it
            looks, feels, and performs.
          </p>
        </div>

        <div className="filters" aria-label="Filter projects">
          {filters.map((item) => (
            <button
              type="button"
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {visibleProjects.map((project) => (
            <a
              className="project-card block"
              key={project.title}
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
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
                </div>
                <p>{project.description}</p>
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
          ))}
        </div>
      </section>

      <section className="profile-section" id="about">
        <div className="profile-title">
          <span className="section-number">(02)</span>
          <p>About</p>
        </div>
        <div className="profile-content">
          <h2>
            Building the web
            <br />
            with <i>intent.</i>
          </h2>
          <div className="profile-columns">
            <p className="profile-intro">
              I'm Mark, a full-stack and frontend developer from the Philippines who loves turning
              ideas into polished, working products.
            </p>
            <div className="profile-body">
              <p>
                I work across the stack, from crafting responsive interfaces in React and TypeScript
                to building APIs and databases that keep everything running. Design matters to me as
                much as the code behind it.
              </p>
              <p>
                Outside of web work, I build games and experiment with interactive ideas. I'm
                looking for a full-time role on a team that cares about great products.
              </p>
              <a href={`mailto:${EMAIL}?subject=Let's work together`} className="text-link">
                Let's work together <Arrow />
              </a>
            </div>
          </div>

          <div className="stack">
            <span className="section-number">Tech stack</span>
            {stack.map(([group, items]) => (
              <div className="stack-group" key={group}>
                <h3>{group}</h3>
                <ul>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="services-heading">
          <span className="section-number">(03)</span>
          <p>What I do</p>
        </div>
        <div className="services-list">
          {services.map(([number, title, detail]) => (
            <div className="service-row" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
              <Arrow diagonal />
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <p className="contact-kicker">Have a role or project in mind?</p>
        <a href={`mailto:${EMAIL}`} className="contact-title">
          Let's talk<span>.</span>
        </a>
        <div className="contact-details">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <div>
            <a href={GITHUB} target="_blank" rel="noreferrer">
              GitHub / klein-sys
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="logo">
          MJM<span>®</span>
        </div>
        <p>© {new Date().getFullYear()} Mark Jeremy Marcellana</p>
        <a href="#home">Back to top ↑</a>
      </footer>
    </main>
  );
}
