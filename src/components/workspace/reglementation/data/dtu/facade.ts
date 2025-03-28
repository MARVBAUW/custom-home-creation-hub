
import { DTU } from '../../dtu/types';

export const facadeDTUs: DTU[] = [
  {
    id: "dtu-26-1",
    title: "DTU 26.1 - Travaux d'enduits de mortiers",
    category: "Façade",
    description: "Enduits au mortier de ciments, de chaux et de mélange plâtre et chaux",
    lastUpdate: "Janvier 2023",
    rules: [
      {
        title: "Épaisseur minimale",
        content: "L'épaisseur minimale d'un enduit traditionnel tri-couche est de 20 mm en tout point sur support en maçonnerie.",
        type: "standard"
      },
      {
        title: "Délai entre couches",
        content: "Respecter un délai de 7 jours entre le gobetis et le corps d'enduit, puis 7 jours entre le corps d'enduit et la finition, pour les mortiers de chaux.",
        type: "standard"
      },
      {
        title: "Enduit par temps chaud",
        content: "Par forte chaleur (>30°C) ou vent sec, humidifier le support avant application et maintenir l'enduit humide pendant 48h pour éviter la dessiccation.",
        type: "warning"
      },
      {
        title: "Traitement des jonctions",
        content: "Aux jonctions entre matériaux différents (béton/brique), incorporer une armature (treillis métallique ou fibre de verre) noyée dans l'enduit sur 15 cm de part et d'autre.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 26.1 s'applique aux travaux d'enduits au mortier de ciments, de chaux et de mélange plâtre et chaux sur murs extérieurs, murs intérieurs et plafonds."
      },
      {
        title: "Types d'enduits",
        content: "Le DTU distingue les enduits traditionnels (gobetis + corps d'enduit + finition), les enduits monocouches, et les enduits décoratifs, chacun avec ses spécificités."
      },
      {
        title: "Supports admissibles",
        content: "Les supports doivent être propres, plans, et suffisamment rugueux pour assurer l'adhérence. Les supports trop lisses doivent être piquetés ou recevoir un primaire d'accrochage."
      }
    ]
  },
  {
    id: "dtu-42-1",
    title: "DTU 42.1 - Réfection de façades en service",
    category: "Façade",
    description: "Revêtements d'imperméabilité à base de polymères",
    lastUpdate: "Décembre 2022",
    rules: [
      {
        title: "Classe d'imperméabilité",
        content: "La classe d'imperméabilité (I1 à I4) doit être choisie en fonction de l'état du support et des fissures existantes ou prévisibles.",
        type: "standard"
      },
      {
        title: "Préparation du support",
        content: "Éliminer toutes les parties non adhérentes, traiter les fissures, et appliquer un fixateur adapté à la porosité du support avant application du revêtement.",
        type: "standard"
      },
      {
        title: "Application par temps humide",
        content: "Ne pas appliquer le revêtement par temps de pluie, sur support gelé ou en période de gel. Le taux d'humidité du support ne doit pas dépasser 5%.",
        type: "warning"
      },
      {
        title: "Consommation minimale",
        content: "Respecter scrupuleusement les consommations minimales indiquées par le fabricant pour chaque couche afin de garantir la performance du système d'imperméabilité.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 42.1 s'applique aux travaux de réfection des façades en service par application de revêtements d'imperméabilité à base de polymères en dispersion aqueuse."
      },
      {
        title: "Classification des revêtements",
        content: "Les revêtements sont classés de I1 à I4 selon leur capacité à s'opposer à la pénétration de l'eau et à ponter les fissures existantes ou à venir."
      },
      {
        title: "Traitement des points singuliers",
        content: "Les points singuliers (angles, joints, appuis de fenêtres, etc.) doivent faire l'objet d'un traitement spécifique, souvent avec incorporation d'armatures localisées."
      }
    ]
  },
  {
    id: "dtu-55-2",
    title: "DTU 55.2 - Revêtements muraux attachés en pierre mince",
    category: "Façade",
    description: "Pose de pierre mince attachée en façade",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Épaisseur de la pierre",
        content: "L'épaisseur minimale des plaques de pierre est de 30 mm pour les calcaires et 20 mm pour les granits et marbres.",
        type: "standard"
      },
      {
        title: "Nombre d'attaches",
        content: "Chaque plaque de pierre doit comporter au minimum 4 attaches, avec au moins 2 attaches par côté et jamais moins de 4 attaches/m².",
        type: "standard"
      },
      {
        title: "Dilatation des matériaux",
        content: "Prévoir un jeu de dilatation d'au moins 5 mm entre plaques pour compenser les variations dimensionnelles dues aux variations thermiques.",
        type: "warning"
      },
      {
        title: "Attaches inoxydables",
        content: "Utiliser uniquement des attaches en acier inoxydable 316L en environnement salin ou pollué pour éviter toute corrosion ultérieure.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 55.2 s'applique aux revêtements muraux extérieurs et intérieurs constitués de plaques de pierre mince fixées mécaniquement au support par des attaches."
      },
      {
        title: "Types de pose",
        content: "Le DTU distingue la pose sur ossature métallique, la pose directe par agrafes, et la pose par attaches traversantes, chacune avec ses spécificités et domaines d'emploi."
      },
      {
        title: "Joints entre plaques",
        content: "Les joints entre plaques peuvent être garnis de mastic élastomère ou laissés ouverts. Dans ce dernier cas, ils doivent avoir une largeur minimale de 5 mm."
      }
    ]
  },
  {
    id: "dtu-41-2",
    title: "DTU 41.2 - Revêtements extérieurs en bois",
    category: "Façade",
    description: "Bardages rapportés en bois et dérivés du bois",
    lastUpdate: "Juillet 2023",
    rules: [
      {
        title: "Ventilation du bardage",
        content: "Prévoir une lame d'air ventilée de 20 mm minimum entre l'isolant ou le mur support et la face arrière du bardage.",
        type: "standard"
      },
      {
        title: "Protection des abouts",
        content: "Les abouts de lames horizontales doivent être protégés par une bavette ou un profilé métallique pour éviter les infiltrations d'eau.",
        type: "standard"
      },
      {
        title: "Essence de bois adaptée",
        content: "Utiliser uniquement des essences de classe 3 minimum (naturellement ou par traitement) pour garantir la durabilité du bardage exposé aux intempéries.",
        type: "warning"
      },
      {
        title: "Fixations non corrodables",
        content: "Utiliser des fixations en acier inoxydable ou en aluminium pour éviter les traces de rouille sur le bardage et assurer la pérennité des fixations.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 41.2 s'applique aux revêtements extérieurs en bois et matériaux dérivés du bois mis en œuvre sur ossature bois ou sur murs en maçonnerie ou en béton."
      },
      {
        title: "Types de pose",
        content: "Le DTU couvre la pose horizontale, verticale ou à claire-voie des lames de bardage, chacune avec ses spécificités de ventilation et d'étanchéité."
      },
      {
        title: "Entraxe des ossatures",
        content: "L'entraxe maximal des ossatures support de bardage dépend de l'épaisseur des lames : 40 à 50 cm pour des lames de 18 mm et 60 à 65 cm pour des lames de 22 mm."
      }
    ]
  }
];

