
import { DTU } from '../../dtu/types';

export const dtuDTUs: DTU[] = [
  {
    id: "dtu-1",
    title: "DTU 13.3 - Dallages",
    category: "Gros œuvre",
    description: "Document technique unifié relatif aux dallages de bâtiments.",
    lastUpdate: "2021-05-15",
    rules: [
      {
        title: "Épaisseur minimale",
        content: "L'épaisseur minimale d'un dallage doit être de 12 cm pour un usage courant.",
        type: "standard"
      },
      {
        title: "Armatures",
        content: "Les dallages doivent comporter des armatures minimales pour limiter la fissuration.",
        type: "warning"
      }
    ]
  },
  {
    id: "dtu-2",
    title: "DTU 20.1 - Parois et murs en maçonnerie",
    category: "Gros œuvre",
    description: "Document technique unifié définissant les règles de mise en œuvre des parois et murs en maçonnerie.",
    lastUpdate: "2020-11-23",
    rules: [
      {
        title: "Épaisseur minimale des murs",
        content: "Les murs extérieurs en maçonnerie doivent avoir une épaisseur minimale de 20 cm.",
        type: "standard"
      },
      {
        title: "Joints de dilatation",
        content: "Des joints de dilatation doivent être prévus tous les 15 mètres maximum.",
        type: "alert"
      }
    ]
  }
];
