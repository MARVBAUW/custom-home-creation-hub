
import { DTU } from '../../dtu/types';

export const incendieDTUs: DTU[] = [
  {
    id: "dtu-securite-erp-1",
    title: "Réglementation Incendie - ERP Type M (Magasins)",
    category: "Incendie ERP",
    description: "Dispositions applicables aux établissements recevant du public de type M (magasins et centres commerciaux)",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Classement",
        content: "Type M : magasins de vente, centres commerciaux. 1ère catégorie : > 1500 personnes, 2ème : 701 à 1500, 3ème : 301 à 700, 4ème : 300 et moins, 5ème : petits établissements",
        type: "standard"
      },
      {
        title: "Évacuation",
        content: "Minimum deux sorties de 2 UP (unités de passage) pour les magasins de plus de 50 personnes. Une UP = 0,60 m, deux UP = 1,40 m, trois UP = 1,80 m",
        type: "warning"
      },
      {
        title: "Désenfumage",
        content: "Obligatoire pour les locaux de plus de 300 m² en sous-sol et 1000 m² en étage ou avec des circulations de plus de 30 m",
        type: "standard"
      },
      {
        title: "Éclairage de sécurité",
        content: "Éclairage d'évacuation obligatoire pour les ERP recevant plus de 50 personnes avec 5 lux minimum au sol",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Dégagements",
        content: "Largeurs de dégagement selon l'effectif : moins de 20 personnes = 1 UP, de 21 à 50 personnes = 2 UP, une UP supplémentaire par tranche de 100 personnes. Distance maximale à parcourir pour atteindre une sortie : 50 m, réduite à 30 m en cul-de-sac."
      },
      {
        title: "Aménagements intérieurs",
        content: "Les matériaux doivent être classés M0, M1, M2 selon l'usage (plafonds, murs, sols). Le mobilier doit respecter des normes de réaction au feu spécifiques."
      },
      {
        title: "Systèmes d'alarme",
        content: "Type 1 pour les établissements de 1ère et 2ème catégorie, type 2a pour les établissements de 3ème et 4ème catégorie."
      }
    ]
  },
  {
    id: "dtu-securite-erp-2",
    title: "Réglementation Incendie - ERP Type L (Salles)",
    category: "Incendie ERP",
    description: "Dispositions applicables aux établissements recevant du public de type L (salles de spectacles, réunions, conférences)",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Classement",
        content: "Type L : salles de spectacles, de conférences, à usage multiple. Catégories selon capacité d'accueil, avec spécificités pour les salles à plusieurs niveaux",
        type: "standard"
      },
      {
        title: "Isolement",
        content: "Parois séparatives avec d'autres établissements CF 1h minimum (CF 2h avec habitation ou ERP de sommeil)",
        type: "standard"
      },
      {
        title: "Dégagements",
        content: "Nombre d'unités de passage fonction de l'effectif et du niveau. 3 UP minimum pour salles de plus de 300 personnes",
        type: "warning"
      },
      {
        title: "Régie",
        content: "Parois de la régie technique CF 1h avec porte CF 1/2h si située dans la salle. Prévoir un éclairage de régie indépendant",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Structures et façades",
        content: "Stabilité au feu des structures : 1h pour les bâtiments à simple rez-de-chaussée, 1h30 pour les autres niveaux, 2h au-delà de 28m de hauteur."
      },
      {
        title: "Installations électriques",
        content: "Conformes à la NF C 15-100. Éclairage normal ne doit pas être interrompu plus de 10s. Alimentation électrique de sécurité obligatoire."
      },
      {
        title: "Décoration",
        content: "Éléments de décoration M0, M1 ou M2 selon emplacement. Tentures et rideaux de scène M1 obligatoirement. Sièges conformes NF D 60-013."
      }
    ]
  },
  {
    id: "dtu-securite-erp-3",
    title: "Réglementation Incendie - ERP Type N (Restauration)",
    category: "Incendie ERP",
    description: "Dispositions applicables aux établissements recevant du public de type N (restaurants et débits de boissons)",
    lastUpdate: "Février 2023",
    rules: [
      {
        title: "Implantation cuisine",
        content: "Les grandes cuisines (> 20 kW) doivent être isolées des locaux accessibles au public par des parois CF 1h et portes CF 1/2h à fermeture automatique",
        type: "standard"
      },
      {
        title: "Ventilation cuisine",
        content: "Conduits d'extraction des hottes CF 1/4h avec trappe de visite. Distance minimale de 0,50 m entre conduits et matériaux combustibles",
        type: "warning"
      },
      {
        title: "Gaz combustibles",
        content: "Coupure de gaz obligatoire en cuisine et accessible depuis l'extérieur. Tuyauteries rigides avec identification normalisée",
        type: "tip"
      },
      {
        title: "Terrasses couvertes",
        content: "Si fermées sur plus de 75% du périmètre, elles sont considérées comme des salles et soumises aux mêmes règles d'évacuation",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Locaux à risques",
        content: "Réserves supérieures à 10 m² : parois CF 1h, portes CF 1/2h à fermeture automatique. Locaux poubelles : CF 1h minimum, portes CF 1/2h."
      },
      {
        title: "Installation électrique",
        content: "Interrupteur général pour chaque cuisine, hors circuit de sécurité. Éclairage de sécurité adapté à la configuration."
      },
      {
        title: "Moyens de secours",
        content: "Extincteurs appropriés aux risques, notamment 6L eau pulvérisée + additif dans les cuisines, complétés par des couvertures anti-feu."
      }
    ]
  },
  {
    id: "dtu-securite-logement-1",
    title: "Réglementation Incendie - Habitation Collective",
    category: "Incendie Logement",
    description: "Dispositions applicables aux bâtiments d'habitation collectifs, selon leur classification",
    lastUpdate: "Mai 2023",
    rules: [
      {
        title: "Classification",
        content: "1ère famille : individuels R+1 max, 2ème famille : R+3 max, 3ème famille : R+7 max ou h≤28m, 4ème famille : h>28m et ≤50m",
        type: "standard"
      },
      {
        title: "Encloisonnement escalier",
        content: "Pour la 3ème famille, escaliers encloisonnés toute hauteur avec parois CF 1h et portes PF 1/2h à fermeture automatique",
        type: "warning"
      },
      {
        title: "Désenfumage",
        content: "Obligatoire pour les circulations horizontales de la 3ème famille. Exutoire de 1m² minimum en partie haute de l'escalier pour la 4ème famille",
        type: "standard"
      },
      {
        title: "Résistance au feu",
        content: "Structure SF 1/2h pour 1ère et 2ème famille, SF 1h pour 3ème famille, SF 1h30 pour 4ème famille",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Façades",
        content: "Règle du C+D applicable à partir de la 3ème famille : somme C+D ≥ 1m, avec C la distance verticale entre baies superposées et D la saillie horizontale."
      },
      {
        title: "Locaux à risques",
        content: "Locaux poubelles, caves et celliers isolés des autres parties par des parois CF 1h et portes CF 1/2h. Parcs de stationnement avec dispositions spécifiques."
      },
      {
        title: "Gaines techniques",
        content: "Gaines techniques avec parois CF 1/2h et trappes PF 1/2h. Distance minimale de 3 cm entre conduits et matériaux combustibles."
      }
    ]
  },
  {
    id: "dtu-securite-logement-2",
    title: "Réglementation Incendie - Habitation Individuelle",
    category: "Incendie Logement",
    description: "Dispositions applicables aux maisons individuelles isolées ou jumelées",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Détection",
        content: "Détecteurs Avertisseurs Autonomes de Fumée (DAAF) obligatoires à chaque niveau, de préférence dans les circulations et chambres",
        type: "standard"
      },
      {
        title: "Garage intégré",
        content: "Parois et plafond du garage intégré à l'habitation au moins CF 1/2h, porte intérieure PF 1/2h et ferme-porte obligatoire",
        type: "warning"
      },
      {
        title: "Conduit de fumée",
        content: "Distance de sécurité de 16 cm minimum entre la paroi extérieure du conduit de fumée et tout matériau combustible",
        type: "tip"
      },
      {
        title: "Combles",
        content: "Écran de sous-toiture au moins classé M1 (difficilement inflammable) recommandé, recoupement des combles tous les 25m",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Installations électriques",
        content: "Conformes à la NF C 15-100. Protection des circuits par disjoncteur différentiel 30mA. Tableau électrique accessible et identifié."
      },
      {
        title: "Chauffage et production ECS",
        content: "Appareils conformes aux normes et correctement ventilés. Alimentation des chaudières par conduits fixes. Stockage de combustible isolé."
      },
      {
        title: "Protection des vides sanitaires",
        content: "Recoupés tous les 25m par des séparations CF 1/4h si accessibles, et cloisonnés en limite de propriété dans le cas de maisons jumelées."
      }
    ]
  },
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
