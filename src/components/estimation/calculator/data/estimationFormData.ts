
// Données complètes du formulaire d'estimation

// Types de clients
export const clientTypes = [
  { id: 'individual', label: 'Particulier', icon: 'User' },
  { id: 'professional', label: 'Professionnel', icon: 'Building' }
];

// Types de projets pour particuliers
export const individualProjectTypes = [
  { id: 'construction', label: 'Construction neuve', icon: 'Home' },
  { id: 'renovation', label: 'Rénovation', icon: 'Hammer' },
  { id: 'extension', label: 'Extension', icon: 'Maximize' },
  { id: 'amenagement', label: 'Aménagement', icon: 'Columns' },
  { id: 'design', label: 'Conception/Plans', icon: 'PencilRuler' }
];

// Types de projets pour professionnels
export const professionalProjectTypes = [
  { id: 'commercial', label: 'Local commercial', icon: 'Store' },
  { id: 'offices', label: 'Bureaux', icon: 'Briefcase' },
  { id: 'industrial', label: 'Bâtiment industriel', icon: 'Factory' },
  { id: 'residential', label: 'Ensemble résidentiel', icon: 'Buildings' },
  { id: 'renovation_pro', label: 'Rénovation professionnelle', icon: 'Tool' }
];

// Types d'estimation
export const estimationTypes = [
  { id: 'basic', label: 'Estimation rapide', description: 'Basée sur des ratios moyens par mètre carré', icon: 'Calculator' },
  { id: 'detailed', label: 'Estimation détaillée', description: 'Par corps d\'état avec options', icon: 'ClipboardList' }
];

// Types de terrains
export const terrainTypes = [
  { id: 'flat', label: 'Plat', icon: 'Square' },
  { id: 'slight_slope', label: 'Légère pente', icon: 'TrendingUp' },
  { id: 'steep_slope', label: 'Forte pente', icon: 'Mountain' },
  { id: 'uneven', label: 'Terrain irrégulier', icon: 'Waves' }
];

// Accès terrain
export const terrainAccessTypes = [
  { id: 'easy', label: 'Facile', description: 'Accès direct depuis la voie publique' },
  { id: 'moderate', label: 'Moyen', description: 'Accès via un chemin étroit ou non goudronné' },
  { id: 'difficult', label: 'Difficile', description: 'Accès limité pour les engins de chantier' }
];

// Types de murs (gros oeuvre)
export const wallTypes = [
  { id: 'concrete_blocks', label: 'Parpaings', icon: 'Square' },
  { id: 'brick', label: 'Briques', icon: 'Grid' },
  { id: 'wood_frame', label: 'Ossature bois', icon: 'Columns' },
  { id: 'concrete', label: 'Béton armé', icon: 'Box' },
  { id: 'stone', label: 'Pierre', icon: 'Hexagon' },
  { id: 'earth', label: 'Terre crue/pisé', icon: 'Feather' },
  { id: 'steel_frame', label: 'Structure métallique', icon: 'Trello' }
];

// Types de toiture
export const roofTypes = [
  { id: 'gable', label: 'À deux pans', icon: 'Triangle' },
  { id: 'hip', label: 'À quatre pans', icon: 'Pentagon' },
  { id: 'flat', label: 'Toit terrasse', icon: 'Square' },
  { id: 'mono_pitch', label: 'Monopente', icon: 'CornerRightUp' },
  { id: 'mansard', label: 'Mansardé', icon: 'Home' },
  { id: 'complex', label: 'Complexe', icon: 'Layers' }
];

// Types de combles
export const atticTypes = [
  { id: 'lost', label: 'Perdus', icon: 'X' },
  { id: 'convertible', label: 'Aménageables', icon: 'Square' },
  { id: 'converted', label: 'Aménagés', icon: 'CheckSquare' },
  { id: 'roof_terrace', label: 'Toit terrasse', icon: 'Layout' }
];

// Types de couverture toiture
export const roofingTypes = [
  { id: 'tiles', label: 'Tuiles', icon: 'Grid' },
  { id: 'slate', label: 'Ardoises', icon: 'Square' },
  { id: 'metal', label: 'Métal (zinc, bac acier)', icon: 'Minimize2' },
  { id: 'gravel', label: 'Gravillons (toit plat)', icon: 'Circle' },
  { id: 'green_roof', label: 'Toiture végétalisée', icon: 'Feather' },
  { id: 'shingles', label: 'Bardeaux bitumés', icon: 'Hexagon' },
  { id: 'membrane', label: 'Membrane PVC/EPDM', icon: 'Square' }
];

