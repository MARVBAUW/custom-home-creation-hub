
export interface NavLink {
  name: string;
  path: string;
  subLinks?: {
    name: string;
    path: string;
  }[];
}

export const mainNavLinks: NavLink[] = [
  {
    name: "Accueil",
    path: "/"
  },
  {
    name: "À propos",
    path: "/a-propos",
    subLinks: [
      { name: "Notre histoire", path: "/a-propos#histoire" },
      { name: "Notre approche", path: "/a-propos#approche" },
      { name: "Notre équipe", path: "/a-propos#equipe" }
    ]
  },
  {
    name: "Prestations",
    path: "/prestations-maitre-oeuvre",
    subLinks: [
      { name: "Construction neuve", path: "/prestations-maitre-oeuvre/construction-neuve" },
      { name: "Rénovation & Extension", path: "/prestations-maitre-oeuvre/renovation-extension" },
      { name: "Conseils & Assistance", path: "/prestations-maitre-oeuvre/conseil-assistance" }
    ]
  },
  {
    name: "Réalisations",
    path: "/realisations"
  },
  {
    name: "Estimation",
    path: "/estimation"
  },
  {
    name: "Workspace",
    path: "/workspace"
  },
  {
    name: "Contact",
    path: "/contact"
  }
];
