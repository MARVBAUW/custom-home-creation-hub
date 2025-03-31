
import { DTU } from '../../dtu/types';

export const toitureDTUs: DTU[] = [
  {
    id: "dtu-40-11",
    title: "DTU 40.11 - Couvertures en ardoises",
    category: "Toiture",
    description: "Prescriptions techniques pour les couvertures en ardoises naturelles",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Pente minimale",
        content: "Pente minimale de 20° (36%) en situation normale, 30° (58%) en situation exposée. Augmentation nécessaire si longueur du rampant > 12 m.",
        type: "standard"
      },
      {
        title: "Recouvrement",
        content: "Recouvrement minimal de 65 mm en situation protégée, 80 mm en situation normale et 100 mm en situation exposée.",
        type: "standard"
      },
      {
        title: "Ventilation sous-toiture",
        content: "Section totale des orifices de ventilation = 1/3000 de la surface projetée, avec entrée d'air en bas de versant et sortie en faîtage.",
        type: "warning"
      },
      {
        title: "Double litonnage",
        content: "Pour les fortes pentes (>45°) ou en zone exposée, adopter un double litonnage (liteaux + contre-liteaux) pour améliorer la résistance aux infiltrations.",
        type: "tip"
      },
      {
        title: "Fixation des ardoises",
        content: "Utiliser 2 clous ou crochets par ardoise, en inox ou cuivre, avec positionnement au tiers supérieur pour une meilleure résistance au vent.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Classement des ardoises",
        content: "Les ardoises naturelles sont classées de A1 à A2, selon leur résistance au gel, avec des épaisseurs standard de 3,5 à 7 mm. Les dimensions courantes sont 22×32 cm, 30×40 cm ou 35×50 cm."
      },
      {
        title: "Modes de pose",
        content: "Le DTU décrit plusieurs modes de pose : à pureau entier, en diagonale (losange), à la française (joints alignés) ou à l'anglaise (joints décalés), chacun avec ses spécificités."
      },
      {
        title: "Points singuliers",
        content: "Traitement spécifique des noues (largeur minimale 40 cm), des arêtiers (avec ardoises biaises), des faîtages (faîtière ou lignolet), et des rives avec doublis et éléments zinc ou cuivre."
      },
      {
        title: "Écran sous-toiture",
        content: "Un écran sous-toiture HPV (Hautement Perméable à la Vapeur d'eau) est recommandé, obligatoire en zone exposée, avec recouvrement de 10 cm et remontées de 20 cm aux points singuliers."
      }
    ],
    schemas: [
      {
        id: "schema-ardoise-1",
        title: "Détail de pose d'ardoises",
        imageUrl: "/images/schemas/pose-ardoise.png",
        description: "Schéma détaillant la pose d'ardoises avec crochet et le traitement du faîtage."
      }
    ]
  },
  {
    id: "dtu-40-21",
    title: "DTU 40.21 - Couvertures en tuiles de terre cuite",
    category: "Toiture",
    description: "Prescriptions pour les couvertures en tuiles à emboîtement ou à glissement",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Pente minimale",
        content: "Varie selon le type de tuile et la zone : 24% à 70% pour tuiles à emboîtement, 35% à 100% pour tuiles canal, avec ajustement selon situation et longueur du rampant.",
        type: "standard"
      },
      {
        title: "Pureau",
        content: "Le pureau (partie visible) doit respecter les valeurs données par le fabricant, généralement entre 285 et 345 mm pour les tuiles à emboîtement.",
        type: "standard"
      },
      {
        title: "Fixation obligatoire",
        content: "Fixation de toutes les tuiles en rive, égout et faîtage, ainsi que 1 tuile sur 5 en partie courante. En zone exposée, fixation intégrale de la couverture.",
        type: "warning"
      },
      {
        title: "Ouverture de ventilation",
        content: "Prévoir des tuiles chatières (1 tous les 5 m²) ou des ouvertures en faîtage pour assurer la ventilation de la sous-face des tuiles et de la charpente.",
        type: "tip"
      },
      {
        title: "Traitement des rives",
        content: "Débordement minimal de 5 cm en rive pour l'écoulement des eaux. Traitement par tuiles de rive spéciales ou demi-tuiles + closoir ou bande de rive métallique.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Types de tuiles",
        content: "Le DTU couvre les tuiles à emboîtement (grand et petit moule), à glissement (plates rectangulaires), canal et romanes, chacune avec des spécificités de pose et de pente."
      },
      {
        title: "Écran sous toiture",
        content: "L'écran sous toiture est obligatoire si pente < pente minimale + 10%, ou en zone exposée, ou sous combles aménagés. Il doit être certifié QB ou équivalent."
      },
      {
        title: "Isolation et ventilation",
        content: "Avec isolation sous rampant, double ventilation obligatoire : 2 cm entre écran et tuiles, 2 cm entre isolant et écran. Section des orifices = 1/500 de la surface couverte."
      },
      {
        title: "Traversées de toit",
        content: "Les traversées (cheminées, ventilations) nécessitent des bavettes d'étanchéité en plomb ou zinc, avec recouvrement de 10 cm et remontées de 20 cm contre la souche."
      }
    ],
    schemas: [
      {
        id: "schema-tuile-1",
        title: "Détail de pose de tuiles",
        imageUrl: "/images/schemas/pose-tuile.png",
        description: "Coupe d'un toit en tuiles avec détail de l'égout, de la ventilation et du faîtage."
      }
    ]
  },
  {
    id: "dtu-40-35",
    title: "DTU 40.35 - Couvertures en plaques nervurées métalliques",
    category: "Toiture",
    description: "Couvertures en plaques nervurées issues de tôles d'acier revêtues",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Pente minimale",
        content: "Pente minimale de 5% (3°) pour plaques sans joint debout, 1% avec joint debout, avec ajustement selon longueur du rampant et zone de concomitance.",
        type: "standard"
      },
      {
        title: "Recouvrement transversal",
        content: "Recouvrement minimal de 14 cm en zone I, 20 cm en zone II et 30 cm en zone III, avec complément d'étanchéité obligatoire si pente < 10%.",
        type: "standard"
      },
      {
        title: "Protection contre la corrosion",
        content: "Revêtement minimal Z275 ou AZ150 en atmosphère rurale non polluée, Z450 ou AZ185 en atmosphère industrielle ou marine, avec bords découpés à protéger.",
        type: "warning"
      },
      {
        title: "Fixations",
        content: "Utiliser des fixations avec rondelles d'étanchéité EPDM vulcanisé, de diamètre au moins égal à 19 mm, avec résistance à l'arrachement ≥ 50 daN.",
        type: "tip"
      },
      {
        title: "Densité des fixations",
        content: "En rive et zones exposées : 1 fixation par nervure et par panne. En partie courante : 1 fixation par nervure et par panne, alternées pour les pannes intermédiaires.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Types de plaques",
        content: "Principaux profils : trapézoïdaux, ondulés, à nervures rapprochées et joints debout. Épaisseurs standard : 0,63 mm à 1,00 mm selon portée et charges climatiques."
      },
      {
        title: "Traitement acoustique",
        content: "Pour l'absorption acoustique, les plaques peuvent être perforées en sous-face et associées à un matelas de laine minérale protégé par un voile de verre."
      },
      {
        title: "Isolation thermique",
        content: "Isolation possible sur ou sous pannes. Sur pannes : feutre tendu ou système avec régulateur de condensation. Sous pannes : panneaux sandwich ou isolation avec suspentes."
      },
      {
        title: "Dilatation",
        content: "Prévoir la libre dilatation des plaques (coefficient de dilatation de l'acier : 0,012 mm/m/°C), en évitant les fixations traversantes sur longueurs > 12 m."
      }
    ],
    schemas: [
      {
        id: "schema-metal-1",
        title: "Détail couverture métallique",
        imageUrl: "/images/schemas/couverture-metal.png",
        description: "Coupe de principe d'une couverture en bacs acier avec isolation et traitement des points singuliers."
      }
    ]
  },
  {
    id: "dtu-43-3",
    title: "DTU 43.3 - Toitures en tôles d'acier nervurées",
    category: "Toiture",
    description: "Toitures-terrasses et toitures inclinées avec élément porteur en tôles d'acier nervurées",
    lastUpdate: "Février 2023",
    rules: [
      {
        title: "Pente minimale",
        content: "Pente minimale de 3% pour toitures-terrasses avec revêtement d'étanchéité bicouche, 5% en monocouche, et 7% pour toitures avec plaques éclairantes.",
        type: "standard"
      },
      {
        title: "Dimensionnement des TAN",
        content: "Épaisseur minimale des TAN : 0,75 mm. Flèche maximale sous charge normale : 1/240e de la portée, avec vérification selon l'Eurocode 3.",
        type: "standard"
      },
      {
        title: "Fixations",
        content: "Densité minimale de fixations mécaniques de l'isolant : 3/m² en partie courante, augmentée en périphérie et dans les zones exposées au vent.",
        type: "warning"
      },
      {
        title: "Pare-vapeur",
        content: "Pare-vapeur obligatoire sous l'isolant pour les locaux à forte et très forte hygrométrie, continu et raccordé aux relevés d'étanchéité.",
        type: "tip"
      },
      {
        title: "Zones techniques",
        content: "Pour les zones techniques, prévoir une protection renforcée (dallettes sur plots, bacs acier doublés) et un isolant de classe C minimum.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Éléments porteurs",
        content: "Bacs acier conformes au DTU 43.3, avec ouverture haute de nervure ≥ 70 mm pour recevoir l'isolation. Largeur d'appui minimale sur supports : 60 mm (acier) ou 40 mm (bois, béton)."
      },
      {
        title: "Isolation thermique",
        content: "Isolation obligatoire, avec panneaux rigides ou semi-rigides compatibles avec le support TAN et le revêtement d'étanchéité choisi. Résistance thermique minimale selon réglementation."
      },
      {
        title: "Étanchéité",
        content: "Revêtements autorisés : asphalte, bitumineux, synthétiques. Fixation mécanique ou semi-indépendance obligatoire, adhérence totale interdite sur TAN."
      },
      {
        title: "Points singuliers",
        content: "Traitement spécifique des relevés (hauteur ≥ 15 cm), des entrées d'eaux pluviales (EEP avec platine à bride), des joints de dilatation et des traversées de toiture."
      }
    ],
    schemas: [
      {
        id: "schema-tan-1",
        title: "Toiture sur TAN",
        imageUrl: "/images/schemas/toiture-tan.png",
        description: "Coupe d'une toiture-terrasse sur TAN avec isolant et revêtement d'étanchéité."
      }
    ]
  }
];