// Types d'isolation
export const insulationTypes = [
  { id: 'standard', label: 'Standard (RT2012)', icon: 'Shield' },
  { id: 'reinforced', label: 'Renforcée (RT2020)', icon: 'ShieldCheck' },
  { id: 'passive', label: 'Maison passive', icon: 'Award' },
  { id: 'ecological', label: 'Matériaux écologiques', icon: 'Leaf' },
  { id: 'renovation', label: 'Rénovation standard', icon: 'Tool' }
];

// Types de façade
export const facadeMaterials = [
  { id: 'plaster', label: 'Enduit', icon: 'Square' },
  { id: 'stone', label: 'Pierre', icon: 'Octagon' },
  { id: 'brick', label: 'Briques', icon: 'Grid' },
  { id: 'wood', label: 'Bardage bois', icon: 'AlignLeft' },
  { id: 'metal', label: 'Bardage métallique', icon: 'Minimize2' },
  { id: 'composite', label: 'Bardage composite', icon: 'Layers' },
  { id: 'glass', label: 'Façade vitrée', icon: 'Square' }
];

// Types de menuiseries extérieures
export const windowTypes = [
  { id: 'pvc', label: 'PVC', icon: 'Square' },
  { id: 'aluminum', label: 'Aluminium', icon: 'Minimize2' },
  { id: 'wood', label: 'Bois', icon: 'Square' },
  { id: 'mixed', label: 'Mixte (bois/alu)', icon: 'Layers' },
  { id: 'steel', label: 'Acier', icon: 'Circle' }
];

// Types d'installations électriques
export const electricalTypes = [
  { id: 'basic', label: 'Basique', icon: 'Zap' },
  { id: 'standard', label: 'Standard', icon: 'ZapOff' },
  { id: 'premium', label: 'Premium', icon: 'Battery' },
  { id: 'smart_home', label: 'Domotique', icon: 'Smartphone' },
  { id: 'renovation', label: 'Rénovation', icon: 'Tool' }
];

// Types de plomberie
export const plumbingTypes = [
  { id: 'basic', label: 'Basique', icon: 'Droplet' },
  { id: 'standard', label: 'Standard', icon: 'Cloud' },
  { id: 'premium', label: 'Premium', icon: 'CloudDrizzle' },
  { id: 'renovation', label: 'Rénovation', icon: 'Tool' }
];

// Types de chauffage
export const heatingTypes = [
  { id: 'electric', label: 'Électrique', icon: 'Zap' },
  { id: 'gas', label: 'Gaz', icon: 'Flame' },
  { id: 'heat_pump', label: 'Pompe à chaleur', icon: 'Wind' },
  { id: 'solar', label: 'Solaire', icon: 'Sun' },
  { id: 'wood', label: 'Bois (poêle, chaudière)', icon: 'Square' },
  { id: 'fuel', label: 'Fioul', icon: 'Droplet' },
  { id: 'pellets', label: 'Granulés', icon: 'Circle' },
  { id: 'geothermal', label: 'Géothermie', icon: 'Thermometer' }
];

// Types de plâtrerie
export const plasteringTypes = [
  { id: 'traditional', label: 'Plâtre traditionnel', icon: 'Square' },
  { id: 'plasterboard', label: 'Plaques de plâtre', icon: 'CreditCard' },
  { id: 'mixed', label: 'Mixte', icon: 'Layers' },
  { id: 'renovation', label: 'Rénovation', icon: 'Tool' }
];

// Types de menuiseries intérieures
export const doorTypes = [
  { id: 'standard', label: 'Standard', icon: 'Square' },
  { id: 'premium', label: 'Premium', icon: 'CheckSquare' },
  { id: 'design', label: 'Design', icon: 'Layout' },
  { id: 'wood', label: 'Bois massif', icon: 'Square' },
  { id: 'renovation', label: 'Rénovation', icon: 'Tool' }
];

// Options d'aménagements intérieurs
export const interiorFittingsOptions = [
  { id: 'built_in_wardrobe', label: 'Placards intégrés', icon: 'Square' },
  { id: 'walk_in_closet', label: 'Dressing', icon: 'Layers' },
  { id: 'fireplace', label: 'Cheminée', icon: 'Flame' },
  { id: 'stairs', label: 'Escalier', icon: 'ArrowUp' },
  { id: 'partition_walls', label: 'Cloisons', icon: 'Columns' }
];

// Types de carrelage
export const tileTypes = [
  { id: 'standard', label: 'Standard', icon: 'Square' },
  { id: 'premium', label: 'Premium', icon: 'CheckSquare' },
  { id: 'luxury', label: 'Luxe', icon: 'Award' },
  { id: 'natural_stone', label: 'Pierre naturelle', icon: 'Circle' },
  { id: 'mosaic', label: 'Mosaïque', icon: 'Grid' }
];

