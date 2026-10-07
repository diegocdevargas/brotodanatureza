// Shared site data: navigation, footer and the plant categories.
// Categories are the values stored in the WordPress ACF field `category` (compared case-insensitively).

export type CategoryIcon = "bowl" | "moon" | "fire" | "shield" | "heart" | "wind" | "plant";

export type Category = {
  name: string;
  icon: CategoryIcon;
  /** One line used in the mega menu and on category chips */
  blurb: string;
};

export const categories: Category[] = [
  { name: "Digestiva", icon: "bowl", blurb: "Estômago, fígado e intestino" },
  { name: "Calmante", icon: "moon", blurb: "Ansiedade, sono e tensão" },
  { name: "Anti-inflamatória", icon: "fire", blurb: "Dores, inchaços e inflamações" },
  { name: "Imunológica", icon: "shield", blurb: "Defesas do organismo" },
  { name: "Circulatória", icon: "heart", blurb: "Coração e circulação" },
  { name: "Respiratória", icon: "wind", blurb: "Tosse, gripe e vias aéreas" },
];

export const categoryByName = (name?: string) =>
  categories.find((c) => c.name.toLowerCase() === name?.toLowerCase());

export const categoryIcon = (name?: string): CategoryIcon => categoryByName(name)?.icon ?? "plant";

export const categoryHref = (name: string) => `/plantas?categoria=${encodeURIComponent(name)}`;

// Desktop nav: "Enciclopédia" opens the category mega menu.
export const navLinks = [
  { label: "Início", href: "/" },
  { label: "Enciclopédia", href: "/plantas", mega: true },
  { label: "Blog", href: "/blog" },
  { label: "Dashboard", href: "/dashboard" },
];

export const footerCols = [
  { title: "Explorar", links: [
    { label: "Enciclopédia", href: "/plantas" },
    { label: "Artigos", href: "/blog" },
    { label: "Dashboard", href: "/dashboard" },
  ] },
];

export const disclaimer =
  "As informações aqui presentes têm caráter exclusivamente educativo e não substituem orientação médica ou farmacêutica profissional.";
