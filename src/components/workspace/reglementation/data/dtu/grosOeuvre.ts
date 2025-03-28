
import { DTU } from '../../dtu/types';

export const grosOeuvreDTUs: DTU[] = [
  {
    id: "dtu-13-3",
    title: "DTU 13.3 - Dallages",
    category: "Gros œuvre",
    description: "Conception, calcul et exécution des dallages en béton",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Épaisseur minimale de dallage",
        content: "L'épaisseur minimale d'un dallage est de 12 cm pour usage industriel et 10 cm pour usage courant.",
        type: "standard"
      },
      {
        title: "Joint de dilatation",
        content: "Prévoir un joint de dilatation tous les 25 à 35 m² et aux points singuliers (changements de géométrie, piliers).",
        type: "standard"
      },
      {
        title: "Attention au drainage",
        content: "Un défaut de drainage peut entraîner des soulèvements différentiels. Prévoir une pente minimale de 2% vers les exutoires.",
        type: "warning"
      },
      {
        title: "Compactage des remblais",
        content: "Le compactage doit être réalisé par couches successives de 20 cm maximum.",
        type: "standard"
      },
      {
        title: "Dosage béton recommandé",
        content: "Utiliser un béton de classe minimale C25/30 avec un dosage minimum de 350 kg/m³ de ciment.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 13.3 s'applique aux dallages en béton de granulats courants non armé, armé ou renforcé de fibres, destinés à constituer les sols de travail ou d'exploitation des bâtiments civils et industriels."
      },
      {
        title: "Types de dallages",
        content: "Le DTU distingue trois types de dallages : les dallages à usage industriel ou assimilés (partie 1), les dallages à usage autre qu'industriel ou assimilés (partie 2), et les dallages de maisons individuelles (partie 3)."
      },
      {
        title: "Préparation du support",
        content: "La couche de forme doit être convenablement compactée, sa portance vérifiée et traitée si nécessaire pour atteindre un module de déformation EV2 ≥ 50 MPa pour les dallages industriels."
      }
    ]
  },
  {
    id: "dtu-20-1",
    title: "DTU 20.1 - Ouvrages en maçonnerie",
    category: "Gros œuvre",
    description: "Travaux de bâtiment - Ouvrages en maçonnerie de petits éléments",
    lastUpdate: "Octobre 2021",
    rules: [
      {
        title: "Épaisseur minimale des murs",
        content: "L'épaisseur minimale des murs porteurs est de 15 cm pour les blocs à maçonner et 20 cm en zone sismique.",
        type: "standard"
      },
      {
        title: "Chaînages verticaux",
        content: "Prévoir des chaînages verticaux à tous les angles, extrémités et intersections de murs, ainsi qu'encadrant les ouvertures.",
        type: "standard"
      },
      {
        title: "Protection contre l'humidité",
        content: "Une coupure de capillarité doit être mise en œuvre à minimum 15 cm au-dessus du niveau du sol extérieur fini.",
        type: "warning"
      },
      {
        title: "Mortier de montage",
        content: "Utiliser un mortier de classe M5 minimum (résistance à la compression ≥ 5 N/mm²) pour les maçonneries porteuses.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 20.1 s'applique aux ouvrages de maçonnerie de petits éléments : briques, blocs en béton, en terre cuite ou en pierre naturelle, pour les constructions courantes jusqu'à R+5."
      },
      {
        title: "Tolérances d'exécution",
        content: "La tolérance de verticalité est de ±1 cm sur la hauteur d'étage et la tolérance de planéité est de 1 cm sous une règle de 2 m pour les murs destinés à recevoir un enduit."
      },
      {
        title: "Appuis des planchers",
        content: "La longueur d'appui minimale des planchers sur les murs est de 2/3 de l'épaisseur du mur avec un minimum de 5 cm pour les planchers en béton armé."
      }
    ]
  },
  {
    id: "dtu-21",
    title: "DTU 21 - Exécution des ouvrages en béton",
    category: "Gros œuvre",
    description: "Règles d'exécution pour les ouvrages en béton",
    lastUpdate: "Janvier 2023",
    rules: [
      {
        title: "Enrobage minimal des armatures",
        content: "L'enrobage minimal des armatures doit être de 3 cm pour les bétons exposés aux intempéries et 2 cm pour les bétons protégés.",
        type: "standard"
      },
      {
        title: "Cure du béton",
        content: "La durée minimale de cure du béton doit être de 3 jours en conditions normales, et 7 jours en période froide (< 10°C).",
        type: "standard"
      },
      {
        title: "Protection contre la dessiccation",
        content: "Par temps sec ou venteux, le béton frais doit être protégé contre le dessèchement par pulvérisation d'eau, application d'un produit de cure ou bâchage.",
        type: "warning"
      },
      {
        title: "Vibration efficace",
        content: "Une vibration efficace du béton utilise un vibrateur plongé verticalement à intervalles réguliers, sans toucher les armatures ou le coffrage.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 21 s'applique à l'exécution des ouvrages en béton armé coulé en place : fondations, murs, poteaux, poutres, planchers, etc."
      },
      {
        title: "Classes d'exposition",
        content: "Le choix de la classe d'exposition (XC, XD, XS, XF, XA) détermine la durabilité et la résistance minimale du béton selon les conditions environnementales auxquelles il sera soumis."
      },
      {
        title: "Décoffrage",
        content: "Le délai minimal avant décoffrage dépend de la température ambiante : 16h à 20°C, 24h à 15°C, 36h à 10°C pour les coffrages verticaux. Pour les coffrages horizontaux, ces délais sont doublés."
      }
    ]
  }
];
