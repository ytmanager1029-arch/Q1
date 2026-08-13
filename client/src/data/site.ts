export const site = {
  name: "Quadrick",
  legalName: "Quadrick",
  tagline: "Digital experiences built to move businesses forward.",
  description:
    "Quadrick designs and develops high-performance websites and web applications for ambitious businesses, startups, and founders.",
  email: "hello@quadrick.dev",
  location: "Remote — available worldwide",
  availability: "Available for new projects",
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footerNav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  trust: ["Design", "Development", "Performance", "Digital products"],
  projectTypes: [
    "Website",
    "E-commerce",
    "Web Application",
    "SaaS",
    "Landing Page",
    "Redesign",
    "Other",
  ] as const,
  budgets: ["To be discussed", "Under $8k", "$8k–$15k", "$15k–$30k", "$30k–$60k", "$60k+"],
  timelines: ["As soon as possible", "4–6 weeks", "6–10 weeks", "10–16 weeks", "Flexible"],
  sources: ["Referral", "Search", "Social", "Directory", "Existing client", "Other"],
};

export const siteUrl = (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "") || "";

export type ProjectType = (typeof site.projectTypes)[number];
