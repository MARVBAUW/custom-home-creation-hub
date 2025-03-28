
import { DTU } from '../../dtu/types';

export const menuiseriesDTUs: DTU[] = [
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
