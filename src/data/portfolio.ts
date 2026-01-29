// Skills Data
export interface Skill {
  name: string;
  icon: string;
  level: number; // 1-5
}

export interface SkillCategory {
  name: string;
  color: string;
  skills: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    name: 'Frontend',
    color: '#00a8e8',
    skills: [
      { name: 'React', icon: '⚛️', level: 5 },
      { name: 'Next.js', icon: '▲', level: 5 },
      { name: 'TypeScript', icon: '📘', level: 4 },
      { name: 'Tailwind CSS', icon: '🎨', level: 5 },
      { name: 'Three.js', icon: '🎮', level: 3 },
      { name: 'Framer Motion', icon: '✨', level: 4 },
    ],
  },
  {
    name: 'Backend',
    color: '#00d68f',
    skills: [
      { name: 'Node.js', icon: '🟢', level: 5 },
      { name: 'Express', icon: '🚂', level: 4 },
      { name: 'Python', icon: '🐍', level: 4 },
      { name: 'GraphQL', icon: '◈', level: 3 },
      { name: 'REST APIs', icon: '🔗', level: 5 },
      { name: 'WebSockets', icon: '🔌', level: 4 },
    ],
  },
  {
    name: 'Databases',
    color: '#ffd700',
    skills: [
      { name: 'PostgreSQL', icon: '🐘', level: 4 },
      { name: 'MongoDB', icon: '🍃', level: 5 },
      { name: 'Redis', icon: '🔴', level: 3 },
      { name: 'Prisma', icon: '△', level: 4 },
      { name: 'Firebase', icon: '🔥', level: 4 },
    ],
  },
  {
    name: 'Tools',
    color: '#a55eea',
    skills: [
      { name: 'Git', icon: '📦', level: 5 },
      { name: 'Docker', icon: '🐳', level: 3 },
      { name: 'AWS', icon: '☁️', level: 3 },
      { name: 'Vercel', icon: '▲', level: 5 },
      { name: 'Figma', icon: '🎭', level: 4 },
      { name: 'VS Code', icon: '💻', level: 5 },
    ],
  },
];

// Projects Data
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  techStack: string[];
  outcome: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  color: string;
}

export const projectsData: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    subtitle: 'Full-Stack Shopping Experience',
    problem: 'Small businesses struggled with expensive e-commerce solutions that lacked customization.',
    solution: 'Built a headless e-commerce platform with Next.js, enabling businesses to have full control over their frontend while using a powerful backend.',
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    outcome: 'Reduced development costs by 60% for 5+ clients, processed $100k+ in transactions.',
    image: '/projects/ecommerce.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    color: '#00a8e8',
  },
  {
    id: 'project-2',
    title: 'Real-Time Collaboration',
    subtitle: 'Team Productivity Suite',
    problem: 'Remote teams needed a unified platform for document collaboration with real-time sync.',
    solution: 'Developed a collaborative workspace using WebSockets and CRDT for conflict-free real-time editing.',
    techStack: ['React', 'Socket.io', 'MongoDB', 'Redis', 'Docker'],
    outcome: 'Used by 500+ daily active users with 99.9% uptime and <100ms sync latency.',
    image: '/projects/collaboration.jpg',
    githubUrl: 'https://github.com',
    color: '#00d68f',
  },
  {
    id: 'project-3',
    title: 'AI Content Generator',
    subtitle: 'GPT-Powered Writing Assistant',
    problem: 'Content creators spent hours on repetitive writing tasks and ideation.',
    solution: 'Created an AI-powered tool that generates, refines, and optimizes content based on user inputs and style preferences.',
    techStack: ['Next.js', 'OpenAI API', 'Prisma', 'PostgreSQL', 'Vercel'],
    outcome: 'Saved users 10+ hours weekly, generated 50k+ pieces of content.',
    image: '/projects/ai-content.jpg',
    liveUrl: 'https://example.com',
    color: '#ffd700',
  },
  {
    id: 'project-4',
    title: 'Fitness Tracker App',
    subtitle: 'Mobile-First Health Platform',
    problem: 'Existing fitness apps were bloated with features users never used.',
    solution: 'Built a minimalist fitness tracker focusing on core features: workout logging, progress visualization, and goal tracking.',
    techStack: ['React Native', 'Node.js', 'MongoDB', 'Chart.js'],
    outcome: '10k+ downloads, 4.5-star rating, featured in App Store Health category.',
    image: '/projects/fitness.jpg',
    githubUrl: 'https://github.com',
    color: '#ff9f43',
  },
];

