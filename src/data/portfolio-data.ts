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
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
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
    video: "https://res.cloudinary.com/djohaxwla/video/upload/v1771379448/Gameverse.mp4",
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

export interface ExperienceItem {
  id: number;
  type: "work" | "education" | "achievement";
  role: string;
  organization: string;
  duration: string;
  description: string;
  highlights: string[];
  tech?: string[];
  piece: "king" | "queen" | "rook" | "knight" | "bishop" | "pawn";
}

export const experiences: ExperienceItem[] = [
  {
    id: 1,
    type: "work",
    role: "Head of Technology",
    organization: "Tinrec",
    duration: "Feb 2025 — Sep 2025",
    description:
      "Led the technology division, overseeing full-stack development and technical strategy. Drove engineering decisions, architecture planning, and team coordination across projects.",
    highlights: [
      "Led technical strategy and architecture decisions",
      "Managed and mentored the development team",
      "8 months of hands-on leadership experience",
    ],
    tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind"],
    piece: "king",
  },
  {
    id: 2,
    type: "work",
    role: "Full-Stack Developer",
    organization: "Freelance",
    duration: "Apr 2025 — Jun 2025",
    description:
      "Developed a complete Billing and Management Platform from scratch as a freelance project — handling frontend, backend, and database architecture end-to-end.",
    highlights: [
      "Built a responsive Admin Dashboard for managing users, services & transactions",
      "Designed and implemented RESTful APIs with Node.js & Express.js",
      "Managed data using MongoDB with Mongoose",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Mongoose"],
    piece: "queen",
  },
  {
    id: 3,
    type: "work",
    role: "Frontend Lead",
    organization: "Zenith 26 — College Tech Fest",
    duration: "2025 — 2026",
    description:
      "Led the frontend development of the official college tech fest website. Designed immersive UI with cutting-edge animations and a bold creative direction.",
    highlights: [
      "Architected the entire frontend from scratch",
      "Integrated GSAP & Framer Motion animations",
      "10K+ visitors during the event",
    ],
    tech: ["React", "Tailwind", "Framer Motion", "GSAP"],
    piece: "rook",
  },
  {
    id: 4,
    type: "education",
    role: "B.Tech — Computer Science",
    organization: "SGGSIET, Nanded",
    duration: "2023 — Present",
    description:
      "Pursuing my degree while building real-world projects and sharpening my full-stack development skills. Active in tech communities, hackathons, and startup competitions.",
    highlights: [
      "Built 3+ full-stack production apps",
      "Multiple hackathon & competition wins",
      "Tech community leader & mentor",
    ],
    piece: "knight",
  },
];

export interface AchievementItem {
  id: number;
  title: string;
  event: string;
  year: string;
  description: string;
  icon: "trophy" | "medal" | "star" | "flame" | "crown" | "zap";
  rank?: string;
}

export const achievements: AchievementItem[] = [
  {
    id: 1,
    title: "1st Place — Shark Tank Competition",
    event: "MIT Aurangabad",
    year: "2025",
    description:
      "Team EdgeEvolution won first place pitching KnockNFix — a hyperlocal service booking platform for Tier-2 and Tier-3 cities. Led the team, built and defended the business model in front of seasoned judges and industry mentors.",
    icon: "trophy",
    rank: "1st Place",
  },
  {
    id: 2,
    title: "Winning Idea — SARVAH Innovation Challenge",
    event: "IIC, SGGSIE&T & SARVAH Incubation Foundation",
    year: "2025",
    description:
      "KnockNFix was selected as one of the winning ideas at the Innovation Challenge organized by SARVAH Incubation Foundation and SGGSIE&T, Nanded. Now growing under the guidance of SARVAH Incubation Foundation.",
    icon: "crown",
    rank: "Winner",
  },
  {
    id: 3,
    title: "Top 16 out of 80 Teams — First Hackathon",
    event: "SWAG x GDG Hackathon",
    year: "2025",
    description:
      "Team Coder's Crew built an Automated Paperless Transparent College System with features like anonymous complaints, budget tracking, facility booking, and more. Frontend design was highly appreciated by judges for its clean UI and smooth UX.",
    icon: "star",
    rank: "Top 16",
  },
  {
    id: 4,
    title: "Head of Technology — Tinrec",
    event: "8-Month Leadership Role",
    year: "2025",
    description:
      "Led the technology division at Tinrec for 8 months, overseeing full-stack development, technical strategy, and engineering decisions across the organization.",
    icon: "zap",
    rank: "Lead",
  },
  {
    id: 5,
    title: "10K+ Visitors — Zenith 26 Website",
    event: "SGGSIE&T College Tech Fest",
    year: "2026",
    description:
      "Architected and led the frontend for the official Zenith 26 tech fest website. The site served 10K+ visitors with immersive GSAP and Framer Motion animations.",
    icon: "flame",
  },
  {
    id: 6,
    title: "3+ Production Apps Shipped",
    event: "Full-Stack Development",
    year: "2024 — Present",
    description:
      "Built and shipped multiple full-stack applications from scratch — SmartNShine (AI resume builder), KnockNFix (service platform), and Zenith 26 — all solving real-world problems.",
    icon: "medal",
  },
];

export const stats = [
  { label: "Projects Built", value: "3+", piece: "rook" as const },
  { label: "Technologies", value: "12+", piece: "knight" as const },
  { label: "Chess Games", value: "500+", piece: "king" as const },
  { label: "Cups of Chai", value: "\u221E", piece: "pawn" as const },
];
