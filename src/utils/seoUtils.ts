
/**
 * SEO utility functions for managing title tags and meta descriptions
 */

// Pages with their unique titles and descriptions
export const pageSEOData: Record<string, {title: string, description: string}> = {
  // Main pages
  "home": {
    title: "Maître d'œuvre Marseille | Construction & Rénovation | Progineer PACA",
    description: "Maître d'œuvre à Marseille expert en construction, rénovation et extension de maisons. Coordination corps de métier et expertise technique en PACA."
  },
  "about": {
    title: "À Propos de Progineer | Maître d'Œuvre à Marseille & PACA",
    description: "Découvrez l'histoire et les valeurs de Progineer, maître d'œuvre à Marseille. Notre équipe d'experts accompagne vos projets de construction et rénovation en PACA."
  },
  "contact": {
    title: "Contacter Progineer | Maître d'Œuvre Marseille | Devis Gratuit",
    description: "Contactez Progineer, votre maître d'œuvre à Marseille. Demandez un devis gratuit pour vos projets de construction et rénovation en PACA au 07 83 76 21 56."
  },
  "prestations": {
    title: "Nos Prestations de Maîtrise d'Œuvre | Construction, Rénovation | PACA",
    description: "Découvrez nos prestations de maîtrise d'œuvre à Marseille : construction neuve, rénovation, extension, design d'intérieur et optimisation d'espace."
  },
  "realisations": {
    title: "Nos Réalisations | Projets de Construction et Rénovation | Progineer",
    description: "Découvrez les réalisations de Progineer en PACA : maisons contemporaines, rénovations d'appartements, extensions et optimisations d'espaces."
  },
  "equipe": {
    title: "Notre Équipe | Experts en Maîtrise d'Œuvre | Progineer PACA",
    description: "Rencontrez l'équipe de Progineer : architectes, ingénieurs et maîtres d'œuvre passionnés par la construction et la rénovation en région PACA."
  },
  "estimation": {
    title: "Estimation Gratuite | Prix Construction et Rénovation | Progineer",
    description: "Estimez gratuitement le coût de votre projet de construction ou rénovation avec notre calculateur en ligne. Devis détaillé personnalisé en région PACA."
  },
  "parrainage": {
    title: "Programme de Parrainage | Recommandez Progineer | Avantages",
    description: "Découvrez notre programme de parrainage et bénéficiez d'avantages exclusifs en recommandant Progineer pour des projets de construction et rénovation en PACA."
  },
  "partenaires": {
    title: "Devenir Partenaire | Artisans et Entreprises | Progineer PACA",
    description: "Rejoignez notre réseau de partenaires professionnels du bâtiment et collaborez sur des projets de construction et rénovation en PACA avec Progineer."
  },
  "mentions-legales": {
    title: "Mentions Légales | Progineer | Maître d'Œuvre PACA",
    description: "Mentions légales de Progineer, entreprise de maîtrise d'œuvre basée à Marseille. Informations juridiques, coordonnées et conditions d'utilisation."
  },
  "cgu": {
    title: "Conditions Générales d'Utilisation | Progineer | PACA",
    description: "Conditions générales d'utilisation du site Progineer.fr. Informations sur l'utilisation, les droits et les obligations des utilisateurs."
  },
  "cgv": {
    title: "Conditions Générales de Vente | Services Progineer | PACA",
    description: "Conditions générales de vente des services de maîtrise d'œuvre Progineer. Termes et conditions applicables à nos prestations en PACA."
  },
  "faq": {
    title: "FAQ | Questions Fréquentes | Maître d'Œuvre Progineer PACA",
    description: "Réponses aux questions fréquentes sur nos services de maîtrise d'œuvre : construction, rénovation, extension et design d'intérieur en PACA."
  },
  "sitemap": {
    title: "Plan du Site | Progineer | Maître d'Œuvre PACA",
    description: "Consultez le plan du site Progineer.fr et accédez facilement à toutes nos pages sur la construction, rénovation et maîtrise d'œuvre en PACA."
  },
  // Prestation pages
  "construction": {
    title: "Construction Neuve à Marseille et PACA | Progineer",
    description: "Faites construire votre maison sur mesure avec Progineer, maître d'œuvre à Marseille. Conception, plans et suivi de chantier pour votre construction neuve en PACA."
  },
  "renovation": {
    title: "Rénovation Complète à Marseille et PACA | Progineer",
    description: "Transformez votre habitat avec Progineer, expert en rénovation à Marseille. Rénovation partielle ou complète de maisons et appartements en région PACA."
  },
  "extension": {
    title: "Extension de Maison à Marseille et PACA | Progineer",
    description: "Agrandissez votre espace de vie avec une extension sur mesure. Progineer vous accompagne dans votre projet d'extension de maison en PACA."
  },
  "design-interieur": {
    title: "Design d'Intérieur à Marseille et PACA | Progineer",
    description: "Créez des intérieurs qui vous ressemblent avec notre service de design d'intérieur. Conception, aménagement et décoration personnalisés en PACA."
  },
  "optimisation-espace": {
    title: "Optimisation d'Espace à Marseille et PACA | Progineer",
    description: "Maximisez chaque mètre carré avec notre expertise en optimisation d'espace. Solutions d'aménagement intelligentes pour maisons et appartements en PACA."
  },
  // Default (fallback)
  "default": {
    title: "Progineer | Maître d'œuvre Construction & Rénovation PACA",
    description: "Progineer, maître d'œuvre à Marseille spécialisé dans la construction, rénovation et extension de maisons sur mesure en région PACA."
  }
};

/**
 * Get SEO data for a specific page
 * @param pageName - Key identifier for the page
 * @returns Title and description for the specified page
 */
export const getPageSEO = (pageName: string) => {
  return pageSEOData[pageName] || pageSEOData.default;
};

/**
 * Generates a route-based page key for consistent SEO application
 * @param pathname - Current route pathname
 * @returns Corresponding page key for SEO data
 */
export const getPageKeyFromRoute = (pathname: string): string => {
  if (pathname === '/' || pathname === '') return 'home';
  
  // Strip trailing slash if present
  const path = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  
  // Handle prestations sub-routes
  if (path.startsWith('/prestations-maitre-oeuvre')) {
    if (path.includes('/construction-neuve')) return 'construction';
    if (path.includes('/renovation')) return 'renovation';
    if (path.includes('/extension')) return 'extension';
    if (path.includes('/design-interieur')) return 'design-interieur';
    if (path.includes('/optimisation-espace')) return 'optimisation-espace';
    return 'prestations';
  }

  // Map paths to keys
  const routeMap: Record<string, string> = {
    '/a-propos': 'about',
    '/contact': 'contact',
    '/prestations-maitre-oeuvre': 'prestations',
    '/realisations-architecte-maison': 'realisations',
    '/equipe-maitrise-oeuvre': 'equipe',
    '/estimation': 'estimation',
    '/parrainage': 'parrainage',
    '/devenir-partenaire': 'partenaires',
    '/mentions-legales': 'mentions-legales',
    '/cgu': 'cgu',
    '/cgv': 'cgv',
    '/faq': 'faq',
    '/sitemap': 'sitemap'
  };

  return routeMap[path] || 'default';
};
