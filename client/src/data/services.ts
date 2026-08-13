export type Service = {
  id: string;
  number: string;
  name: string;
  short: string;
  description: string;
  deliverables: string[];
  useCases: string[];
};

export const services: Service[] = [
  {
    id: "web-design",
    number: "01",
    name: "Web Design",
    short: "User-focused interfaces designed around your brand, audience, and goals.",
    description:
      "We design interfaces that feel inevitable — clear structure, considered type, and a visual system that holds up under real use. Not decoration. Direction.",
    deliverables: [
      "Information architecture",
      "Visual system and typography",
      "High-fidelity page design",
      "Responsive layouts",
      "Component library",
      "Design handoff",
    ],
    useCases: [
      "New brand going online",
      "Product marketing sites",
      "Studio and professional services",
      "Founder-led companies",
    ],
  },
  {
    id: "web-development",
    number: "02",
    name: "Web Development",
    short: "Fast, responsive and scalable websites built with modern technologies.",
    description:
      "We build what we design. Clean React frontends, solid APIs, and pages that stay fast after launch — not just in a preview.",
    deliverables: [
      "Production frontend",
      "Responsive implementation",
      "CMS-free content structure",
      "Forms and integrations",
      "Performance pass",
      "Deployment setup",
    ],
    useCases: [
      "Marketing websites",
      "Content-led sites",
      "Multi-page studio sites",
      "Technical rebuilds",
    ],
  },
  {
    id: "ecommerce",
    number: "03",
    name: "E-commerce",
    short: "Conversion-focused online stores designed to make buying simple.",
    description:
      "Stores should feel as considered as the products they sell. We design the path from first look to checkout and build the system underneath.",
    deliverables: [
      "Catalog and product templates",
      "Cart and checkout flows",
      "Merchandising structure",
      "Responsive storefront",
      "Payment-ready integration plan",
      "Launch checklist",
    ],
    useCases: [
      "Independent retail brands",
      "Limited-run product lines",
      "Store redesigns",
      "Catalog-led businesses",
    ],
  },
  {
    id: "web-applications",
    number: "04",
    name: "Web Applications",
    short: "Custom web applications designed around your business requirements.",
    description:
      "When a website is no longer enough, we design and build tools — dashboards, portals, and internal products that match how the work actually happens.",
    deliverables: [
      "Requirements mapping",
      "Application UX",
      "Authenticated interfaces",
      "API design",
      "Role-based access",
      "Admin surfaces",
    ],
    useCases: [
      "Client portals",
      "Internal tools",
      "Operations consoles",
      "Data-entry products",
    ],
  },
  {
    id: "saas",
    number: "05",
    name: "SaaS Development",
    short: "From MVP to production-ready SaaS products.",
    description:
      "We help founders ship a first version that is real: accounts, billing-ready structure, and a product surface you can put in front of users.",
    deliverables: [
      "MVP scope",
      "Product interface",
      "Auth and sessions",
      "Core feature set",
      "API and data model",
      "Deployment pipeline",
    ],
    useCases: [
      "Pre-seed / seed products",
      "Internal SaaS spinouts",
      "Rebuilding a prototype",
      "Version-one launches",
    ],
  },
  {
    id: "redesign",
    number: "06",
    name: "Website Redesign",
    short: "Transform outdated websites into modern digital experiences.",
    description:
      "We take what already exists — the offer, the content, the constraints — and rebuild the experience so it matches the business you have now.",
    deliverables: [
      "Current-site audit",
      "Content inventory",
      "New information architecture",
      "Redesign and rebuild",
      "Redirect and SEO hygiene",
      "Launch and handover",
    ],
    useCases: [
      "Outdated marketing sites",
      "Rebrands",
      "Slow or fragile stacks",
      "Sites that no longer convert",
    ],
  },
];
