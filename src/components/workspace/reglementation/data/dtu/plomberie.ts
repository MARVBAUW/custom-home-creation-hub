
import { DTU } from '../../dtu/types';

export const plomberieDTUs: DTU[] = [
  {
    id: "dtu-plomberie-1",
    title: "DTU 60.1 - Plomberie sanitaire",
    category: "Plomberie",
    description: "Plomberie sanitaire pour bâtiments à usage d'habitation",
    lastUpdate: "Décembre 2023",
    rules: [
      {
        title: "Dimensionnement des canalisations",
        content: "Diamètre minimal des canalisations : 12 mm pour distribution EF/ECS, 32 mm pour évacuation lavabo, 100 mm pour chute EU/EV principales",
        type: "standard"
      },
      {
        title: "Pente d'évacuation",
        content: "Pente minimale de 1% pour les collecteurs d'évacuation d'eaux usées, 2% recommandé pour un fonctionnement optimal",
        type: "standard"
      },
      {
        title: "Protection contre le gel",
        content: "Protection contre le gel obligatoire pour les canalisations situées dans des locaux non chauffés ou en extérieur, par calorifugeage ou traçage",
        type: "warning"
      },
      {
        title: "Anti-bélier",
        content: "Dispositif anti-bélier obligatoire en point haut des colonnes montantes et recommandé sur les circuits alimetnant robinetterie à fermeture rapide",
        type: "tip"
      },
      {
        title: "Vitesse d'écoulement",
        content: "Vitesse d'écoulement dans les canalisations limitée à 2 m/s pour éviter bruits et érosion (1,5 m/s recommandé en pratique)",
        type: "standard"
      },
      {
        title: "Dilatation des tubes",
        content: "Prévoir des lyres, boucles ou compensateurs de dilatation pour absorber la dilatation thermique des tubes (cuivre : 0,017 mm/m/°C)",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 60.1 s'applique aux installations de plomberie sanitaire (distribution d'eau et évacuation) dans les bâtiments à usage d'habitation, bureaux et ERP."
      },
      {
        title: "Matériaux autorisés",
        content: "Distribution : cuivre, PER, multicouche, PVCC, acier galvanisé. Évacuation : PVC, fonte, PE-HD, PP. Chaque matériau a ses contraintes spécifiques."
      },
      {
        title: "Débit de base",
        content: "Les débits de base normalisés (lavabo 0,2 L/s, douche 0,2 L/s, baignoire 0,33 L/s, évier 0,2 L/s, WC 0,1 L/s) permettent le dimensionnement des canalisations."
      },
      {
        title: "Protection sanitaire",
        content: "Dispositifs de protection contre les retours d'eau obligatoires selon le niveau de risque (EA, EB, HA, HB, HC) défini par la norme NF EN 1717."
      },
      {
        title: "Isolation acoustique",
        content: "Fixation des canalisations par colliers isophoniques, désolidarisation des traversées de parois, et limitation des vitesses d'écoulement pour limiter le bruit."
      }
    ],
    schemas: [
      {
        id: "schema-plomberie-1",
        title: "Réseau de distribution",
        imageUrl: "/images/schemas/reseau-plomberie.png",
        description: "Schéma d'un réseau de distribution d'eau froide et chaude avec nourrice de distribution et bouclage ECS."
      },
      {
        id: "schema-plomberie-2",
        title: "Évacuation salle de bains",
        imageUrl: "/images/schemas/evacuation-sdb.png",
        description: "Détail des évacuations d'une salle de bains avec siphons, pentes et raccordement à la chute."
      },
      {
        id: "schema-plomberie-3",
        title: "Anti-bélier",
        imageUrl: "/images/schemas/anti-belier.png",
        description: "Installation d'un dispositif anti-bélier en point haut d'une colonne montante."
      }
    ]
  },
  {
    id: "dtu-plomberie-2",
    title: "DTU 60.5 - Canalisations en cuivre",
    category: "Plomberie",
    description: "Distribution d'eau en tubes de cuivre",
    lastUpdate: "Novembre 2023",
    rules: [
      {
        title: "Cintrage des tubes",
        content: "Rayon de cintrage minimal égal à 3 fois le diamètre extérieur pour cintrage à froid avec cintreuse, 8 fois pour cintrage manuel",
        type: "standard"
      },
      {
        title: "Brasage",
        content: "Brasage fort (≥ 450°C) obligatoire pour les installations de gaz, brasage tendre (< 450°C) autorisé pour les installations sanitaires",
        type: "standard"
      },
      {
        title: "Dilatation thermique",
        content: "Prévoir un point fixe et un point coulissant tous les 25 m maximum pour absorber la dilatation thermique (coefficient 0,017 mm/m/°C)",
        type: "warning"
      },
      {
        title: "Fixation des tubes",
        content: "Espacement maximal entre supports : 1,25 m pour diamètre 10-12 mm, 1,80 m pour diamètre 14-18 mm, 2,50 m pour diamètre > 42 mm",
        type: "tip"
      },
      {
        title: "Protection contre l'électrolyse",
        content: "Manchons isolants obligatoires aux jonctions entre cuivre et autres métaux (acier, fonte) pour éviter la corrosion galvanique",
        type: "standard"
      },
      {
        title: "Protection contre le gel",
        content: "Calorifugeage avec épaisseur mini de 9 mm en locaux chauffés et 13 mm en locaux non chauffés, 19 mm en extérieur",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 60.5 s'applique aux conduites d'alimentation d'eau froide et d'eau chaude sanitaire en tubes de cuivre, à l'exclusion des tubes pré-isolés et pré-gainés."
      },
      {
        title: "Nature des tubes",
        content: "Tubes en cuivre conformes à la norme NF EN 1057, avec trois états de livraison : écroui (rigide), demi-écroui et recuit (flexible), selon les usages."
      },
      {
        title: "Modes d'assemblage",
        content: "Assemblage par raccords à braser, à compression mécanique, à sertir ou à emboîture, chacun avec ses contraintes de mise en œuvre et domaines d'emploi."
      },
      {
        title: "Protection des tubes",
        content: "Fourreaux obligatoires pour traversées de parois, planchers et pour les canalisations encastrées, avec diamètre intérieur supérieur de 5 mm au diamètre extérieur du tube."
      },
      {
        title: "Essais",
        content: "Essai d'étanchéité à l'eau froide obligatoire à 1,5 fois la pression de service sans dépasser 10 bars, maintenue pendant 2 heures avec contrôle visuel."
      }
    ],
    schemas: [
      {
        id: "schema-plomberie-4",
        title: "Assemblage par brasage",
        imageUrl: "/images/schemas/brasage-cuivre.png",
        description: "Étapes d'un assemblage par brasage capillaire : préparation, flux, chauffage et introduction de l'alliage."
      },
      {
        id: "schema-plomberie-5",
        title: "Lyre de dilatation",
        imageUrl: "/images/schemas/lyre-dilatation.png",
        description: "Dimensionnement d'une lyre de dilatation en fonction de la longueur de tube et de l'écart de température."
      },
      {
        id: "schema-plomberie-6",
        title: "Protection électrolytique",
        imageUrl: "/images/schemas/protection-electrolytique.png",
        description: "Détail d'un manchon isolant à la jonction entre un tube cuivre et un tube acier."
      }
    ]
  },
  {
    id: "dtu-plomberie-3",
    title: "DTU 60.31 - Canalisations en PVC",
    category: "Plomberie",
    description: "Travaux de canalisations en PVC non plastifié pour évacuation",
    lastUpdate: "Août 2023",
    rules: [
      {
        title: "Pente d'écoulement",
        content: "Pente minimale de 1 cm/m pour eaux usées, 0,5 cm/m pour eaux pluviales, pour garantir un auto-curage efficace",
        type: "standard"
      },
      {
        title: "Dilatation thermique",
        content: "Coefficient de dilatation du PVC : 0,08 mm/m/°C. Prévoir un manchon coulissant tous les 12 m ou compenser par battement",
        type: "standard"
      },
      {
        title: "Fixation des tubes",
        content: "Espacement maximal entre colliers : 0,50 m pour Ø ≤ 50 mm, 0,80 m pour Ø ≤ 110 mm, 1,20 m pour Ø ≤ 160 mm",
        type: "warning"
      },
      {
        title: "Assemblage par collage",
        content: "Pour un assemblage par collage efficace, chanfreiner l'extrémité du tube à 15°, nettoyer et décaper les surfaces, encoller uniformément",
        type: "tip"
      },
      {
        title: "Protection contre le feu",
        content: "En traversée de paroi coupe-feu, prévoir un dispositif intumescent pour maintenir le degré coupe-feu de la paroi",
        type: "standard"
      },
      {
        title: "Coudes et changements de direction",
        content: "Coudes à 87,30° préférables aux coudes à 90° pour faciliter l'écoulement. Pour Ø > 110 mm, utiliser deux coudes à 45° avec tronçon droit intermédiaire",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 60.31 s'applique aux canalisations en PVC-U pour l'évacuation des eaux usées et eaux vannes à écoulement libre dans les bâtiments."
      },
      {
        title: "Types de tubes",
        content: "Tubes et raccords en PVC-U conformes aux normes NF EN 1329-1 (usage intérieur) et NF EN 1401-1 (usage enterré), avec différentes classes de rigidité."
      },
      {
        title: "Méthodes d'assemblage",
        content: "Assemblage par collage (emboîture à coller), par joint élastomère ou par joint mixte (collage + joint), selon les contraintes d'installation et de démontage."
      },
      {
        title: "Ventilation primaire",
        content: "La ventilation primaire (prolongement de la chute en toiture) est obligatoire, avec diamètre identique à celui de la chute sur toute sa hauteur."
      },
      {
        title: "Ventilation secondaire",
        content: "La ventilation secondaire (décompression des siphons) est nécessaire pour les chutes de hauteur > 10 m ou desservant plus de 6 niveaux."
      }
    ],
    schemas: [
      {
        id: "schema-plomberie-7",
        title: "Évacuation sanitaire",
        imageUrl: "/images/schemas/evacuation-sanitaire.png",
        description: "Schéma d'un réseau d'évacuation sanitaire en PVC avec chute, ventilation primaire et collecteur."
      },
      {
        id: "schema-plomberie-8",
        title: "Dilatation des tubes PVC",
        imageUrl: "/images/schemas/dilatation-pvc.png",
        description: "Dispositifs de compensation de dilatation thermique pour tubes PVC : manchons coulissants et battements."
      },
      {
        id: "schema-plomberie-9",
        title: "Raccordement à la cuve",
        imageUrl: "/images/schemas/raccordement-cuve.png",
        description: "Détail de raccordement d'une canalisation PVC à une cuve ou un siphon de sol."
      }
    ]
  },
  {
    id: "dtu-plomberie-4",
    title: "DTU 65.10 - Canalisations d'eau chaude",
    category: "Plomberie",
    description: "Canalisations d'eau chaude sous pression",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Température maximale",
        content: "Température maximale de service continu : 60°C en distribution ECS, 80°C en chauffage central pour tubes thermoplastiques",
        type: "standard"
      },
      {
        title: "Calorifugeage",
        content: "Calorifugeage obligatoire pour limiter les pertes thermiques : classe 2 (λ ≤ 0,035 W/m.K, épaisseur selon diamètre) en volume chauffé",
        type: "standard"
      },
      {
        title: "Bouclage ECS",
        content: "Bouclage obligatoire si distance > 8 m entre production et point de puisage (ou contenance > 3L) pour limiter temps d'attente et gaspillage",
        type: "warning"
      },
      {
        title: "Choix des matériaux",
        content: "Compatibilité des matériaux avec la qualité de l'eau (dureté, pH, chlorures) pour éviter corrosion. Consulter les données locales de l'eau",
        type: "tip"
      },
      {
        title: "Fixation des tubes",
        content: "Supports tous les 0,80 m pour PER et multicouche en apparent, avec points fixes et coulissants pour gérer la dilatation",
        type: "standard"
      },
      {
        title: "Protection contre les brûlures",
        content: "Limiteur de température réglé à 50°C max obligatoire en aval des points de puisage pour éviter les risques de brûlure",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 65.10 s'applique aux canalisations d'eau chaude sous pression pour le chauffage central et la distribution d'eau chaude sanitaire."
      },
      {
        title: "Protection contre l'entartrage",
        content: "Pour les eaux dures (TH > 25°f), prévoir un traitement anti-tartre (adoucisseur, traitement sur polyphosphates) pour les températures > 55°C."
      },
      {
        title: "Traitement anti-légionelles",
        content: "Maintien de l'eau > 55°C dans la boucle, choc thermique périodique à 70°C, purges des bras morts et entretien régulier des installations."
      },
      {
        title: "Calorifugeage",
        content: "Classes d'isolation selon emplacement : classe 2 en volume chauffé, classe 4 en volume non chauffé, classe 5 en extérieur, avec barrière anti-vapeur si nécessaire."
      },
      {
        title: "Maintenance",
        content: "Prévoir des organes d'isolement et de vidange sur les tronçons principaux pour faciliter la maintenance. Vannes tous les 20 m recommandées."
      }
    ],
    schemas: [
      {
        id: "schema-plomberie-10",
        title: "Bouclage ECS",
        imageUrl: "/images/schemas/bouclage-ecs.png",
        description: "Schéma d'un bouclage d'eau chaude sanitaire avec circulateur, équilibrage et traçage des températures."
      },
      {
        id: "schema-plomberie-11",
        title: "Dilatation multicouche",
        imageUrl: "/images/schemas/dilatation-multicouche.png",
        description: "Techniques de gestion de la dilatation pour tubes multicouches : lyre, changement de direction, compensateur."
      },
      {
        id: "schema-plomberie-12",
        title: "Limiteur de température",
        imageUrl: "/images/schemas/limiteur-temperature.png",
        description: "Installation d'un limiteur de température pour point de puisage avec réglage et sécurité anti-brûlure."
      }
    ]
  }
];
