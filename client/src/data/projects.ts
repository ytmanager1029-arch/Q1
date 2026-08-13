export type ProjectCategory = "Websites" | "E-commerce" | "Web Apps" | "SaaS";

export type Project = {
  slug: string;
  name: string;
  industry: string;
  category: ProjectCategory;
  services: string[];
  year: string;
  description: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  technologies: string[];
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
  placeholder: boolean;
};

export const projectCategories: Array<"All" | ProjectCategory> = [
  "All",
  "Websites",
  "E-commerce",
  "Web Apps",
  "SaaS",
];

export const projects: Project[] = [
  {
    slug: "northline-atlas",
    name: "Northline Atlas",
    industry: "Operations software",
    category: "SaaS",
    services: ["Product design", "SaaS development"],
    year: "2025",
    description: "A focused operations console for teams who outgrew their spreadsheets.",
    summary:
      "Sample case. A quiet, dense product surface for planning, exceptions, and daily run-state — designed to stay readable at speed.",
    challenge:
      "The existing workflow lived in shared sheets and chat. The work was clear. The interface was not.",
    approach:
      "We mapped the real daily loop first, then designed a single console: status, exceptions, and the next action. Type and density did the heavy lifting.",
    outcome:
      "A production-ready product surface ready for a first set of users. Placeholder case — replace with a live engagement.",
    technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
    image: "/images/work/northline.jpg",
    imageAlt: "Brutalist concrete corridor with a single slit of daylight",
    gallery: [
      { src: "/images/work/northline.jpg", alt: "Concrete corridor, slit of light" },
      { src: "/images/work/northline-2.jpg", alt: "Concrete meeting a black steel rail" },
    ],
    placeholder: true,
  },
  {
    slug: "meridian-atelier",
    name: "Meridian Atelier",
    industry: "Apparel",
    category: "E-commerce",
    services: ["Web design", "E-commerce"],
    year: "2025",
    description: "A storefront for a small atelier that needed the site to feel like the cloth.",
    summary:
      "Sample case. An editorial shop: large stills, little chrome, a buying path that stays out of the way.",
    challenge:
      "Template storefronts made a careful product feel generic. The brand needed space, not badges.",
    approach:
      "We built the catalog as a lookbook. Product pages keep type quiet and photography large. Checkout is short on purpose.",
    outcome:
      "A storefront that can carry a seasonal line without looking like a theme. Placeholder case — replace with a live engagement.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    image: "/images/work/meridian.jpg",
    imageAlt: "Folded wool and linen on a stone atelier table",
    gallery: [
      { src: "/images/work/meridian.jpg", alt: "Wool and linen still life" },
      { src: "/images/work/meridian-2.jpg", alt: "Hanging garments in an atelier" },
    ],
    placeholder: true,
  },
  {
    slug: "hollow-and-field",
    name: "Hollow & Field",
    industry: "Landscape practice",
    category: "Websites",
    services: ["Web design", "Web development"],
    year: "2024",
    description: "A studio site for a landscape practice that works slowly and on site.",
    summary:
      "Sample case. Long images, short sentences, a site that behaves like a monograph rather than a brochure.",
    challenge:
      "The previous site explained too much and showed too little. The work is visual. The words should recede.",
    approach:
      "We used a single editorial grid and let the photographs set the pace. Project pages are spare: place, year, a note, the work.",
    outcome:
      "A website that can hold a decade of projects without filling up. Placeholder case — replace with a live engagement.",
    technologies: ["React", "TypeScript", "Vite"],
    image: "/images/work/hollow.jpg",
    imageAlt: "Fog over a winter field and a distant tree line",
    gallery: [{ src: "/images/work/hollow.jpg", alt: "Fog over a winter field" }],
    placeholder: true,
  },
  {
    slug: "signalroom",
    name: "Signalroom",
    industry: "Infrastructure",
    category: "Web Apps",
    services: ["Web applications", "Product design"],
    year: "2025",
    description: "An internal monitoring surface for a small infrastructure team.",
    summary:
      "Sample case. Dark, precise, and built around exceptions — not charts for their own sake.",
    challenge:
      "Alerts lived in three tools. Nobody had a single picture of what needed a person.",
    approach:
      "One authenticated view: current state, silence rules, and a written log. We kept decoration out and made status unmistakable.",
    outcome:
      "A working console the team can run on a spare screen. Placeholder case — replace with a live engagement.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    image: "/images/work/signalroom.jpg",
    imageAlt: "Dark server racks with a single amber indicator light",
    gallery: [{ src: "/images/work/signalroom.jpg", alt: "Server racks, one amber light" }],
    placeholder: true,
  },
  {
    slug: "paperweight",
    name: "Paperweight",
    industry: "Publishing tools",
    category: "SaaS",
    services: ["SaaS development", "Web design"],
    year: "2024",
    description: "A writing desk for small editorial teams — structure without the CMS weight.",
    summary:
      "Sample case. Documents, outlines, and a publish path that stays close to the text.",
    challenge:
      "The team was fighting their CMS more than they were editing. They needed a thinner tool.",
    approach:
      "We designed around the draft, not the dashboard. Metadata stays in the margin. The page is the work.",
    outcome:
      "An MVP the editors could use on day one. Placeholder case — replace with a live engagement.",
    technologies: ["React", "TypeScript", "Node.js"],
    image: "/images/work/paperweight.jpg",
    imageAlt: "Overhead view of a designer desk with paper, pencil and ruler",
    gallery: [{ src: "/images/work/paperweight.jpg", alt: "Paper, pencil and steel ruler" }],
    placeholder: true,
  },
  {
    slug: "cove-ledger",
    name: "Cove Ledger",
    industry: "Hospitality group",
    category: "Websites",
    services: ["Website redesign", "Web development"],
    year: "2024",
    description: "A rebuild for a coastal hospitality group that had outgrown a theme.",
    summary:
      "Sample case. Places first, booking second. The site had to feel as still as the buildings.",
    challenge:
      "A busy template was selling rooms and hiding the property. Guests were bouncing before they understood the place.",
    approach:
      "We stripped the chrome, rebuilt the information architecture around each house, and made enquiry the only loud action.",
    outcome:
      "A quieter site with a clearer path to a stay. Placeholder case — replace with a live engagement.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    image: "/images/work/cove.jpg",
    imageAlt: "Stone coastal building reflected in still water under cloud",
    gallery: [{ src: "/images/work/cove.jpg", alt: "Coastal stone house on still water" }],
    placeholder: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) return projects[0];
  return projects[(i + 1) % projects.length];
}
