import {
  BlocksIcon,
  ChartColumnIcon,
  CodeXmlIcon,
  CreditCardIcon,
  DatabaseIcon,
  GaugeIcon,
  GitBranchIcon,
  GraduationCapIcon,
  KeyRoundIcon,
  LayersIcon,
  LayoutDashboardIcon,
  MonitorIcon,
  NetworkIcon,
  ServerIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  SmartphoneIcon,
  StoreIcon,
  UsersIcon,
  WalletIcon,
  WaypointsIcon,
  type LucideIcon,
} from "lucide-react";

export const profile = {
  name: "Sujan Lama",
  role: "Full Stack Developer",
  location: "Budhanilkantha, Kathmandu, Nepal",
  city: "Kathmandu, Nepal",
  email: "bomjan133@gmail.com",
  resumeUrl: "/Sujan-Lama-Resume.pdf",
  currentCompany: "Ambition Guru",
  careerStart: new Date(2022, 11, 1),
  focusAreas: [
    "scalable web applications",
    "multi-tenant platforms",
    "microservice architectures",
    "seamless user experiences",
  ],
  socials: {
    github: "https://github.com/Sujanbomjan",
    linkedin: "https://www.linkedin.com/in/sujan-bomjan-57767117a/",
  },
};

export function yearsOfExperience(now = new Date()) {
  const start = profile.careerStart;
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  return Math.max(1, Math.floor(months / 12));
}

export const navItems = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "architecture", label: "Architecture" },
  { id: "contact", label: "Contact" },
] as const;

export const bio = [
  "I'm a Full Stack Developer based in Kathmandu, Nepal. I started my career on the frontend — crafting responsive interfaces and reusable UI systems — and grew into owning features end to end, from database queries all the way to the pixels on screen.",
  "At Ambition Guru I work across Vue, React, Next.js and Django, where I built a Learning Management System (LMS) with CAS integration for centralized authentication — along with dynamic reporting, tuned PostgreSQL queries and role-based access control. Before that, as a frontend developer at Silk Innovation, I built the SajiloPay digital wallet with React and React Native, and the Sajilo RMS point-of-sale system with Next.js.",
  "Beyond features, I care about how systems fit together: microservice architecture, multi-tenant platforms and centralized authentication are the areas I focus on. I value clean, maintainable code and clear communication, and I'm always looking for feedback that helps me grow as an engineer.",
];

export type FocusArea = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const focusAreas: FocusArea[] = [
  {
    title: "Frontend Engineering",
    description:
      "Responsive web and mobile interfaces in React, Next.js, Vue and React Native, built on reusable component systems like form and table builders.",
    icon: CodeXmlIcon,
  },
  {
    title: "Backend & APIs",
    description:
      "Django applications, RESTful API integrations and PostgreSQL data models with queries optimized for performance.",
    icon: ServerIcon,
  },
  {
    title: "System Architecture",
    description:
      "Designing microservice-based, multi-tenant platforms that stay maintainable as products and teams grow.",
    icon: NetworkIcon,
  },
  {
    title: "Auth & Access Control",
    description:
      "Centralized authentication with CAS and role-based permissions that keep every user in the right lane.",
    icon: ShieldCheckIcon,
  },
];

export type Company = {
  name: string;
  url?: string;
};

export type WorkItem = {
  title: string;
  description: string;
  stack: string[];
  icon: LucideIcon;
  company?: Company;
  role?: string;
  category?: string;
  visual?: "sso" | "wallet" | "dashboard" | "shop";
  link?: {
    label: string;
    href: string;
    kind: "source" | "live";
  };
};

const ambitionGuru: Company = {
  name: "Ambition Guru",
  url: "https://www.ambition.guru/",
};
const silkInnovation: Company = {
  name: "Silk Innovation",
  url: "https://silkinnovation.com.np/",
};
const zetalabs: Company = { name: "Zetalabs" };

export const workItems: WorkItem[] = [
  {
    title: "Learning Management System with CAS",
    category: "Ed-tech · Single sign-on",
    company: ambitionGuru,
    role: "Full Stack Developer",
    description:
      "A Learning Management System integrated with CAS (Central Authentication Service), so users sign in once through a centralized, secure authentication flow.",
    stack: ["CAS", "Single Sign-On", "LMS"],
    icon: GraduationCapIcon,
    visual: "sso",
  },
  {
    title: "SajiloPay",
    category: "Fintech · Wallet",
    company: silkInnovation,
    role: "Frontend Developer",
    description:
      "Built the frontend of a digital wallet for seamless and secure financial transactions — React for the web app and React Native for mobile.",
    stack: ["React", "React Native"],
    icon: WalletIcon,
    visual: "wallet",
    link: {
      label: "Live site",
      href: "https://sajilopay.com.np/",
      kind: "live",
    },
  },
  {
    title: "Sajilo RMS",
    category: "Retail · POS",
    company: silkInnovation,
    role: "Frontend Developer",
    description:
      "Built the Next.js frontend of a Point of Sale system that helps retailers manage inventory, sales and reporting, with a focus on scalability and ease of use.",
    stack: ["Next.js"],
    icon: StoreIcon,
    visual: "dashboard",
    link: {
      label: "Source",
      href: "https://github.com/Sujanbomjan/pos_system",
      kind: "source",
    },
  },
  {
    title: "Aarya Arts",
    category: "E-commerce",
    role: "Independent project",
    description:
      "An e-commerce web application with product listings, a shopping cart, search and a fully responsive design.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    icon: ShoppingBagIcon,
    visual: "shop",
    link: {
      label: "Source",
      href: "https://github.com/Sujanbomjan/arts",
      kind: "source",
    },
  },
  {
    title: "Dynamic reporting & access control",
    company: ambitionGuru,
    description:
      "Dynamic report tables across all modules, PostgreSQL query optimization for better performance, and role-based access control with Django permissions.",
    stack: ["Django", "PostgreSQL", "RBAC"],
    icon: ChartColumnIcon,
  },
  {
    title: "Responsive, high-performance interfaces",
    company: zetalabs,
    description:
      "Responsive React and Tailwind CSS interfaces, API integrations delivered with backend developers, and performance work that cut load times and refined interactions.",
    stack: ["React", "Tailwind CSS", "REST APIs"],
    icon: GaugeIcon,
  },
  {
    title: "Reusable form & table builders",
    company: silkInnovation,
    description:
      "Form Builder and Table Builder components that streamlined UI development and improved maintainability, with seamless RESTful API integration.",
    stack: ["Component Design", "REST APIs", "Git"],
    icon: BlocksIcon,
  },
];

