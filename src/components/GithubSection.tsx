import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { featuredRepos, repoNotes } from "../data";
import {
  GITHUB_USER,
  LANGUAGE_COLORS,
  SNAPSHOT,
  getStreaks,
  getTopLanguage,
  loadGithubData,
  timeAgo,
  type ContributionDay,
  type GithubData,
} from "../lib/github";
import { prefersReducedMotion } from "./motion";
import { Reveal, useInView } from "./Reveal";

const PROFILE = `https://github.com/${GITHUB_USER}`;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const dayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function CountUp({ value }: { value: number }) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.4);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setShown(value);
      return;
    }
    let frame = 0;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / 1200);
      setShown(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return <span ref={ref}>{shown}</span>;
}

function levelFor(count: number, max: number) {
  if (count === 0 || max === 0) return 0;
  return Math.min(4, Math.max(1, Math.ceil((count / max) * 4)));
}

function Heatmap({ days }: { days: ContributionDay[] }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<ContributionDay | null>(null);

  const { weeks, months, max } = useMemo(() => {
    const padding = days.length ? new Date(`${days[0].date}T00:00:00Z`).getUTCDay() : 0;
    const cells: (ContributionDay | null)[] = [...Array(padding).fill(null), ...days];
    const grouped: (ContributionDay | null)[][] = [];
    for (let index = 0; index < cells.length; index += 7)
      grouped.push(cells.slice(index, index + 7));

    const labels: { column: number; label: string }[] = [];
    let previousMonth = -1;
    grouped.forEach((week, column) => {
      const first = week.find(Boolean);
      if (!first) return;
      const month = new Date(`${first.date}T00:00:00Z`).getUTCMonth();
      if (month !== previousMonth) {
        // Skip a label squeezed against the previous one at the very start.
        if (!(column === 0 && new Date(`${first.date}T00:00:00Z`).getUTCDate() > 21)) {
          labels.push({ column, label: MONTHS[month] });
        }
        previousMonth = month;
      }
    });

    return {
      weeks: grouped,
      months: labels,
      max: days.reduce((highest, day) => Math.max(highest, day.count), 0),
    };
  }, [days]);

  // On narrow screens, start scrolled to the most recent activity.
  useEffect(() => {
    const element = scrollRef.current;
    if (element) element.scrollLeft = element.scrollWidth;
  }, [weeks]);

  const inspect = (event: MouseEvent<HTMLDivElement>) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-date]");
    if (!target) return;
    setHovered({ date: target.dataset.date!, count: Number(target.dataset.count) });
  };

  const total = days.reduce((sum, day) => sum + day.count, 0);
  const columns = { "--weeks": weeks.length } as CSSProperties;

  return (
    <div className={`heatmap ${inView ? "is-visible" : ""}`} ref={ref}>
      <p className="sr-only">
        {total} contributions on GitHub in the last year, with up to {max} in a single day.
      </p>
      <div className="heatmap-scroll" ref={scrollRef}>
        <div className="heatmap-inner" aria-hidden="true">
          <div className="heatmap-months" style={columns}>
            {months.map(({ column, label }) => (
              <span key={`${label}-${column}`} style={{ gridColumn: column + 1 }}>
                {label}
              </span>
            ))}
          </div>
          <div className="heatmap-body">
            <div className="heatmap-days">
              <span />
              <span>Mon</span>
              <span />
              <span>Wed</span>
              <span />
              <span>Fri</span>
              <span />
            </div>
            <div
              className="heatmap-grid"
              style={columns}
              onMouseOver={inspect}
              onClick={inspect}
              onMouseLeave={() => setHovered(null)}
            >
              {weeks.map((week, column) =>
                Array.from({ length: 7 }, (_, row) => {
                  const day = week[row];
                  if (!day) return <span key={`${column}-${row}`} className="cell cell-empty" />;
                  return (
                    <span
                      key={day.date}
                      className={`cell level-${levelFor(day.count, max)}`}
                      data-date={day.date}
                      data-count={day.count}
                      style={
                        { "--c": column, gridColumn: column + 1, gridRow: row + 1 } as CSSProperties
                      }
                    />
                  );
                }),
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="heatmap-footer">
        <span className="heatmap-readout" aria-live="polite">
          {hovered ? (
            <>
              <b>{hovered.count}</b> contribution{hovered.count === 1 ? "" : "s"} on{" "}
              {dayFormat.format(new Date(`${hovered.date}T00:00:00Z`))}
            </>
          ) : (
            "> hover a day to inspect"
          )}
        </span>
        <span className="heatmap-legend" aria-hidden="true">
          Less
          {[0, 1, 2, 3, 4].map((level) => (
            <span key={level} className={`cell level-${level}`} />
          ))}
          More
        </span>
      </div>
    </div>
  );
}

function RepoIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="repo-icon">
      <path
        fill="currentColor"
        d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.71 1.71.75.75 0 0 1-1.07 1.05A2.5 2.5 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.71a2.5 2.5 0 0 1 1-.21h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.09a.25.25 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"
      />
    </svg>
  );
}

