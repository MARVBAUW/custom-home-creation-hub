
import { DTU } from '../../../dtu/types';

export const parkingDTUs: DTU[] = [
  {
    id: "dtu-securite-parking-1",
    title: "Réglementation Incendie - Parcs de stationnement couverts",
    category: "Incendie Parking",
    description: "Dispositions applicables aux parcs de stationnement couverts, ouverts ou fermés",
    lastUpdate: "Mai 2023",
    rules: [
      {
        title: "Classification",
        content: "PS (parc de stationnement), classé soit en ERP type PS, soit en bâtiment d'habitation, soit en IGH PS selon contexte et hauteur. Réglementation spécifique arrêté du 9 mai 2006 modifié.",
        type: "standard"
      },
      {
        title: "Parc ouvert/fermé",
        content: "Parc ouvert: ventilation naturelle avec ouvertures de 50% minimum en façades sur 2 faces opposées. Parc fermé: absence d'ouvertures ou moins de 50%.",
        type: "standard"
      },
      {
        title: "Structure",
        content: "SF 1h (ou 1h30 si > 28m). Planchers CF 1h (voire 2h pour certains planchers séparatifs avec autres bâtiments). Toiture par couverture en matériaux M0.",
        type: "warning"
      },
      {
        title: "Compartimentage",
        content: "Maximum 3000 m² par compartiment. Séparation entre compartiments par parois CF 1h et portes CF 1/2h. Maximum 6 niveaux par compartiment.",
        type: "standard"
      },
      {
        title: "Rampes d'accès",
        content: "Largeur minimale 3,00 m (2,75 m si flux séparés). Pente maximale 17% (exceptionnellement 20% sur longueurs réduites). Rayon de giration intérieur ≥ 3,50 m.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Désenfumage",
        content: "Obligatoire pour parcs fermés > 100 m². Naturel si possibilité d'ouvertures sur l'extérieur (1/100 de la surface). Mécanique: 600 m³/h par véhicule (min 15 m³/h/m²). Bouches réparties pour qu'aucun point ne soit à plus de 25m d'une bouche d'extraction."
      },
      {
        title: "Issues de secours",
        content: "Distance maximale de 40m pour atteindre une issue (25m en cul-de-sac). Au moins 2 issues pour parcs > 100 véhicules. Largeur minimale 0,90m. Balisage lumineux obligatoire. Escaliers encloisonnés avec porte PF 1/2h."
      },
      {
        title: "Installations électriques",
        content: "Éclairage normal assurant 50 lux minimum. Éclairage de sécurité obligatoire (autonomie 1h). Câbles résistants au feu CR1-C1 pour circuits sécurité. Alimentation électrique de sécurité pour ventilateurs (autonomie 4h)."
      },
      {
        title: "Moyens de secours",
        content: "Extincteurs portatifs 13A-21B tous les 30m. RIA si > 250 véhicules. Colonne sèche si > R+3. Système de Sécurité Incendie adapté au risque. Système d'extinction automatique si > 3 niveaux sous le niveau de référence."
      }
    ],
    schemas: [
      {
        id: "schema-parking-1",
        title: "Désenfumage d'un parc de stationnement",
        imageUrl: "/images/schemas/desenfumage-parking.png",
        description: "Principe de répartition des bouches de désenfumage mécanique dans un parc de stationnement."
      }
    ]
  },
  {
    id: "dtu-securite-parking-2",
    title: "Réglementation Incendie - Parcs automatisés",
    category: "Incendie Parking",
    description: "Dispositions spécifiques aux parcs de stationnement automatisés sans présence humaine",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Définition",
        content: "Parc sans accès du public, hors postes de commande et d'accueil, où le stationnement est assuré automatiquement par des dispositifs mécaniques.",
        type: "standard"
      },
      {
        title: "Structure",
        content: "SF 1h30 minimum. Planchers intermédiaires SF 1h. Planchers séparatifs CF 2h si communication avec d'autres locaux ou bâtiments.",
        type: "standard"
      },
      {
        title: "Compartimentage",
        content: "Maximum 3000 m² par compartiment. Chaque compartiment doit être isolé par des parois CF 2h et porte CF 1h à fermeture automatique.",
        type: "warning"
      },
      {
        title: "Détection incendie",
        content: "Détection automatique incendie généralisée dans tous les volumes. Système d'extinction automatique généralisé obligatoire.",
        type: "alert"
      },
      {
        title: "Zone d'intervention pompiers",
        content: "Accès protégé pour les pompiers à moins de 40m de tout point du parc. Zone d'intervention avec mise à disposition des commandes des installations.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Désenfumage",
        content: "Désenfumage mécanique obligatoire. Débit d'extraction 900 m³/h par véhicule pour les 100 premiers véhicules, 600 m³/h au-delà. Commandes automatiques sur détection et manuelles au poste de sécurité et à l'entrée."
      },
      {
        title: "Alimentation de secours",
        content: "Alimentation électrique de sécurité obligatoire pour tous les équipements de sécurité. Autonomie minimale 4h. Batteries ou groupe électrogène avec démarrage automatique."
      },
      {
        title: "Commandes manuelles",
        content: "Centralisées au poste de sécurité, avec commandes de secours à l'entrée du parc pour: éclairage, ventilation, désenfumage, contrôle d'accès, et arrêt d'urgence des installations."
      },
      {
        title: "Moyens d'extinction",
        content: "Extinction automatique généralisée (sprinklers, brouillard d'eau ou système adapté). Prises de raccordement pompiers à chaque niveau. Colonne en charge dans les parcs > 2 niveaux."
      }
    ]
  }
];
