
import { DTU } from '../../dtu/types';

export const toitureDTUs: DTU[] = [
  {
    id: "dtu-toiture-1",
    title: "DTU 40.11 - Couvertures en ardoises",
    category: "Toiture",
    description: "Couvertures en ardoises naturelles",
    lastUpdate: "Mars 2024",
    rules: [
      {
        title: "Pente minimale",
        content: "Pente minimale de 45% en situation protégée, 50% en situation normale, 60% en situation exposée sans écran sous toiture",
        type: "standard"
      },
      {
        title: "Pureau",
        content: "Pureau (partie visible) maximum = (longueur - 0,08 m) / 2, avec recouvrement minimal de 8 cm",
        type: "standard"
      },
      {
        title: "Écran sous toiture",
        content: "Écran sous toiture obligatoire pour les pentes réduites (jusqu'à -10% de la pente normale) et en zones exposées",
        type: "warning"
      },
      {
        title: "Fixation des ardoises",
        content: "Au moins 2 fixations par ardoise, type clou cuivre ou crochet inox, avec pénétration de 15 mm minimum dans le voligeage",
        type: "tip"
      },
      {
        title: "Ventilation de la couverture",
        content: "Section totale de ventilation ≥ 1/1000 de la surface projetée horizontalement, répartie entre partie basse et faîtage",
        type: "standard"
      },
      {
        title: "Ouverture pour ventilation",
        content: "Ouverture continue de 2 cm minimum en partie basse entre le voligeage et le mur, protégée par un grillage anti-rongeurs",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 40.11 s'applique aux couvertures en ardoises naturelles posées sur liteaux ou voligeage en bois, pour bâtiments de toutes destinations, neufs ou en rénovation."
      },
      {
        title: "Qualité des ardoises",
        content: "Les ardoises doivent être conformes à la norme NF EN 12326-1, de qualité A1-S1-T1 pour une durabilité optimale, épaisseur minimale 3,5 mm pour l'ardoise standard."
      },
      {
        title: "Méthodes de pose",
        content: "Trois méthodes principales : pose à pureau développé (avec ou sans crochet), pose à pureau entier classique (clous ou crochets), pose à pureau entier à crochet apparent."
      },
      {
        title: "Traitement des points singuliers",
        content: "Faîtages, arêtiers, noues, solins, pénétrations, etc. selon règles de l'art détaillées dans le DTU, avec matériaux compatibles (zinc, plomb, cuivre) pour raccordements."
      },
      {
        title: "Ouvrages annexes",
        content: "Chatières de ventilation (1/2000e de la surface à ventiler), fenêtres de toit, dispositifs d'arrêt de neige, crochets de sécurité, intégrés selon les prescriptions du DTU."
      }
    ],
    schemas: [
      {
        id: "schema-toiture-1",
        title: "Pose d'ardoises au crochet",
        imageUrl: "/images/schemas/pose-ardoise-crochet.png",
        description: "Vue en coupe d'une couverture en ardoises avec fixation au crochet, montrant le recouvrement et le pureau."
      },
      {
        id: "schema-toiture-2",
        title: "Égout sur coyalure",
        imageUrl: "/images/schemas/egout-ardoise.png",
        description: "Détail de l'égout d'une couverture en ardoises avec larmier en zinc, coyalure et ventilation basse."
      },
      {
        id: "schema-toiture-3",
        title: "Noue en ardoises",
        imageUrl: "/images/schemas/noue-ardoise.png",
        description: "Traitement d'une noue en zinc avec raccordement des ardoises de part et d'autre."
      }
    ]
  },
  {
    id: "dtu-toiture-2",
    title: "DTU 40.21 - Couvertures en tuiles de terre cuite",
    category: "Toiture",
    description: "Couvertures en tuiles de terre cuite à emboîtement",
    lastUpdate: "Février 2024",
    rules: [
      {
        title: "Pente minimale",
        content: "Pente minimale selon le type de tuile : 22% à 35% en situation protégée pour tuiles à relief, 40% pour tuiles plates",
        type: "standard"
      },
      {
        title: "Recouvrement",
        content: "Recouvrement longitudinal minimal de 8 cm pour les tuiles à emboîtement, adapté en fonction de la pente et de l'exposition",
        type: "standard"
      },
      {
        title: "Fixation des tuiles",
        content: "Fixation obligatoire pour les rives, égouts, faîtages, arêtiers, et en totalité au-delà de 100% de pente ou en zone exposée",
        type: "warning"
      },
      {
        title: "Ventilation de la couverture",
        content: "Section de ventilation minimale de 1/2000 de la surface projetée, avec entrée d'air en partie basse et sortie au faîtage",
        type: "tip"
      },
      {
        title: "Écran sous toiture",
        content: "Écran sous toiture obligatoire pour les pentes réduites et recommandé en zone exposée, avec mise en œuvre spécifique en égout",
        type: "standard"
      },
      {
        title: "Tuiles de rive",
        content: "Débord latéral limité à 5 cm sans support spécifique. Pour débord supérieur, prévoir une planche de rive ou une tuile spéciale",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 40.21 s'applique aux couvertures en tuiles de terre cuite à emboîtement ou à glissement à relief, posées sur liteaux ou voliges, pour tous types de bâtiments."
      },
      {
        title: "Types de tuiles",
        content: "Le DTU couvre les tuiles à emboîtement (grand et petit moule), les tuiles plates, les tuiles canal et les accessoires associés (faîtières, chatières, etc.)."
      },
      {
        title: "Écrans sous toiture",
        content: "Écrans souples (HPV ou non) conformes au CPT 3651, posés tendus sur les chevrons ou sur voligeage, avec recouvrement horizontal de 10 cm et vertical de 15 cm."
      },
      {
        title: "Traitement des points singuliers",
        content: "Égout, rive, faîtage, arêtier, noue, souche et pénétrations traités selon le type de tuile, avec accessoires spécifiques ou métalliques (zinc, plomb, cuivre)."
      },
      {
        title: "Zones de concomitance",
        content: "En zones de concomitance (noue, arêtier), augmenter la fixation et prévoir une étanchéité complémentaire, notamment pour les faibles pentes."
      }
    ],
    schemas: [
      {
        id: "schema-toiture-4",
        title: "Pose tuiles à emboîtement",
        imageUrl: "/images/schemas/pose-tuiles-emboitement.png",
        description: "Principe de pose des tuiles à emboîtement sur liteaux avec recouvrement longitudinal et latéral."
      },
      {
        id: "schema-toiture-5",
        title: "Égout avec écran",
        imageUrl: "/images/schemas/egout-tuiles-ecran.png",
        description: "Détail de l'égout d'une couverture en tuiles avec écran sous toiture, larmier et ventilation."
      },
      {
        id: "schema-toiture-6",
        title: "Faîtage sec ventilé",
        imageUrl: "/images/schemas/faitage-sec-tuiles.png",
        description: "Réalisation d'un faîtage sec ventilé avec closoir souple et tuiles faîtières."
      }
    ]
  },
  {
    id: "dtu-toiture-3",
    title: "DTU 40.35 - Couvertures en plaques nervurées",
    category: "Toiture",
    description: "Couverture en plaques nervurées issues de tôles d'acier revêtues",
    lastUpdate: "Janvier 2024",
    rules: [
      {
        title: "Pente minimale",
        content: "Pente minimale de 7% avec recouvrement transversal de 20 cm, de 5% avec complément d'étanchéité",
        type: "standard"
      },
      {
        title: "Densité de fixation",
        content: "1 fixation par m² en partie courante, densifiée en rives et points singuliers selon la zone de vent et la hauteur du bâtiment",
        type: "standard"
      },
      {
        title: "Recouvrement longitudinal",
        content: "1 nervure au minimum en zone protégée et normale, 2 nervures en zone exposée, avec complément d'étanchéité si pente < 10%",
        type: "warning"
      },
      {
        title: "Fixation en sommet d'onde",
        content: "Fixation en sommet d'onde obligatoire, avec plaquette et rondelle d'étanchéité EPDM, diamètre de perçage ≤ diamètre fixation + 1 mm",
        type: "tip"
      },
      {
        title: "Ventilation",
        content: "Section de ventilation sous les plaques de 1/2000e de la surface projetée horizontalement, avec entrée et sortie d'air",
        type: "standard"
      },
      {
        title: "Porte-à-faux",
        content: "Porte-à-faux maximal en égout de 0,40 m pour plaques standard, limité à 1/10e de la portée entre pannes",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 40.35 s'applique aux couvertures en plaques nervurées métalliques (acier galvanisé, aluminium) pour tous types de bâtiments, hors isolation thermique."
      },
      {
        title: "Types de plaques",
        content: "Plaques nervurées conformes aux normes NF P 34-401 (acier) et NF P 34-402 (aluminium), avec caractéristiques mécaniques minimales pour les portées visées."
      },
      {
        title: "Fixations",
        content: "Fixations conformes aux normes XP P 34-206 et NF P 30-315, avec performance à l'arrachement selon la zone de vent et l'altitude, et protection anticorrosion."
      },
      {
        title: "Traitement des points singuliers",
        content: "Faîtage, égout, rive, pénétrations traités avec accessoires spécifiques assurant l'étanchéité et la ventilation, notamment en présence d'isolant."
      },
      {
        title: "Supports",
        content: "Supports admissibles : pannes bois, acier ou béton avec largeur d'appui minimale de 40 mm. Entraxes des supports déterminés selon les charges et le type de plaque."
      }
    ],
    schemas: [
      {
        id: "schema-toiture-7",
        title: "Fixation en sommet d'onde",
        imageUrl: "/images/schemas/fixation-sommet-onde.png",
        description: "Détail d'une fixation de plaque nervurée en sommet d'onde avec plaquette et rondelle d'étanchéité."
      },
      {
        id: "schema-toiture-8",
        title: "Recouvrement transversal",
        imageUrl: "/images/schemas/recouvrement-transversal-bac.png",
        description: "Réalisation d'un recouvrement transversal entre plaques nervurées avec complément d'étanchéité."
      },
      {
        id: "schema-toiture-9",
        title: "Faîtage ventilé métallique",
        imageUrl: "/images/schemas/faitage-ventile-bac.png",
        description: "Détail d'un faîtage ventilé pour couverture en plaques nervurées avec closoir et faîtière."
      }
    ]
  },
  {
    id: "dtu-toiture-4",
    title: "DTU 43.5 - Réfection des toitures",
    category: "Toiture",
    description: "Réfection des toitures-terrasses et toitures inclinées",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Diagnostic préalable",
        content: "Diagnostic complet obligatoire avant travaux : état de l'étanchéité, de l'isolant, des relevés et du support, analyse des causes des désordres",
        type: "standard"
      },
      {
        title: "Conservation de l'ancien revêtement",
        content: "Conservation possible de l'ancien revêtement si adhérent et compatible avec le nouveau système, sinon dépose totale obligatoire",
        type: "standard"
      },
      {
        title: "Vérification de la pente",
        content: "Pente minimale de 1% après travaux. Pour pente insuffisante, prévoir une forme de pente rapportée ou redresser la structure",
        type: "warning"
      },
      {
        title: "Nouvelles évacuations",
        content: "Créer de nouvelles évacuations d'eaux pluviales au point bas si les existantes sont insuffisantes ou mal placées",
        type: "tip"
      },
      {
        title: "Hauteur des relevés",
        content: "Hauteur minimale des relevés d'étanchéité de 15 cm au-dessus de la protection, 10 cm pour terrasses privatives ≤ 100 m²",
        type: "standard"
      },
      {
        title: "Surcharge admissible",
        content: "Vérifier la charge admissible de la structure avant d'ajouter isolation ou protection lourde (≤ 150 kg/m² généralement pour existant)",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 43.5 s'applique à la réfection complète des revêtements d'étanchéité des toitures-terrasses et inclinées, quels que soient le support et l'isolation."
      },
      {
        title: "Types d'intervention",
        content: "Trois types d'intervention sont définis : avec mise à nu du support, avec conservation de l'ancien revêtement, avec réparations localisées préalables."
      },
      {
        title: "Supports admissibles",
        content: "Éléments porteurs en maçonnerie, béton cellulaire, bois et panneaux dérivés, tôles d'acier nervurées, avec ou sans isolation thermique existante."
      },
      {
        title: "Isolants compatibles",
        content: "Isolants admissibles en réfection : laine minérale, PSE, PUR, PIR, verre cellulaire, perlite, liège, sous avis technique avec classement de compression adapté."
      },
      {
        title: "Protection des revêtements",
        content: "Protection lourde (gravillons, dalles sur plots), autoprotection (granulats, métal) ou végétalisation selon la pente, l'usage et les contraintes de poids."
      }
    ],
    schemas: [
      {
        id: "schema-toiture-10",
        title: "Conservation ancien revêtement",
        imageUrl: "/images/schemas/conservation-ancien-revetement.png",
        description: "Coupe type de réfection avec conservation de l'ancien revêtement, ajout d'isolant et nouveau complexe d'étanchéité."
      },
      {
        id: "schema-toiture-11",
        title: "Création entrée d'eau",
        imageUrl: "/images/schemas/creation-entree-eau.png",
        description: "Détail de création d'une nouvelle entrée d'eau pluviale à travers un élément porteur existant."
      },
      {
        id: "schema-toiture-12",
        title: "Rehausse de relevé",
        imageUrl: "/images/schemas/rehausse-releve.png",
        description: "Technique de rehausse d'un relevé d'étanchéité trop bas lors d'une réfection de toiture-terrasse."
      }
    ]
  }
];
