
import { DTU } from '../../dtu/types';

export const isolationDTUs: DTU[] = [
  {
    id: "dtu-isolation-1",
    title: "DTU 45.1 - Isolation thermique des bâtiments",
    category: "Isolation",
    description: "Isolation thermique par l'intérieur des murs",
    lastUpdate: "Décembre 2022",
    rules: [
      {
        title: "Résistance thermique minimale",
        content: "R ≥ 2,9 m².K/W pour les murs en rénovation (MaPrimeRénov'), R ≥ 4,5 m².K/W pour les murs neufs (RE2020).",
        type: "standard"
      },
      {
        title: "Pare-vapeur",
        content: "Pare-vapeur du côté chaud de l'isolant, Sd ≥ 18 m en climat de plaine, Sd ≥ 57 m en climat de montagne (>900 m).",
        type: "standard"
      },
      {
        title: "Risque de condensation",
        content: "La position du pare-vapeur est cruciale: toujours du côté chaud (intérieur) de l'isolant, avec jonctions étanches à l'air.",
        type: "warning"
      },
      {
        title: "Continuité d'isolation",
        content: "Traiter soigneusement les ponts thermiques aux jonctions murs/planchers, murs/menuiseries et refends pour limiter les déperditions.",
        type: "tip"
      },
      {
        title: "Vide technique",
        content: "Prévoir un vide technique de 25-45 mm entre le pare-vapeur et le parement pour le passage des réseaux sans percer le pare-vapeur.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Matériaux isolants",
        content: "Le DTU couvre les isolants minéraux (laines de verre, de roche), synthétiques (PSE, XPS, PU) et biosourcés (fibre de bois, ouate de cellulose), sous forme de panneaux ou rouleaux."
      },
      {
        title: "Techniques de pose",
        content: "Trois techniques principales: ossature métallique et plaques de plâtre, ossature bois et parement divers, ou complexes de doublage isolant-plaque de plâtre collés."
      },
      {
        title: "Traitement des points singuliers",
        content: "Points singuliers à traiter: menuiseries (tableau, appui), jonctions murs/planchers, angles sortants/rentrants, traversées de paroi (gaines, conduits), avec détails spécifiques."
      },
      {
        title: "Transferts hygrométriques",
        content: "La gestion des transferts hygrométriques varie selon le type de paroi support et d'isolant, avec des règles spécifiques pour les supports peu perméables à la vapeur d'eau."
      }
    ],
    schemas: [
      {
        id: "schema-isolation-1",
        title: "Doublage sur ossature",
        imageUrl: "/images/schemas/doublage-ossature.png",
        description: "Coupe verticale montrant le principe d'un doublage sur ossature avec isolant et parement en plaque de plâtre."
      }
    ]
  },
  {
    id: "dtu-isolation-2",
    title: "DTU 45.3 - Isolation par l'intérieur des planchers",
    category: "Isolation",
    description: "Isolation thermique et acoustique par l'intérieur des planchers",
    lastUpdate: "Février 2023",
    rules: [
      {
        title: "Résistance thermique minimale",
        content: "R ≥ 2,5 m².K/W pour les planchers bas sur vide sanitaire ou local non chauffé, R ≥ 3,0 m².K/W pour les planchers sur terre-plein.",
        type: "standard"
      },
      {
        title: "Fixation mécanique",
        content: "Fixation mécanique obligatoire pour les isolants en sous-face, avec au moins 5 fixations par m² et disposition en quinconce.",
        type: "standard"
      },
      {
        title: "Protection contre l'humidité",
        content: "Film polyéthylène de 200 μm minimum sous isolant pour les planchers sur terre-plein, remontant de 20 cm sur les murs périphériques.",
        type: "warning"
      },
      {
        title: "Planchers chauffants",
        content: "Pour les planchers chauffants, isolant avec résistance à la compression ≥ 60 kPa (SC1 a2 Ch) et film réfléchissant sur l'isolant.",
        type: "tip"
      },
      {
        title: "Isolation acoustique",
        content: "L'indice d'amélioration acoustique ΔRw+C doit être ≥ 6 dB pour les bruits aériens et ΔLw ≥ 19 dB pour les bruits d'impact.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Types d'isolation",
        content: "Le DTU décrit l'isolation en sous-face de plancher (plafond suspendu ou isolant collé/fixé), l'isolation sous chape flottante, et l'isolation intégrée dans le plancher."
      },
      {
        title: "Compatibilité avec les réseaux",
        content: "Les réseaux (électricité, plomberie) peuvent être intégrés dans l'isolation sous conditions: distance minimale des conduits chauds, gaines électriques protégées."
      },
      {
        title: "Chapes flottantes",
        content: "Les chapes flottantes sur isolant doivent avoir une épaisseur minimale de 5 cm (traditionnelle) ou 3 cm (fluide), avec treillis de renfort et bandes périphériques."
      },
      {
        title: "Ventilation des plénum",
        content: "Les plénums formés par les plafonds suspendus doivent être ventilés pour éviter la condensation, avec des ouvertures totalisant au moins 5 cm² par m²."
      }
    ],
    schemas: [
      {
        id: "schema-isolation-2",
        title: "Chape flottante sur isolant",
        imageUrl: "/images/schemas/chape-flottante.png",
        description: "Coupe montrant le principe d'une chape flottante sur isolation thermique et acoustique."
      }
    ]
  },
  {
    id: "dtu-isolation-3",
    title: "DTU 45.5 - Isolation thermique des équipements",
    category: "Isolation",
    description: "Isolation thermique des équipements et réseaux",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Épaisseurs minimales isolant",
        content: "Pour les canalisations chauffage: 30 mm pour Ø ≤ 42 mm, 40 mm pour Ø > 42 mm. Pour les gaines aérauliques: 25 mm en intérieur, 50 mm en extérieur.",
        type: "standard"
      },
      {
        title: "Coefficient de conductivité",
        content: "Les isolants doivent avoir un λ ≤ 0,04 W/m.K à 10°C pour les réseaux d'eau froide et ≤ 0,035 W/m.K à 40°C pour les réseaux de chauffage.",
        type: "standard"
      },
      {
        title: "Risque de condensation",
        content: "Pour éviter la condensation sur les réseaux d'eau froide: isolant étanche à la vapeur d'eau avec Sd > 100 m et continuité de l'isolation.",
        type: "warning"
      },
      {
        title: "Fixation des isolants",
        content: "Fixation des coquilles par fil acier galvanisé ou inox (Ø 0,8 mm), tous les 30 cm et à chaque accessoire. Bande adhésive aluminium pour les gaines.",
        type: "tip"
      },
      {
        title: "Protection en extérieur",
        content: "En extérieur, prévoir une protection mécanique contre les UV et intempéries: revêtement aluminium, tôle galvanisée ou matériau composite.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Types d'isolants",
        content: "Isolants adaptés aux réseaux: coquilles en laine minérale, mousses synthétiques élastomères ou PE, avec ou sans revêtement pare-vapeur selon l'application."
      },
      {
        title: "Classes de température",
        content: "Choix de l'isolant selon la température du fluide: -50 à +5°C (froid), +5 à +90°C (chauffage), +90 à +300°C (vapeur), avec compatibilité thermique vérifiée."
      },
      {
        title: "Isolation des accessoires",
        content: "Les accessoires (vannes, filtres, échangeurs) doivent être isolés avec des housses amovibles préfabriquées ou isolés sur place avec surépaisseur de 20%."
      },
      {
        title: "Traversées de parois",
        content: "Les traversées de parois nécessitent un fourreau étanche et une surépaisseur d'isolant sur 40 cm de part et d'autre pour assurer la continuité thermique."
      }
    ],
    schemas: [
      {
        id: "schema-isolation-3",
        title: "Isolation canalisation",
        imageUrl: "/images/schemas/isolation-canalisation.png",
        description: "Détail de l'isolation d'une canalisation avec coquille et protection extérieure."
      }
    ]
  },
  {
    id: "dtu-isolation-4",
    title: "DTU 25.41 - Ouvrages en plaques de plâtre",
    category: "Isolation",
    description: "Plafonds, cloisons et doublages en plaques de plâtre",
    lastUpdate: "Octobre 2022",
    rules: [
      {
        title: "Entraxe des ossatures",
        content: "Entraxe maximal de 60 cm pour plafonds à simple parement BA13, 50 cm pour BA10. Réduit à 40 cm en zones sismiques ou pour carrelage mural.",
        type: "standard"
      },
      {
        title: "Fixation des plaques",
        content: "Vis espacées de 30 cm maximum sur ossatures verticales/horizontales et 20 cm aux extrémités des plaques. Distance au bord ≥ 10 mm.",
        type: "standard"
      },
      {
        title: "Joints entre plaques",
        content: "Joints entre plaques décalés d'au moins 40 cm en cas de double parement. Pas de joint aux angles d'ouvertures (découpe en L).",
        type: "warning"
      },
      {
        title: "Traitement des angles",
        content: "Utiliser des bandes armées pour les angles sortants et des bandes papier pour les angles rentrants, avec cueillie en tête de cloison.",
        type: "tip"
      },
      {
        title: "Supports lourds",
        content: "Charge ponctuelle maximale: 30 kg par cheville dans BA13 simple, 10 kg dans BA13 hydro. Au-delà, prévoir renfort dans l'ossature.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Types de plaques",
        content: "Standard (A), Haute dureté (I), Hydrofuge (H), Feu (F), Acoustique (perforée), avec épaisseurs de 9,5 à 25 mm et bords amincis, carrés ou arrondis selon application."
      },
      {
        title: "Ossatures métalliques",
        content: "Rails, montants, fourrures et suspentes dimensionnés selon portées et charges, avec protection contre la corrosion adaptée à l'exposition et l'hygrométrie du local."
      },
      {
        title: "Cloisons sur ossature",
        content: "Cloisons simples, à double parement, ou alvéolaires, avec performance variées (acoustique, feu, résistance aux chocs) selon composition et épaisseur totale."
      },
      {
        title: "Doublages isolants",
        content: "Complexes de doublage (plaque+isolant) collés ou sur ossature, avec règles spécifiques pour la pose, le calepinage et le traitement des points singuliers."
      }
    ],
    schemas: [
      {
        id: "schema-isolation-4",
        title: "Principe cloison plaque de plâtre",
        imageUrl: "/images/schemas/cloison-placo.png",
        description: "Coupe horizontale d'une cloison en plaques de plâtre sur ossature métallique avec isolation."
      }
    ]
  }
];
