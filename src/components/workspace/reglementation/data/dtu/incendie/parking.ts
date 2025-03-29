
import { DTU } from '../../../dtu/types';

export const parkingDTUs: DTU[] = [
  {
    id: "dtu-securite-parking-1",
    title: "Réglementation Incendie - Parcs de stationnement couverts",
    category: "Incendie Parking",
    description: "Dispositions applicables aux parcs de stationnement couverts, selon la réglementation en vigueur",
    lastUpdate: "Juin 2023",
    rules: [
      {
        title: "Classement",
        content: "PS pour les parcs > 100 m² classés ERP ou > 250 m² en habitation. Au-delà de 6000 m² : compartiments de 3000 m² maximum reliés par des sas CF 1h",
        type: "standard"
      },
      {
        title: "Résistance au feu",
        content: "Structure minimum SF 1h, SF 1h30 si hauteur > 28m. Planchers séparatifs CF 1h30. Couverture incombustible",
        type: "standard"
      },
      {
        title: "Évacuation",
        content: "Deux issues minimum par niveau. Distance maximale à parcourir pour atteindre une issue : 40 m si choix, 25 m en cul-de-sac",
        type: "warning"
      },
      {
        title: "Ventilation",
        content: "Débit d'extraction min. 600 m³/h par véhicule en ventilation permanente, 900 m³/h en cas d'incendie. 50% des amenées d'air en partie basse",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Installations électriques",
        content: "Conformes à la NF C 15-100. Canalisations électriques protégées mécaniquement. Éclairage normal : 50 lux minimum et 100 lux aux entrées/sorties piétons."
      },
      {
        title: "Moyens de secours",
        content: "Extincteurs portatifs 6 kg poudre BC ou ABC tous les 20m. Colonnes sèches si plus de 3 niveaux sous le niveau de référence ou plus de 4 au-dessus."
      },
      {
        title: "Véhicules électriques",
        content: "Points de charge limités à 20% des places. Câbles d'alimentation résistants au feu (CR1). Coupure d'urgence générale obligatoire."
      }
    ]
  }
];