export function GithubSection() {
  const [data, setData] = useState<GithubData>(SNAPSHOT);
  const [status, setStatus] = useState<"loading" | "live" | "snapshot">("loading");

  useEffect(() => {
    let active = true;
    loadGithubData().then((result) => {
      if (!active) return;
      setData(result);
      setStatus(result.live ? "live" : "snapshot");
    });
    return () => {
      active = false;
    };
  }, []);

  const total = data.contributions.reduce((sum, day) => sum + day.count, 0);
  const { longest } = getStreaks(data.contributions);
  const topLanguage = getTopLanguage(data.repos);
  const repos = featuredRepos.flatMap((name) => {
    const repo = data.repos.find((item) => item.name === name);
    return repo ? [repo] : [];
  });

  const stats = [
    { value: total, label: "contributions in the last year" },
    { value: data.repos.length, label: "public repositories" },
    { value: longest, label: "day longest streak" },
  ];

  const statusText = {
    loading: "syncing with api.github.com…",
    live: `live from api.github.com · last push ${data.repos[0] ? timeAgo(data.repos[0].pushedAt) : "—"}`,
    snapshot: "showing saved snapshot · GitHub API unavailable",
  }[status];

  return (
    <section className="section github" id="github">
      <div className="section-heading">
        <Reveal>
          <span className="label">// 02 — github</span>
          <h2>
            Building in
            <br />
            <em>public.</em>
          </h2>
        </Reveal>
        <Reveal delay={120} className="github-intro">
          <p>
            The repos I&apos;m proudest of, plus every commit and late-night push, pulled live
            from GitHub.
          </p>
          <span className={`sync-status sync-${status}`}>
            <span className="dot" />
            {statusText}
          </span>
        </Reveal>
      </div>

      <Reveal className="github-stats">
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong>
              <CountUp value={stat.value} />
            </strong>
            <span>{stat.label}</span>
          </div>
        ))}
        <div className="stat">
          <strong className="stat-text">{topLanguage}</strong>
          <span>most used language</span>
        </div>
      </Reveal>

      <Reveal className="github-panel" delay={100}>
        <div className="panel-bar">
          <span className="term-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>contributions.log — @{GITHUB_USER}</span>
          <a href={PROFILE} target="_blank" rel="noreferrer">
            Open profile ↗
          </a>
        </div>
        <Heatmap days={data.contributions} />
      </Reveal>

      <div className="repos-head">
        <h3 className="list-title">Featured repositories</h3>
        <span>
          {repos.length} featured · {data.repos.length} public
        </span>
      </div>

      <div className="repo-grid">
        {repos.map((repo, index) => {
          const note = repoNotes[repo.name];
          const language = repo.language;
          return (
            <Reveal key={repo.name} delay={(index % 3) * 80}>
              <article className="repo-card">
                <div className="repo-top">
                  <RepoIcon />
                  <a href={repo.url} target="_blank" rel="noreferrer" className="repo-link">
                    {repo.name}
                  </a>
                  {repo.fork && <span className="repo-badge">fork</span>}
                </div>
                <h4>{note?.title ?? repo.name}</h4>
                <p>{repo.description ?? note?.description ?? "No description yet."}</p>
                <div className="repo-meta">
                  {language && (
                    <span>
                      <i style={{ background: LANGUAGE_COLORS[language] ?? "var(--dim)" }} />
                      {language}
                    </span>
                  )}
                  {repo.stars > 0 && <span>★ {repo.stars}</span>}
                  <span>{timeAgo(repo.pushedAt)}</span>
                  {repo.homepage && (
                    <a href={repo.homepage} target="_blank" rel="noreferrer" className="repo-live">
                      Live ↗
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="repos-actions">
        <a
          className="btn btn-ghost"
          href={`${PROFILE}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
        >
          View all repositories ↗
        </a>
      </div>
    </section>
  );
}
