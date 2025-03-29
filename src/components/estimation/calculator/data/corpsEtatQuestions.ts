
// Définition des questions spécifiques à chaque corps d'état
// Ces questions permettent d'affiner l'estimation du coût

export interface CorpsEtatQuestion {
  id: string;
  question: string;
  options?: string[];
  helpText?: string;
}

export interface CorpsEtatQuestions {
  [key: string]: CorpsEtatQuestion[];
}

export const corpsEtatQuestions: CorpsEtatQuestions = {
  // Questions pour le gros œuvre
  "gros_oeuvre": [
    {
      id: "gros_oeuvre_type",
      question: "Quel type de matériau principal envisagez-vous pour les murs ?",
      options: ["Béton", "Parpaings", "Briques", "Bois", "Ossature métallique", "Autre / Je ne sais pas encore"]
    },
    {
      id: "terrain_type",
      question: "Comment qualifieriez-vous votre terrain ?",
      options: ["Terrain plat", "Terrain en légère pente", "Terrain en forte pente", "Terrain complexe (accès difficile, etc.)"]
    },
    {
      id: "fondation_type",
      question: "Quel type de fondations envisagez-vous ou vous ont été recommandées ?",
      options: ["Fondations classiques", "Radier", "Pieux/Micropieux", "Semelles filantes", "Je ne sais pas encore"]
    },
    {
      id: "sous_sol",
      question: "Prévoyez-vous un sous-sol ?",
      options: ["Oui, sous toute la maison", "Oui, sous une partie de la maison", "Non", "Je ne sais pas encore"]
    },
    {
      id: "qualite_beton",
      question: "Quel niveau de qualité pour le béton et les matériaux du gros œuvre ?",
      options: ["Entrée de gamme", "Standard", "Premium", "Je ne sais pas / À déterminer"]
    }
  ],
  
  // Questions pour la charpente et toiture
  "charpente_toiture": [
    {
      id: "roof_type",
      question: "Quel type de toiture souhaitez-vous ?",
      options: ["Toiture à deux pans", "Toiture à quatre pans", "Toit plat", "Toit monopente", "Toit complexe (plusieurs niveaux)"]
    },
    {
      id: "roof_material",
      question: "Quel matériau de couverture préférez-vous ?",
      options: ["Tuiles terre cuite", "Tuiles béton", "Ardoise", "Zinc", "Bac acier", "Étanchéité membrane", "Autre"]
    },
    {
      id: "combles",
      question: "Comment souhaitez-vous aménager vos combles ?",
      options: ["Combles aménagés", "Combles aménageables", "Combles perdus", "Non applicable (toit plat)"]
    },
    {
      id: "charpente_type",
      question: "Quel type de charpente préférez-vous ?",
      options: ["Charpente traditionnelle en bois", "Fermettes industrialisées", "Charpente métallique", "Structure béton", "Je ne sais pas encore"]
    }
  ],
  
  // Questions pour l'isolation et façades
  "facade_isolation": [
    {
      id: "isolation_type",
      question: "Quel niveau d'isolation souhaitez-vous ?",
      options: ["Réglementaire (RT 2020)", "Performance (RE 2020 -10%)", "Haute performance (RE 2020 -20%)", "Très haute performance (Passif)"]
    },
    {
      id: "facade_material",
      question: "Quel type de revêtement de façade préférez-vous ?",
      options: ["Enduit traditionnel", "Enduit monocouche", "Bardage bois", "Bardage composite", "Pierre", "Briques apparentes", "Mixte"]
    },
    {
      id: "isolation_murs",
      question: "Quelle technique d'isolation des murs préférez-vous ?",
      options: ["Isolation par l'intérieur", "Isolation par l'extérieur", "Isolation intégrée (murs à isolation répartie)", "Je ne sais pas encore"]
    },
    {
      id: "isolation_toiture",
      question: "Quel type d'isolation pour la toiture/combles ?",
      options: ["Laine minérale", "Laine de bois", "Ouate de cellulose", "Polyuréthane", "Autre / Je ne sais pas encore"]
    },
    {
      id: "isolation_ecologique",
      question: "Souhaitez-vous privilégier des matériaux d'isolation écologiques ?",
      options: ["Oui, absolument", "Oui, si le budget le permet", "Non, privilégier l'efficacité", "Sans préférence particulière"]
    }
  ],
  
  // Questions pour les menuiseries extérieures
  "menuiseries": [
    {
      id: "fenetre_type",
      question: "Quel type de fenêtres souhaitez-vous ?",
      options: ["Double vitrage", "Triple vitrage", "Vitrage à isolation renforcée", "Je ne sais pas encore"]
    },
    {
      id: "menuiserie_materiau",
      question: "En quel matériau souhaitez-vous les menuiseries extérieures ?",
      options: ["PVC", "Aluminium", "Bois", "Mixte bois/aluminium", "Je ne sais pas encore"]
    },
    {
      id: "porte_entree",
      question: "Quel type de porte d'entrée envisagez-vous ?",
      options: ["Porte standard", "Porte blindée", "Porte design haut de gamme", "Je ne sais pas encore"]
    },
    {
      id: "fermetures",
      question: "Quel type de fermetures/volets préférez-vous ?",
      options: ["Volets roulants électriques", "Volets roulants manuels", "Volets battants", "Brise-soleil orientables", "Pas de volets"]
    },
    {
      id: "portes_fenetres",
      question: "Souhaitez-vous des portes-fenêtres ou baies vitrées ?",
      options: ["Portes-fenêtres traditionnelles", "Baies coulissantes", "Baies à galandage", "Aucune", "Je ne sais pas encore"]
    }
  ],
  
  // Questions pour l'électricité
  "electricite": [
    {
      id: "niveau_equipement",
      question: "Quel niveau d'équipement électrique souhaitez-vous ?",
      options: ["Basique (norme minimum)", "Confort (prises et points lumineux supplémentaires)", "Premium (domotique, GTL étendue)"]
    },
    {
      id: "domotique",
      question: "Souhaitez-vous intégrer un système domotique ?",
      options: ["Oui, installation complète", "Oui, pour certaines fonctions uniquement", "Non", "Je ne sais pas encore"]
    },
    {
      id: "eclairage",
      question: "Quel type d'éclairage privilégiez-vous ?",
      options: ["Éclairage traditionnel", "Spots et LED encastrés", "Mixte", "Je ne sais pas encore"]
    },
    {
      id: "production_energie",
      question: "Envisagez-vous d'installer des équipements de production d'électricité ?",
      options: ["Panneaux photovoltaïques", "Éolienne domestique", "Non", "Je ne sais pas encore"]
    }
  ],
  
  // Questions pour la plomberie et chauffage
  "plomberie_chauffage": [
    {
      id: "chauffage_type",
      question: "Quel système de chauffage principal souhaitez-vous ?",
      options: ["Pompe à chaleur", "Chaudière gaz à condensation", "Chaudière fioul", "Poêle/Insert à bois", "Radiateurs électriques", "Plancher chauffant", "Autre"]
    },
    {
      id: "eau_chaude",
      question: "Comment souhaitez-vous produire l'eau chaude sanitaire ?",
      options: ["Chauffe-eau électrique", "Ballon thermodynamique", "Production par chaudière", "Chauffe-eau solaire", "Je ne sais pas encore"]
    },
    {
      id: "ventilation",
      question: "Quel système de ventilation préférez-vous ?",
      options: ["VMC simple flux", "VMC double flux", "VMC hygroréglable", "VMC thermodynamique", "Je ne sais pas encore"]
    },
    {
      id: "plomberie_qualite",
      question: "Quel niveau de qualité pour la plomberie ?",
      options: ["Standard", "Premium (multicouche, collecteurs)", "Je ne sais pas encore"]
    }
  ],
  
  // Questions pour les cloisons et plâtrerie
  "cloisons_platrerie": [
    {
      id: "cloisons_type",
      question: "Quel type de cloisons intérieures souhaitez-vous ?",
      options: ["Cloisons standard (placo 72mm)", "Cloisons phoniques renforcées", "Cloisons hydrofuges (pièces humides)", "Je ne sais pas encore"]
    },
    {
      id: "plafonds",
      question: "Souhaitez-vous des faux-plafonds ou des plafonds particuliers ?",
      options: ["Plafonds standards", "Faux-plafonds partiels", "Faux-plafonds avec spots intégrés", "Non", "Je ne sais pas encore"]
    },
    {
      id: "finition_murs",
      question: "Quelle finition pour les murs intérieurs ?",
      options: ["Prêt à peindre standard", "Finition soignée", "Je ne sais pas encore"]
    }
  ],
  
  // Questions pour les revêtements
  "revetements": [
    {
      id: "sol_pieces_vie",
      question: "Quel revêtement de sol pour les pièces de vie ?",
      options: ["Carrelage", "Parquet", "Stratifié", "Sol souple (PVC)", "Autre", "Je ne sais pas encore"]
    },
    {
      id: "sol_chambres",
      question: "Quel revêtement de sol pour les chambres ?",
      options: ["Carrelage", "Parquet", "Stratifié", "Moquette", "Sol souple (PVC)", "Je ne sais pas encore"]
    },
    {
      id: "carrelage_qualite",
      question: "Si vous choisissez du carrelage, quelle gamme de prix envisagez-vous ?",
      options: ["Entrée de gamme (15-25€/m²)", "Milieu de gamme (25-50€/m²)", "Haut de gamme (>50€/m²)", "Je ne sais pas encore"]
    },
    {
      id: "peinture_type",
      question: "Quel type de peinture préférez-vous ?",
      options: ["Peinture standard", "Peinture premium (grande marque)", "Peinture écologique", "Je ne sais pas encore"]
    }
  ],
  
  // Questions pour la cuisine et salle de bain
  "cuisine_sdb": [
    {
      id: "cuisine_niveau",
      question: "Quel niveau de cuisine souhaitez-vous installer ?",
      options: ["Entrée de gamme", "Milieu de gamme", "Haut de gamme", "Cuisine sur mesure", "Installation ultérieure"]
    },
    {
      id: "sdb_nombre",
      question: "Combien de salles de bain/salles d'eau prévoyez-vous ?",
      options: ["1", "2", "3", "Plus de 3"]
    },
    {
      id: "sdb_equipement",
      question: "Quel niveau d'équipement pour les salles de bain ?",
      options: ["Standard", "Premium", "Luxe", "Je ne sais pas encore"]
    },
    {
      id: "cuisine_equipement",
      question: "Quels équipements sont à prévoir dans la cuisine ?",
      options: ["Meubles uniquement", "Meubles + électroménager standard", "Meubles + électroménager haut de gamme", "Je ne sais pas encore"]
    }
  ],
  
  // Questions pour les aménagements extérieurs
  "amenagements_exterieurs": [
    {
      id: "terrassement",
      question: "Avez-vous besoin de travaux de terrassement importants ?",
      options: ["Oui, importants", "Oui, mineurs", "Non", "Je ne sais pas encore"]
    },
    {
      id: "acces_voirie",
      question: "Quel type d'accès et de voirie souhaitez-vous ?",
      options: ["Allée simple", "Allée + stationnements", "Accès complexe avec portail motorisé", "Je ne sais pas encore"]
    },
    {
      id: "jardin",
      question: "Souhaitez-vous des aménagements paysagers ?",
      options: ["Gazon seul", "Jardin paysager complet", "Plantation d'arbres", "Non", "À prévoir ultérieurement"]
    },
    {
      id: "terrasse",
      question: "Souhaitez-vous une terrasse ? Si oui, en quel matériau ?",
      options: ["Terrasse en bois", "Terrasse carrelée", "Terrasse en pierre", "Terrasse en béton", "Terrasse composite", "Pas de terrasse"]
    },
    {
      id: "piscine",
      question: "Prévoyez-vous l'installation d'une piscine ?",
      options: ["Oui, en même temps que la construction", "Oui, mais plus tard", "Non"]
    }
  ]
};
