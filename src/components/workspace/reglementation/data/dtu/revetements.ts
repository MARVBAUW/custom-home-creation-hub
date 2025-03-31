
import { DTU } from '../../dtu/types';

export const revetementsDTUs: DTU[] = [
  {
    id: "dtu-revetement-1",
    title: "DTU 52.2 - Pose collée des revêtements céramiques",
    category: "Revêtements",
    description: "Pose de carrelage céramique et assimilés - pierre naturelle - en travaux neufs",
    lastUpdate: "Janvier 2024",
    rules: [
      {
        title: "Planéité du support",
        content: "Tolérance de planéité 5 mm sous la règle de 2 m et 2 mm sous le réglet de 20 cm pour pose collée standard",
        type: "standard"
      },
      {
        title: "Fractionnement",
        content: "Joints de fractionnement obligatoires tous les 40 m² en intérieur (8 m max entre joints) et 20 m² en extérieur (5 m max)",
        type: "standard"
      },
      {
        title: "Choix de la colle",
        content: "Utiliser une colle adaptée au support, au format, à la porosité des carreaux et à la destination des locaux (C2S minimum en extérieur)",
        type: "warning"
      },
      {
        title: "Double encollage",
        content: "Double encollage obligatoire pour les carreaux > 500 cm² en murs intérieurs, > 1100 cm² en murs extérieurs et > 500 cm² en sols extérieurs",
        type: "tip"
      },
      {
        title: "Largeur des joints",
        content: "Largeur minimale des joints entre carreaux : 2 mm en intérieur, 4 mm en extérieur, 5 mm pour pierres naturelles",
        type: "standard"
      },
      {
        title: "Délais avant jointoiement",
        content: "Respecter un délai de séchage de 24h à 48h après la pose des carreaux avant de réaliser les joints, selon le type de colle utilisé",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Classification des locaux",
        content: "Le DTU classe les locaux selon leur exposition à l'eau : EA (locaux secs), EB (faible exposition), EB+ privé (salle de bains), EB+ collectif (douches collectives), EC (cuisines collectives)."
      },
      {
        title: "Supports admissibles",
        content: "Béton, chape, ancien carrelage, dalles semi-flexibles (sous conditions), enduit à base de ciment, plaque de plâtre hydrofuge (en local EB+ privé uniquement)."
      },
      {
        title: "Préparation des supports",
        content: "Les supports doivent être propres, cohésifs, plans, secs (humidité < 5% pour supports base ciment) et stables. Primaire d'accrochage selon les cas."
      },
      {
        title: "Protection à l'eau",
        content: "SPEC (Système de Protection à l'Eau sous Carrelage) obligatoire dans les zones exposées à l'eau en EB+ privatif sur supports sensibles à l'eau, et en EB+ collectif."
      },
      {
        title: "Tolérances esthétiques",
        content: "Désaffleur maximal entre carreaux : 1 mm + 0,5 mm pour des joints < 6 mm. Alignement des joints : écart maximal de 2 mm sous une règle de 2 m."
      }
    ],
    schemas: [
      {
        id: "schema-carrelage-1",
        title: "Pose collée sur chape",
        imageUrl: "/images/schemas/pose-collee-chape.png",
        description: "Coupe verticale montrant les différentes couches d'une pose collée sur chape : support, colle, carreau et joint."
      },
      {
        id: "schema-carrelage-2",
        title: "Joint de fractionnement",
        imageUrl: "/images/schemas/joint-fractionnement.png",
        description: "Détail d'un joint de fractionnement dans un revêtement carrelé avec profilé spécifique."
      },
      {
        id: "schema-carrelage-3",
        title: "Double encollage",
        imageUrl: "/images/schemas/double-encollage.png",
        description: "Technique du double encollage : application de colle sur le support et sur l'envers du carreau."
      }
    ]
  },
  {
    id: "dtu-revetement-2",
    title: "DTU 51.2 - Parquets collés",
    category: "Revêtements",
    description: "Pose de parquets collés",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Humidité du support",
        content: "Humidité maximale du support : 3% pour chape ciment, 0,5% pour chape anhydrite (sulfate de calcium)",
        type: "standard"
      },
      {
        title: "Humidité du bois",
        content: "Humidité du parquet à la livraison : 7% à 11%, avec écart maximal de 2% entre lames pour limiter les déformations ultérieures",
        type: "standard"
      },
      {
        title: "Jeu périphérique",
        content: "Jeu périphérique obligatoire de 8 mm minimum pour permettre la dilatation du parquet, masqué par une plinthe ou un profilé",
        type: "warning"
      },
      {
        title: "Choix de la colle",
        content: "Colle adaptée au support et au type de parquet. Colles polyuréthanes recommandées pour supports difficiles et grands formats",
        type: "tip"
      },
      {
        title: "Primaire d'accrochage",
        content: "Primaire obligatoire sur chapes à base de sulfate de calcium et recommandé sur supports poreux pour améliorer l'adhérence",
        type: "standard"
      },
      {
        title: "Stabilisation thermique",
        content: "Les lames de parquet doivent être entreposées dans la pièce de pose au moins 48h avant installation pour s'acclimater",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Types de parquets admis",
        content: "Parquets contrecollés (EN 13489), massifs à chants droits ≤ 90 mm de large (EN 13226), mosaïques (EN 13488) et en bois debout (EN 14761)."
      },
      {
        title: "Supports admissibles",
        content: "Chapes à base de ciment, chapes fluides à base de sulfate de calcium, planchers béton, anciens revêtements adhérents (carrelage, dalles plastiques, anciens parquets)."
      },
      {
        title: "Planéité requise",
        content: "7 mm sous la règle de 2 m et 2 mm sous le réglet de 20 cm. Si non conforme, application d'un enduit de ragréage de classe P3 minimum."
      },
      {
        title: "Mise en œuvre",
        content: "Calepinage préalable, collage en plein avec peigne adapté (consommation selon préconisation du fabricant), marouflage et lestage si nécessaire."
      },
      {
        title: "Compatibilité sol chauffant",
        content: "Parquet compatible sol chauffant : épaisseur totale ≤ 15 mm, bois de masse volumique ≥ 500 kg/m³. Mise en chauffe progressive avant et arrêt 48h avant pose."
      }
    ],
    schemas: [
      {
        id: "schema-parquet-1",
        title: "Coupe parquet collé",
        imageUrl: "/images/schemas/parquet-colle.png",
        description: "Coupe type d'un parquet collé montrant le support, la colle, le parquet et le jeu périphérique."
      },
      {
        id: "schema-parquet-2",
        title: "Jonction avec autre revêtement",
        imageUrl: "/images/schemas/jonction-parquet.png",
        description: "Détail de jonction entre un parquet collé et un autre revêtement de sol (carrelage) avec profilé de transition."
      },
      {
        id: "schema-parquet-3",
        title: "Calepinage de parquet",
        imageUrl: "/images/schemas/calepinage-parquet.png",
        description: "Exemple de calepinage de parquet pour optimiser la disposition des lames et minimiser les chutes."
      }
    ]
  },
  {
    id: "dtu-revetement-3",
    title: "DTU 53.2 - Revêtements de sol PVC collés",
    category: "Revêtements",
    description: "Pose de revêtements de sol PVC collés",
    lastUpdate: "Octobre 2023",
    rules: [
      {
        title: "Humidité du support",
        content: "Humidité maximale du support : 4,5% pour chape ciment, 0,5% pour chape anhydrite. Mesure obligatoire à la bombe à carbure",
        type: "standard"
      },
      {
        title: "Température minimale",
        content: "Température du local et du support ≥ 12°C pour la pose, avec maintien à ≥ 15°C pendant 48h après pose",
        type: "standard"
      },
      {
        title: "Remontée d'humidité",
        content: "En présence de terre-plein sans barrière anti-remontée capillaire, prévoir un système de protection contre les remontées d'humidité",
        type: "warning"
      },
      {
        title: "Marouflage",
        content: "Marouflage soigné obligatoire, d'abord manuel puis avec un rouleau lesté (50 kg minimum) pour assurer un transfert optimal de la colle",
        type: "tip"
      },
      {
        title: "Joints entre lés",
        content: "Joints soudés à chaud obligatoires dans les locaux humides (E2 et E3) et recommandés dans les autres pour garantir l'étanchéité",
        type: "standard"
      },
      {
        title: "Traitement des rives",
        content: "En locaux humides, traitement des rives avec mastic MS Polymère après arasement du revêtement à 3 mm du mur",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Types de revêtements",
        content: "Le DTU couvre les revêtements PVC homogènes et hétérogènes en lés, en dalles et en lames, conformes aux normes NF EN ISO 10581, 10582, 10595 et 10874."
      },
      {
        title: "Classification des locaux",
        content: "UPEC pour caractériser l'intensité d'usage, et E1, E2, E3 pour les locaux selon leur exposition à l'eau. Le choix du revêtement doit être adapté au classement."
      },
      {
        title: "Préparation des supports",
        content: "Enduit de préparation de sol obligatoire (ragréage autolissant de classe P3 minimum), avec primaire adapté au support. Ponçage et dépoussiérage avant pose."
      },
      {
        title: "Choix de la colle",
        content: "Colles acryliques (A1 ou A2) selon porosité du support, colle réactive (PU bi-composant) pour zones exposées à l'humidité ou aux fortes sollicitations."
      },
      {
        title: "Délai de mise en service",
        content: "24h minimum après pose pour un trafic pédestre normal, 48h pour aménagement des mobiliers, 72h pour mise en service complète."
      }
    ],
    schemas: [
      {
        id: "schema-pvc-1",
        title: "Coupe sol PVC collé",
        imageUrl: "/images/schemas/pvc-colle.png",
        description: "Coupe d'un sol PVC collé avec préparation de support, colle et revêtement."
      },
      {
        id: "schema-pvc-2",
        title: "Traitement des rives en pièce humide",
        imageUrl: "/images/schemas/rive-pvc.png",
        description: "Détail du traitement d'étanchéité périphérique en local humide (mastic, plinthe)."
      },
      {
        id: "schema-pvc-3",
        title: "Soudure à chaud",
        imageUrl: "/images/schemas/soudure-pvc.png",
        description: "Étapes de réalisation d'une soudure à chaud entre lés de PVC : chanfreinage, soudure, arasage."
      }
    ]
  }
];