export const heroStats = [
  { value: `${yearsOfExperience()}+`, label: "Years of experience" },
  {
    value: String(
      new Set(workItems.flatMap((item) => item.company?.name ?? [])).size,
    ),
    label: "Companies",
  },
  { value: "10+", label: "Technologies" },
];

export type Education = {
  degree: string;
  institution: string;
  period: string;
  location: string;
};

export const education: Education[] = [
  {
    degree: "Bachelor in Computer Application (BCA)",
    institution: "Aadim National College",
    period: "2018 — 2024",
    location: "Kathmandu, Nepal",
  },
  {
    degree: "+2 (Higher Secondary)",
    institution: "Golden Gate International College",
    period: "2016 — 2018",
    location: "Kathmandu, Nepal",
  },
];

export type SkillGroup = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend & Mobile",
    description: "Interfaces that feel fast on every screen",
    icon: CodeXmlIcon,
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Vue.js",
      "React Native",
      "Tailwind CSS",
    ],
  },
  {
    id: "backend",
    title: "Backend & Data",
    description: "Reliable services and data layers",
    icon: DatabaseIcon,
    skills: ["Django", "REST APIs", "PostgreSQL", "Query Optimization"],
  },
  {
    id: "architecture",
    title: "Architecture",
    description: "Systems designed to scale",
    icon: LayersIcon,
    skills: ["System Architecture", "Microservices", "Multi-tenancy"],
  },
  {
    id: "security",
    title: "Auth & Security",
    description: "Identity and access done right",
    icon: KeyRoundIcon,
    skills: [
      "CAS (Central Authentication Service)",
      "Authentication & Authorization",
      "Role-Based Access Control",
    ],
  },
  {
    id: "workflow",
    title: "Tools & Workflow",
    description: "How I ship with a team",
    icon: GitBranchIcon,
    skills: [
      "Git",
      "Pull Requests & Code Review",
      "Agile Stand-ups",
      "Performance Optimization",
    ],
  },
];

export const softSkills = [
  "Communication",
  "Time Management",
  "Feedback & Self-Improvement",
];

export type Principle = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const architecturePrinciples: Principle[] = [
  {
    title: "Microservices",
    description:
      "Break products into focused, independently deployable services with clear API contracts, so teams can ship without stepping on each other.",
    icon: NetworkIcon,
  },
  {
    title: "Multi-tenancy",
    description:
      "One platform serving many organizations — with tenant-aware data isolation, configuration and scaling built in from day one.",
    icon: LayersIcon,
  },
  {
    title: "CAS & Single Sign-On",
    description:
      "A Central Authentication Service lets users sign in once and move securely across every application and service.",
    icon: KeyRoundIcon,
  },
  {
    title: "Role-based access",
    description:
      "Permissions enforced consistently at the API and the UI, so every user sees exactly what they're allowed to — nothing more.",
    icon: ShieldCheckIcon,
  },
];

export type DiagramNode = {
  label: string;
  icon: LucideIcon;
  highlight?: boolean;
};

export type DiagramLayer = {
  label: string;
  nodes: DiagramNode[];
  /** Annotation shown on the connector below this layer. */
  connector?: string;
};

export const architectureLayers: DiagramLayer[] = [
  {
    label: "Clients",
    nodes: [
      { label: "Web app", icon: MonitorIcon },
      { label: "Mobile app", icon: SmartphoneIcon },
      { label: "Admin portal", icon: LayoutDashboardIcon },
    ],
    connector: "HTTPS",
  },
  {
    label: "Edge & identity",
    nodes: [
      { label: "API Gateway", icon: WaypointsIcon, highlight: true },
      { label: "CAS · SSO", icon: KeyRoundIcon, highlight: true },
    ],
    connector: "tenant context · RBAC",
  },
  {
    label: "Services",
    nodes: [
      { label: "Users & roles", icon: UsersIcon },
      { label: "Courses", icon: GraduationCapIcon },
      { label: "Payments", icon: CreditCardIcon },
      { label: "Reports", icon: ChartColumnIcon },
    ],
    connector: "tenant-scoped queries",
  },
  {
    label: "Data · isolated per tenant",
    nodes: [
      { label: "Tenant A", icon: DatabaseIcon },
      { label: "Tenant B", icon: DatabaseIcon },
      { label: "Tenant C", icon: DatabaseIcon },
    ],
  },
];
