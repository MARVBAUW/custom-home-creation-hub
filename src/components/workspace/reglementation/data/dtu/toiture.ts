
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
  }
];
