
import { DTU } from '../../dtu/types';

export const plomberieDTUs: DTU[] = [
  {
    id: "dtu-60-1",
    title: "DTU 60.1 - Plomberie sanitaire",
    category: "Plomberie",
    description: "Travaux de plomberie sanitaire pour bâtiments",
    lastUpdate: "Mai 2023",
    rules: [
      {
        title: "Dimension des canalisations",
        content: "Le diamètre intérieur des canalisations d'eau froide et chaude doit être au minimum de 12 mm pour les distributeurs et de 10 mm pour les branchements terminaux.",
        type: "standard"
      },
      {
        title: "Pente des canalisations d'évacuation",
        content: "Les canalisations d'évacuation doivent avoir une pente minimale de 1 cm par mètre pour assurer un bon écoulement gravitaire.",
        type: "standard"
      },
      {
        title: "Risque de gel",
        content: "Les canalisations exposées au gel doivent être protégées par un calorifugeage d'au moins 20 mm d'épaisseur ou par un traceur thermique.",
        type: "warning"
      },
      {
        title: "Clapets anti-retour",
        content: "Installer des clapets anti-retour sur toutes les liaisons entre le réseau d'eau potable et les points d'eau comportant un risque de pollution.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 60.1 s'applique aux travaux d'exécution des installations de plomberie sanitaire pour bâtiments à usage d'habitation, de bureaux, ou recevant du public."
      },
      {
        title: "Matériaux autorisés",
        content: "Les canalisations peuvent être réalisées en cuivre, PER, multicouche, PVC pression ou acier galvanisé selon les applications. Les brasures pour le cuivre doivent être réalisées avec un alliage comportant au moins 2% d'argent."
      },
      {
        title: "Essais de mise en service",
        content: "Avant mise en service, l'installation doit être soumise à un essai de pression hydraulique de 1,5 fois la pression maximale de service, avec un minimum de 10 bars, durant 2 heures sans chute de pression."
      }
    ]
  },
  {
    id: "dtu-60-11",
    title: "DTU 60.11 - Règles de calcul des installations de plomberie",
    category: "Plomberie",
    description: "Règles de dimensionnement des réseaux de plomberie",
    lastUpdate: "Février 2022",
    rules: [
      {
        title: "Débit de base",
        content: "Le débit de base minimal pour un lavabo est de 0,20 L/s, pour une douche de 0,20 L/s, pour une baignoire de 0,33 L/s et pour un WC de 0,12 L/s.",
        type: "standard"
      },
      {
        title: "Coefficient de simultanéité",
        content: "Le coefficient de simultanéité K se calcule selon la formule K = 1/√(n-1) où n est le nombre d'appareils, avec un minimum de 0,2 pour les habitations.",
        type: "standard"
      },
      {
        title: "Surpression nécessaire",
        content: "Si la pression disponible est inférieure à 1 bar pour le point le plus défavorisé, un surpresseur doit être installé pour garantir le bon fonctionnement de l'installation.",
        type: "warning"
      },
      {
        title: "Vitesse d'écoulement",
        content: "La vitesse de l'eau dans les canalisations ne doit pas dépasser 2 m/s pour éviter les bruits et coups de bélier.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Objet et domaine d'application",
        content: "Le DTU 60.11 définit les règles de calcul permettant de dimensionner les canalisations d'alimentation en eau froide et chaude sanitaire ainsi que les réseaux d'évacuation des eaux usées et eaux vannes."
      },
      {
        title: "Dimensionnement des réseaux",
        content: "Le diamètre des canalisations est déterminé en fonction du débit probable, calculé à partir des débits de base des appareils et du coefficient de simultanéité qui tient compte du fait que tous les appareils ne fonctionnent pas en même temps."
      },
      {
        title: "Vitesses de référence",
        content: "Pour les tronçons collectifs en colonnes montantes, la vitesse de référence est de 1,5 m/s maximum. Pour les branchements d'étage, elle est limitée à 1 m/s. Pour les tronçons en sous-sol ou vide sanitaire, elle peut atteindre 2 m/s."
      }
    ]
  },
  {
    id: "dtu-60-2",
    title: "DTU 60.2 - Canalisations en fonte",
    category: "Plomberie",
    description: "Canalisations en fonte, évacuations d'eaux usées et pluviales",
    lastUpdate: "Septembre 2022",
    rules: [
      {
        title: "Assemblage des tuyaux en fonte",
        content: "L'assemblage des tuyaux en fonte doit être réalisé par joints élastomères conformes à la norme NF EN 681-1, correctement lubrifiés lors du montage.",
        type: "standard"
      },
      {
        title: "Fixation des canalisations",
        content: "Les canalisations en fonte doivent être supportées par des colliers anti-vibratiles, espacés de 2 m maximum pour les canalisations horizontales.",
        type: "standard"
      },
      {
        title: "Protection anticorrosion",
        content: "Dans les environnements agressifs, prévoir une protection complémentaire par peinture époxy ou gainage pour éviter la corrosion externe des canalisations en fonte.",
        type: "warning"
      },
      {
        title: "Isolation acoustique",
        content: "Pour réduire les bruits d'écoulement, envelopper les canalisations traversant les locaux sensibles avec des matériaux acoustiques d'au moins 5 mm d'épaisseur.",
        type: "tip"
      }
    ],
    sections: [
      {
        title: "Domaine d'application",
        content: "Le DTU 60.2 s'applique aux canalisations d'évacuation en fonte pour les eaux usées, eaux vannes et eaux pluviales à l'intérieur des bâtiments."
      },
      {
        title: "Types de fonte",
        content: "Les canalisations peuvent être en fonte grise (ancienne génération) ou en fonte ductile/graphite sphéroïdal (SMU/SME) avec revêtement intérieur époxy pour les installations modernes."
      },
      {
        title: "Calorifugeage",
        content: "Les canalisations d'eaux usées et vannes situées en faux plafonds de locaux habitables doivent être calorifugées avec un matériau de 9 mm d'épaisseur minimum pour limiter le bruit et la condensation."
      }
    ]
  }
];