// Achievements Data
export interface Achievement {
  id: string;
  title: string;
  category: 'startup' | 'hackathon' | 'competition' | 'certification';
  description: string;
  date: string;
  highlight: string;
  icon: string;
}

export const achievementsData: Achievement[] = [
  {
    id: 'ach-1',
    title: 'TechCrunch Disrupt Finalist',
    category: 'startup',
    description: 'Co-founded a startup that made it to the top 10 at TechCrunch Disrupt, pitching our AI-powered education platform.',
    date: '2024',
    highlight: 'Top 10 out of 500+ startups',
    icon: '🚀',
  },
  {
    id: 'ach-2',
    title: 'HackMIT Winner',
    category: 'hackathon',
    description: 'Led a team of 4 to build a climate change visualization tool in 36 hours, winning first place.',
    date: '2023',
    highlight: '1st Place - $10,000 Prize',
    icon: '🏆',
  },
  {
    id: 'ach-3',
    title: 'Google Summer of Code',
    category: 'competition',
    description: 'Selected as a GSoC contributor, working on improving accessibility features for an open-source design tool.',
    date: '2023',
    highlight: 'Selected from 5000+ applicants',
    icon: '🎯',
  },
  {
    id: 'ach-4',
    title: 'AWS Solutions Architect',
    category: 'certification',
    description: 'Achieved AWS Solutions Architect Professional certification, demonstrating cloud architecture expertise.',
    date: '2024',
    highlight: 'Professional Level',
    icon: '☁️',
  },
  {
    id: 'ach-5',
    title: 'Product Hunt #1',
    category: 'startup',
    description: 'Launched a developer productivity tool that reached #1 Product of the Day with 1000+ upvotes.',
    date: '2024',
    highlight: '#1 Product of the Day',
    icon: '🎉',
  },
];

// Timeline Data
export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  type: 'work' | 'education' | 'milestone';
  skills: string[];
}

export const timelineData: TimelineItem[] = [
  {
    id: 'tl-1',
    year: '2024',
    title: 'Senior Frontend Developer',
    company: 'Tech Innovators Inc.',
    description: 'Leading frontend architecture for enterprise applications, mentoring junior developers, and driving technical decisions.',
    type: 'work',
    skills: ['React', 'TypeScript', 'System Design', 'Team Leadership'],
  },
  {
    id: 'tl-2',
    year: '2023',
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    description: 'Built and scaled the core product from 0 to 50k users, implemented CI/CD pipelines, and integrated third-party APIs.',
    type: 'work',
    skills: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS'],
  },
  {
    id: 'tl-3',
    year: '2022',
    title: 'Frontend Developer Intern',
    company: 'Digital Agency Co.',
    description: 'Developed responsive web applications for clients, learned industry best practices, and contributed to design system.',
    type: 'work',
    skills: ['React', 'CSS', 'JavaScript', 'Figma'],
  },
  {
    id: 'tl-4',
    year: '2022',
    title: 'Bachelor of Computer Science',
    company: 'University of Technology',
    description: 'Graduated with honors, specialized in software engineering and human-computer interaction.',
    type: 'education',
    skills: ['Algorithms', 'Data Structures', 'Software Engineering', 'HCI'],
  },
  {
    id: 'tl-5',
    year: '2021',
    title: 'Started Coding Journey',
    company: 'Self-Taught',
    description: 'Discovered passion for web development, completed online courses, and built first projects.',
    type: 'milestone',
    skills: ['HTML', 'CSS', 'JavaScript', 'Problem Solving'],
  },
];

// Contact Data
export const contactData = {
  email: 'atharva@example.com',
  github: 'https://github.com/atharva',
  linkedin: 'https://linkedin.com/in/atharva',
  twitter: 'https://twitter.com/atharva',
  resume: '/resume.pdf',
};
