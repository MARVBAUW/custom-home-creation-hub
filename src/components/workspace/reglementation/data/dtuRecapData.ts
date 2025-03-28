
export const dtuRecaps = [
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
    id: "dtu-52-1",
    title: "DTU 52.1 - Revêtements de sols scellés",
    category: "Revêtements",
    description: "Pose scellée des revêtements céramiques et assimilés",
    lastUpdate: "Janvier 2022",
    rules: [
      {
        title: "Épaisseur minimale du mortier de pose",
        content: "L'épaisseur minimale du mortier de pose est de 5 cm pour une pose désolidarisée et 2 cm pour une pose adhérente.",
        type: "standard"
      },
      {
        title: "Joints de fractionnement",
        content: "Prévoir des joints de fractionnement tous les 40 m² en intérieur et 20 m² en extérieur ou tous les 8 m linéaires.",
        type: "standard"
      },
      {
        title: "Risque de fissuration",
        content: "Attendre au moins 28 jours avant de poser sur un support neuf en béton pour limiter les risques de fissuration par retrait.",
        type: "warning"
      },
      {
        title: "Pente en extérieur",
        content: "En extérieur, la pente minimale du support doit être de 1,5% pour assurer l'écoulement des eaux.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 52.1 s'applique aux revêtements de sol intérieurs et extérieurs réalisés par pose scellée, adhérente ou désolidarisée, de carreaux céramiques, terres cuites ou analogues."
      },
      {
        title: "Choix du mortier",
        content: "Le mortier de pose doit être dosé entre 250 et 350 kg/m³ de ciment, avec un rapport eau/ciment maximal de 0,55 et une consistance de classe S1 ou S2 selon la NF EN 206."
      },
      {
        title: "Tolérances de planéité",
        content: "La tolérance de planéité est de 5 mm sous une règle de 2 m et 1 mm sous un réglet de 20 cm pour des carreaux de dimensions supérieures à 100 cm²."
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
    id: "dtu-45-1",
    title: "DTU 45.1 - Isolation thermique des bâtiments",
    category: "Isolation",
    description: "Isolation thermique des bâtiments par l'intérieur",
    lastUpdate: "Septembre 2020",
    rules: [
      {
        title: "Pare-vapeur côté chaud",
        content: "Le pare-vapeur doit toujours être positionné du côté chaud de l'isolant (côté intérieur du local) pour éviter les condensations.",
        type: "standard"
      },
      {
        title: "Continuité de l'isolation",
        content: "Assurer la continuité de l'isolation aux jonctions entre parois (murs/planchers, angles) pour éviter les ponts thermiques.",
        type: "standard"
      },
      {
        title: "Risque de condensation",
        content: "Le non-respect de la continuité du pare-vapeur peut conduire à des problèmes d'humidité dans les parois et une dégradation de l'isolant.",
        type: "warning"
      },
      {
        title: "Vides techniques",
        content: "Prévoir un vide technique de 2 à 4 cm entre le parement et l'isolant pour le passage des gaines électriques sans altérer le pare-vapeur.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 45.1 traite de l'isolation thermique par l'intérieur des murs en béton ou en maçonnerie, des planchers et des combles des bâtiments, au moyen de produits manufacturés."
      },
      {
        title: "Choix des isolants",
        content: "Les isolants doivent être certifiés et adaptés à leur usage. Leur résistance thermique doit être choisie en fonction des exigences réglementaires (RT2012, RE2020)."
      },
      {
        title: "Mise en œuvre du pare-vapeur",
        content: "Le pare-vapeur doit avoir une valeur Sd (épaisseur d'air équivalente) supérieure à 18 m dans le cas général. Les joints doivent être rendus étanches par des adhésifs compatibles."
      }
    ]
  },
  {
    id: "dtu-36-5",
    title: "DTU 36.5 - Menuiseries extérieures",
    category: "Menuiseries",
    description: "Mise en œuvre des fenêtres et portes extérieures",
    lastUpdate: "Avril 2022",
    rules: [
      {
        title: "Jeu périphérique",
        content: "Le jeu entre le dormant et la maçonnerie doit être compris entre 5 et 25 mm pour permettre la mise en œuvre correcte du calfeutrement.",
        type: "standard"
      },
      {
        title: "Calfeutrement",
        content: "Le calfeutrement doit être réalisé par mousse imprégnée, mastic sur fond de joint ou membrane d'étanchéité, jamais par la seule mousse polyuréthane.",
        type: "standard"
      },
      {
        title: "Drainage obligatoire",
        content: "Toujours vérifier que les orifices de drainage des menuiseries ne sont pas obstrués après pose, sous peine d'infiltrations d'eau.",
        type: "warning"
      },
      {
        title: "Fixation adaptée",
        content: "Utiliser des pattes de fixation ou des chevilles adaptées au support, espacées de 60 cm maximum et positionnées à 15 cm maximum des angles.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 36.5 s'applique à la mise en œuvre des fenêtres, portes-fenêtres et blocs-portes extérieurs quelle que soit la nature des matériaux constitutifs (bois, PVC, aluminium, mixte)."
      },
      {
        title: "Appuis et seuils",
        content: "La pente des appuis de fenêtre doit être au minimum de 10% vers l'extérieur. Le rejingot doit avoir une hauteur minimale de 25 mm par rapport au point haut de l'appui."
      },
      {
        title: "Étanchéité à l'air",
        content: "L'étanchéité à l'air doit être assurée de manière continue sur tout le pourtour de la menuiserie, à l'interface entre le dormant et le gros œuvre."
      }
    ]
  }
];
