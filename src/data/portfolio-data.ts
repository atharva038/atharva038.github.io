export const personalInfo = {
  name: "Atharva Sachin Joshi",
  shortName: "Atharva",
  initials: "AJ",
  title: "Full-Stack Developer",
  subtitle: "Chess Strategist & Builder",
  college: "SGGSIET, Vishnupuri, Nanded",
  degree: "B.Tech",
  bio: "Every great game starts with a plan. I approach code the way I approach chess — with strategy, patience, and the drive to think several moves ahead. I build full-stack applications that solve real-world problems, one commit at a time.",
  goal: "Become a builder-founder — build real products, solve practical problems, and eventually run my own startup.",
  github: "https://github.com/atharva038",
  linkedin: "https://linkedin.com/in/atharva-joshi-8a7b19319",
  email: "atharva038@gmail.com",
};

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export interface SkillItem {
  name: string;
  icon: string;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", icon: "/img/skills/reactjs.png" },
      { name: "HTML/CSS/JS", icon: "/img/skills/html-css-js.png" },
      { name: "TypeScript", icon: "/img/skills/typescript.png" },
      { name: "Tailwind CSS", icon: "/img/skills/tailwind.png" },
      { name: "Bootstrap", icon: "/img/skills/bootstrap.png" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: "/img/skills/nodejs.png" },
      { name: "Express.js", icon: "/img/skills/nodejs.png" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB", icon: "/img/skills/mongo-db.png" },
      { name: "SQL", icon: "/img/skills/sql.png" },
    ],
  },
  {
    title: "AI & Tools",
    skills: [
      { name: "Agentic AI", icon: "/img/skills/openAi-agent.png" },
      { name: "AI", icon: "/img/skills/ai.png" },
      { name: "Git & GitHub", icon: "/img/skills/git.png" },
      { name: "Framer Motion", icon: "/img/skills/framer-motion.png" },
    ],
  },
];

export const allSkills = skillCategories.flatMap((cat) => cat.skills.map((s) => s.name));

export interface Project {
  id: number;
  category: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  video?: string;
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    category: "AI Tool",
    title: "SmartNShine — ATS Resume Generator",
    description:
      "AI-powered ATS resume generator that crafts optimized resumes tailored to job descriptions. Full-stack app with AI integration for smart content suggestions and formatting.",
    tech: ["React", "Node.js", "Express", "AI/ML", "Tailwind"],
    image: "/img/smartnshine.png",
    github: "https://github.com/atharva038",
    live: "https://smartnshine.app",
  },
  {
    id: 2,
    category: "Website",
    title: "Zenith 26 — College Website",
    description:
      "Next-level college event website showcasing cutting-edge frontend design. A visual masterpiece with immersive animations, smooth transitions, and a bold creative direction.",
    tech: ["React", "Tailwind", "Framer Motion", "GSAP"],
    image: "/img/zenith.png",
    video: "/video/Gameverse.mov",
    live: "https://zenithsggs.com/gameverse",
    github: "https://github.com/atharva038",
  },
  {
    id: 3,
    category: "Platform",
    title: "KnockNFix",
    description:
      "A local service finder platform connecting users with trusted professionals. Features real-time search, map integration, and booking system.",
    tech: ["React", "Node.js", "MongoDB", "Mapbox", "Express"],
    image: "/img/knocknfix.png",
    github: "https://github.com/atharva038",
  },
];

export const stats = [
  { label: "Projects Built", value: "3+", piece: "rook" as const },
  { label: "Technologies", value: "12+", piece: "knight" as const },
  { label: "Chess Games", value: "500+", piece: "king" as const },
  { label: "Cups of Chai", value: "\u221E", piece: "pawn" as const },
];
