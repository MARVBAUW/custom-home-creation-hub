
import { DTU } from '../../dtu/types';

export const revetementsDTUs: DTU[] = [
  {
    id: "dtu-revetement-1",
    title: "DTU 52.2 - Pose collée des revêtements céramiques",
    category: "Revêtements",
    description: "Pose de carrelage et assimilés en intérieur et extérieur",
    lastUpdate: "Janvier 2023",
    rules: [
      {
        title: "Planéité du support",
        content: "Tolérance de planéité: 5 mm sous la règle de 2 m et 2 mm sous le réglet de 20 cm pour pose traditionnelle, 3 mm et 1 mm pour pose collée.",
        type: "standard"
      },
      {
        title: "Choix du mortier-colle",
        content: "C2 minimum pour les grands formats (>60×60 cm), murs extérieurs, sols chauffants et piscines. C2S requis en façade et C2E exigé en terrasse extérieure.",
        type: "standard"
      },
      {
        title: "Double encollage",
        content: "Double encollage obligatoire pour les carreaux de surface >500 cm² au mur et >1100 cm² au sol intérieur, >400 cm² au sol extérieur.",
        type: "warning"
      },
      {
        title: "Joints minimum",
        content: "Largeur minimale des joints: 2 mm en murs intérieurs, 3 mm en sols intérieurs, 4 mm en extérieur, 5 mm pour les pierres naturelles.",
        type: "tip"
      },
      {
        title: "Fractionnement",
        content: "Joints de fractionnement tous les 40 m² en intérieur (ou 8 m linéaires), 20 m² en extérieur (ou 5 m linéaires), et à chaque seuil de porte.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Classification des supports",
        content: "Supports classés selon leur porosité, stabilité et exposition à l'eau: supports neufs (béton, chape, enduit), supports existants (ancien carrelage, peinture), supports spéciaux (bois, métal)."
      },
      {
        title: "Exposition à l'eau",
        content: "Quatre niveaux d'exposition: EA (faible), EB (moyenne), EB+ (forte intermittente) et EC (forte permanente), déterminant les produits et techniques à utiliser, notamment l'étanchéité."
      },
      {
        title: "Préparation des supports",
        content: "Délai minimal avant pose: 28 jours pour dallage, 2 mois pour plancher béton, 3 semaines pour chape ou enduit. Primaire d'adhérence obligatoire sur supports fermés."
      },
      {
        title: "Formats et types de pose",
        content: "Les formats admissibles varient selon le support et la technique de pose. La pose à joints décalés (>1/3) est limitée aux formats <30 cm, sinon joints alignés obligatoires."
      }
    ],
    schemas: [
      {
        id: "schema-revetement-1",
        title: "Détail pose carrelage",
        imageUrl: "/images/schemas/pose-carrelage.png",
        description: "Coupe montrant la structure d'un carrelage collé avec traitement périphérique et joint de fractionnement."
      }
    ]
  },
  {
    id: "dtu-revetement-2",
    title: "DTU 51.2 - Parquets collés",
    category: "Revêtements",
    description: "Parquets et revêtements de sol en bois collés",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Humidité du support",
        content: "Humidité maximale du support: 3% pour chape ciment, 0,5% pour chape anhydrite. Mesure obligatoire au bombe à carbure avant pose.",
        type: "standard"
      },
      {
        title: "Humidité du bois",
        content: "Humidité des parquets à la livraison: 7 à 11% en moyenne sur un lot, écart maximal de ±2% entre lames. Contrôle par humidimètre à pointes.",
        type: "standard"
      },
      {
        title: "Joints périphériques",
        content: "Joint périphérique obligatoire de 8 mm minimum, augmenté de 0,15% de la largeur de la pièce (>1,5 cm pour pièce >10 m), masqué par plinthe.",
        type: "warning"
      },
      {
        title: "Collage adapté",
        content: "Colle élastique pour grands formats (>70 cm) ou sur sol chauffant. Application sur toute la surface avec spatule dentée adaptée.",
        type: "tip"
      },
      {
        title: "Zone d'effet seuil",
        content: "Fractionnement par joint de dilatation sous les portes (au droit de l'axe) si surface >40 m² ou longueur >8 m dans une direction.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Types de parquets",
        content: "Trois types principaux: parquets contrecollés (2 ou 3 plis), parquets massifs (épaisseur ≥14 mm) et parquets mosaïques, chacun avec des règles de pose spécifiques."
      },
      {
        title: "Supports admissibles",
        content: "Supports admissibles: chapes ciment, dalles béton, chapes anhydrite, panneaux dérivés du bois, ancien parquet, avec exigences de planéité de 5 mm sous règle de 2 m."
      },
      {
        title: "Compatibilité sol chauffant",
        content: "Sol chauffant: température de surface limitée à 28°C, mise en température progressive (5°C/jour), arrêt 48h avant pose, redémarrage progressif 7 jours après. Essences denses déconseillées."
      },
      {
        title: "Finition et entretien",
        content: "Finitions possibles: vernis, huile, cire, avec première application 24h minimum après pose. Entretien régulier selon type de finition, avec produits spécifiques non abrasifs."
      }
    ],
    schemas: [
      {
        id: "schema-revetement-2",
        title: "Coupe parquet collé",
        imageUrl: "/images/schemas/parquet-colle.png",
        description: "Détail en coupe d'un parquet collé avec joint périphérique et jonction entre lames."
      }
    ]
  },
  {
    id: "dtu-revetement-3",
    title: "DTU 53.2 - Revêtements de sol PVC",
    category: "Revêtements",
    description: "Revêtements de sol PVC collés",
    lastUpdate: "Février 2023",
    rules: [
      {
        title: "Support très plan",
        content: "Tolérance de planéité: 3 mm sous la règle de 2 m et 1 mm sous le réglet de 20 cm, avec ragréage obligatoire si non conforme.",
        type: "standard"
      },
      {
        title: "Humidité résiduelle",
        content: "Humidité maximale du support: 4,5% pour dalle/chape ciment, 0,5% pour chape anhydrite. Test à la bombe à carbure obligatoire.",
        type: "standard"
      },
      {
        title: "Température de pose",
        content: "Température du support et de l'air ambiant ≥ 12°C, jamais inférieure au point de rosée pour éviter la condensation sous le revêtement.",
        type: "warning"
      },
      {
        title: "Délai de mise en service",
        content: "Délai minimal avant mise en service: 24h pour trafic piétonnier, 48h pour aménagement, 72h pour mise en place des meubles lourds.",
        type: "tip"
      },
      {
        title: "Traitement des joints",
        content: "Traitement des joints par soudure à chaud (≥ 24h après collage) obligatoire en locaux humides (E2, E3), recommandé pour tous les lés PVC homogènes.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Types de revêtements PVC",
        content: "Différents types: PVC homogène, hétérogène, compact ou sur mousse, en lés (2m), en dalles (30×30 à 60×60 cm) ou en lames (10×100 à 20×120 cm), avec classements UPEC."
      },
      {
        title: "Colles compatibles",
        content: "Colles acryliques, réactives (PU, époxy) ou alcool, selon le type de support, l'exposition à l'humidité et aux variations de température. Application à la spatule dentée fine."
      },
      {
        title: "Remontées en plinthe",
        content: "En locaux humides (E2, E3), remontée en plinthe obligatoire sur 7 cm minimum, avec forme d'appui (gorge) et fixation en partie haute par colle ou profil."
      },
      {
        title: "Protection des sols",
        content: "Protection obligatoire sous meubles (patins), éviter le caoutchouc (migration), maintenir humidité relative 40-60% et température 15-28°C en exploitation."
      }
    ],
    schemas: [
      {
        id: "schema-revetement-3",
        title: "Détail remontée en plinthe",
        imageUrl: "/images/schemas/remontee-plinthe.png",
        description: "Principe de remontée en plinthe d'un revêtement PVC en local humide avec détail d'angle."
      }
    ]
  },
  {
    id: "dtu-revetement-4",
    title: "DTU 59.1 - Travaux de peinture",
    category: "Revêtements",
    description: "Travaux de peinture des bâtiments",
    lastUpdate: "Avril 2023",
    rules: [
      {
        title: "Conditions climatiques",
        content: "Température minimale pour application: +8°C pour peintures aqueuses, +5°C pour peintures solvantées. Humidité relative <65% pour peintures sensibles.",
        type: "standard"
      },
      {
        title: "État des supports",
        content: "Supports secs: humidité <5% en masse pour mortiers/bétons, <12% pour bois. Supports non pulvérulents, cohésifs, propres et sans alcalinité résiduelle.",
        type: "standard"
      },
      {
        title: "Délai entre couches",
        content: "Délai minimal entre couches de peinture: 12-24h pour glycéro, 2-6h pour acrylique, mais jamais moins que prescrit par le fabricant. Ponçage intermédiaire selon besoin.",
        type: "warning"
      },
      {
        title: "Échantillonnage préalable",
        content: "Réaliser des échantillons de 1 m² minimum pour valider teinte, aspect (mat, satiné, brillant) et adhérence sur support représentatif.",
        type: "tip"
      },
      {
        title: "Aspect final",
        content: "Aspect final évalué à 2 m de distance en lumière non rasante. Niveau de finition A (soigné), B (courant) ou C (économique) selon cahier des charges.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Types de peintures",
        content: "Peintures acryliques, glycérophtaliques, polyuréthanes, époxy, minérales, chacune avec domaine d'emploi spécifique selon exposition (intérieur/extérieur) et contraintes."
      },
      {
        title: "Travaux préparatoires",
        content: "Les travaux préparatoires comprennent: égrenage, époussetage, lessivage, grattage, rebouchage, enduit de lissage, impression. Leur niveau dépend de la finition souhaitée."
      },
      {
        title: "Systèmes de peinture",
        content: "Système minimal: 1 couche d'impression + 2 couches de finition. Consommation totale minimale: 250 g/m² sur murs intérieurs, 400 g/m² en extérieur."
      },
      {
        title: "Finition des boiseries",
        content: "Boiseries: ponçage au grain 120 puis 180 avant impression. Rebouchage des nœuds et fentes avec produits spécifiques. Égrenage entre chaque couche au grain 240."
      }
    ],
    schemas: [
      {
        id: "schema-revetement-4",
        title: "Système complet de peinture",
        imageUrl: "/images/schemas/systeme-peinture.png",
        description: "Représentation des différentes couches d'un système complet de peinture sur diverses surfaces."
      }
    ]
  }
];
