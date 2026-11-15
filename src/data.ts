export const EMAIL = "markjeremymarcellana@gmail.com";
export const GITHUB = "https://github.com/klein-sys";

export type Category = "Games" | "Web" | "Software";

export type Project = {
  number: string;
  title: string;
  category: Category;
  description: string;
  tags: string[];
  repo: string;
  live?: string;
  visual: "ashen" | "bratz" | "flashdock" | "seals" | "rail" | "voxel";
};

export const roles = [
  "full-stack developer",
  "frontend engineer",
  "3D web game developer",
  "android tinkerer",
];

const repoUrl = (name: string) => `${GITHUB}/${name}`;

export const projects: Project[] = [
  {
    number: "01",
    title: "Ashen Tangent",
    category: "Games",
    description:
      "A playable 3D dark-fantasy action RPG for desktop and mobile browsers, where trig derivatives drive boss barriers, spell speed, and counter-attacks.",
    tags: ["Three.js", "TypeScript", "Vite"],
    repo: repoUrl("biundless"),
    live: "https://ashentangent.vercel.app",
    visual: "ashen",
  },
  {
    number: "02",
    title: "bratzify.fm",
    category: "Web",
    description:
      "A brutalist web app for lyric videos. Upload a track, sync lyrics in real time or with Gemini, then export a 1080p MP4.",
    tags: ["Next.js", "Remotion", "Node.js", "Gemini API"],
    repo: repoUrl("bratzify"),
    live: "https://bratzify.vercel.app",
    visual: "bratz",
  },
  {
    number: "03",
    title: "FlashDock",
    category: "Software",
    description:
      "My own Windows workstation for Android devices: diagnostics, rooting, firmware flashing, and partition backups, with safety checks before every write.",
    tags: ["Python", "PySide6", "ADB", "Fastboot"],
    repo: repoUrl("own-flasher"),
    visual: "flashdock",
  },
  {
    number: "04",
    title: "The Three Ancient Seals",
    category: "Games",
    description:
      "A third-person 3D action RPG where calculus models drive dungeon mechanisms, harmonic traps, and ancient boss wards.",
    tags: ["Three.js", "TypeScript", "WebGL"],
    repo: repoUrl("The-Three-Ancient-Seals"),
    live: "https://the-three-ancient-seals.vercel.app",
    visual: "seals",
  },
  {
    number: "05",
    title: "Cyber-Rail Defender",
    category: "Games",
    description:
      "A five-sector browser game: repair the railway with one-sided limits and time plasma shots with trig derivatives.",
    tags: ["TypeScript", "Vite", "Touch controls"],
    repo: repoUrl("RAIL"),
    live: "https://rail-puce.vercel.app",
    visual: "rail",
  },
  {
    number: "06",
    title: "Throw Food 3D",
    category: "Games",
    description:
      "A voxel WebGL simulator inspired by a Roblox hit, where food flight and launch ramps follow real trigonometric calculus.",
    tags: ["Three.js", "JavaScript", "WebGL"],
    repo: repoUrl("throw-brooo"),
    live: "https://throw-brooo.vercel.app",
    visual: "voxel",
  },
];

/** Friendly names and summaries for repos that don't have a GitHub description. */
export const repoNotes: Record<string, { title: string; description: string }> = {
  biundless: {
    title: "Ashen Tangent",
    description: "3D dark-fantasy action RPG built with Three.js and TypeScript.",
  },
  "throw-brooo": {
    title: "Throw Food 3D",
    description: "Voxel WebGL simulator with calculus-driven food physics.",
  },
  "own-flasher": {
    title: "FlashDock",
    description: "Desktop Android workstation for flashing, rooting, and backups.",
  },
  Baroha: {
    title: "Mathbound",
    description: "Roblox-inspired 3D fantasy adventure RPG featuring differential calculus.",
  },
  "The-Three-Ancient-Seals": {
    title: "The Three Ancient Seals",
    description: "Third-person 3D action RPG with calculus-driven dungeon mechanics.",
  },
  "rpg-2.0": {
    title: "Slopefall",
    description: "Top-down browser adventure: align bridges and recover the Ember Lens.",
  },
  "real-math-thoooo": {
    title: "Emberbrook",
    description: "Browser RPG prototype with an explorable town, map, and boss fights.",
  },
  RAIL: {
    title: "Cyber-Rail Defender",
    description: "Five-sector browser game powered by limits and derivatives.",
  },
  RPG: { title: "RPG", description: "Early browser RPG experiment." },
  Taskee: {
    title: "Taskee",
    description: "Minimal Flutter task and notes app for Android and iOS.",
  },
  math: { title: "Derivative Quest", description: "Browser math game about derivatives." },
  skills: {
    title: "Agent Skills",
    description: "Modular AI coding-agent skills for Google Antigravity and Gemini.",
  },
  bratzify: {
    title: "bratzify.fm",
    description: "Lyric video generator with real-time sync and MP4 export.",
  },
};

export const services = [
  ["01", "Frontend engineering", "React / TypeScript / Performance"],
  ["02", "Full-stack products", "APIs / Databases / Deployment"],
  ["03", "Web design", "UI / UX / Responsive layouts"],
  ["04", "Game development", "Three.js / WebGL / Browser games"],
] as const;

export const stack = [
  ["frontend", ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vite"]],
  ["3d_games", ["Three.js", "WebGL", "Canvas API", "Remotion"]],
  ["backend", ["Node.js", "Express", "Python", "Gemini API", "Docker"]],
  ["desktop", ["Python", "PySide6", "PyInstaller"]],
  ["android", ["ADB", "Fastboot", "Magisk", "KernelSU", "TWRP"]],
  ["deploy", ["Git", "GitHub", "Vercel", "Render"]],
] as const;

export const marquee = [
  "React",
  "TypeScript",
  "Three.js",
  "Next.js",
  "Node.js",
  "Python",
  "PySide6",
  "Remotion",
  "Vite",
  "ADB",
  "Fastboot",
  "Vercel",
];

export const androidDone = [
  "Unlocked bootloaders on my own devices",
  "Rooted with Magisk and managed modules",
  "Flashed custom ROMs and recoveries like TWRP",
  "Used ADB and Fastboot from the command line",
  "Built FlashDock, my own desktop flashing and backup tool",
];

export const androidLearning = [
  "Building ROMs from AOSP source",
  "Device trees and vendor blobs",
  "Compiling custom kernels",
];
