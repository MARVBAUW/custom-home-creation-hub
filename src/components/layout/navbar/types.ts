
export interface NavLink {
  label: string;
  href: string;
  subLinks?: { label: string; href: string }[];
}

export const navLinks: NavLink[] = [
  { label: 'Accueil', href: '/' },
  { 
    label: 'Nos prestations', 
    href: '/prestations-maitre-oeuvre',
    subLinks: [
      { label: 'Construction sur mesure', href: '/prestations-maitre-oeuvre#construction' },
      { label: 'Rénovation énergétique', href: '/prestations-maitre-oeuvre#renovation' },
      { label: 'Extension & agrandissement', href: '/prestations-maitre-oeuvre#extension' },
      { label: 'Optimisation d\'espace', href: '/prestations-maitre-oeuvre#optimisation' },
      { label: 'Design d\'espace', href: '/prestations-maitre-oeuvre#design' },
    ]
  },
  { label: 'Nos réalisations', href: '/realisations-architecte-maison' },
  { label: 'Notre équipe', href: '/equipe-maitrise-oeuvre' },
  { label: 'Blog', href: '/blog' },
  { label: 'Workspace', href: '/workspace' },
];
