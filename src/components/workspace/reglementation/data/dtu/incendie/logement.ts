
import { DTU } from '../../../dtu/types';

export const logementDTUs: DTU[] = [
  {
    id: "dtu-securite-logement-1",
    title: "Réglementation Incendie - Immeubles 3ème Famille",
    category: "Incendie Logement",
    description: "Dispositions applicables aux immeubles d'habitation collective de 3ème famille (>R+3 à R+7)",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Caractéristiques",
        content: "3ème famille A: R+4 à R+7, distance escalier/entrée ≤ 7m, accessible aux échelles. 3ème famille B: R+4 à R+7 mais distance > 7m ou non accessible.",
        type: "standard"
      },
      {
        title: "Structures",
        content: "Structures SF 1h minimum. Planchers CF 1h entre logements. Séparatifs logements: CF 1h, portes palières PF 1/2h.",
        type: "standard"
      },
      {
        title: "Escaliers",
        content: "Obligatoirement encloisonnés, parois CF 1h, portes PF 1/2h + ferme-porte. 2 escaliers si > 50 logements par niveau. Largeur 1,20m minimum (1 UP).",
        type: "warning"
      },
      {
        title: "Circulations",
        content: "Largeur 1,40m, distance logement-escalier ≤ 15m en 3ème A, ≤ 10m en 3ème B. Désenfumage obligatoire, recoupement tous les 30m par portes PF 1/2h.",
        type: "tip"
      },
      {
        title: "Gaines techniques",
        content: "Parois CF 1/2h, trappes PF 1/2h. Recoupement CF 1/4h tous les 2 niveaux pour gaines verticales. Recoupement des gaines palières à chaque niveau.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Façades et C+D",
        content: "Règle C+D applicable: C+D ≥ 1,00m. C = distance verticale entre baies, D = distance horizontale entre plan des baies et saillie. Objectif: limiter propagation du feu entre étages par les façades."
      },
      {
        title: "Désenfumage",
        content: "Désenfumage escaliers et circulations horizontales obligatoire. En 3ème B: conduits collectifs pour circulations sans façade, 1 conduit par niveau. Surface ouvrants ≥ 1m² pour escaliers."
      },
      {
        title: "Locaux poubelles, vélos, divers",
        content: "Locaux poubelles, vélos, etc.: parois CF 1h, portes PF 1/2h. Locaux à vélos > 20m² considérés à risques moyens. Caves: parois CF 1h, porte PF 1/2h, recoupement des couloirs de caves tous les 20m."
      }
    ]
  },
  {
    id: "dtu-securite-logement-2",
    title: "Réglementation Incendie - Immeubles 4ème Famille",
    category: "Incendie Logement",
    description: "Dispositions applicables aux immeubles d'habitation collective de 4ème famille (R+8 à R+27, h ≤ 50m)",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Caractéristiques",
        content: "Immeuble de R+8 à R+27, plancher bas dernier niveau ≤ 50m. Structures SF 1h30. Planchers CF 1h30 entre logements. Toitures SF 1h.",
        type: "standard"
      },
      {
        title: "Escaliers",
        content: "Obligatoirement encloisonnés, parois CF 1h, portes PF 1/2h à fermeture automatique. 2 escaliers obligatoires à tous les niveaux. Pression différentielle obligatoire.",
        type: "warning"
      },
      {
        title: "Circulations",
        content: "Largeur 1,40m, distance logement-escalier ≤ 10m. Désenfumage mécanique obligatoire, débit d'extraction minimal de 1 m³/s et vitesse < 5m/s.",
        type: "warning"
      },
      {
        title: "Communications protégées",
        content: "Accès escaliers par sas ventilés (CF 1h). Porte PF 1/2h pour accès logements depuis circulation. Double sécurité (SAS ou surpression) pour escaliers.",
        type: "alert"
      },
      {
        title: "Colonnes sèches",
        content: "Obligatoires dans chaque escalier. Prises tous les 2 niveaux en étages. Prises supplémentaires dans halls d'entrée et au dernier niveau.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Façades et C+D",
        content: "Règle C+D renforcée: C+D ≥ 1,30m. Classement minimal M2 pour les matériaux de façade. Utilisation de matériaux combustibles plus restreinte que pour les autres familles."
      },
      {
        title: "Désenfumage",
        content: "Désenfumage mécanique obligatoire pour escaliers et circulations horizontales. Alimentation électrique de sécurité pour les ventilateurs. Commandes manuelles aux niveaux d'accès."
      },
      {
        title: "Dispositifs d'alarme",
        content: "Alarme incendie obligatoire, dispositif de communication avec un poste de sécurité ou concierge. Interphones entre circulation commune de chaque niveau et le poste de sécurité."
      }
    ]
  },
  {
    id: "dtu-securite-logement-3",
    title: "Réglementation Incendie - Maisons individuelles (1ère et 2ème famille)",
    category: "Incendie Logement",
    description: "Dispositions applicables aux maisons individuelles isolées, jumelées ou en bande",
    lastUpdate: "Mai 2023",
    rules: [
      {
        title: "Caractéristiques",
        content: "1ère famille: maisons isolées ou jumelées (max R+1), maisons en bande RDC. 2ème famille: maisons isolées/jumelées >R+1, maisons en bande R+1.",
        type: "standard"
      },
      {
        title: "Structures",
        content: "1ère famille: SF 1/4h. 2ème famille: SF 1/2h. Planchers séparatifs entre logements CF 1/4h (1ère famille) ou CF 1/2h (2ème famille).",
        type: "standard"
      },
      {
        title: "Distance entre bâtiments",
        content: "Construction en ordre dispersé: habitation isolée à au moins 4m des limites de propriété. Ordre continu ou semi-continu: mur séparatif CF 1h minimum.",
        type: "tip"
      },
      {
        title: "Isolement par rapport aux tiers",
        content: "Parois séparatives CF 1h à 4h selon nature du tiers. Si contigu à un ERP: mur CF 1h minimum, surélévation de 1m par rapport à la toiture si celle-ci n'est pas CF 1h.",
        type: "warning"
      },
      {
        title: "Détection",
        content: "DAAF (Détecteur Autonome Avertisseur de Fumée) obligatoire dans chaque logement, au moins un par niveau, de préférence près des chambres.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Règles spécifiques aux maisons en bande",
        content: "Murs séparatifs entre habitations CF 1/2h (1ère famille) ou CF 1h (2ème famille). Recoupement des combles tous les 45m par paroi CF 1/4h. Cheminées: distance 0,40m min avec matériaux M3."
      },
      {
        title: "Dispositions particulières pour les logements superposés",
        content: "Maisons superposées (limitées à R+1): considérées comme 2ème famille si accès indépendants. Les planchers séparatifs doivent être CF 1/2h et les structures SF 1/2h."
      },
      {
        title: "Locaux à risques",
        content: "Garages: superficie ≤ 100m², murs et plafond CF 1/2h, portes PF 1/2h. Locaux poubelles: parois CF 1/2h, porte PF 1/4h. Chaufferies: réglementation spécifique selon puissance."
      }
    ]
  }
];