// Types de revêtements de sol
export const flooringTypes = [
  { id: 'tiles', label: 'Carrelage', percentKey: 'floorTilePercentage', icon: 'Square' },
  { id: 'parquet', label: 'Parquet', percentKey: 'parquetPercentage', icon: 'AlignJustify' },
  { id: 'laminate', label: 'Stratifié', percentKey: 'parquetPercentage', icon: 'AlignLeft' },
  { id: 'vinyl', label: 'PVC/Vinyle', percentKey: 'softFloorPercentage', icon: 'CreditCard' },
  { id: 'carpet', label: 'Moquette', percentKey: 'softFloorPercentage', icon: 'Square' },
  { id: 'concrete', label: 'Béton ciré', percentKey: 'floorTilePercentage', icon: 'Circle' }
];

// Types de revêtements muraux
export const wallCoveringTypes = [
  { id: 'basic_paint', label: 'Peinture standard', percentKey: 'basicPaintPercentage', icon: 'Square' },
  { id: 'decorative_paint', label: 'Peinture décorative', percentKey: 'decorativePaintPercentage', icon: 'Droplet' },
  { id: 'wallpaper', label: 'Papier peint', percentKey: 'wallpaperPercentage', icon: 'File' },
  { id: 'wood_cladding', label: 'Lambris bois', percentKey: 'woodCladPercentage', icon: 'AlignLeft' },
  { id: 'stone_cladding', label: 'Parement pierre', percentKey: 'stoneCladPercentage', icon: 'Circle' }
];

// Solutions écologiques
export const ecoSolutionsOptions = [
  { id: 'high_insulation', label: 'Isolation renforcée', icon: 'Thermometer' },
  { id: 'natural_materials', label: 'Matériaux naturels', icon: 'Feather' },
  { id: 'rainwater_harvesting', label: 'Récupération eau de pluie', icon: 'Droplet' },
  { id: 'low_emission_glass', label: 'Vitrage basse émissivité', icon: 'Square' },
  { id: 'eco_construction', label: 'Construction bioclimatique', icon: 'Sun' }
];

// Énergies renouvelables
export const renewableEnergyOptions = [
  { id: 'solar_panels', label: 'Panneaux photovoltaïques', icon: 'Sun' },
  { id: 'solar_thermal', label: 'Panneaux solaires thermiques', icon: 'Thermometer' },
  { id: 'geothermal', label: 'Géothermie', icon: 'Thermometer' },
  { id: 'air_heat_pump', label: 'Pompe à chaleur air', icon: 'Wind' },
  { id: 'water_heat_pump', label: 'Pompe à chaleur eau', icon: 'Droplet' },
  { id: 'biomass_boiler', label: 'Chaudière biomasse', icon: 'Hexagon' }
];

// Aménagement paysager
export const landscapingOptions = [
  { id: 'garden', label: 'Jardin paysager', icon: 'Flower' },
  { id: 'terrace', label: 'Terrasse', icon: 'Square' },
  { id: 'pool', label: 'Piscine', icon: 'Droplet' },
  { id: 'driveway', label: 'Allée', icon: 'CornerDownRight' },
  { id: 'fence', label: 'Clôture', icon: 'Grid' },
  { id: 'exterior_lighting', label: 'Éclairage extérieur', icon: 'Sun' },
  { id: 'irrigation', label: 'Système d\'irrigation', icon: 'Droplet' }
];

// Options extérieures
export const exteriorOptionsTypes = [
  { id: 'terrace', label: 'Terrasse', icon: 'Square' },
  { id: 'balcony', label: 'Balcon', icon: 'Layout' },
  { id: 'pergola', label: 'Pergola', icon: 'Grid' },
  { id: 'carport', label: 'Carport', icon: 'Home' },
  { id: 'garage', label: 'Garage', icon: 'Home' },
  { id: 'swimming_pool', label: 'Piscine', icon: 'Droplet' },
  { id: 'exterior_lighting', label: 'Éclairage extérieur', icon: 'Sun' }
];

// Options cuisine
export const kitchenOptionsTypes = [
  { id: 'basic', label: 'Basique', icon: 'Square' },
  { id: 'standard', label: 'Standard', icon: 'CheckSquare' },
  { id: 'premium', label: 'Premium', icon: 'Award' },
  { id: 'luxury', label: 'Luxe', icon: 'Star' },
  { id: 'custom', label: 'Sur-mesure', icon: 'Tool' }
];

