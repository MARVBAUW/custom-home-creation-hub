
import { DTU } from '../../dtu/types';

export const etancheiteDTUs: DTU[] = [
  {
    id: "dtu-etancheite-1",
    title: "DTU 43.1 - Étanchéité des toitures-terrasses",
    category: "Étanchéité",
    description: "Prescriptions techniques pour la réalisation de l'étanchéité des toitures-terrasses avec éléments porteurs en maçonnerie",
    lastUpdate: "Septembre 2023",
    rules: [
      {
        title: "Pente minimale",
        content: "Pente minimale de 1% pour évacuation des eaux pluviales, avec forme de pente intégrée à l'élément porteur",
        type: "warning"
      },
      {
        title: "Isolation thermique",
        content: "Résistance thermique R ≥ 4,5 m².K/W pour les toitures-terrasses accessibles en rénovation, R ≥ 6,5 m².K/W en construction neuve",
        type: "standard"
      },
      {
        title: "Relevés d'étanchéité",
        content: "Hauteur minimale de 15 cm au-dessus de la protection ou du niveau fini de la terrasse (10 cm pour terrasses privatives ≤ 100 m²)",
        type: "standard"
      },
      {
        title: "Évacuation des eaux",
        content: "Section minimale des entrées d'eaux pluviales : 1 cm² pour 4,7 m² de surface à évacuer",
        type: "tip"
      },
      {
        title: "Joints de dilatation",
        content: "Les joints de dilatation doivent être traités avec des relevés d'étanchéité de part et d'autre et un dispositif d'étanchéité spécifique",
        type: "warning"
      },
      {
        title: "Zone stérile",
        content: "Une zone stérile de 40 cm sans végétation est obligatoire autour des relevés et émergences pour les toitures végétalisées",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Classement des terrasses",
        content: "Inaccessibles (entretien seulement), Techniques (équipements), Accessibles aux piétons, Accessibles aux véhicules, Jardins. Chaque type impose des contraintes spécifiques."
      },
      {
        title: "Protection de l'étanchéité",
        content: "Protection lourde (gravillons, dallettes, dalles sur plots), protection par autoprotection (ardoise, granulats), ou protection par végétalisation selon usage de la terrasse."
      },
      {
        title: "Points singuliers",
        content: "Traitement spécifique des joints de dilatation, des traversées de toiture, des acrotères et des raccordements aux ouvrages émergents avec dispositifs spécifiques."
      },
      {
        title: "Classes de performances FIT",
        content: "Les revêtements d'étanchéité sont classés selon leur résistance au poinçonnement (I), à la température (T) et au fluage (F), déterminant leur usage selon l'exposition."
      },
      {
        title: "Accessibilité aux personnes à mobilité réduite",
        content: "Pour les terrasses accessibles PMR, le ressaut maximal au niveau des seuils est de 2 cm, avec dispositif de franchissement si supérieur."
      }
    ],
    schemas: [
      {
        id: "schema-terrasse-1",
        title: "Coupe type toiture-terrasse",
        imageUrl: "/images/schemas/toiture-terrasse.png",
        description: "Cette coupe présente les différentes couches d'une toiture-terrasse : élément porteur, pare-vapeur, isolant, étanchéité et protection."
      },
      {
        id: "schema-terrasse-2",
        title: "Détail de relevé d'étanchéité",
        imageUrl: "/images/schemas/releve-etancheite.png",
        description: "Ce schéma montre la réalisation d'un relevé d'étanchéité avec sa hauteur réglementaire et sa fixation en tête."
      },
      {
        id: "schema-terrasse-3",
        title: "Traitement joint de dilatation",
        imageUrl: "/images/schemas/joint-dilatation.png",
        description: "Détail technique d'un joint de dilatation en toiture-terrasse avec relevés et dispositif d'étanchéité spécifique."
      },
      {
        id: "schema-terrasse-4",
        title: "Entrée d'eau pluviale",
        imageUrl: "/images/schemas/eep-terrasse.png",
        description: "Coupe détaillée d'une entrée d'eau pluviale avec platine, crapaudine et raccordement à l'étanchéité."
      }
    ]
  },
  {
    id: "dtu-etancheite-2",
    title: "DTU 43.3 - Toitures métalliques",
    category: "Étanchéité",
    description: "Prescriptions pour les travaux d'étanchéité des toitures avec éléments porteurs en tôles d'acier nervurées",
    lastUpdate: "Octobre 2023",
    rules: [
      {
        title: "Pente minimale",
        content: "Pente minimale de 3% pour assurer l'écoulement des eaux pluviales avec revêtement bicouche, 5% en monocouche",
        type: "warning"
      },
      {
        title: "Fixation mécanique",
        content: "Densité minimale de 3 fixations/m², augmentée en périphérie et dans les zones exposées au vent",
        type: "standard"
      },
      {
        title: "Hygrométrie",
        content: "Pare-vapeur obligatoire pour les locaux à forte et très forte hygrométrie, continu et raccordé aux relevés d'étanchéité",
        type: "standard"
      },
      {
        title: "Portée des TAN",
        content: "Dimensionnement selon l'Eurocode avec flèche limitée à 1/240ème de la portée sous charges normales",
        type: "tip"
      },
      {
        title: "Recouvrement des TAN",
        content: "Recouvrement transversal de 2 ondes minimum et longitudinal de 10 cm minimum, avec fixation tous les 50 cm",
        type: "standard"
      },
      {
        title: "Résistance au poinçonnement",
        content: "Classe de compressibilité C minimum pour l'isolant, avec interposition d'un écran de séparation si nécessaire",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Éléments porteurs",
        content: "Tôles d'acier nervurées (TAN) conformes au DTU 43.3, d'épaisseur ≥ 0,75 mm, avec protection anticorrosion adaptée à l'ambiance intérieure."
      },
      {
        title: "Isolation thermique",
        content: "Panneaux isolants compatibles avec les TAN et l'étanchéité, résistance à la compression ≥ classe C selon norme UEAtc."
      },
      {
        title: "Revêtement d'étanchéité",
        content: "Membrane bitumineuse ou synthétique, fixée mécaniquement ou semi-indépendante. Classement FIT minimal requis selon exposition."
      },
      {
        title: "Zones de vent",
        content: "Le dimensionnement des fixations mécaniques dépend des zones de vent (1 à 4), avec densification en rive (largeur 1/10e hauteur, min 2m) et en angle."
      },
      {
        title: "Costières et émergences",
        content: "Hauteur minimale des costières de 15 cm au-dessus du niveau fini, avec façonnage de l'étanchéité et fixation mécanique en tête."
      }
    ],
    schemas: [
      {
        id: "schema-toiture-metal-1",
        title: "Toiture métal avec isolation",
        imageUrl: "/images/schemas/toiture-metal.png",
        description: "Ce schéma présente la composition d'une toiture métallique avec TAN, pare-vapeur, isolant et étanchéité fixée mécaniquement."
      },
      {
        id: "schema-toiture-metal-2",
        title: "Fixation mécanique en périphérie",
        imageUrl: "/images/schemas/fixation-peripherique.png",
        description: "Détail de la densification des fixations mécaniques en périphérie de toiture (zone de vent renforcée)."
      },
      {
        id: "schema-toiture-metal-3",
        title: "Joint de dilatation sur TAN",
        imageUrl: "/images/schemas/joint-tan.png",
        description: "Traitement d'un joint de dilatation sur support en tôles d'acier nervurées avec double costière et soufflet."
      }
    ]
  },
  {
    id: "dtu-etancheite-3",
    title: "DTU 43.4 - Toitures en bois",
    category: "Étanchéité",
    description: "Travaux d'étanchéité des toitures avec éléments porteurs en bois ou panneaux dérivés du bois",
    lastUpdate: "Novembre 2023",
    rules: [
      {
        title: "Ventilation du support",
        content: "Lame d'air ventilée de 4 cm minimum sous le platelage bois avec entrées/sorties d'air dimensionnées selon NF DTU 43.4",
        type: "warning"
      },
      {
        title: "Essence de bois",
        content: "Bois de classe d'emploi 2 minimum pour les éléments porteurs, classe 3b pour les bois exposés aux intempéries",
        type: "standard"
      },
      {
        title: "Fixation des panneaux",
        content: "Entraxe maximal de 40 cm entre fixations. Distance aux bords ≥ 4 fois le diamètre des fixations",
        type: "standard"
      },
      {
        title: "Pente minimale",
        content: "Pente minimale de 3% pour toute toiture avec élément porteur en bois, 7% pour les vérandas",
        type: "tip"
      },
      {
        title: "Joints entre panneaux",
        content: "Jeu de 2 mm minimum entre panneaux dérivés du bois pour absorber les variations dimensionnelles",
        type: "standard"
      },
      {
        title: "Protection contre l'humidité",
        content: "Écran pare-pluie sous l'élément porteur pour les locaux à forte hygrométrie, y compris en climat de montagne",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Types de supports",
        content: "Bois massifs ou lamellés-collés, panneaux contreplaqués CTB-X, panneaux de particules CTB-H, OSB/3 ou OSB/4. Épaisseur minimale fonction de la portée."
      },
      {
        title: "Barrière de vapeur",
        content: "Pare-vapeur adapté à l'hygrométrie des locaux, avec Sd ≥ 18 m pour locaux à faible et moyenne hygrométrie, Sd ≥ 57 m pour forte hygrométrie."
      },
      {
        title: "Zones techniques",
        content: "Chemins de circulation et zones d'équipements avec renfort d'étanchéité, protection rapportée spécifique pour répartir les charges."
      },
      {
        title: "Protection contre l'incendie",
        content: "Les éléments porteurs en bois doivent répondre aux exigences réglementaires de sécurité incendie selon la destination du bâtiment et sa hauteur."
      },
      {
        title: "Traitement des points singuliers",
        content: "Noues, arêtiers, faîtages, reliefs d'acrotères et traversées doivent être traités avec soin selon les prescriptions détaillées du DTU."
      }
    ],
    schemas: [
      {
        id: "schema-toiture-bois-1",
        title: "Structure toiture bois",
        imageUrl: "/images/schemas/toiture-bois.png",
        description: "Ce schéma détaille les composants d'une toiture avec support bois : ventilation, support, pare-vapeur, isolant et complexe d'étanchéité."
      },
      {
        id: "schema-toiture-bois-2",
        title: "Ventilation sous support",
        imageUrl: "/images/schemas/ventilation-support-bois.png",
        description: "Vue détaillée de la lame d'air ventilée sous le platelage bois avec dispositifs d'entrée et sortie d'air."
      },
      {
        id: "schema-toiture-bois-3",
        title: "Relevé d'étanchéité sur bois",
        imageUrl: "/images/schemas/releve-bois.png",
        description: "Détail d'un relevé d'étanchéité sur acrotère en bois avec bande de solin et protection en tête."
      }
    ]
  },
  {
    id: "dtu-etancheite-4",
    title: "DTU 44.1 - Étanchéité des joints de façade",
    category: "Étanchéité",
    description: "Étanchéité des joints de façade par mise en œuvre de mastics",
    lastUpdate: "Février 2023",
    rules: [
      {
        title: "Dimensionnement des joints",
        content: "Largeur minimale du joint = 4 fois l'amplitude du mouvement prévisible, jamais inférieure à 5 mm",
        type: "standard"
      },
      {
        title: "Fond de joint",
        content: "Fond de joint obligatoire, d'un diamètre 20 à 30% supérieur à la largeur du joint, placé à profondeur constante",
        type: "standard"
      },
      {
        title: "Facteur de forme",
        content: "Respecter un facteur de forme (largeur/profondeur) adapté : 1/1 pour joints ≤ 10 mm, 2/1 pour joints > 10 mm",
        type: "warning"
      },
      {
        title: "Compatibilité des matériaux",
        content: "Vérifier la compatibilité chimique entre le mastic, le fond de joint et les matériaux adjacents pour éviter toute dégradation",
        type: "tip"
      },
      {
        title: "Adhérence",
        content: "Appliquer un primaire d'adhérence sur supports poreux ou spécifiques selon les prescriptions du fabricant de mastic",
        type: "standard"
      },
      {
        title: "Conditions d'application",
        content: "Température d'application entre +5°C et +40°C, humidité relative < 85%, absence de condensation sur les supports",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Types de joints",
        content: "Le DTU distingue les joints de dilatation, de fractionnement, de construction et de menuiserie, chacun avec ses spécificités de conception et de traitement."
      },
      {
        title: "Choix des mastics",
        content: "Mastics élastomères de classe F 25 E minimum pour joints mobiles, mastics plastiques pour joints à faible sollicitation. Les performances sont définies par la norme EN ISO 11600."
      },
      {
        title: "Préparation des supports",
        content: "Les supports doivent être propres, secs, dépoussiérés et dégraissés. Éliminer toute trace de laitance, rouille ou ancien mastic incompatible."
      },
      {
        title: "Durabilité et maintenance",
        content: "Durabilité prévisible de 10 ans en conditions normales d'exposition. Inspection périodique recommandée et réfection partielle ou totale selon l'état des joints."
      },
      {
        title: "Joints coupe-feu",
        content: "Pour les joints devant assurer une fonction coupe-feu, utiliser des mastics ou systèmes spécifiques testés selon EN 1366-4 et classés selon EN 13501-2."
      }
    ],
    schemas: [
      {
        id: "schema-joint-facade-1",
        title: "Coupe d'un joint de façade",
        imageUrl: "/images/schemas/joint-facade.png",
        description: "Cette coupe montre les différents composants d'un joint de façade : support, fond de joint, primaire et mastic d'étanchéité."
      },
      {
        id: "schema-joint-facade-2",
        title: "Facteurs de forme selon largeur",
        imageUrl: "/images/schemas/facteur-forme-joint.png",
        description: "Représentation graphique des facteurs de forme recommandés selon la largeur du joint et le type de mastic."
      },
      {
        id: "schema-joint-facade-3",
        title: "Joint de dilatation traversant",
        imageUrl: "/images/schemas/joint-dilatation-facade.png",
        description: "Détail d'un joint de dilatation traversant avec traitement de l'étanchéité à l'air et à l'eau et isolation thermique."
      }
    ]
  }
];
