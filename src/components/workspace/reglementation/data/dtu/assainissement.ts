
import { DTU } from '../../dtu/types';

export const assainissementDTUs: DTU[] = [
  {
    id: "dtu-64-1",
    title: "DTU 64.1 - Assainissement non collectif",
    category: "Assainissement",
    description: "Dispositifs d'assainissement non collectif pour maisons individuelles",
    lastUpdate: "Octobre 2022",
    rules: [
      {
        title: "Distance minimale",
        content: "Un dispositif d'assainissement non collectif doit être situé à au moins 5 m de l'habitation, 3 m des limites de propriété et 35 m d'un puits d'eau potable.",
        type: "standard"
      },
      {
        title: "Dimensionnement fosse",
        content: "Le volume minimal d'une fosse toutes eaux est de 3 m³ pour une habitation jusqu'à 5 pièces principales, plus 1 m³ par pièce supplémentaire.",
        type: "standard"
      },
      {
        title: "Sol imperméable",
        content: "Sur sol imperméable (argile, roche), un épandage traditionnel est inadapté. Prévoir un tertre ou un filtre à sable drainé avec rejet autorisé.",
        type: "warning"
      },
      {
        title: "Ventilation secondaire",
        content: "La ventilation secondaire (extraction des gaz de fermentation) doit déboucher au-dessus des locaux habités avec un extracteur statique ou éolien.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 64.1 s'applique aux installations d'assainissement non collectif recevant des eaux usées domestiques, pour des maisons d'habitation individuelles jusqu'à 20 équivalents-habitants."
      },
      {
        title: "Filières traditionnelles",
        content: "Le DTU décrit les filières traditionnelles (fosse toutes eaux suivie d'un traitement par le sol en place ou reconstitué) et leurs règles de dimensionnement et de mise en œuvre."
      },
      {
        title: "Entretien et maintenance",
        content: "L'entretien comprend une vidange de la fosse toutes eaux lorsque le volume des boues atteint 50% du volume utile, généralement tous les 4 ans pour une utilisation normale."
      }
    ]
  },
  {
    id: "dtu-60-11",
    title: "DTU 60.11 - Évacuations d'eaux pluviales",
    category: "Assainissement",
    description: "Règles de calcul des évacuations d'eaux pluviales",
    lastUpdate: "Mai 2023",
    rules: [
      {
        title: "Surface de collecte",
        content: "La surface de collecte à considérer est la projection horizontale de la toiture augmentée de 50% des surfaces verticales exposées à la pluie.",
        type: "standard"
      },
      {
        title: "Pente minimale",
        content: "La pente minimale des chéneaux et gouttières est de 0,5 cm par mètre, avec une pente de 1 cm par mètre recommandée pour un écoulement optimal.",
        type: "standard"
      },
      {
        title: "Sous-dimensionnement",
        content: "Un sous-dimensionnement des descentes peut entraîner des débordements et des infiltrations en façade. Prévoir une marge de sécurité de 20% sur les calculs.",
        type: "warning"
      },
      {
        title: "Crapaudines",
        content: "Installer des crapaudines aux entrées des descentes pour éviter l'obstruction par les feuilles et débris, et les nettoyer régulièrement.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 60.11 - partie 3 s'applique au calcul des évacuations d'eaux pluviales (chéneaux, gouttières, descentes et collecteurs) pour tous types de bâtiments."
      },
      {
        title: "Base de dimensionnement",
        content: "Le dimensionnement est basé sur la surface à évacuer et l'intensité pluviométrique de la région, généralement 3 L/min/m² en métropole, pouvant atteindre 6 L/min/m² en zones tropicales."
      },
      {
        title: "Matériaux autorisés",
        content: "Les évacuations peuvent être réalisées en zinc, cuivre, acier galvanisé, aluminium, PVC ou fonte selon les contraintes esthétiques et la durabilité recherchée."
      }
    ]
  },
  {
    id: "dtu-60-32",
    title: "DTU 60.32 - Canalisations en polychlorure de vinyle non plastifié",
    category: "Assainissement",
    description: "Évacuation des eaux pluviales et des eaux usées",
    lastUpdate: "Avril 2022",
    rules: [
      {
        title: "Dilatation thermique",
        content: "Prévoir un jeu de 1 cm par mètre de tube PVC pour permettre la dilatation thermique (coefficient de dilatation du PVC : 0,7 mm/m/10°C).",
        type: "standard"
      },
      {
        title: "Pente d'évacuation",
        content: "Les canalisations d'évacuation horizontales doivent avoir une pente minimale de 1 cm par mètre pour les eaux usées et 0,5 cm par mètre pour les eaux pluviales.",
        type: "standard"
      },
      {
        title: "Protection UV",
        content: "Le PVC exposé aux rayons UV se dégrade rapidement. Protéger les canalisations extérieures par peinture ou utiliser du PVC avec protection anti-UV.",
        type: "warning"
      },
      {
        title: "Chanfreinage",
        content: "Chanfreiner l'extrémité des tubes avant assemblage par collage pour faciliter l'emboîtement et éviter le raclage de la colle.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 60.32 s'applique aux canalisations en PVC non plastifié utilisées pour l'évacuation des eaux pluviales et des eaux usées à l'intérieur des bâtiments."
      },
      {
        title: "Assemblage et fixation",
        content: "Les assemblages peuvent être réalisés par collage, par joint élastomère ou par joint mécanique. Les fixations doivent être adaptées au diamètre et permettre la dilatation."
      },
      {
        title: "Essais et contrôles",
        content: "Avant mise en service, les canalisations doivent subir un essai d'étanchéité à l'eau sous une pression de 0,1 bar pendant 15 minutes, sans baisse de pression."
      }
    ]
  },
  {
    id: "dtu-60-33",
    title: "DTU 60.33 - Canalisations en polychlorure de vinyle chloré (PVC-C)",
    category: "Assainissement",
    description: "Évacuation d'eaux usées et distribution d'eau chaude",
    lastUpdate: "Juillet 2023",
    rules: [
      {
        title: "Résistance température",
        content: "Le PVC-C peut supporter des températures jusqu'à 95°C en continu, contrairement au PVC classique limité à 60°C.",
        type: "standard"
      },
      {
        title: "Collage spécifique",
        content: "Utiliser exclusivement des colles spécifiques au PVC-C, les colles pour PVC standard ne garantissant pas la tenue à température élevée.",
        type: "standard"
      },
      {
        title: "Incompatibilité",
        content: "Ne pas mélanger des tubes et raccords en PVC-C de différents fabricants, car les formulations peuvent varier et compromettre la fiabilité des assemblages.",
        type: "warning"
      },
      {
        title: "Temps de séchage",
        content: "Respecter un temps de séchage de 24h minimum avant mise en eau ou essai de pression pour garantir la polymérisation complète de la colle.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 60.33 s'applique aux canalisations en PVC-C utilisées pour l'évacuation des eaux usées chaudes et la distribution d'eau chaude sanitaire jusqu'à 95°C."
      },
      {
        title: "Assemblage",
        content: "L'assemblage des tubes et raccords en PVC-C se fait exclusivement par collage, après nettoyage et décapage des surfaces à assembler avec des produits spécifiques."
      },
      {
        title: "Dimensionnement",
        content: "Le dimensionnement des canalisations doit tenir compte de la dilatation thermique du PVC-C (0,065 mm/m/°C) et prévoir des lyres ou compensateurs si nécessaire."
      }
    ]
  }
];

