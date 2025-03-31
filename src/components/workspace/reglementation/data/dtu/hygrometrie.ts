
import { DTU } from '../../dtu/types';

export const hygrometrieDTUs: DTU[] = [
  {
    id: "hygrometrie-1",
    title: "Hygrométrie et condensation",
    category: "Hygrométrie",
    description: "Principes de base sur l'hygrométrie et le contrôle de la condensation dans le bâtiment",
    lastUpdate: "Janvier 2023",
    rules: [
      {
        title: "Classes d'hygrométrie",
        content: "Faible: logements peu occupés (< 2,5 g/m³); Moyenne: logements normalement occupés (2,5 à 5 g/m³); Forte: cuisines, sanitaires collectifs (5 à 7,5 g/m³); Très forte: piscines, papeteries (> 7,5 g/m³).",
        type: "standard"
      },
      {
        title: "Point de rosée",
        content: "Température à laquelle la vapeur d'eau contenue dans l'air commence à se condenser. À 20°C et 50% HR, le point de rosée est d'environ 9°C.",
        type: "standard"
      },
      {
        title: "Risque de condensation",
        content: "Se produit lorsque la température de surface d'un matériau est inférieure au point de rosée de l'air ambiant. Particulièrement critique aux ponts thermiques.",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Condensation superficielle",
        content: "Pour éviter la condensation superficielle, le facteur de température (fRsi) de la paroi doit être supérieur au facteur de température critique. Le fRsi minimal exigé est généralement de 0,73 pour les zones froides en France."
      },
      {
        title: "Condensation interne",
        content: "La méthode de Glaser permet d'évaluer les risques de condensation interne dans les parois. Elle compare la pression de vapeur dans la paroi avec la pression de vapeur saturante à chaque interface."
      },
      {
        title: "Solutions contre l'humidité",
        content: "Ventilation efficace (VMC), pare-vapeur côté chaud, isolation thermique performante, traitement des ponts thermiques. Le Sd du pare-vapeur doit être > 18 m en zone très froide."
      }
    ]
  },
  {
    id: "hygrometrie-2",
    title: "Transferts de vapeur d'eau et perméabilité",
    category: "Hygrométrie",
    description: "Principes et règles concernant les transferts de vapeur d'eau à travers les parois",
    lastUpdate: "Février 2023",
    rules: [
      {
        title: "Coefficient μ",
        content: "Facteur de résistance à la diffusion de vapeur d'eau: Béton: μ = 60 à 100; Laine minérale: μ = 1; Polystyrène: μ = 30 à 100; Bois: μ = 20 à 50.",
        type: "standard"
      },
      {
        title: "Valeur Sd",
        content: "Épaisseur équivalente de diffusion: Sd = μ × e (en mètres). Un pare-vapeur efficace a un Sd > 18 m. Un frein-vapeur a un Sd entre 2 et 5 m.",
        type: "tip"
      },
      {
        title: "Règle du facteur 5",
        content: "Pour éviter la condensation interne, la résistance à la diffusion de vapeur côté intérieur doit être au moins 5 fois supérieure à celle côté extérieur.",
        type: "warning"
      }
    ],
    sections: [
      {
        title: "Pare-vapeur",
        content: "Doit être installé du côté chaud de l'isolation, sans discontinuité. Les jointures doivent être étanches (ruban adhésif spécifique). La fonction peut être assurée par une membrane dédiée ou par un matériau intrinsèquement étanche."
      },
      {
        title: "Matériaux hygroscopiques",
        content: "Le bois et ses dérivés, ainsi que certains isolants biosourcés, peuvent absorber et restituer l'humidité, contribuant à réguler l'hygrométrie ambiante. Cette propriété n'est pas prise en compte dans la méthode de Glaser."
      }
    ]
  },
  {
    id: "hygrometrie-3",
    title: "Ventilation et qualité de l'air intérieur",
    category: "Hygrométrie",
    description: "Impact de la ventilation sur l'hygrométrie et solutions pour maintenir une qualité d'air optimale",
    lastUpdate: "Mars 2023",
    rules: [
      {
        title: "Débits réglementaires",
        content: "Séjour: 18 m³/h min; Chambre: 9 m³/h min; Cuisine: 20-75 m³/h selon utilisation; Salle de bain: 15-30 m³/h; WC: 15 m³/h.",
        type: "standard"
      },
      {
        title: "Humidité relative optimale",
        content: "Une humidité relative entre 40% et 60% est recommandée pour le confort et la santé. En dessous de 30%, risques de sécheresse des muqueuses; au-dessus de 70%, développement de moisissures.",
        type: "tip"
      },
      {
        title: "VMC double flux",
        content: "Permet de récupérer la chaleur de l'air extrait (rendement jusqu'à 90%) tout en contrôlant l'humidité. Efficace pour les bâtiments étanches à l'air.",
        type: "standard"
      }
    ],
    sections: [
      {
        title: "Modulation des débits",
        content: "Les systèmes hygroréglables adaptent les débits d'air en fonction de l'humidité: VMC hygro A (entrées d'air hygroréglables), VMC hygro B (entrées d'air et extractions hygroréglables). Économie d'énergie jusqu'à 30% par rapport à un système autoréglable."
      },
      {
        title: "Qualité de l'air intérieur",
        content: "Outre l'humidité, la ventilation élimine les polluants: CO2, COV, radon, particules fines. Une concentration de CO2 > 1000 ppm indique une ventilation insuffisante. La norme NBN 50-001 définit différents systèmes (A à D) selon le mode d'alimentation et d'extraction."
      }
    ]
  }
];
