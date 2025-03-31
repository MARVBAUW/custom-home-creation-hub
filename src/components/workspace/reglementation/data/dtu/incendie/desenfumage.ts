
import { DTU } from '../../../dtu/types';

export const desenfumageDTUs: DTU[] = [
  {
    id: "dtu-desenfumage-1",
    title: "Principes généraux du désenfumage",
    category: "Incendie Désenfumage",
    description: "Objectifs et principes du désenfumage dans les bâtiments",
    lastUpdate: "Juillet 2023",
    rules: [
      {
        title: "Objectifs du désenfumage",
        content: "Évacuer les fumées et gaz de combustion, abaisser la température des gaz, permettre l'évacuation des personnes et l'intervention des services de secours.",
        type: "standard"
      },
      {
        title: "Types de désenfumage",
        content: "Naturel (tirage thermique via des ouvrants), mécanique (extraction et soufflage mécaniques), ou combiné. Le choix dépend du type de bâtiment et de sa configuration.",
        type: "standard"
      },
      {
        title: "Règle générale",
        content: "Un local est désenfumable si : Ratio surface d'évacuation/surface au sol ≥ 1/200 pour le naturel, ou débit d'extraction ≥ 1 m³/s pour 100 m² en mécanique.",
        type: "standard"
      },
      {
        title: "Calcul surface utile",
        content: "Surface géométrique × coefficient d'efficacité. Coefficient variant de 0,1 à 0,9 selon l'ouvrant (vertical, en toiture, à lamelles...).",
        type: "tip"
      },
      {
        title: "Activation",
        content: "Manuelle (commande accessible au niveau d'accès) et/ou automatique (sur détection incendie). Obligation de réarmement manuel pour le désenfumage.",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Cantonage",
        content: "Division des volumes en cantons de désenfumage par des écrans de cantonnement. Surface max d'un canton : 1600 m². Hauteur des écrans ≥ 0,5 m, descendant au minimum à 0,5 m sous le point le plus bas du plafond/toiture."
      },
      {
        title: "Ouvrants en façade",
        content: "Situés dans le tiers supérieur du local, à au moins 1,80 m du plancher. Ouverture ≥ 60° pour les châssis à soufflet. Commandes mécaniques, pneumatiques, électriques ou électropneumatiques."
      },
      {
        title: "Exutoires de fumée",
        content: "Surface unitaire ≥ 1 m². Si plusieurs exutoires, répartition uniforme. Distance entre points éloignés < 30 m. Classement de réaction au feu des exutoires en toiture ≥ B-s1,d0."
      }
    ],
    schemas: [
      {
        id: "schema-desenfumage-1",
        title: "Principe du désenfumage naturel",
        imageUrl: "/images/schemas/desenfumage-naturel.png",
        description: "Schéma illustrant le principe du désenfumage naturel avec entrées d'air basses et évacuation haute des fumées."
      }
    ]
  },
  {
    id: "dtu-desenfumage-2",
    title: "Désenfumage des ERP",
    category: "Incendie Désenfumage",
    description: "Réglementation du désenfumage spécifique aux établissements recevant du public",
    lastUpdate: "Juin 2023",
    rules: [
      {
        title: "Locaux nécessitant désenfumage",
        content: "Locaux de superficie > 300 m², locaux à risques particuliers, locaux aveugles > 100 m², ainsi que les circulations horizontales et verticales selon les cas.",
        type: "standard"
      },
      {
        title: "Circulations horizontales",
        content: "Désenfumage obligatoire pour les circulations de longueur > 5 m desservant des locaux accessibles au public et les circulations encloisonnées de plus de 30 m de longueur.",
        type: "warning"
      },
      {
        title: "Escaliers encloisonnés",
        content: "Désenfumage obligatoire pour tous les escaliers encloisonnés desservant les sous-sols et pour ceux desservant plus de 2 étages en superstructure.",
        type: "warning"
      },
      {
        title: "Commande désenfumage",
        content: "Commande manuelle (niveau d'accès et dernier niveau desservi) et automatique pour les catégories A et B de SSI. Commande groupée par zone pour les circulations.",
        type: "tip"
      },
      {
        title: "Désenfumage naturel circulations",
        content: "Section évacuation ≥ 1 m² par tranche de 25 m de longueur (mini 1 m² par canton). Surface totale des amenées d'air ≥ surface exutoires.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Désenfumage des escaliers",
        content: "Ouvrant en partie haute ≥ 1 m² de surface utile, avec dispositif d'ouverture commande manuelle au niveau d'évacuation. Amenée d'air en partie basse (≥ surface exutoire)."
      },
      {
        title: "Désenfumage mécanique des circulations",
        content: "Débit d'extraction ≥ 0,5 m³/s par tranche de 10 m de longueur (mini 1,5 m³/s par bouche). Vitesse de passage aux bouches < 5 m/s. Amenée d'air mécanique si naturel insuffisant."
      },
      {
        title: "Désenfumage des atriums",
        content: "Désenfumage spécifique obligatoire. Surface d'exutoires ≥ 2% de la section horizontale. Étude spécifique souvent requise pour déterminer les caractéristiques exactes."
      }
    ],
    schemas: [
      {
        id: "schema-desenfumage-2",
        title: "Désenfumage des circulations horizontales",
        imageUrl: "/images/schemas/desenfumage-circulation.png",
        description: "Schéma illustrant le principe du désenfumage des circulations horizontales avec amenées d'air et extraction."
      }
    ]
  },
  {
    id: "dtu-desenfumage-3",
    title: "Désenfumage des habitations",
    category: "Incendie Désenfumage",
    description: "Réglementation du désenfumage dans les bâtiments d'habitation collective",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Circulations horizontales",
        content: "Désenfumage obligatoire pour toutes les circulations horizontales encloisonnées de la 3ème et 4ème famille. Surface libre des ouvrants ≥ 1 m² pour les circulations < 25 m, puis +0,5 m² par tranche de 10 m supplémentaire.",
        type: "standard"
      },
      {
        title: "Escaliers encloisonnés",
        content: "Désenfumage en partie haute (≥ 1 m²) pour les habitations 3ème et 4ème famille. Commande manuelle depuis le niveau d'accès et le dernier étage.",
        type: "standard"
      },
      {
        title: "Circulations 2ème famille",
        content: "Pas de désenfumage obligatoire, mais baies ouvrantes donnant sur l'extérieur recommandées (0,3 m² par tranche de 15 m de longueur).",
        type: "tip"
      },
      {
        title: "Commande désenfumage",
        content: "Commande manuelle accessible depuis les circulations communes, facilement repérable. Réarmement manuel obligatoire pour les exutoires ou les bouches.",
        type: "standard"
      },
      {
        title: "Désenfumage mécanique",
        content: "Possible en alternative au désenfumage naturel si celui-ci est impossible. Extraction ≥ 8 volumes/heure. Amenée d'air naturel ou mécanique.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Conduits collectifs",
        content: "Conduits collectifs obligatoires pour les circulations de la 3ème famille B et 4ème famille sans façade en contact avec l'extérieur. Résistance au feu (CF) 1/4h à 1/2h selon la famille."
      },
      {
        title: "Bouches de désenfumage",
        content: "Une bouche au minimum par niveau. Débit minimum de 0,5 m³/s pour les conduits collectifs shunt en 3ème famille, 1 m³/s en 4ème famille."
      },
      {
        title: "Amenées d'air",
        content: "Surface libre égale à celle des évacuations. Prise directe sur l'extérieur ou par conduits. Positionnées en partie basse, à maximum 1 m du sol."
      }
    ],
    schemas: [
      {
        id: "schema-desenfumage-3",
        title: "Désenfumage des circulations en habitation",
        imageUrl: "/images/schemas/desenfumage-habitation.png",
        description: "Schéma illustrant le dispositif de désenfumage dans une circulation horizontale d'immeuble d'habitation."
      }
    ]
  },
  {
    id: "dtu-desenfumage-4",
    title: "Désenfumage des parcs de stationnement",
    category: "Incendie Désenfumage",
    description: "Systèmes de désenfumage adaptés aux parcs de stationnement couverts",
    lastUpdate: "Mai 2023",
    rules: [
      {
        title: "Principe",
        content: "Extraction des fumées à débit suffisant pour limiter leur propagation et permettre l'évacuation des occupants et l'intervention des secours.",
        type: "standard"
      },
      {
        title: "Désenfumage naturel",
        content: "Possible si ouvertures permanentes en façade ≥ 1/100 de la surface de chaque niveau avec moitié en partie haute et moitié en partie basse.",
        type: "standard"
      },
      {
        title: "Désenfumage mécanique",
        content: "Débit d'extraction minimum de 900 m³/h par véhicule pour les parcs < 4000 m², 600 m³/h au-delà. Répartition homogène des bouches (4000 m² max par ventilateur).",
        type: "warning"
      },
      {
        title: "Compartimentage désenfumage",
        content: "Un compartiment de désenfumage ne peut excéder 3000 m². Écrans de cantonnement fixes, stables au feu 1/4h, descendant au minimum à 0,5 m du plafond.",
        type: "warning"
      },
      {
        title: "Commande",
        content: "Manuelle depuis le poste de sécurité ou l'entrée, et automatique par DAI. Double alimentation électrique. Ventilateurs conformes à 400°C-2h.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Conduits et gaines",
        content: "Conduits collecteurs CF selon traversée: 60 min en traversée d'autres compartiments. Gaines d'amenée d'air CF 1/2h. Clapets CF aux traversées de parois CF."
      },
      {
        title: "Amenée d'air",
        content: "Débit d'amenée d'air ≥ 0,5 fois le débit extrait. Vitesse d'entrée d'air < 5 m/s. Amenées d'air mécaniques ou naturelles selon la configuration."
      },
      {
        title: "Cas des petits parcs",
        content: "Parcs de moins de 250 m² à un seul niveau: possible simple ventilation par ouvertures totalisant 5% de la surface, naturellement réparties en partie haute et basse."
      }
    ],
    schemas: [
      {
        id: "schema-desenfumage-4",
        title: "Désenfumage mécanique d'un parking",
        imageUrl: "/images/schemas/desenfumage-parking.png",
        description: "Schéma de principe du système de désenfumage mécanique d'un parc de stationnement couvert."
      }
    ]
  }
];
