
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
  }
];
