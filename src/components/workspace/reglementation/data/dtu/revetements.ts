
import { DTU } from '../../dtu/types';

export const revetementsDTUs: DTU[] = [
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
    id: "dtu-52-2",
    title: "DTU 52.2 - Pose collée des revêtements céramiques",
    category: "Revêtements",
    description: "Pose collée de carrelages et assimilés",
    lastUpdate: "Octobre 2021",
    rules: [
      {
        title: "Choix de l'adhésif",
        content: "Le choix de l'adhésif (mortier-colle ou adhésif) dépend de la porosité du carreau, de ses dimensions et du support. Utiliser un mortier-colle C2 pour les grands formats.",
        type: "standard"
      },
      {
        title: "Double encollage",
        content: "Le double encollage est obligatoire pour les carreaux de superficie supérieure à 500 cm² en sols et 500 cm² en murs intérieurs.",
        type: "standard"
      },
      {
        title: "Défaut de planéité",
        content: "Un support présentant des défauts de planéité supérieurs à 5 mm sous la règle de 2 m doit être ragréé avant pose, sous peine de décollement ultérieur.",
        type: "warning"
      },
      {
        title: "Préparation des carreaux",
        content: "Pour une meilleure adhérence, humidifier légèrement le dos des carreaux très poreux avant la pose pour éviter qu'ils n'absorbent l'eau du mortier-colle.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 52.2 couvre la pose collée des revêtements céramiques et assimilés (grès, faïence, pierres naturelles) sur des supports neufs ou anciens, en murs et sols intérieurs et extérieurs."
      },
      {
        title: "Délais d'attente",
        content: "Le délai minimal avant circulation légère sur un carrelage neuf est de 24h à 48h selon le type de colle. Le jointoiement doit être réalisé au minimum 24h après la pose."
      },
      {
        title: "Largeur des joints",
        content: "La largeur minimale des joints entre carreaux est de 2 mm en intérieur et 4 mm en extérieur. Elle doit être augmentée pour les grands formats ou en cas de plancher chauffant."
      }
    ]
  },
  {
    id: "dtu-53-2",
    title: "DTU 53.2 - Revêtements de sol PVC",
    category: "Revêtements",
    description: "Pose de revêtements de sol PVC collés",
    lastUpdate: "Août 2022",
    rules: [
      {
        title: "Humidité du support",
        content: "L'humidité résiduelle du support doit être inférieure à 4,5% pour une chape à base de ciment et 0,5% pour une chape à base de sulfate de calcium.",
        type: "standard"
      },
      {
        title: "Préparation du support",
        content: "Le support doit recevoir un enduit de préparation de sol (ragréage) de classe P3 minimum pour un usage dans les locaux à trafic modéré.",
        type: "standard"
      },
      {
        title: "Risque de remontée d'humidité",
        content: "En cas de dallage sur terre-plein sans barrière d'étanchéité, prévoir un système de protection contre les remontées d'humidité avant la pose du revêtement.",
        type: "warning"
      },
      {
        title: "Marouflage efficace",
        content: "Après la pose, effectuer un marouflage soigné du revêtement en partant du centre vers les bords pour chasser l'air et assurer un collage optimal.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 53.2 s'applique aux revêtements de sol en PVC collés sur support à base de liants hydrauliques, bois ou anciens revêtements, en intérieur uniquement."
      },
      {
        title: "Conditions de mise en œuvre",
        content: "La température ambiante doit être d'au moins 15°C et celle du support d'au moins 10°C pendant la pose et les 24h suivantes. L'humidité relative doit être comprise entre 30% et 65%."
      },
      {
        title: "Traitement des joints et raccords",
        content: "Les joints entre lés doivent être traités à froid (par arasement) ou à chaud (par soudure thermique). Dans les locaux humides, la soudure à chaud est obligatoire."
      }
    ]
  }
];
