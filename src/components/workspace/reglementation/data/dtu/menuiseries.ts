
import { DTU } from '../../dtu/types';

export const menuiseriesDTUs: DTU[] = [
  {
    id: "dtu-36-5",
    title: "DTU 36.5 - Menuiseries extérieures",
    category: "Menuiseries",
    description: "Mise en œuvre des fenêtres et portes extérieures dans les murs et ossatures",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Jeu périphérique",
        content: "Le jeu périphérique entre le dormant et le bâti doit être de 5 mm minimum sur tous les côtés pour permettre la dilatation et le réglage.",
        type: "standard"
      },
      {
        title: "Fixation des dormants",
        content: "Distance maximale entre fixations : 60 cm sur les montants, 80 cm sur la traverse haute, avec des fixations à 15 cm maximum des angles.",
        type: "standard"
      },
      {
        title: "Appui de fenêtre",
        content: "Pente minimale de l'appui de fenêtre : 10% vers l'extérieur, avec débord comportant un goutte d'eau de 3 cm minimum du nu extérieur.",
        type: "warning"
      },
      {
        title: "Calfeutrement",
        content: "Double barrière d'étanchéité obligatoire : joint extérieur résistant aux intempéries (imperméable) et joint intérieur étanche à l'air.",
        type: "tip"
      },
      {
        title: "Seuil des portes",
        content: "Hauteur maximale des seuils de porte : 2 cm pour respecter les normes d'accessibilité, avec pente et rejet d'eau pour évacuation.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Classifications des menuiseries",
        content: "Les menuiseries sont classées selon leur résistance à l'air (A*), à l'eau (E*), au vent (V*) et leur résistance mécanique. Le classement minimal recommandé est A*3 E*5 V*2 pour des conditions normales."
      },
      {
        title: "Performances thermiques",
        content: "Pour les constructions neuves en résidentiel, le coefficient de transmission thermique Uw des fenêtres doit être ≤ 1,3 W/m².K en zone H1 et H2, et ≤ 1,8 W/m².K en zone H3 selon la RE2020."
      },
      {
        title: "Dispositifs d'évacuation des eaux",
        content: "Les traverses basses des dormants et ouvrants doivent comporter des orifices d'évacuation des eaux d'infiltration : 5 mm × 30 mm minimum ou Ø 8 mm, avec au moins 2 orifices par traverse."
      },
      {
        title: "Pose en applique intérieure",
        content: "Pour une pose en applique intérieure, prévoir un recouvrement du dormant sur l'isolation de 35 mm minimum, avec fixation dans le gros œuvre et non dans l'isolation."
      }
    ],
    schemas: [
      {
        id: "schema-menuiserie-1",
        title: "Pose en tunnel",
        imageUrl: "/images/schemas/pose-tunnel.png",
        description: "Coupe verticale d'une menuiserie posée en tunnel, montrant le calfeutrement et les fixations."
      },
      {
        id: "schema-menuiserie-2",
        title: "Pose en applique",
        imageUrl: "/images/schemas/pose-applique.png",
        description: "Coupe horizontale d'une menuiserie posée en applique intérieure avec retour d'isolant."
      }
    ]
  },
  {
    id: "dtu-menuiserie-2",
    title: "DTU 39 - Travaux de miroiterie-vitrerie",
    category: "Menuiseries",
    description: "Conception et mise en œuvre des vitrages dans le bâtiment",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Calage des vitrages",
        content: "Distance des cales par rapport aux angles : 1/10 de la longueur du bord, avec un minimum de 5 cm et un maximum de 30 cm.",
        type: "standard"
      },
      {
        title: "Hauteur des garnitures d'étanchéité",
        content: "Les garnitures d'étanchéité des feuillures hautes et latérales ont une hauteur minimale de 5 mm et celles des feuillures basses, 7 mm.",
        type: "standard"
      },
      {
        title: "Garde au vent",
        content: "La garde au vent entre vitrage et parclose doit être de 3 mm minimum pour ne pas pincer le vitrage lors des déformations de la menuiserie.",
        type: "warning"
      },
      {
        title: "Jeu périphérique",
        content: "Le jeu périphérique entre vitrage et feuillure doit être au minimum de 3 mm sur tout le pourtour pour garantir l'absence de contact verre-métal.",
        type: "tip"
      },
      {
        title: "Verre feuilleté obligatoire",
        content: "Le verre feuilleté est obligatoire pour tous les vitrages en allège (< 1 m du sol) et dans les installations en hauteur (>1,5 m du sol).",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Types de vitrages",
        content: "Le DTU couvre les vitrages simples, doubles (isolants), feuilletés, trempés, à contrôle solaire et à basse émissivité. Pour chaque application, des performances minimales sont requises."
      },
      {
        title: "Dimensionnement",
        content: "L'épaisseur du vitrage est déterminée en fonction de sa surface, de la pression du vent (selon la zone et la hauteur) et de la flèche admissible (limitée au 1/100e de la diagonale)."
      },
      {
        title: "Tolérances de mise en œuvre",
        content: "Les dimensions des vitrages doivent respecter une tolérance de fabrication de ±1 mm jusqu'à 3 m et ±2 mm au-delà. La planéité doit être inférieure à 1 mm par mètre."
      },
      {
        title: "Protection des vitrages",
        content: "Lors du chantier, les vitrages posés doivent être protégés des projections de plâtre, ciment, peinture et des soudures à l'arc par des écrans appropriés."
      }
    ],
    schemas: [
      {
        id: "schema-vitrage-1",
        title: "Positionnement des cales",
        imageUrl: "/images/schemas/calage-vitrage.png",
        description: "Schéma montrant le positionnement correct des cales de vitrage pour les différents types d'ouvrants."
      }
    ]
  },
  {
    id: "dtu-menuiserie-3",
    title: "DTU 34.4 - Mise en œuvre des fermetures et stores",
    category: "Menuiseries",
    description: "Règles pour la mise en œuvre des volets, stores et autres fermetures",
    lastUpdate: "Janvier 2023",
    rules: [
      {
        title: "Jeu fonctionnel des volets roulants",
        content: "Le jeu fonctionnel entre le tablier et les coulisses doit être de 5 mm (±2 mm) de chaque côté pour un fonctionnement optimal.",
        type: "standard"
      },
      {
        title: "Coffre de volet roulant",
        content: "Un coffre de volet roulant doit avoir un coefficient de transmission thermique Uc ≤ 2,5 W/m².K et une isolation acoustique ≥ 40 dB.",
        type: "standard"
      },
      {
        title: "Manœuvre de secours",
        content: "Les volets roulants motorisés doivent disposer d'un système de manœuvre de secours en cas de panne électrique ou du moteur.",
        type: "warning"
      },
      {
        title: "Fixation des coulisses",
        content: "Les coulisses doivent être fixées tous les 50 cm maximum avec au minimum 3 fixations par coulisse, dont une à 15 cm maximum des extrémités.",
        type: "tip"
      },
      {
        title: "Ventilation des coffres",
        content: "Les coffres doivent être ventilés par des orifices totalisant 3 cm² minimum pour éviter la condensation à l'intérieur du coffre.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Types de fermetures",
        content: "Le DTU couvre les volets roulants, battants, coulissants, pliants, stores extérieurs, brises-soleil orientables et autres fermetures, chacun avec des spécifications propres."
      },
      {
        title: "Résistance au vent",
        content: "Les fermetures sont classées de 1 à 6 selon leur résistance au vent. Le choix de la classe dépend de la région, du site, de la hauteur du bâtiment et de la dimension des baies."
      },
      {
        title: "Motorisation",
        content: "Les motorisations doivent être adaptées au poids et aux dimensions des fermetures. Un dispositif de détection d'obstacle est obligatoire pour les volets motorisés."
      },
      {
        title: "Étanchéité des coffres",
        content: "L'étanchéité à l'air des coffres de volet roulant doit être assurée par un joint continu, avec une attention particulière aux traversées pour les commandes."
      }
    ],
    schemas: [
      {
        id: "schema-fermeture-1",
        title: "Intégration coffre volet roulant",
        imageUrl: "/images/schemas/coffre-vr.png",
        description: "Détails d'intégration d'un coffre de volet roulant en ITE avec traitement de l'étanchéité à l'air."
      }
    ]
  }
];
