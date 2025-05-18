
import { DTU } from '../../dtu/types';

export const hygrometrieDTUs: DTU[] = [
  {
    id: "hygrometrie-1",
    title: "DTU 20.1 - Hygrométrie dans les bâtiments",
    category: "Hygrométrie",
    description: "Recommandations techniques pour la gestion de l'humidité dans les constructions.",
    lastUpdate: "2021-08-12",
    rules: [
      {
        title: "Classes d'hygrométrie",
        content: "Les bâtiments sont classés en 4 catégories selon leur taux d'hygrométrie intérieure: très faible (EA), faible (EB), moyen (EB+), fort (EC).",
        type: "standard"
      },
      {
        title: "Pare-vapeur",
        content: "Un pare-vapeur doit être installé du côté chaud de l'isolation pour éviter la condensation interne. Sa valeur Sd doit être au minimum de 18m.",
        type: "warning"
      },
      {
        title: "Points de vigilance",
        content: "Les ponts thermiques sont des zones à risque élevé de condensation. Une attention particulière doit être portée à leur traitement.",
        type: "alert"
      }
    ],
    sections: [
      {
        title: "Classification des locaux",
        content: "EA: locaux à très faible hygrométrie (entrepôts). EB: locaux à faible hygrométrie (chambres, séjours). EB+: locaux à hygrométrie moyenne (cuisines, salles de bain privatives). EC: locaux à forte hygrométrie (douches collectives, piscines)."
      },
      {
        title: "Valeurs Sd recommandées",
        content: "La valeur Sd minimale d'un pare-vapeur dépend du climat: zone froide > 57m, zone tempérée > 28m, zone chaude > 18m."
      }
    ]
  },
  {
    id: "hygrometrie-2",
    title: "DTU 25.41 - Plaque de plâtre en milieu humide",
    category: "Hygrométrie",
    description: "Spécifications pour l'installation des plaques de plâtre dans les pièces humides.",
    lastUpdate: "2020-06-05",
    rules: [
      {
        title: "Types de plaques",
        content: "En milieu humide, utiliser des plaques hydrofuges de type H1. En milieu très humide (EC), préférer des plaques H2.",
        type: "alert"
      },
      {
        title: "Fixation",
        content: "L'espacement des fixations doit être réduit en zone humide pour garantir la stabilité: 30cm pour les plafonds, 40cm pour les murs.",
        type: "tip"
      },
      {
        title: "Protection des pieds de cloisons",
        content: "Les pieds de cloisons doivent être protégés de l'humidité par une remontée d'étanchéité d'au moins 2cm au-dessus du sol fini.",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Traitement des joints",
        content: "En zones humides, utiliser un enduit hydrofuge et une bande à joint résistante à l'humidité. Appliquer un primaire d'accrochage avant pose du carrelage."
      },
      {
        title: "SPEC et SEPI",
        content: "En zones très humides (douches), appliquer un Système de Protection à l'Eau sous Carrelage (SPEC) ou sous enduit (SEPI) sur toute la surface."
      }
    ]
  },
  {
    id: "hygrometrie-condensation-1",
    title: "Point de rosée et risques de condensation",
    category: "Condensation",
    description: "Analyse des phénomènes de condensation superficielle et interne dans les parois des bâtiments.",
    lastUpdate: "2022-09-18",
    rules: [
      {
        title: "Calcul du point de rosée",
        content: "Le point de rosée dépend de la température ambiante et de l'humidité relative. À 20°C et 50% HR, le point de rosée est d'environ 9,3°C.",
        type: "standard"
      },
      {
        title: "Condensation superficielle",
        content: "Se produit lorsque la température de surface intérieure est inférieure au point de rosée, généralement due à des ponts thermiques.",
        type: "warning"
      },
      {
        title: "Condensation interne",
        content: "Se produit lorsque la vapeur d'eau migre dans la paroi et rencontre une zone dont la température est inférieure au point de rosée.",
        type: "alert"
      }
    ],
    sections: [
      {
        title: "Facteurs favorisant la condensation",
        content: "Production de vapeur d'eau excessive, ventilation insuffisante, isolation thermique défectueuse, ponts thermiques, étanchéité à l'air défaillante."
      },
      {
        title: "Conséquences de la condensation",
        content: "Développement de moisissures, dégradation des matériaux, diminution de la performance thermique, problèmes de santé pour les occupants."
      }
    ],
    schemas: [
      {
        id: "condensation-schema-1",
        title: "Migration de vapeur d'eau dans une paroi",
        imageUrl: "/images/dtu/condensation-paroi.png",
        description: "Schéma montrant la migration de vapeur d'eau à travers différentes couches de matériaux et la formation potentielle de condensation."
      }
    ]
  },
  {
    id: "hygrometrie-ventilation-1",
    title: "DTU 68.3 - Ventilation et hygrométrie",
    category: "Ventilation",
    description: "Principes et exigences pour les systèmes de ventilation en relation avec la gestion de l'humidité.",
    lastUpdate: "2022-03-10",
    rules: [
      {
        title: "Débits réglementaires",
        content: "Extraction minimum en cuisine : 45 à 135 m³/h selon le nombre de pièces. Salle de bains : 15 à 30 m³/h. WC : 15 à 30 m³/h.",
        type: "standard"
      },
      {
        title: "VMC Simple flux",
        content: "Extraction mécanique dans les pièces humides et entrées d'air dans les pièces sèches. Débit autoréglable ou hygroréglable.",
        type: "tip"
      },
      {
        title: "VMC Double flux",
        content: "Récupération de chaleur jusqu'à 90% possible. Nécessite une étanchéité à l'air soignée du bâtiment pour être efficace.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Ventilation hygroréglable",
        content: "Type A : entrées d'air autoréglables et bouches d'extraction hygroréglables. Type B : entrées d'air et bouches d'extraction hygroréglables."
      },
      {
        title: "Règles de dimensionnement",
        content: "Section des entrées d'air : 45 cm² min pour les pièces principales en autoréglable. Conduits : diamètre 80 mm min pour les piquages, 160 mm pour les collecteurs."
      }
    ]
  }
];
