
import { DTU } from '../../dtu/types';

export const plomberieDTUs: DTU[] = [
  {
    id: "dtu-60-1",
    title: "DTU 60.1 - Plomberie sanitaire",
    category: "Plomberie",
    description: "Installation des réseaux d'alimentation en eau et d'évacuation des eaux usées",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Dimensionnement réseaux eau froide",
        content: "Vitesse maximale : 2 m/s en colonnes, 1,5 m/s en distribution secondaire. Dimensionnement selon débits probables : ∑de (0,8×débit total cumulé).",
        type: "standard"
      },
      {
        title: "Diamètre minimal évacuation",
        content: "Diamètre minimal des canalisations d'évacuation : lavabo 32 mm, douche 40 mm, baignoire 40 mm, WC 100 mm, évier 40 mm.",
        type: "standard"
      },
      {
        title: "Pente des évacuations",
        content: "Pente minimale des canalisations d'évacuation horizontales : 1 cm/m pour les eaux usées, 0,5 cm/m pour les eaux pluviales.",
        type: "warning"
      },
      {
        title: "Rosaces de finition",
        content: "Toute traversée de paroi visible doit être équipée d'une rosace de finition, fixée à la canalisation ou à la paroi.",
        type: "tip"
      },
      {
        title: "Disconnexion",
        content: "Tout réseau d'eau potable doit être protégé contre les retours d'eau par un dispositif de protection adapté au risque (EA, EB, CA, BA ou AA selon NF EN 1717).",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Matériaux autorisés",
        content: "Pour l'eau potable : cuivre, PER, multicouche, PP, PVC-C. Pour l'évacuation : PVC, fonte, PE. Compatibilité obligatoire avec la nature de l'eau distribuée (notamment pour l'eau chaude)."
      },
      {
        title: "Isolation des canalisations",
        content: "Isolation thermique obligatoire pour l'eau chaude (épaisseur selon diamètre) et pour éviter la condensation sur les tuyaux d'eau froide. Protection contre le gel pour les parties exposées."
      },
      {
        title: "Ventilation du réseau d'évacuation",
        content: "Ventilation primaire (prolongation de la chute jusqu'en toiture) obligatoire. Ventilation secondaire nécessaire pour les chutes > 10 m ou desservant plus de 6 niveaux."
      },
      {
        title: "Fixation des canalisations",
        content: "Espacement maximal des supports : 2,5 m pour le PVC, 0,5 m pour le PER nu, 1,3 à 2,0 m pour le cuivre selon diamètre. Dilatation à prendre en compte (lyres ou compensateurs)."
      }
    ],
    schemas: [
      {
        id: "schema-plomberie-1",
        title: "Schéma de principe",
        imageUrl: "/images/schemas/plomberie-principe.png",
        description: "Schéma de principe d'une installation de plomberie en habitation avec alimentation et évacuation."
      }
    ]
  },
  {
    id: "dtu-60-11",
    title: "DTU 60.11 - Dimensionnement plomberie",
    category: "Plomberie",
    description: "Règles de calcul des installations de plomberie sanitaire et d'eaux pluviales",
    lastUpdate: "Février 2023",
    rules: [
      {
        title: "Débits de base",
        content: "Débits minimaux aux points de puisage : Lavabo 0,20 L/s, Évier 0,20 L/s, Douche 0,20 L/s, Baignoire 0,33 L/s, WC 0,12 L/s.",
        type: "standard"
      },
      {
        title: "Calcul du débit probable",
        content: "Pour 'n' appareils identiques : Qp = Q × y où y = 0,8 × √n-1 (pour les logements) ou y = 0,5 × √n-1 (pour locaux à forte simultanéité).",
        type: "standard"
      },
      {
        title: "Diamètre des collecteurs",
        content: "Pour les collecteurs d'évacuation horizontaux, le taux de remplissage ne doit pas dépasser 50% pour les EU/EV et 70% pour les EP.",
        type: "warning"
      },
      {
        title: "Abaque de Bazin",
        content: "Utiliser l'abaque de Bazin pour déterminer rapidement les diamètres en fonction des débits et des pertes de charge linéaires acceptables.",
        type: "tip"
      },
      {
        title: "Pression résiduelle",
        content: "Pression résiduelle minimale au point de puisage le plus défavorisé : 1,0 bar pour robinetterie courante, 1,5 bar pour chauffe-eau instantané.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Dimensionnement des chutes EU/EV",
        content: "Le diamètre des chutes EU/EV est déterminé selon le nombre d'équipements sanitaires desservis et leur débit de base cumulé, avec un remplissage maximal de 1/3 du diamètre."
      },
      {
        title: "Dispositifs anti-bélier",
        content: "Installer des dispositifs anti-bélier pour limiter les coups de bélier dans les installations avec robinets à fermeture rapide, électrovannes ou surpresseurs, dimensionnés selon formule spécifique."
      },
      {
        title: "Pertes de charge singulières",
        content: "Les pertes de charge singulières (coudes, tés, vannes) peuvent être évaluées soit par addition des longueurs équivalentes, soit en majorant de 20 à 50% les pertes linéaires."
      },
      {
        title: "Calibrage des compteurs",
        content: "Le calibre du compteur doit être choisi selon le débit probable de l'installation, en évitant le surdimensionnement qui réduit la sensibilité aux petits débits."
      }
    ]
  },
  {
    id: "dtu-65-10",
    title: "DTU 65.10 - Canalisations eau chaude",
    category: "Plomberie",
    description: "Canalisations d'eau chaude ou froide sous pression",
    lastUpdate: "Janvier 2023",
    rules: [
      {
        title: "Température maximale",
        content: "Pour la distribution d'ECS, la température maximale de stockage est de 65°C et distribution à 50-55°C pour limiter les risques de brûlure.",
        type: "standard"
      },
      {
        title: "Dilatation thermique",
        content: "Prévoir 0,7 mm/m pour 10°C de variation pour le PVC, 0,15 mm/m/10°C pour le cuivre, 1,5 mm/m/10°C pour le PE et 2,0 mm/m/10°C pour le PER.",
        type: "standard"
      },
      {
        title: "Boucle de récirculation",
        content: "Obligatoire si la distance entre production et point de puisage > 8 m. Dimensionnement pour assurer une température > 50°C en tout point.",
        type: "warning"
      },
      {
        title: "Isolation thermique",
        content: "Épaisseur minimale d'isolant de classe au moins 2 selon EN ISO 12241 : 20 mm pour Ø ≤ 42mm, 30 mm pour Ø > 42mm, majorée en extérieur.",
        type: "tip"
      },
      {
        title: "Protection contre la légionelle",
        content: "Éviter les bras morts, maintenir > 55°C dans le réseau, > 60°C en production. Choc thermique périodique recommandé à 70°C pendant 30 minutes.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Compatibilité des matériaux",
        content: "La compatibilité électrochimique doit être vérifiée pour éviter la corrosion galvanique entre métaux différents. Utiliser des raccords diélectriques entre cuivre et acier galvanisé."
      },
      {
        title: "Réseaux ECS collectifs",
        content: "Les réseaux ECS collectifs doivent comporter des organes d'équilibrage pour assurer une distribution homogène. Chaque colonne doit être équipée d'un robinet d'arrêt et de vidange."
      },
      {
        title: "Fixation et supports",
        content: "Les canalisations doivent être fixées avec des supports adaptés à leur nature et à leur poids, permettant la dilatation tout en maintenant la pente requise."
      },
      {
        title: "Acoustique",
        content: "Pour limiter les nuisances sonores, la vitesse d'écoulement doit être ≤ 1,5 m/s et les traversées de parois doivent être désolidarisées par des fourreaux souples dépassant de 2 cm."
      }
    ],
    schemas: [
      {
        id: "schema-ecs-1",
        title: "Principe bouclage ECS",
        imageUrl: "/images/schemas/bouclage-ecs.png",
        description: "Schéma de principe d'une installation ECS avec boucle de récirculation et équilibrage."
      }
    ]
  },
  {
    id: "dtu-65-12",
    title: "DTU 65.12 - Installations solaires thermiques",
    category: "Plomberie",
    description: "Réalisation des installations de capteurs solaires pour eau chaude sanitaire",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Orientation capteurs",
        content: "Orientation optimale plein sud (±15°), inclinaison optimale = latitude ±10° (environ 30 à 45° en France métropolitaine).",
        type: "standard"
      },
      {
        title: "Dimensionnement capteurs",
        content: "Surface capteurs ECS : 1 m² par personne en habitat collectif, 1,2 m² par personne en habitat individuel pour couverture solaire de 50 à 60%.",
        type: "standard"
      },
      {
        title: "Surchauffe estivale",
        content: "Prévoir une protection contre les surchauffes : vase d'expansion surdimensionné, système autovidangeable ou aérorefroidisseur automatique.",
        type: "warning"
      },
      {
        title: "Fluide caloporteur",
        content: "Utiliser un fluide caloporteur avec antigel adapté à la température minimale locale (-15 à -20°C), avec vérification annuelle du pH (>7).",
        type: "tip"
      },
      {
        title: "Stockage thermique",
        content: "Volume de stockage ECS : 50 à 70 litres par m² de capteur solaire, avec stratification thermique favorisée par une hauteur > 2 fois le diamètre.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Types de capteurs",
        content: "Le DTU couvre les capteurs plans vitrés, les capteurs sous vide et les capteurs auto-stockeurs, avec des spécificités de mise en œuvre pour chaque technologie."
      },
      {
        title: "Implantation",
        content: "Les capteurs peuvent être implantés en toiture (intégrés ou surimposés), en terrasse, en façade ou au sol, avec des règles d'ancrage et d'étanchéité spécifiques à chaque cas."
      },
      {
        title: "Composants hydrauliques",
        content: "Circuit primaire avec circulateur solaire haute température, vase d'expansion fermé (capacité ≥ 6% du volume total), soupape tarée à 6 bar et purgeurs d'air automatiques à clapet."
      },
      {
        title: "Monitoring",
        content: "Installation de compteurs d'énergie obligatoire pour les installations > 20 m², recommandée pour toutes les installations, avec relevé des températures et pressions aux points clés."
      }
    ],
    schemas: [
      {
        id: "schema-solaire-1",
        title: "Schéma installation solaire",
        imageUrl: "/images/schemas/installation-solaire.png",
        description: "Schéma de principe d'une installation solaire thermique pour ECS avec échangeur externe."
      }
    ]
  }
];
