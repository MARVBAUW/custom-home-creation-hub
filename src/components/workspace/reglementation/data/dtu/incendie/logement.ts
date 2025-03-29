
import { DTU } from '../../../dtu/types';

export const logementDTUs: DTU[] = [
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
  }
];
