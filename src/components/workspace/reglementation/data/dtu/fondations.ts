
import { DTU } from '../../dtu/types';

export const fondationsDTUs: DTU[] = [
  {
    id: "dtu-13-11",
    title: "DTU 13.11 - Fondations superficielles",
    category: "Fondations",
    description: "Conception et exécution des fondations superficielles",
    lastUpdate: "Février 2022",
    rules: [
      {
        title: "Profondeur hors gel",
        content: "La base des fondations doit se situer à une profondeur minimale de 0,80 m en zone de gel faible et jusqu'à 1,20 m en zone de gel sévère.",
        type: "standard"
      },
      {
        title: "Contrainte admissible",
        content: "La contrainte admissible du sol doit être déterminée par une étude géotechnique. À défaut, ne pas dépasser 0,2 MPa pour des sols courants.",
        type: "standard"
      },
      {
        title: "Sols argileux",
        content: "Sur sols argileux sensibles au retrait-gonflement, prévoir des fondations descendues à une profondeur minimale de 1,20 m, même hors zone de gel.",
        type: "warning"
      },
      {
        title: "Drainage périphérique",
        content: "En cas de terrain en pente ou de nappe proche, mettre en place un drainage périphérique raccordé à un exutoire pour protéger les fondations.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 13.11 s'applique aux fondations superficielles (semelles filantes, isolées, radiers) pour tous types de constructions situées dans des conditions normales de sol."
      },
      {
        title: "Types de fondations",
        content: "Le DTU traite des semelles filantes sous murs, semelles isolées sous poteaux, longrines sur puits ou plots, et radiers généraux, chacun avec ses spécificités de dimensionnement."
      },
      {
        title: "Études préalables",
        content: "Une reconnaissance géotechnique du sol est nécessaire pour déterminer la nature du sol, sa portance, la présence d'eau, et le risque de tassement différentiel."
      }
    ]
  },
  {
    id: "dtu-13-12",
    title: "DTU 13.12 - Règles pour le calcul des fondations superficielles",
    category: "Fondations",
    description: "Méthodes de calcul des fondations superficielles",
    lastUpdate: "Octobre 2021",
    rules: [
      {
        title: "Coefficient de sécurité",
        content: "Le coefficient de sécurité vis-à-vis de la rupture du sol sous une fondation superficielle doit être au minimum de 3 en conditions normales.",
        type: "standard"
      },
      {
        title: "Excentricité maximale",
        content: "L'excentricité de la charge par rapport au centre de la semelle ne doit pas dépasser 1/6 de la largeur de la semelle pour éviter tout décollement.",
        type: "standard"
      },
      {
        title: "Tassements différentiels",
        content: "Les tassements différentiels entre points d'appui adjacents ne doivent pas dépasser 0,5 cm pour les structures sensibles et 1 cm pour les structures courantes.",
        type: "warning"
      },
      {
        title: "Largeur minimale",
        content: "Pour les semelles filantes, adopter une largeur minimale de 40 cm permettant un bétonnage correct, même si le calcul indique une valeur inférieure.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 13.12 définit les méthodes de calcul des fondations superficielles concernant leur stabilité vis-à-vis du sol et leurs dimensions."
      },
      {
        title: "Vérifications",
        content: "Les calculs doivent vérifier la stabilité d'ensemble (glissement, renversement), la résistance du sol (poinçonnement) et les tassements absolus et différentiels."
      },
      {
        title: "Combinaisons de charges",
        content: "Les fondations doivent être calculées pour les combinaisons d'actions les plus défavorables, en tenant compte des charges permanentes, variables et accidentelles."
      }
    ]
  },
  {
    id: "dtu-13-2",
    title: "DTU 13.2 - Fondations profondes",
    category: "Fondations",
    description: "Conception et exécution des fondations profondes",
    lastUpdate: "Juin 2023",
    rules: [
      {
        title: "Diamètre minimal des pieux",
        content: "Le diamètre minimal d'un pieu foré est de 30 cm pour un pieu isolé et 40 cm pour un pieu sous nappe nécessitant un tube de forage.",
        type: "standard"
      },
      {
        title: "Armatures longitudinales",
        content: "La section minimale d'armatures longitudinales doit être de 0,5% de la section du pieu avec un minimum de 4 barres HA pour les pieux circulaires.",
        type: "standard"
      },
      {
        title: "Fluage du béton",
        content: "Limiter la contrainte de compression dans le béton à 8 MPa pour les pieux forés et 10 MPa pour les pieux battus afin d'éviter le fluage à long terme.",
        type: "warning"
      },
      {
        title: "Recépage des pieux",
        content: "Lors du recépage des pieux, prévoir une surlongueur d'au moins 50 cm pour éliminer le béton de mauvaise qualité en tête de pieu.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 13.2 s'applique aux fondations profondes réalisées par pieux ou barrettes pour tous types de constructions, lorsque les fondations superficielles sont inadaptées."
      },
      {
        title: "Types de pieux",
        content: "Le DTU couvre les pieux forés (simples ou à la boue), les pieux battus (préfabriqués ou moulés), les micropieux, et les barrettes, chacun avec ses spécificités."
      },
      {
        title: "Contrôles d'exécution",
        content: "Des contrôles sont obligatoires pendant l'exécution : verticalité du forage (tolérance de 2%), qualité du béton, continuité du fût, et parfois essais de chargement."
      }
    ]
  },
  {
    id: "dtu-14-1",
    title: "DTU 14.1 - Travaux de cuvelage",
    category: "Fondations",
    description: "Cuvelage dans les parties immergées de bâtiment",
    lastUpdate: "Novembre 2022",
    rules: [
      {
        title: "Épaisseur minimale",
        content: "L'épaisseur minimale d'un voile en béton armé pour un cuvelage est de 20 cm, pouvant aller jusqu'à 30 cm selon la profondeur et la pression hydrostatique.",
        type: "standard"
      },
      {
        title: "Enrobage des armatures",
        content: "L'enrobage minimal des armatures côté eau est de 4 cm pour garantir la durabilité de l'ouvrage en milieu agressif.",
        type: "standard"
      },
      {
        title: "Reprise de bétonnage",
        content: "Les reprises de bétonnage sont des points faibles potentiels. Elles doivent être traitées avec un joint waterstop et un traitement de surface spécifique.",
        type: "warning"
      },
      {
        title: "Rabattement de nappe",
        content: "Maintenir le rabattement de nappe au moins 50 cm sous le niveau du fond de fouille pendant toute la durée du bétonnage et jusqu'à la fin du durcissement.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 14.1 s'applique aux travaux de cuvelage destinés à s'opposer aux venues d'eau dans les parties immergées des bâtiments (sous-sols, parkings souterrains)."
      },
      {
        title: "Types de cuvelage",
        content: "Le DTU distingue le cuvelage avec revêtement d'étanchéité rapporté et le cuvelage par structure étanche (béton imperméable à l'eau), chacun avec ses exigences."
      },
      {
        title: "Drainage",
        content: "Un système de drainage peut être prévu pour réduire la pression hydrostatique, avec des dispositions pour la collecte et l'évacuation des eaux, incluant un système de pompage de secours."
      }
    ]
  }
];

