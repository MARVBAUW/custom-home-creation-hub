
import { DTU } from '../../dtu/types';

export const urbanismeDTUs: DTU[] = [
  {
    id: "dtu-urbanisme-1",
    title: "PLU - Plan Local d'Urbanisme",
    category: "Urbanisme",
    description: "Dispositions générales concernant les Plans Locaux d'Urbanisme et leur application",
    lastUpdate: "Mai 2023",
    rules: [
      {
        title: "Composition du PLU",
        content: "Rapport de présentation, PADD, règlement, OAP et annexes. Le règlement définit 4 grands types de zones : U (urbaines), AU (à urbaniser), A (agricoles) et N (naturelles)",
        type: "standard"
      },
      {
        title: "Structure du règlement",
        content: "3 sections : 1-destination des constructions, 2-caractéristiques urbaines, architecturales, environnementales et paysagères, 3-équipements et réseaux",
        type: "standard"
      },
      {
        title: "Coefficient d'emprise au sol",
        content: "Détermine la surface constructible maximale sur un terrain (rapport entre projection verticale du bâti et surface du terrain)",
        type: "warning"
      },
      {
        title: "Servitudes d'utilité publique",
        content: "Limitations administratives au droit de propriété (patrimoniale, électrique, gazier, télécommunication...) annexées au PLU et prévalant sur le règlement",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Procédure d'élaboration",
        content: "Prescription par délibération, concertation publique, arrêt du projet, consultation des PPA (personnes publiques associées), enquête publique, approbation. Durée moyenne : 3 ans."
      },
      {
        title: "Consultation du document",
        content: "Disponible en mairie, au siège de l'EPCI et sur le géoportail de l'urbanisme. Certificat d'urbanisme informatif (CUa) ou opérationnel (CUb) pour connaître les règles applicables."
      },
      {
        title: "Évolutions du PLU",
        content: "Révision (changements majeurs), modification (ajustements sans remettre en cause le PADD), modification simplifiée (corrections mineures) et mise à jour (actualisation des annexes)."
      }
    ]
  },
  {
    id: "dtu-urbanisme-2",
    title: "Autorisations d'urbanisme",
    category: "Urbanisme",
    description: "Procédures et dispositions concernant les différentes autorisations d'urbanisme",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Permis de construire",
        content: "Obligatoire pour toute construction nouvelle > 20 m² de surface de plancher. Pour extension sur construction existante, seuil relevé à 40 m² en zone U du PLU",
        type: "standard"
      },
      {
        title: "Déclaration préalable",
        content: "Pour constructions 5-20 m² (jusqu'à 40 m² en zone U pour extensions), modifications d'aspect extérieur, changements de destination sans travaux",
        type: "standard"
      },
      {
        title: "Délais d'instruction",
        content: "Permis de construire : 2 mois (maison individuelle) ou 3 mois (autres cas). Déclaration préalable : 1 mois. Majorations possibles selon contraintes",
        type: "warning"
      },
      {
        title: "Affichage",
        content: "Obligatoire sur le terrain dès notification de l'autorisation, visible depuis l'espace public, sur panneau rectangulaire > 80 cm, pendant toute la durée du chantier",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Composition du dossier",
        content: "Formulaire CERFA, plan de situation, plan de masse, plan de coupe, notice descriptive, plan des façades, photos. Documents supplémentaires selon contraintes spécifiques."
      },
      {
        title: "Recours des tiers",
        content: "Délai de 2 mois à compter du premier jour d'affichage sur le terrain. Recours administratif (gracieux ou hiérarchique) ou contentieux devant le tribunal administratif."
      },
      {
        title: "Validité et prolongation",
        content: "Validité de 3 ans, prolongeable deux fois 1 an sur demande 2 mois avant expiration. Caducité si travaux interrompus pendant plus d'un an."
      }
    ]
  },
  {
    id: "dtu-urbanisme-3",
    title: "Règles de prospect et implantation",
    category: "Urbanisme",
    description: "Règles d'implantation des constructions par rapport aux limites et aux autres constructions",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Retraits sur limites",
        content: "En l'absence de règle spécifique du PLU, distance minimale aux limites séparatives = H/2 (moitié de la hauteur du bâtiment) avec minimum 3 mètres",
        type: "standard"
      },
      {
        title: "Prospect par rapport à la voie",
        content: "Implantation définie par le PLU : à l'alignement, avec un retrait fixe ou minimal. En l'absence de règle, s'aligner sur constructions voisines",
        type: "standard"
      },
      {
        title: "Distance entre bâtiments",
        content: "Distance minimale = H du bâtiment le plus élevé, avec minimum 8 mètres en présence de baies principales (4 mètres en l'absence de baies)",
        type: "warning"
      },
      {
        title: "Servitude de vue",
        content: "Distance minimale de 1,90 m pour les vues droites et 0,60 m pour les vues obliques (mesurée depuis le bord extérieur de la fenêtre)",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Hauteur des constructions",
        content: "Définie par le PLU : hauteur maximale, nombre de niveaux, règles de dépassement. Mesurée généralement depuis le sol naturel jusqu'à l'égout de toiture ou l'acrotère."
      },
      {
        title: "Calcul des surfaces",
        content: "Surface de plancher : somme des surfaces de chaque niveau, mesurées au nu intérieur des murs, sans les vides (hauteur < 1,80 m, stationnements, locaux techniques)."
      },
      {
        title: "Règles d'accessibilité PMR",
        content: "Cheminements, ressauts, largeurs de passage et caractéristiques techniques définies dans l'arrêté du 20 avril 2017 pour les ERP et les logements."
      }
    ]
  },
  {
    id: "dtu-urbanisme-4",
    title: "Règles de hauteur et de gabarit",
    category: "Urbanisme",
    description: "Dispositions concernant les limites de hauteur et les gabarits constructibles",
    lastUpdate: "Mai 2023",
    rules: [
      {
        title: "Points de référence",
        content: "Hauteur mesurée par rapport au terrain naturel avant travaux ou par rapport à un point de référence fixé par le PLU (ex: niveau de la voie)",
        type: "standard"
      },
      {
        title: "Gabarit-enveloppe",
        content: "Volume maximal dans lequel doivent s'inscrire les constructions. Souvent défini par une verticale à l'alignement suivie d'une oblique",
        type: "standard"
      },
      {
        title: "Bonus de hauteur",
        content: "Dépassement possible (souvent +3m) pour performances énergétiques (BEPOS), utilisation du bois dans la construction, ou destination spécifique (logement social)",
        type: "tip"
      },
      {
        title: "Limites dérogatoires",
        content: "Possibilité de dépassements ponctuels pour éléments techniques (cheminées, antennes, édicules d'ascenseur) dans la limite fixée par le PLU",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Hauteur relative",
        content: "Rapport entre hauteur maximale et largeur de la voie (généralement H=L ou H=L+m). Permet d'adapter la hauteur au contexte urbain immédiat."
      },
      {
        title: "Intégration architecturale",
        content: "Règles spécifiques pour assurer la cohérence avec le bâti environnant : pentes de toiture, matériaux, couleurs, modénatures, alignement des ouvertures."
      },
      {
        title: "Épannelage",
        content: "Graduation des hauteurs en fonction de la profondeur du terrain ou de zones de transition (entre secteurs de hauteurs différentes)."
      }
    ]
  }
];