// Options salle de bain
export const bathroomOptionsTypes = [
  { id: 'basic', label: 'Basique', icon: 'Square' },
  { id: 'standard', label: 'Standard', icon: 'CheckSquare' },
  { id: 'premium', label: 'Premium', icon: 'Award' },
  { id: 'luxury', label: 'Luxe', icon: 'Star' },
  { id: 'custom', label: 'Sur-mesure', icon: 'Tool' }
];

// Types de construction
export const constructionTypes = [
  { id: 'traditional', label: 'Traditionnelle', icon: 'Home' },
  { id: 'contemporary', label: 'Contemporaine', icon: 'Square' },
  { id: 'eco', label: 'Écologique', icon: 'Leaf' },
  { id: 'modular', label: 'Modulaire', icon: 'Grid' },
  { id: 'passive', label: 'Passive', icon: 'Shield' }
];

// Modes de construction
export const constructionModes = [
  { id: 'turnkey', label: 'Clé en main', icon: 'Key' },
  { id: 'partbuilt', label: 'Hors d\'eau hors d\'air', icon: 'Home' },
  { id: 'selfbuild', label: 'Auto-construction', icon: 'Tool' },
  { id: 'maitredoeuvre', label: 'Maîtrise d\'œuvre', icon: 'Users' }
];

// Niveaux de finition
export const finishLevels = [
  { id: 'basic', label: 'Standard', icon: 'Square' },
  { id: 'medium', label: 'Confort', icon: 'CheckSquare' },
  { id: 'high', label: 'Premium', icon: 'Award' },
  { id: 'luxury', label: 'Luxe', icon: 'Star' }
];

// Types de fondations
export const foundationTypes = [
  { id: 'strip', label: 'Semelles filantes', icon: 'Minus' },
  { id: 'slab', label: 'Dalle pleine', icon: 'Square' },
  { id: 'piles', label: 'Pieux/Pilotis', icon: 'AlignCenter' },
  { id: 'crawl_space', label: 'Vide sanitaire', icon: 'Layers' },
  { id: 'basement', label: 'Sous-sol', icon: 'ArrowDown' }
];

// Types de sols
export const soilTypes = [
  { id: 'normal', label: 'Normal', icon: 'Square' },
  { id: 'clay', label: 'Argileux', icon: 'Circle' },
  { id: 'rocky', label: 'Rocheux', icon: 'Octagon' },
  { id: 'sandy', label: 'Sableux', icon: 'Circle' },
  { id: 'wet', label: 'Humide', icon: 'Droplet' }
];

// Codification des régions françaises pour estimation
export const frenchRegions = [
  { id: 'paca', label: 'PACA', priceIndex: 1.15 },
  { id: 'idf', label: 'Île-de-France', priceIndex: 1.25 },
  { id: 'rhone_alpes', label: 'Rhône-Alpes', priceIndex: 1.1 },
  { id: 'occitanie', label: 'Occitanie', priceIndex: 1.05 },
  { id: 'bretagne', label: 'Bretagne', priceIndex: 1.0 },
  { id: 'normandie', label: 'Normandie', priceIndex: 0.95 },
  { id: 'hauts_de_france', label: 'Hauts-de-France', priceIndex: 0.9 },
  { id: 'grand_est', label: 'Grand Est', priceIndex: 0.95 },
  { id: 'pays_de_loire', label: 'Pays de la Loire', priceIndex: 1.0 },
  { id: 'nouvelle_aquitaine', label: 'Nouvelle-Aquitaine', priceIndex: 1.0 },
  { id: 'bourgogne_fc', label: 'Bourgogne-Franche-Comté', priceIndex: 0.9 },
  { id: 'centre_vdl', label: 'Centre-Val de Loire', priceIndex: 0.9 },
  { id: 'corse', label: 'Corse', priceIndex: 1.2 }
];

