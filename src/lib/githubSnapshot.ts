// Snapshot of public GitHub data, used until live data loads or if the API is unavailable.
import type { ContributionDay, Repo } from "./github";

export const SNAPSHOT_REPOS: Repo[] = [
  {
    name: "biundless",
    description: null,
    language: "TypeScript",
    stars: 0,
    fork: false,
    homepage: "https://ashentangent.vercel.app",
    url: "https://github.com/klein-sys/biundless",
    pushedAt: "2026-11-15T13:12:19Z",
  },
  {
    name: "throw-brooo",
    description: null,
    language: "Python",
    stars: 0,
    fork: false,
    homepage: "https://throw-brooo.vercel.app",
    url: "https://github.com/klein-sys/throw-brooo",
    pushedAt: "2026-11-15T12:45:36Z",
  },
  {
    name: "own-flasher",
    description: null,
    language: "Python",
    stars: 0,
    fork: false,
    homepage: null,
    url: "https://github.com/klein-sys/own-flasher",
    pushedAt: "2026-11-13T18:16:11Z",
  },
  {
    name: "Baroha",
    description: null,
    language: "JavaScript",
    stars: 0,
    fork: false,
    homepage: "https://project20-beta-ashy.vercel.app",
    url: "https://github.com/klein-sys/Baroha",
    pushedAt: "2026-11-12T13:35:41Z",
  },
  {
    name: "The-Three-Ancient-Seals",
    description: null,
    language: "TypeScript",
    stars: 0,
    fork: false,
    homepage: "https://the-three-ancient-seals.vercel.app",
    url: "https://github.com/klein-sys/The-Three-Ancient-Seals",
    pushedAt: "2026-11-11T13:38:44Z",
  },
  {
    name: "rpg-2.0",
    description: null,
    language: null,
    stars: 0,
    fork: false,
    homepage: null,
    url: "https://github.com/klein-sys/rpg-2.0",
    pushedAt: "2026-11-07T19:02:02Z",
  },
  {
    name: "real-math-thoooo",
    description: null,
    language: "JavaScript",
    stars: 0,
    fork: false,
    homepage: "https://real-math-thoooo.vercel.app",
    url: "https://github.com/klein-sys/real-math-thoooo",
    pushedAt: "2026-11-07T14:11:17Z",
  },
  {
    name: "RAIL",
    description: null,
    language: "TypeScript",
    stars: 0,
    fork: false,
    homepage: "https://rail-puce.vercel.app",
    url: "https://github.com/klein-sys/RAIL",
    pushedAt: "2026-11-06T19:51:25Z",
  },
  {
    name: "RPG",
    description: null,
    language: null,
    stars: 0,
    fork: false,
    homepage: null,
    url: "https://github.com/klein-sys/RPG",
    pushedAt: "2026-11-06T14:27:01Z",
  },
  {
    name: "Taskee",
    description:
      "A modern, minimal task managment app where your can manage your to-dos & notes at one place.",
    language: "Dart",
    stars: 0,
    fork: true,
    homepage: null,
    url: "https://github.com/klein-sys/Taskee",
    pushedAt: "2026-11-04T14:26:21Z",
  },
  {
    name: "math",
    description: null,
    language: "HTML",
    stars: 0,
    fork: false,
    homepage: "https://math-two-beige.vercel.app",
    url: "https://github.com/klein-sys/math",
    pushedAt: "2026-11-03T08:40:35Z",
  },
  {
    name: "skills",
    description: null,
    language: "Shell",
    stars: 0,
    fork: false,
    homepage: null,
    url: "https://github.com/klein-sys/skills",
    pushedAt: "2026-10-26T16:23:40Z",
  },
  {
    name: "bratzify",
    description: null,
    language: "TypeScript",
    stars: 0,
    fork: false,
    homepage: "https://bratzify.vercel.app",
    url: "https://github.com/klein-sys/bratzify",
    pushedAt: "2026-09-03T16:27:21Z",
  },
];

const START = "2025-11-16";
const COUNTS =
  "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,5,1,0,2,3,4,6,17,2,5,3,12,3";

export const SNAPSHOT_CONTRIBUTIONS: ContributionDay[] = COUNTS.split(",").map((count, index) => {
  const date = new Date(`${START}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + index);
  return { date: date.toISOString().slice(0, 10), count: Number(count) };
});
