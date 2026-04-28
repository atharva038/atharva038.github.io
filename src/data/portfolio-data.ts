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
  email: "atharvasjoshi2005@gmail.com",
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

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface ChallengeItem {
  title: string;
  description: string;
}

export interface TechCategory {
  category: string;
  items: string[];
}

export interface ArchLayer {
  id: string;
  label: string;
  color: "blue" | "green" | "orange" | "purple" | "pink";
  items: string[];
  isIntegration?: boolean;
}

export interface CaseStudy {
  tagline: string;
  tags: string[];
  overview: string;
  problem: string[];
  solution: string;
  architecture: ArchLayer[];
  features: FeatureItem[];
  challenges: ChallengeItem[];
  techStack: TechCategory[];
}

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
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  {
    id: 3,
    category: "Platform",
    title: "KnockNFix",
    description:
      "A local service finder platform connecting users with trusted professionals. Features real-time search, map integration, and booking system.",
    tech: ["React", "Node.js", "MongoDB", "Mapbox", "Express"],
    image: "/img/knocknfix.webp",
    github: "https://github.com/atharva038",
    live: "https://knocknfix.live",
    caseStudy: {
      tagline: "Local Service Marketplace for Tier-2 Cities",
      tags: ["Marketplace", "Payments", "Location"],
      overview:
        "KnockNFix connects users in Tier-2 and Tier-3 cities with trusted local service professionals. Built a complete two-sided marketplace with location-based matching, deposit payment flows, and an admin commission engine — all from scratch. Won 1st place at MIT Aurangabad Shark Tank and selected by SARVAH Incubation Foundation.",
      problem: [
        "No reliable platform for local service discovery in smaller Indian cities — everything was word-of-mouth.",
        "Zero pricing transparency or trust signals for service providers, leading to frequent disputes.",
        "No escrow or deposit system, making payment disputes hard to resolve fairly.",
        "Providers had no digital presence and no way to scale their reach beyond their neighborhood.",
      ],
      solution:
        "Built a full-stack marketplace where users post service requests and nearby providers respond with quotes. Implemented a deposit-first payment flow using Stripe, with automatic commission deduction on job completion. Used Mapbox to display providers on a live map with proximity ranking. The admin dashboard gives real-time visibility into bookings, disputes, and platform revenue.",
      architecture: [
        { id: "fe", label: "Frontend", color: "blue", items: ["React", "Tailwind CSS", "Framer Motion"] },
        { id: "be", label: "Backend", color: "green", items: ["Node.js", "Express.js", "JWT Auth"] },
        { id: "db", label: "Database", color: "orange", items: ["MongoDB", "Mongoose"] },
        { id: "ext", label: "Integrations", color: "purple", items: ["Mapbox SDK", "Stripe API", "Cloudinary"], isIntegration: true },
      ],
      features: [
        { icon: "MapPin", title: "Location-Based Matching", description: "Providers ranked and displayed by proximity using Mapbox geolocation and 2dsphere indexes." },
        { icon: "CreditCard", title: "Deposit Payment Logic", description: "Users pay a security deposit upfront, held until job completion then released to provider." },
        { icon: "Percent", title: "Commission Engine", description: "Automated platform commission deduction on each completed transaction via Stripe webhooks." },
        { icon: "LayoutDashboard", title: "Admin Dashboard", description: "Full visibility into bookings, provider management, disputes, and real-time revenue tracking." },
        { icon: "Zap", title: "Real-Time Updates", description: "Live booking status updates pushed to both users and providers without page refresh." },
        { icon: "ShieldCheck", title: "Provider Verification", description: "Manual verification workflow with document upload, admin review, and status tracking." },
      ],
      challenges: [
        {
          title: "Payment Logic Complexity",
          description:
            "Designing the deposit-hold → job-complete → commission-deduct flow required careful state management and idempotent Stripe webhook handling to prevent double charges or missed deductions.",
        },
        {
          title: "Async Race Conditions",
          description:
            "Simultaneous provider accepts on the same booking could cause conflicts. Solved with MongoDB atomic findOneAndUpdate operations and optimistic locking to guarantee exactly-once booking assignment.",
        },
        {
          title: "Location Query Performance",
          description:
            "Initial geospatial queries were slow at ~800ms. Added MongoDB 2dsphere indexes, result caching, and bounding-box pre-filters to reduce median query time to ~120ms.",
        },
        {
          title: "State Management at Scale",
          description:
            "Managing booking state across user, provider, and admin views without stale reads required a clean reducer pattern with server-state synchronization on every transition.",
        },
      ],
      techStack: [
        { category: "Frontend", items: ["React", "Tailwind CSS", "Framer Motion", "React Router"] },
        { category: "Backend", items: ["Node.js", "Express.js", "JWT Auth", "Multer"] },
        { category: "Database", items: ["MongoDB", "Mongoose"] },
        { category: "Integrations", items: ["Mapbox SDK", "Stripe API", "Cloudinary"] },
      ],
    },
  },
  {
    id: 4,
    category: "AI Tool",
    title: "Medisage",
    description:
      "Agentic AI solution for pharmacists that assists with medicine intelligence, safer dispensing, and quick clinical guidance workflows. Deployed on a VPS for reliable production access.",
    tech: ["React", "Node.js", "Express", "Agentic AI", "MongoDB"],
    image: "/img/medisage.webp",
    github: "https://github.com/atharva038",
    live: "https://medisage.me",
    caseStudy: {
      tagline: "Agentic AI Copilot for Pharmacists",
      tags: ["Healthcare AI", "Agentic AI", "VPS Deployment"],
      overview:
        "Medisage is an agentic AI platform built for pharmacists to speed up medicine lookups, reduce dispensing errors, and improve patient counseling quality. The production app is deployed on a VPS for full control over uptime, security configuration, and backend scaling.",
      problem: [
        "Pharmacists lose time switching between drug references during busy dispensing hours.",
        "Manual cross-checking of interactions and dosage guidance can cause delays and risk oversight.",
        "Smaller clinics and pharmacies often lack affordable AI tooling tailored to pharmacy workflows.",
      ],
      solution:
        "Built an agentic AI assistant that can interpret medication queries, check key safety signals, and provide concise, workflow-ready outputs for pharmacists. Added a role-oriented UX and deployed the full stack on a VPS with process management and reverse proxy setup for stable real-world usage.",
      architecture: [
        { id: "fe", label: "Frontend", color: "blue", items: ["React", "Tailwind CSS"] },
        { id: "be", label: "Backend", color: "green", items: ["Node.js", "Express.js", "Auth"] },
        { id: "ai", label: "AI Agents", color: "purple", items: ["LLM API", "Agent Orchestration"] },
        { id: "ops", label: "Deployment", color: "orange", items: ["Linux VPS", "Nginx", "PM2"], isIntegration: true },
      ],
      features: [
        { icon: "Sparkles", title: "Agentic Query Handling", description: "Handles pharmacist prompts with multi-step reasoning to return concise, usable guidance." },
        { icon: "Target", title: "Medication Safety Focus", description: "Highlights key checks like interaction signals and usage considerations in a clear format." },
        { icon: "LayoutDashboard", title: "Workflow-Ready Dashboard", description: "Simple pharmacist-first interface for fast search, history review, and response tracking." },
        { icon: "Zap", title: "VPS Production Hosting", description: "Deployed on a VPS with Nginx and PM2 for consistent uptime and direct infrastructure control." },
      ],
      challenges: [
        {
          title: "Domain Accuracy",
          description:
            "Healthcare responses required strict prompt constraints and response shaping to reduce ambiguity and improve consistency in pharmacist-facing outputs.",
        },
        {
          title: "Latency Under Load",
          description:
            "Optimized request handling and caching so pharmacists receive quick responses during high-traffic hours.",
        },
        {
          title: "Secure VPS Operations",
          description:
            "Configured HTTPS, process supervision, and server hardening practices to keep the deployment stable and secure.",
        },
      ],
      techStack: [
        { category: "Frontend", items: ["React", "Tailwind CSS"] },
        { category: "Backend", items: ["Node.js", "Express.js", "MongoDB"] },
        { category: "AI", items: ["LLM API", "Agentic Orchestration", "Prompt Engineering"] },
        { category: "Deployment", items: ["Linux VPS", "Nginx", "PM2", "SSL"] },
      ],
    },
  },
  {
    id: 1,
    category: "AI Tool",
    title: "SmartNShine",
    description:
      "AI-powered ATS resume generator that crafts optimized resumes tailored to job descriptions. Full-stack app with AI integration for smart content suggestions and formatting.",
    tech: ["React", "Node.js", "Express", "AI/ML", "Tailwind"],
    image: "/img/smartnshine.webp",
    github: "https://github.com/atharva038",
    live: "https://smartnshine.app",
    caseStudy: {
      tagline: "AI-Powered ATS Resume Optimizer",
      tags: ["AI Tool", "SaaS", "Career Tech"],
      overview:
        "SmartNShine generates ATS-optimized resumes tailored to specific job descriptions using AI. Users paste a job description, fill in their experience, and get a fully formatted, keyword-rich resume in seconds — ready to pass any ATS filter.",
      problem: [
        "Most resumes are rejected by ATS systems before a human ever reads them — often due to missing keywords.",
        "Job seekers don't know which specific skills and phrases to include for each unique role.",
        "Resume formatting is inconsistent and time-consuming to get right across different templates.",
        "Generic templates don't adapt to specific job requirements, lowering match scores significantly.",
      ],
      solution:
        "Built a full-stack AI tool that analyzes job descriptions to extract critical keywords and requirements, then generates tailored resume content using AI. The system produces clean, ATS-friendly formatted output with one-click PDF and DOCX export.",
      architecture: [
        { id: "fe", label: "Frontend", color: "blue", items: ["React", "Tailwind CSS"] },
        { id: "be", label: "Backend", color: "green", items: ["Node.js", "Express.js"] },
        { id: "ai", label: "AI Layer", color: "purple", items: ["OpenAI API", "Prompt Engine"] },
        { id: "out", label: "Output", color: "orange", items: ["PDF Generation", "DOCX Export"], isIntegration: true },
      ],
      features: [
        { icon: "Sparkles", title: "AI Content Generation", description: "AI analyzes your experience and the JD to write tailored bullet points that match the role's exact requirements." },
        { icon: "Target", title: "Keyword Extraction", description: "Automatically extracts must-have keywords from the job description to guarantee ATS compliance." },
        { icon: "FileText", title: "Smart Formatting", description: "Generates clean, professional layouts optimized for both ATS parsing and human readability." },
        { icon: "Download", title: "One-Click Export", description: "Export your tailored resume as PDF or DOCX instantly, ready to submit." },
      ],
      challenges: [
        {
          title: "Prompt Engineering for Consistency",
          description:
            "Getting AI to produce structured, reliable output required iterative prompt refinement with JSON schema enforcement and retry logic with validation to handle malformed responses gracefully.",
        },
        {
          title: "PDF Layout Precision",
          description:
            "Translating dynamic AI-generated content into pixel-perfect PDF layouts without overflow or clipping issues required a custom rendering pipeline with line-height normalization.",
        },
        {
          title: "Rate Limiting & Cost Control",
          description:
            "Implemented client-side request deduplication, response caching, and smart batching to minimize unnecessary API calls and keep operational costs predictable at scale.",
        },
      ],
      techStack: [
        { category: "Frontend", items: ["React", "Tailwind CSS"] },
        { category: "Backend", items: ["Node.js", "Express.js"] },
        { category: "AI", items: ["OpenAI API", "Prompt Engineering"] },
        { category: "Export", items: ["PDF Generation", "DOCX Export"] },
      ],
    },
  },
  {
    id: 2,
    category: "Website",
    title: "Zenith 26",
    description:
      "Next-level college event website showcasing cutting-edge frontend design with immersive 3D moments using Three.js and React Three Fiber.",
    tech: ["React", "Tailwind", "Framer Motion", "GSAP", "Three.js", "React Three Fiber"],
    image: "/img/zenith.webp",
    video: "https://res.cloudinary.com/djohaxwla/video/upload/v1771379448/Gameverse.mp4",
    live: "https://zenithsggs.com/gameverse",
    github: "https://github.com/atharva038",
    caseStudy: {
      tagline: "Immersive Tech Fest Website",
      tags: ["Project Lead", "Animation", "High-Traffic Ready"],
      overview:
        "Official website for SGGSIET's tech fest Zenith 26. Architected and led the entire frontend — from design system to deployment. Built for real event traffic with immersive GSAP scroll animations, Framer Motion transitions, and a bold custom design language. Zero templates. Built from scratch.",
      problem: [
        "College event websites are typically static, templated, and fail to generate genuine excitement.",
        "No existing tech fest site captured the energy and scale Zenith 26 deserved.",
        "Tight timeline — needed to ship a polished, high-traffic-ready site quickly with a team.",
        "Required coordinating multiple developers with varying skill levels under a single design vision.",
      ],
      solution:
        "Designed and built a fully custom frontend from scratch with zero templates. Used GSAP ScrollTrigger for complex scroll-based animations, Framer Motion for component transitions, and Three.js scenes with React Three Fiber for immersive visual moments. Established component contracts for the team and deployed on Vercel with CI/CD.",
      architecture: [
        { id: "ui", label: "UI Layer", color: "blue", items: ["React", "Tailwind CSS", "Custom DS"] },
        { id: "anim", label: "Animation", color: "purple", items: ["GSAP", "Framer Motion"] },
        { id: "three", label: "3D Layer", color: "pink", items: ["Three.js", "React Three Fiber"] },
        { id: "build", label: "Build", color: "green", items: ["Vite", "TypeScript"] },
        { id: "deploy", label: "Deployment", color: "orange", items: ["Vercel", "GitHub CI"], isIntegration: true },
      ],
      features: [
        { icon: "Layers", title: "Scroll-Driven Animations", description: "GSAP ScrollTrigger animations that react to scroll position for a cinematic, immersive experience." },
        { icon: "Palette", title: "Custom Design System", description: "Built consistent design tokens, components, and motion primitives used across the entire site." },
        { icon: "Zap", title: "Performance at Scale", description: "Optimized for high event-day traffic with lazy loading, code splitting, and Vercel edge CDN." },
        { icon: "Users", title: "Team Coordination", description: "Led and coordinated frontend developers with shared code standards, review processes, and design specs." },
      ],
      challenges: [
        {
          title: "Animation Performance on Low-End Devices",
          description:
            "GSAP animations caused janky scrolling on lower-end devices. Fixed by restricting to GPU-composited CSS properties only (transform, opacity), and reducing animation complexity on mobile via responsive breakpoints.",
        },
        {
          title: "Team Coordination Under Deadline",
          description:
            "Coordinating multiple developers on a tight timeline required clear component contracts, shared Tailwind design tokens, atomic PR reviews, and daily sync standups to prevent integration conflicts.",
        },
        {
          title: "Traffic Spike on Event Day",
          description:
            "The site saw a 10x traffic spike during the event. Pre-deployment load testing on Vercel's edge network, static asset optimization, and aggressive image compression ensured zero downtime.",
        },
      ],
      techStack: [
        { category: "Frontend", items: ["React", "Tailwind CSS"] },
        { category: "Animation", items: ["GSAP", "Framer Motion"] },
        { category: "3D", items: ["Three.js", "React Three Fiber"] },
        { category: "Build", items: ["Vite", "TypeScript"] },
        { category: "Deploy", items: ["Vercel", "GitHub CI"] },
      ],
    },
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
    role: "Project Lead",
    organization: "Zenith 26 — College Tech Fest",
    duration: "2025 — 2026",
    description:
      "Led the frontend development of the official college tech fest website. Designed immersive UI with cutting-edge animations and a bold creative direction.",
    highlights: [
      "Architected the entire frontend from scratch",
      "Integrated GSAP & Framer Motion animations",
      "Handled real event-day traffic during Zenith 26",
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
  piece?: "king" | "queen" | "rook" | "knight" | "bishop" | "pawn";
  image?: string;
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
    piece: "king",
    image: "/achievments/Shark-Tank-Image.png",
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
    piece: "queen",
    image: "/achievments/sarvah.png",
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
    piece: "knight",
    image: "/achievments/Hackathon.png",
  },
  {
    id: 5,
    title: "Real Event Registrations — Zenith 26",
    event: "SGGSIE&T College Tech Fest · Marathon & Main Event",
    year: "2026",
    description:
      "Built and managed live registration flows for both the Marathon event and the main Zenith 26 tech fest. Real participants registered through the platform under actual event pressure — no dry run, no test data.",
    icon: "flame",
    piece: "bishop",
    image: "/achievments/Real-Event-Registration.png",
  },
  {
    id: 6,
    title: "3+ Production Apps Shipped",
    event: "Full-Stack Development",
    year: "2024 — Present",
    description:
      "Built and shipped multiple full-stack applications from scratch — SmartNShine (AI resume builder), KnockNFix (service platform), and Zenith 26 — all solving real-world problems.",
    icon: "medal",
    piece: "pawn",
  },
];

export const stats = [
  { label: "Projects Built", value: "3+", piece: "rook" as const },
  { label: "Technologies", value: "12+", piece: "knight" as const },
  { label: "Chess Games", value: "500+", piece: "king" as const },
  { label: "Cups of Chai", value: "\u221E", piece: "pawn" as const },
];