// Configuration de l'agent d'estimation
export const estimationAgentConfig = {
  initialPrompt: "Bonjour ! Je suis votre assistant d'estimation Progineer. Comment puis-je vous aider avec votre projet de construction ou rénovation ?",
  suggestedQuestions: [
    "Combien coûte une maison de 100m² ?",
    "Quel est le prix au m² pour rénover un appartement ?",
    "Quels sont les frais de maîtrise d'œuvre ?",
    "Comment estimer le coût d'une extension ?"
  ],
  fallbackResponses: [
    "Je n'ai pas toutes les informations nécessaires pour estimer votre projet. Pouvez-vous me préciser la surface et le type de construction ?",
    "Pour vous donner une estimation précise, j'aurais besoin de quelques détails supplémentaires sur votre projet.",
    "Pouvez-vous me donner plus d'informations sur votre projet ? Par exemple, la surface, le type de construction, la localisation..."
  ],
  defaultPriceRanges: {
    construction: {
      basic: { min: 1300, max: 1600 },
      medium: { min: 1600, max: 2000 },
      high: { min: 2000, max: 2500 },
      luxury: { min: 2500, max: 4000 }
    },
    renovation: {
      light: { min: 500, max: 800 },
      medium: { min: 800, max: 1200 },
      heavy: { min: 1200, max: 1800 },
      complete: { min: 1800, max: 2500 }
    },
    extension: {
      basic: { min: 1400, max: 1800 },
      medium: { min: 1800, max: 2200 },
      high: { min: 2200, max: 2800 }
    },
    commercial: {
      basic: { min: 900, max: 1300 },
      medium: { min: 1300, max: 1800 },
      high: { min: 1800, max: 2500 }
    }
  }
};

// Structure complète du formulaire d'estimation
export const formStructure = {
  steps: [
    {
      id: 'client_type',
      title: 'Type de client',
      description: 'Êtes-vous un particulier ou un professionnel ?',
      fieldGroups: [
        {
          fields: [
            {
              name: 'clientType',
              type: 'radio',
              options: clientTypes,
              required: true
            }
          ]
        }
      ]
    },
    {
      id: 'individual_project',
      title: 'Votre projet',
      description: 'Quel type de projet souhaitez-vous réaliser ?',
      condition: (data) => data.clientType === 'individual',
      fieldGroups: [
        {
          fields: [
            {
              name: 'projectType',
              type: 'radio',
              options: individualProjectTypes,
              required: true
            }
          ]
        }
      ]
    },
    {
      id: 'professional_project',
      title: 'Votre projet professionnel',
      description: 'Détails de votre projet professionnel',
      condition: (data) => data.clientType === 'professional',
      fieldGroups: [
        {
          title: 'Type d\'activité',
          fields: [
            {
              name: 'activity',
              type: 'text',
              label: 'Activité de l\'entreprise',
              placeholder: 'Ex: Commerce, bureau, industriel...',
              required: true
            }
          ]
        },
        {
          title: 'Type de projet',
          fields: [
            {
              name: 'projectType',
              type: 'radio',
              options: professionalProjectTypes,
              required: true
            }
          ]
        },
        {
          title: 'Planning envisagé',
          fields: [
            {
              name: 'startDate',
              type: 'date',
              label: 'Date de début souhaitée',
              required: false
            },
            {
              name: 'endDate',
              type: 'date',
              label: 'Date de fin souhaitée',
              required: false
            }
          ]
        }
      ]
    },
    // Les étapes suivantes sont communes aux particuliers et professionnels
    {
      id: 'estimation_type',
      title: 'Type d\'estimation',
      description: 'Choisissez le niveau de détail de votre estimation',
      fieldGroups: [
        {
          fields: [
            {
              name: 'estimationType',
              type: 'radio',
              options: estimationTypes,
              required: true
            },
            {
              name: 'termsAccepted',
              type: 'checkbox',
              label: 'J\'accepte que mes données soient utilisées pour établir cette estimation',
              required: true
            }
          ]
        }
      ]
    },
    // Autres étapes du formulaire complet...
  ]
};

// Formules de calcul pour l'estimation
export const estimationCalculations = {
  // Base de calcul au m² selon le type de projet
  basePricesPerSqm: {
    'construction': 1800,
    'renovation': 1200,
    'extension': 1600,
    'amenagement': 900,
    'design': 150,
    'commercial': 1500,
    'offices': 1600,
    'industrial': 1200,
    'residential': 1700,
    'renovation_pro': 1300
  },
  
  // Coefficients multiplicateurs par type d'élément
  coefficients: {
    // Types de murs
    wallType: {
      'concrete_blocks': 1.0,
      'brick': 1.15,
      'wood_frame': 1.1,
      'concrete': 1.05,
      'stone': 1.4,
      'earth': 1.25,
      'steel_frame': 1.2
    },
    
    // Types de toiture
    roofType: {
      'gable': 1.0,
      'hip': 1.15,
      'flat': 0.95,
      'mono_pitch': 0.9,
      'mansard': 1.2,
      'complex': 1.3
    },
    
    // Et ainsi de suite pour chaque catégorie...
  },
  
  // Formule de calcul complète
  calculate: (formData) => {
    // Cette fonction serait implémentée dans le code pour calculer l'estimation
    // en fonction de toutes les données du formulaire
    return {
      totalHT: 0, // À implémenter
      totalTTC: 0,
      breakdown: [] // Détail par corps d'état
    };
  }
};
