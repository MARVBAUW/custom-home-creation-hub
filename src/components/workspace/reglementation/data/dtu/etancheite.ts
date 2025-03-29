
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
      }
    ],
    schemas: [
      {
        id: "schema-toiture-metal-1",
        title: "Toiture métal avec isolation",
        imageUrl: "/images/schemas/toiture-metal.png",
        description: "Ce schéma présente la composition d'une toiture métallique avec TAN, pare-vapeur, isolant et étanchéité fixée mécaniquement."
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
      }
    ],
    schemas: [
      {
        id: "schema-toiture-bois-1",
        title: "Structure toiture bois",
        imageUrl: "/images/schemas/toiture-bois.png",
        description: "Ce schéma détaille les composants d'une toiture avec support bois : ventilation, support, pare-vapeur, isolant et complexe d'étanchéité."
      }
    ]
  }
];
