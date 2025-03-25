
export interface NavLink {
  name: string;
  path: string;
  subLinks?: { name: string; path: string }[];
}

export const navLinks: NavLink[] = [
  { name: 'Accueil', path: '/' },
  { 
    name: 'Nos prestations', 
    path: '/prestations-maitre-oeuvre',
    subLinks: [
      { name: 'Construction sur mesure', path: '/prestations-maitre-oeuvre#construction' },
      { name: 'Rénovation énergétique', path: '/prestations-maitre-oeuvre#renovation' },
      { name: 'Extension & agrandissement', path: '/prestations-maitre-oeuvre#extension' },
      { name: 'Optimisation d\'espace', path: '/prestations-maitre-oeuvre#optimisation' },
      { name: 'Design d\'espace', path: '/prestations-maitre-oeuvre#design' },
    ]
  },
  { name: 'Nos réalisations', path: '/realisations-architecte-maison' },
  { name: 'Notre équipe', path: '/equipe-maitrise-oeuvre' },
  { name: 'Workspace', path: '/workspace' },
];
