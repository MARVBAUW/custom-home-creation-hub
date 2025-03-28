
import { DTU } from '../../dtu/types';

export const toitureDTUs: DTU[] = [
  {
    id: "dtu-40-11",
    title: "DTU 40.11 - Couvertures en ardoises",
    category: "Toiture",
    description: "Couvertures en ardoises naturelles",
    lastUpdate: "Avril 2022",
    rules: [
      {
        title: "Pente minimale",
        content: "La pente minimale pour une couverture en ardoises est de 45% (24°) en zone 1, 60% (31°) en zone 2 et 70% (35°) en zone 3 pour les situations protégées.",
        type: "standard"
      },
      {
        title: "Recouvrement des ardoises",
        content: "Le recouvrement minimal des ardoises est de 7 cm en zone 1, 8 cm en zone 2 et 9 cm en zone 3 pour des ardoises de format standard.",
        type: "standard"
      },
      {
        title: "Risque de pénétration d'eau",
        content: "Un défaut de recouvrement ou de pureau peut entraîner des infiltrations d'eau. Vérifier systématiquement ces paramètres avant la pose.",
        type: "warning"
      },
      {
        title: "Fixation renforcée",
        content: "En bord de mer ou zones très exposées au vent, doubler les fixations des ardoises avec deux clous ou crochets par ardoise.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 40.11 s'applique aux couvertures en ardoises naturelles posées sur liteaux ou voligeage pour tous types de bâtiments, situés à une altitude inférieure à 900 m."
      },
      {
        title: "Choix des ardoises",
        content: "Les ardoises doivent être conformes à la norme NF EN 12326 et de qualité minimale A1-S1-T1 pour assurer leur durabilité. Leur épaisseur ne doit pas être inférieure à 3,5 mm."
      },
      {
        title: "Ventilation de la toiture",
        content: "La ventilation de la sous-face de la couverture doit être assurée par une lame d'air continue de 2 cm minimum et des entrées d'air en partie basse et sorties en partie haute."
      }
    ]
  },
  {
    id: "dtu-40-21",
    title: "DTU 40.21 - Couvertures en tuiles de terre cuite",
    category: "Toiture",
    description: "Tuiles à emboîtement ou à glissement à relief",
    lastUpdate: "Novembre 2021",
    rules: [
      {
        title: "Pente minimale",
        content: "La pente minimale est déterminée selon le modèle de tuile, la zone climatique et la situation d'exposition. Pour les tuiles à relief, elle varie généralement de 24% à 50%.",
        type: "standard"
      },
      {
        title: "Écran sous toiture",
        content: "Un écran sous toiture est obligatoire pour les pentes inférieures à la pente minimale de pose (augmentée de 5%), les sites exposés, ou quand le comble est aménagé.",
        type: "standard"
      },
      {
        title: "Tuiles cassées",
        content: "Remplacer immédiatement toute tuile cassée ou fissurée pour éviter des infiltrations qui pourraient endommager la charpente.",
        type: "warning"
      },
      {
        title: "Fixation des tuiles",
        content: "En rives et en égout, ainsi qu'en faîtage et arêtiers, fixer au minimum une tuile sur cinq. En cas de pente supérieure à 175% (60°), toutes les tuiles doivent être fixées.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 40.21 s'applique aux couvertures en tuiles de terre cuite à emboîtement ou à glissement à relief pour des bâtiments situés à une altitude inférieure à 900 m."
      },
      {
        title: "Support de couverture",
        content: "Le support peut être continu (voligeage) ou discontinu (liteaux). Les liteaux doivent avoir une section minimale de 27×40 mm pour les entraxes usuels."
      },
      {
        title: "Ventilation de la couverture",
        content: "La section totale des orifices de ventilation doit être au moins égale à 1/4000e de la surface de la toiture avec un minimum de 20 cm² par mètre linéaire au niveau de l'égout."
      }
    ]
  },
  {
    id: "dtu-43-1",
    title: "DTU 43.1 - Étanchéité des toitures-terrasses",
    category: "Toiture",
    description: "Étanchéité des toitures-terrasses et toitures inclinées",
    lastUpdate: "Juillet 2023",
    rules: [
      {
        title: "Pente minimale",
        content: "La pente minimale pour une toiture-terrasse est de 1% vers les évacuations d'eaux pluviales pour éviter les stagnations d'eau.",
        type: "standard"
      },
      {
        title: "Joints de dilatation",
        content: "Les joints de dilatation de la structure doivent être repris dans le revêtement d'étanchéité et traités selon les règles de l'art.",
        type: "standard"
      },
      {
        title: "Risque de stagnation d'eau",
        content: "Une pente insuffisante ou des contrepentes peuvent créer des zones de stagnation d'eau, qui favorisent le vieillissement prématuré de l'étanchéité.",
        type: "warning"
      },
      {
        title: "Protection des relevés",
        content: "Les relevés d'étanchéité doivent être protégés par des ouvrages rigides (bandes de solin métalliques, costières) pour éviter leur dégradation.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 43.1 s'applique aux travaux d'étanchéité des toitures-terrasses et toitures inclinées avec revêtement d'étanchéité réalisé en feuilles bitumineuses ou synthétiques."
      },
      {
        title: "Éléments porteurs",
        content: "L'élément porteur peut être en maçonnerie, en béton cellulaire, en bois ou en tôles d'acier nervurées, chacun avec ses exigences spécifiques de mise en œuvre."
      },
      {
        title: "Hauteur des relevés",
        content: "La hauteur minimale des relevés d'étanchéité est de 15 cm au-dessus de la protection, réduite à 10 cm dans le cas de terrasses privatives de surface inférieure à 100 m²."
      }
    ]
  },
  {
    id: "dtu-40-35",
    title: "DTU 40.35 - Couvertures en plaques nervurées métalliques",
    category: "Toiture",
    description: "Plaques nervurées issues de tôles d'acier revêtues",
    lastUpdate: "Mai 2022",
    rules: [
      {
        title: "Pente minimale",
        content: "La pente minimale pour une couverture en plaques nervurées métalliques est de 5% (3°) avec recouvrement adapté et joints d'étanchéité.",
        type: "standard"
      },
      {
        title: "Recouvrement longitudinal",
        content: "Le recouvrement longitudinal doit être d'au moins une onde complète et comporter un joint d'étanchéité en zones exposées.",
        type: "standard"
      },
      {
        title: "Risque de condensation",
        content: "Dans les bâtiments non chauffés, prévoir une solution anti-condensation (feutre absorbant, isolation adaptée) pour éviter les gouttelettes sous la couverture.",
        type: "warning"
      },
      {
        title: "Fixations adaptées",
        content: "Utiliser des fixations avec rondelles d'étanchéité EPDM de diamètre 19 mm minimum et les placer en sommet d'onde pour garantir l'étanchéité.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 40.35 s'applique aux couvertures en plaques nervurées métalliques fabriquées à partir de tôles d'acier revêtues pour des bâtiments de toute destination."
      },
      {
        title: "Types de plaques",
        content: "Les plaques peuvent être en acier galvanisé, galvanisé prélaqué, ou en aluminium. L'épaisseur minimale est de 0,63 mm pour l'acier et 0,70 mm pour l'aluminium."
      },
      {
        title: "Ventilation de la sous-face",
        content: "La ventilation de la sous-face de couverture doit être assurée par une lame d'air ventilée de 20 mm minimum, avec entrées d'air en partie basse et sorties en partie haute."
      }
    ]
  },
  {
    id: "dtu-40-22",
    title: "DTU 40.22 - Couvertures en tuiles canal",
    category: "Toiture",
    description: "Pose de tuiles canal ou romaines",
    lastUpdate: "Janvier 2023",
    rules: [
      {
        title: "Pente minimale",
        content: "La pente minimale est de 24% (13,5°) en zone 1, 27% (15°) en zone 2 et 30% (16,5°) en zone 3 pour des tuiles canal posées sur support continu.",
        type: "standard"
      },
      {
        title: "Mortier de pose",
        content: "Le mortier de pose doit être dosé à 250 kg/m³ de ciment et ne doit pas être utilisé par température inférieure à 5°C.",
        type: "standard"
      },
      {
        title: "Sensibilité au gel",
        content: "En zone de montagne ou exposée au gel, utiliser des tuiles résistantes au gel (classe FP ou F+) pour éviter leur dégradation rapide.",
        type: "warning"
      },
      {
        title: "Ventilation sous tuiles",
        content: "Pour les tuiles posées sur liteaux ou voliges, créer des ouvertures de ventilation en partie haute et basse de la couverture (1/2000e de la surface couverte).",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 40.22 s'applique aux couvertures en tuiles canal, qu'elles soient posées sur support continu, liteaux, ou voliges, pour des bâtiments situés à une altitude inférieure à 900 m."
      },
      {
        title: "Modes de pose",
        content: "Les tuiles canal peuvent être posées sur support continu, sur supports discontinus (liteaux, voliges), scellées au mortier ou posées à sec avec crochets de fixation."
      },
      {
        title: "Accessoires de couverture",
        content: "Les faîtages, arêtiers et rives doivent être traités avec des tuiles de même nature, posées à bain de mortier et comportant un débord de 5 cm minimum par rapport au mur."
      }
    ]
  },
  {
    id: "dtu-40-23",
    title: "DTU 40.23 - Couvertures en tuiles plates",
    category: "Toiture",
    description: "Tuiles plates de terre cuite à emboîtement ou à glissement",
    lastUpdate: "Octobre 2022",
    rules: [
      {
        title: "Pente minimale",
        content: "La pente minimale est de 70% (35°) en zone 1, 80% (38,5°) en zone 2 et 90% (42°) en zone 3 pour les tuiles plates à pureau brouillé.",
        type: "standard"
      },
      {
        title: "Recouvrement transversal",
        content: "Le recouvrement transversal des tuiles doit être au minimum de 7 à 8 cm selon la zone climatique et l'exposition du site.",
        type: "standard"
      },
      {
        title: "Fixation en rive",
        content: "Toutes les tuiles en rives, égouts, faîtages et arêtiers doivent être fixées pour résister aux effets du vent.",
        type: "warning"
      },
      {
        title: "Doublis à l'égout",
        content: "La rangée d'égout doit comporter un doublis (rang supplémentaire de tuiles) pour éviter les infiltrations en bas de pente.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 40.23 s'applique aux couvertures en tuiles plates de terre cuite posées sur liteaux, pour tous types de bâtiments situés à une altitude inférieure à 900 m."
      },
      {
        title: "Litonnage",
        content: "Le pureau (partie visible de la tuile) détermine l'écartement des liteaux. Pour les tuiles plates traditionnelles, cet écartement est généralement de 22 à 27 cm."
      },
      {
        title: "Protection contre la neige poudreuse",
        content: "Un écran de sous-toiture est obligatoire en zone de montagne ou sites exposés pour protéger contre les infiltrations de neige poudreuse."
      }
    ]
  },
  {
    id: "dtu-40-24",
    title: "DTU 40.24 - Couvertures en tuiles en béton",
    category: "Toiture",
    description: "Pose de tuiles en béton à emboîtement ou à glissement",
    lastUpdate: "Septembre 2022",
    rules: [
      {
        title: "Pente minimale",
        content: "La pente minimale dépend du modèle de tuile et de la zone climatique, généralement entre 25% et 70% selon le modèle et l'exposition.",
        type: "standard"
      },
      {
        title: "Fixation des tuiles",
        content: "Les tuiles de rive, d'égout, de faîtage et tous les accessoires doivent être fixés. En cas de pente supérieure à 175% ou zone exposée, toutes les tuiles doivent être fixées.",
        type: "standard"
      },
      {
        title: "Manipulation avec précaution",
        content: "Les tuiles en béton sont sensibles aux chocs, particulièrement par temps froid. Éviter de les entrechoquer lors de la manutention sur le chantier.",
        type: "warning"
      },
      {
        title: "Stockage sur chantier",
        content: "Stocker les palettes de tuiles sur un terrain plat et sec, et limiter la hauteur d'empilement à 2 palettes pour éviter les risques d'effondrement.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 40.24 s'applique aux couvertures en tuiles en béton à emboîtement ou à glissement, pour tous types de bâtiments situés à une altitude inférieure à 900 m."
      },
      {
        title: "Caractéristiques des tuiles",
        content: "Les tuiles en béton doivent être conformes à la norme NF EN 490 et porter le marquage CE. Elles doivent avoir une résistance à la flexion d'au moins 2000 N."
      },
      {
        title: "Traitement des points singuliers",
        content: "Les rives, faîtages, arêtiers et noues doivent être traités conformément aux prescriptions du fabricant, généralement avec des accessoires spécifiques."
      }
    ]
  },
  {
    id: "dtu-40-29",
    title: "DTU 40.29 - Mise en œuvre des écrans souples de sous-toiture",
    category: "Toiture",
    description: "Pose des écrans souples sous les éléments de couverture discontinus",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Recouvrement horizontal",
        content: "Le recouvrement horizontal entre lés d'écran doit être de 10 cm minimum et être placé au droit d'un support (chevron ou liteau).",
        type: "standard"
      },
      {
        title: "Ventilation obligatoire",
        content: "Une lame d'air ventilée de 2 cm minimum doit être maintenue entre l'écran et les éléments de couverture.",
        type: "standard"
      },
      {
        title: "Défaut de ventilation",
        content: "L'absence de ventilation entre l'écran et les éléments de couverture peut provoquer une condensation et une dégradation prématurée de la charpente.",
        type: "warning"
      },
      {
        title: "Marquage au sol",
        content: "Tracer au sol les repères des recouvrements pour faciliter la pose des lés d'écran dans le cas de grandes longueurs.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 40.29 s'applique à la mise en œuvre des écrans souples de sous-toiture pour couvertures en tuiles, ardoises ou autres éléments discontinus."
      },
      {
        title: "Types d'écrans",
        content: "Le DTU distingue les écrans HPV (Hautement Perméables à la Vapeur d'eau) et les écrans non HPV, chacun avec ses spécificités de mise en œuvre, notamment pour la ventilation."
      },
      {
        title: "Points singuliers",
        content: "Les points singuliers (cheminées, fenêtres de toit, pénétrations) doivent être traités avec des raccords étanches, généralement par remontée de l'écran et bandes adhésives spécifiques."
      }
    ]
  }
];

