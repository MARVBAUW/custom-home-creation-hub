
import { DTU } from '../../../dtu/types';

export const desenfumageDTUs: DTU[] = [
  {
    id: "dtu-desenfumage-1",
    title: "Désenfumage des bâtiments",
    category: "Incendie Désenfumage",
    description: "Principes et méthodes de désenfumage dans les différents types de bâtiments",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Principes fondamentaux",
        content: "Évacuer fumées et gaz chauds, maintenir praticables chemins d'évacuation, limiter propagation, faciliter intervention pompiers. Naturel (tirage thermique) ou mécanique (ventilateurs).",
        type: "standard"
      },
      {
        title: "Locaux à désenfumer",
        content: "Circulation >5m en habitation. Locaux >300m² ou circulations horizontales en ERP. Locaux >100m² à risques ou sans vision directe sur l'extérieur. Cas spécifiques IGH.",
        type: "standard"
      },
      {
        title: "Surfaces d'ouverture",
        content: "Désenfumage naturel: 1/100ème surface (ERP), 1/200ème surface (habitations 3ème et 4ème famille, circulations). Écart entre ouvertures ≤10m (circulations).",
        type: "warning"
      },
      {
        title: "Débits d'extraction",
        content: "Mécanique: 1 volume/h en habitation, 0,5 m³/s en ERP non compartimenté, 0,5 m³/s par 100m² en IGH, 1 m³/s par cage d'escalier en IGH. Vitesse max 5m/s.",
        type: "standard"
      },
      {
        title: "Commandes",
        content: "Manuelles et accessibles pour occupants et secours. Position de sécurité normalement ouverte sur rupture. Automatisation par SSI de catégorie A obligatoire en IGH.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Cantons de désenfumage",
        content: "Surface max 1600m² en ERP. Écrans de cantonnement fixes ou mobiles, hauteur minimum 0,5m sous plafond. Volume des réserves de fumées ≥ 0,1% du volume du canton. Implantation pour limiter propagation latérale des fumées."
      },
      {
        title: "Entrées d'air",
        content: "Amenées d'air neuf en partie basse, surface ≥ surface d'extraction (naturel) ou 0,5m² par 1000m³/h (mécanique). Vitesse d'entrée ≤5m/s. Positionnées pour ne pas gêner l'évacuation et favoriser un balayage efficace."
      },
      {
        title: "Conduits et gaines",
        content: "Résistance au feu: CF 15 min en habitation, CF 30 min en ERP/IGH pour desservir un seul local. Traversées d'autres locaux: CF 60 min à 120 min selon bâtiment. Conduits collecteurs verticaux obligatoirement avec trappe NF."
      },
      {
        title: "Cas des parkings",
        content: "Écrans de cantonnement pour volume >5000m³. Débit min 600m³/h par véhicule (900m³/h automatisés), avec minimum 15m³/h/m² de surface. Distance extraction/tout point ≤25m. Double alimentation électrique obligatoire."
      }
    ],
    schemas: [
      {
        id: "schema-desenfumage-1",
        title: "Principes de désenfumage naturel",
        imageUrl: "/images/schemas/desenfumage-naturel.png",
        description: "Schéma illustrant les principes du désenfumage naturel avec les exutoires en toiture et les entrées d'air en partie basse."
      },
      {
        id: "schema-desenfumage-2",
        title: "Cantons de désenfumage",
        imageUrl: "/images/schemas/cantons-desenfumage.png",
        description: "Principe de division en cantons de désenfumage avec écrans de cantonnement pour un grand volume."
      }
    ]
  },
  {
    id: "dtu-desenfumage-2",
    title: "Méthodes de calcul et dimensionnement du désenfumage",
    category: "Incendie Désenfumage",
    description: "Règles de calcul pour le dimensionnement du désenfumage des bâtiments",
    lastUpdate: "Février 2023",
    rules: [
      {
        title: "Surface utile d'exutoires",
        content: "Naturel: SUE = α × Surface géométrique. Coefficients α: 0,3 à 0,65 selon pente, forme et orientation. Valeur totale requise: 1/100ème du local ou 1/200ème des circulations.",
        type: "standard"
      },
      {
        title: "Vitesse d'extraction",
        content: "Mécanique: v ≤ 5 m/s pour éviter remous et turbulences. Vitesse moyenne 3-4 m/s recommandée dans les conduits horizontaux, 7-8 m/s en vertical.",
        type: "standard"
      },
      {
        title: "Cheminement aéraulique",
        content: "Longueur max conduits: 20-25m habitation, 30m ERP/IGH. Débouchés extérieurs à min 8m de toute baie ou prise d'air. Sections décroissantes recommandées vers l'extérieur.",
        type: "warning"
      },
      {
        title: "Exutoires en toiture",
        content: "Dimension minimale: 1m de côté. Surface unitaire: 1 à 6m². Distance entre exutoires: max 30m. Nombre minimal: 2 par canton. Implantation à >4m des murs séparatifs CF.",
        type: "standard"
      },
      {
        title: "Calcul tirage thermique",
        content: "ΔP = 0,04 × h × ΔT où h est la hauteur (m) entre entrée/sortie d'air et ΔT la différence de température (°C). Valeur ΔT design: 200-400°C selon risque.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Méthode Ingénierie du désenfumage",
        content: "Approche performantielle: modélisation numérique CFD (Computational Fluid Dynamics). Scénarios d'incendie normalisés (puissance 1-5MW). Critères d'acceptabilité: hauteur libre de fumée, visibilité, température, opacité des fumées. Application pour grands volumes ou configurations complexes."
      },
      {
        title: "Installations surpression",
        content: "Cage d'escalier: différentiel 20-80 Pa. Sas: 10-50 Pa par rapport local desservi. Soufflage admis 0,5 m³/s par porte ouverte + 0,1 m³/s par mètre de fuite. Vitesse au passage de porte ≥ 0,5 m/s. Débit global calculé selon méthode des fuites cumulées."
      },
      {
        title: "Dispositifs d'évacuation naturelle",
        content: "Ouvrants en façade: surface libre ≥ 10% surface du local (industries), 5% (habitation). Position haute: bord inférieur ≥ 1,80m du sol, ou 30cm sous plafond. Commandes: hauteur 1-2m, accessibles depuis circulation. Mécanismes: pneumatique, électrique ou fusible thermique."
      },
      {
        title: "Ventilateurs de désenfumage",
        content: "Certification: 400°C-2h (ERP/IGH/ICPE), 600°C-2h (parkings). Caractéristiques: pression 300-500 Pa, tension 400V triphasé. Installation: local CF 2h, conduits CF 1h minimum. Maintenance: test mensuel de démarrage, vérification annuelle complète."
      }
    ]
  }
];
