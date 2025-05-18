
import { DTU } from '../../dtu/types';

export const dtuDTUs: DTU[] = [
  {
    id: "dtu-1",
    title: "DTU 13.3 - Dallages",
    category: "Gros œuvre",
    description: "Document technique unifié relatif aux dallages de bâtiments en région PACA, notamment à Marseille.",
    lastUpdate: "2021-08-15",
    rules: [
      {
        title: "Épaisseur minimale",
        content: "L'épaisseur minimale d'un dallage doit être de 12 cm pour un usage courant en construction à Marseille.",
        type: "standard"
      },
      {
        title: "Armatures",
        content: "Les dallages doivent comporter des armatures minimales pour limiter la fissuration, particulièrement important dans la région PACA.",
        type: "warning"
      }
    ]
  },
  {
    id: "dtu-2",
    title: "DTU 20.1 - Parois et murs en maçonnerie",
    category: "Gros œuvre",
    description: "Document technique unifié définissant les règles de mise en œuvre des parois et murs en maçonnerie adaptées au climat méditerranéen.",
    lastUpdate: "2023-01-23",
    rules: [
      {
        title: "Épaisseur minimale des murs",
        content: "Les murs extérieurs en maçonnerie doivent avoir une épaisseur minimale de 20 cm pour une bonne isolation thermique en PACA.",
        type: "standard"
      },
      {
        title: "Joints de dilatation",
        content: "Des joints de dilatation doivent être prévus tous les 15 mètres maximum pour compenser les variations thermiques importantes en région méditerranéenne.",
        type: "alert"
      }
    ]
  },
  {
    id: "dtu-3",
    title: "DTU 31.2 - Construction de maisons à ossature bois",
    category: "Ossature bois",
    description: "Référence pour la construction de maisons à ossature bois adaptées au climat et aux normes parasismiques de la région PACA.",
    lastUpdate: "2022-11-10",
    rules: [
      {
        title: "Protection contre l'humidité",
        content: "Prévoir des pare-pluie et pare-vapeur adaptés aux conditions climatiques méditerranéennes pour les constructions à Marseille et dans le Sud.",
        type: "warning"
      },
      {
        title: "Contreventement",
        content: "Le contreventement doit être particulièrement soigné dans les zones à risque sismique comme la région PACA.",
        type: "alert"
      }
    ]
  }
];
