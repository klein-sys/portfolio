import { SNAPSHOT_CONTRIBUTIONS, SNAPSHOT_REPOS } from "./githubSnapshot";

export const GITHUB_USER = "klein-sys";

export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  fork: boolean;
  homepage: string | null;
  url: string;
  pushedAt: string;
};

export type ContributionDay = { date: string; count: number };

export type GithubData = {
  repos: Repo[];
  contributions: ContributionDay[];
  live: boolean;
};

type ApiRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  homepage: string | null;
  html_url: string;
  pushed_at: string;
};

const CACHE_KEY = `gh-cache-v1-${GITHUB_USER}`;
const CACHE_MS = 30 * 60 * 1000;

export const SNAPSHOT: GithubData = {
  repos: SNAPSHOT_REPOS,
  contributions: SNAPSHOT_CONTRIBUTIONS,
  live: false,
};

async function fetchRepos(): Promise<Repo[]> {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`,
  );
  if (!response.ok) throw new Error(`GitHub repos: ${response.status}`);
  const data = (await response.json()) as ApiRepo[];
  return data
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      fork: repo.fork,
      homepage: repo.homepage || null,
      url: repo.html_url,
      pushedAt: repo.pushed_at,
    }))
    .sort((a, b) => b.pushedAt.localeCompare(a.pushedAt));
}

async function fetchContributions(): Promise<ContributionDay[]> {
  // GitHub's REST API doesn't expose the contribution calendar without auth,
  // so this public proxy reads it from the profile page.
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`,
  );
  if (!response.ok) throw new Error(`Contributions: ${response.status}`);
  const data = (await response.json()) as { contributions: ContributionDay[] };
  return data.contributions.map(({ date, count }) => ({ date, count }));
}

/** Loads live data, falling back to the bundled snapshot for anything that fails. */
export async function loadGithubData(): Promise<GithubData> {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? "null") as {
      savedAt: number;
      data: GithubData;
    } | null;
    if (cached && Date.now() - cached.savedAt < CACHE_MS) return cached.data;
  } catch {
    // Ignore unreadable cache.
  }

  const [repos, contributions] = await Promise.allSettled([fetchRepos(), fetchContributions()]);
  const data: GithubData = {
    repos: repos.status === "fulfilled" ? repos.value : SNAPSHOT.repos,
    contributions:
      contributions.status === "fulfilled" ? contributions.value : SNAPSHOT.contributions,
    live: repos.status === "fulfilled" || contributions.status === "fulfilled",
  };

  if (data.live) {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data }));
    } catch {
      // Storage may be unavailable; live data still renders.
    }
  }
  return data;
}

export function getStreaks(days: ContributionDay[]) {
  let longest = 0;
  let run = 0;
  for (const day of days) {
    run = day.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }

  let current = 0;
  let index = days.length - 1;
  // Today may not have activity yet; don't break the streak for it.
  if (index >= 0 && days[index].count === 0) index -= 1;
  for (; index >= 0 && days[index].count > 0; index -= 1) current += 1;

  return { longest, current };
}

export function getTopLanguage(repos: Repo[]) {
  const counts = new Map<string, number>();
  for (const repo of repos) {
    if (repo.fork || !repo.language) continue;
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
}

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  HTML: "#e34c26",
  CSS: "#663399",
  Dart: "#00b4ab",
  Shell: "#89e051",
};

export function timeAgo(iso: string) {
  const seconds = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  const units: [number, string][] = [
    [31536000, "y"],
    [2592000, "mo"],
    [604800, "w"],
    [86400, "d"],
    [3600, "h"],
    [60, "m"],
  ];
  for (const [size, label] of units) {
    if (seconds >= size) return `${Math.floor(seconds / size)}${label} ago`;
  }
  return "just now";
}
