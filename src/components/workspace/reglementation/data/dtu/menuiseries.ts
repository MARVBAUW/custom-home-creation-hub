
import { DTU } from '../../dtu/types';

export const menuiseriesDTUs: DTU[] = [
  {
    id: "dtu-menuiseries-1",
    title: "DTU 36.5 - Menuiseries extérieures",
    category: "Menuiseries",
    description: "Mise en œuvre des fenêtres et portes extérieures dans les bâtiments",
    lastUpdate: "Juillet 2023",
    rules: [
      {
        title: "Calfeutrement",
        content: "Largeur des joints de calfeutrement comprise entre 5 et 15 mm, avec mise en œuvre sur fond de joint",
        type: "standard"
      },
      {
        title: "Fixation",
        content: "Entraxe maximal de 80 cm entre points de fixation, avec au moins 3 fixations par montant/traverse",
        type: "warning"
      },
      {
        title: "Seuil PMR",
        content: "Hauteur maximale de 2 cm pour les seuils accessibles PMR, avec pente < 25% et protection contre les infiltrations d'eau",
        type: "standard"
      },
      {
        title: "Appui de fenêtre",
        content: "Pente minimale de 3% vers l'extérieur, avec débord de 3 cm et goutte d'eau",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Tolérances dimensionnelles",
        content: "Écart maximal admissible entre diagonales : 2 mm pour longueur ≤ 1,5 m, 3 mm pour longueur > 1,5 m. Verticalité : écart maximal 2 mm/m."
      },
      {
        title: "Performance thermique",
        content: "Coefficient de transmission thermique Uw ≤ 1,3 W/m².K pour les fenêtres. Facteur solaire Sw ≥ 0,3 pour les apports solaires en hiver."
      },
      {
        title: "Étanchéité à l'air",
        content: "Classement minimal A*3 requis pour assurer l'étanchéité à l'air. Jonction dormant/ouvrant avec double barrière de joints."
      }
    ],
    schemas: [
      {
        id: "schema-menuiserie-1",
        title: "Coupe verticale d'une fenêtre",
        imageUrl: "/images/schemas/menuiserie-coupe.png",
        description: "Cette coupe verticale montre les éléments principaux d'une fenêtre : dormant, ouvrant, vitrage, parclose, joint d'étanchéité et appui."
      },
      {
        id: "schema-menuiserie-2",
        title: "Détail de pose en applique",
        imageUrl: "/images/schemas/menuiserie-applique.png",
        description: "Ce schéma présente la méthode de pose en applique avec isolation par l'extérieur, précisant le calfeutrement et l'étanchéité à l'air et à l'eau."
      }
    ]
  },
  {
    id: "dtu-menuiseries-2",
    title: "DTU 36.2 - Menuiseries intérieures",
    category: "Menuiseries",
    description: "Conception et mise en œuvre des menuiseries intérieures en bois",
    lastUpdate: "Mai 2023",
    rules: [
      {
        title: "Humidité du bois",
        content: "Taux d'humidité du bois compris entre 8% et 12% avant mise en œuvre",
        type: "warning"
      },
      {
        title: "Jeu sous les portes",
        content: "Jeu minimum de 5 mm pour les locaux secs, 7 mm pour les salles d'eau avec revêtement",
        type: "standard"
      },
      {
        title: "Fixation des huisseries",
        content: "Minimum 4 points de fixation par montant, avec entraxe maximal de 75 cm",
        type: "standard"
      },
      {
        title: "Protection contre l'humidité",
        content: "Pied d'huisserie traité avec produit hydrofuge ou rehaussé du sol dans les pièces humides",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Dimensions standard",
        content: "Portes intérieures : largeur 630/730/830/930 mm, hauteur 2040 mm. Passage libre minimum 800 mm pour accessibilité PMR."
      },
      {
        title: "Quincaillerie",
        content: "Paumelles : 3 minimum par vantail pour hauteur standard, 4 pour grande hauteur. Serrures : axe à 1040 mm du sol fini."
      },
      {
        title: "Stockage sur chantier",
        content: "Local sec, ventilé, à l'abri des intempéries et des chocs. Stockage à plat pour éviter déformations."
      }
    ],
    schemas: [
      {
        id: "schema-porte-1",
        title: "Anatomie d'une porte intérieure",
        imageUrl: "/images/schemas/porte-interieure.png",
        description: "Ce schéma détaille les composants d'une porte intérieure : huisserie, vantail, chambranle, contre-chambranle et quincaillerie."
      }
    ]
  }
];
