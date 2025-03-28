
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
  },
  {
    id: "dtu-36-2",
    title: "DTU 36.2 - Menuiseries intérieures en bois",
    category: "Menuiseries",
    description: "Conception et installation des menuiseries intérieures en bois",
    lastUpdate: "Juin 2023",
    rules: [
      {
        title: "Jeu sous porte",
        content: "Le jeu sous les portes doit être de 7 mm minimum pour les sols bruts et 5 mm pour les sols finis, pour permettre la ventilation et le passage sur revêtements.",
        type: "standard"
      },
      {
        title: "Humidité du bois",
        content: "L'humidité du bois au moment de la pose doit être comprise entre 8% et 12% pour éviter les déformations ultérieures.",
        type: "standard"
      },
      {
        title: "Risque de déformation",
        content: "Une menuiserie posée dans des locaux trop humides (>65% HR) ou insuffisamment chauffés peut se déformer de façon irréversible.",
        type: "warning"
      },
      {
        title: "Pose des huisseries",
        content: "Dans les cloisons sèches, utiliser des pattes à scellement spécifiques type queue de carpe et prévoir au moins 3 points de fixation par montant d'huisserie.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 36.2 traite de la conception et de la mise en œuvre des menuiseries intérieures en bois : portes, placards, habillages, plinthes, trappes et escaliers intérieurs."
      },
      {
        title: "Tolérances dimensionnelles",
        content: "La tolérance dimensionnelle pour les huisseries est de ±2 mm pour la hauteur et largeur. Pour les vantaux, elle est de ±1 mm en largeur et ±2 mm en hauteur."
      },
      {
        title: "Finitions",
        content: "Les menuiseries intérieures doivent recevoir au minimum une couche d'impression avant pose. La finition doit être appliquée après pose et ajustements, dans un délai maximum de 3 mois."
      }
    ]
  }
];
