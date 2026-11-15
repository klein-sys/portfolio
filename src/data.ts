export const EMAIL = "markjeremymarcellana@gmail.com";
export const GITHUB = "https://github.com/klein-sys";

export type Category = "Web" | "Software" | "Games";

export type Project = {
  number: string;
  title: string;
  category: Category;
  description: string;
  tags: string[];
  visual: "dashboard" | "pixel" | "system" | "terminal";
};

export const roles = [
  "full-stack developer",
  "frontend engineer",
  "web designer",
  "game developer",
  "android tinkerer",
];

export const projects: Project[] = [
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
    description: "An accessible component library and design system for consistent interfaces.",
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

export const services = [
  ["01", "Frontend engineering", "React / TypeScript / Performance"],
  ["02", "Full-stack products", "APIs / Databases / Deployment"],
  ["03", "Web design", "UI / UX / Responsive layouts"],
  ["04", "Game development", "Gameplay / Prototyping / Web games"],
] as const;

export const stack = [
  ["frontend", ["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML & CSS"]],
  ["backend", ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"]],
  ["games", ["Unity", "C#", "Canvas API"]],
  ["android", ["ADB", "Fastboot", "Magisk", "TWRP", "Linux CLI"]],
  ["tools", ["Git", "GitHub", "Figma", "VS Code"]],
] as const;

export const marquee = [
  "React",
  "TypeScript",
  "Node.js",
  "Next.js",
  "PostgreSQL",
  "Tailwind",
  "Unity",
  "C#",
  "ADB",
  "Fastboot",
  "Linux",
  "Git",
];

export const androidDone = [
  "Unlocked bootloaders on my own devices",
  "Rooted with Magisk and managed modules",
  "Flashed custom ROMs and recoveries like TWRP",
  "Used ADB and Fastboot from the command line",
];

export const androidLearning = [
  "Building ROMs from AOSP source",
  "Device trees and vendor blobs",
  "Compiling custom kernels",
];
