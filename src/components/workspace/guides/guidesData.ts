
import { BookOpen, FileText, FileSpreadsheet, Calculator } from 'lucide-react';
import { GuideCategory, GuideDocument } from './types';

// Guide Categories
export const guideCategories: GuideCategory[] = [
  { id: 'tous', name: 'Tous les guides', icon: BookOpen },
  { id: 'construction', name: 'Construction', icon: FileText },
  { id: 'renovation', name: 'Rénovation', icon: FileSpreadsheet },
  { id: 'reglementation', name: 'Réglementation', icon: FileText },
  { id: 'calculateurs', name: 'Calculateurs', icon: Calculator },
];

// Guide Documents
export const guideDocuments: GuideDocument[] = [
  {
    id: '1',
    title: 'Guide complet de la construction',
    description: 'Tout ce que vous devez savoir pour réussir votre projet de construction du début à la fin.',
    type: 'pdf',
    fileSize: '4.2 MB',
    lastUpdated: '2023-10-15',
    url: '/files/guide-construction.pdf',
    categoryId: 'construction',
    featured: true,
    isNew: false,
    content: `
    # Guide complet de la construction

    ## Introduction
    Ce guide a été conçu pour vous accompagner à travers chaque étape de votre projet de construction, de la conception initiale à la remise des clés.

    ## Sommaire
    1. Définir votre projet et votre budget
    2. Choisir un terrain adapté
    3. Sélectionner les professionnels qui vous accompagneront
    4. Comprendre les démarches administratives
    5. Suivre efficacement le chantier
    6. Réceptionner les travaux

    ## 1. Définir votre projet et votre budget
    La première étape, et sans doute la plus importante, est de définir clairement votre projet et d'établir un budget réaliste. Prenez en compte non seulement le coût de la construction, mais aussi les frais annexes comme :
    - Les frais de notaire (7-8% du prix du terrain)
    - Les taxes d'aménagement (variables selon les communes)
    - Les raccordements aux réseaux (eau, électricité, gaz, télécommunications)
    - L'aménagement extérieur (terrassement, clôtures, jardin)
    - Les éventuels dépassements de budget (prévoyez une marge de 10% minimum)

    ### Évaluation précise de vos besoins
    Avant de dessiner les plans, réfléchissez à vos besoins actuels et futurs :
    - Nombre de chambres et leur taille
    - Espaces de vie communs (salon, salle à manger, cuisine)
    - Bureaux ou espaces dédiés au télétravail
    - Pièces techniques (buanderie, cellier, garage)
    - Espaces extérieurs (terrasse, jardin, piscine)
    
    Pensez également à l'évolution de votre foyer sur les 10-15 prochaines années : arrivée d'enfants, départ des aînés, possibilité de vieillir dans votre logement, etc.

    ### Détermination d'un budget réaliste
    Le budget moyen pour une construction en PACA varie entre 1500€ et 3000€/m² selon les prestations et la complexité du projet. À ce prix de construction s'ajoutent :
    - Le coût du terrain (très variable selon les zones)
    - Les honoraires des professionnels (10-15% du montant des travaux)
    - Les assurances obligatoires (dommage-ouvrage : 2-3% du coût de construction)
    - Les frais de raccordement et viabilisation (5000-15000€)
    - L'aménagement intérieur et extérieur

    ## 2. Choisir un terrain adapté
    Le choix du terrain déterminera en grande partie votre projet. Analysez :
    - La localisation et l'environnement : proximité des commerces, écoles, transports, nuisances sonores
    - L'exposition et la topographie : orientation, pente, nature du sol (nécessité d'une étude géotechnique)
    - Les contraintes d'urbanisme : PLU, servitudes, coefficients d'occupation des sols
    - L'accessibilité aux réseaux : eau, électricité, gaz, télécom, assainissement
    - Les risques naturels et technologiques : inondation, incendie, mouvement de terrain

    ### Vérifications essentielles avant achat
    - Consultez le Plan Local d'Urbanisme (PLU) en mairie
    - Vérifiez les servitudes publiques et privées
    - Obtenez un certificat d'urbanisme opérationnel
    - Faites réaliser une étude de sol par un géotechnicien
    - Vérifiez la présence de réseaux à proximité

    ## 3. Sélectionner les professionnels
    Selon la complexité de votre projet, vous pourrez faire appel à :
    - Un architecte (obligatoire pour toute construction > 150m²)
    - Un maître d'œuvre comme Progineer
    - Un constructeur de maisons individuelles
    - Des artisans si vous optez pour l'auto-construction partielle

    ### Comment choisir le bon professionnel
    - Consultez leurs réalisations antérieures
    - Vérifiez leurs assurances professionnelles
    - Demandez plusieurs devis détaillés
    - Assurez-vous de leur disponibilité
    - Evaluez leur capacité d'écoute et de conseil

    ### Le contrat de maîtrise d'œuvre
    Ce contrat doit préciser :
    - L'étendue de la mission (conception seule, ou suivi de chantier inclus)
    - Les délais de réalisation de chaque phase
    - Les honoraires et modalités de paiement
    - Les assurances et garanties
    - Les conditions de modification ou résiliation

    ## 4. Comprendre les démarches administratives
    Votre projet nécessitera différentes autorisations :
    - Permis de construire ou déclaration préalable de travaux
    - Déclaration d'ouverture de chantier (DOC)
    - Assurance dommage-ouvrage (obligatoire)
    - Déclaration d'achèvement des travaux (DAACT)

    ### Le permis de construire
    Pour déposer un permis, vous devrez fournir :
    - Un formulaire Cerfa
    - Un plan de situation du terrain
    - Un plan de masse du projet
    - Des plans de façades et toitures
    - Des coupes et perspectives du projet
    - Des photos du terrain et de l'environnement
    - Une étude thermique RE2020

    Le délai d'instruction est généralement de 2 mois pour une maison individuelle, 3 mois en secteur protégé.

    ## 5. Suivre efficacement le chantier
    Le suivi de chantier implique :
    - Des réunions hebdomadaires avec les intervenants
    - Le respect du planning et la coordination des entreprises
    - La validation des différentes étapes (fondations, hors d'eau, etc.)
    - La gestion des éventuelles modifications
    - Le contrôle qualité permanent des travaux

    ### Les étapes clés de la construction
    1. Préparation du terrain et implantation
    2. Fondations et dalle
    3. Élévation des murs et murs porteurs
    4. Charpente et couverture (mise hors d'eau)
    5. Menuiseries extérieures (mise hors d'air)
    6. Réseaux (électricité, plomberie, chauffage)
    7. Isolation et cloisons
    8. Revêtements sols et murs
    9. Finitions (peinture, menuiseries intérieures)
    10. Aménagements extérieurs

    ## 6. Réceptionner les travaux
    La réception des travaux est une étape juridique importante qui marque :
    - Le transfert de la garde de l'ouvrage
    - Le point de départ des garanties (parfait achèvement, biennale, décennale)
    - Le démarrage du paiement des dernières factures

    ### Le procès-verbal de réception
    Lors de la réception, établissez un procès-verbal qui mentionne :
    - L'acceptation des travaux avec ou sans réserves
    - Les défauts apparents constatés
    - Les délais accordés pour lever les réserves
    - La date d'achèvement effective des travaux

    ### Les garanties post-construction
    Après la réception, vous bénéficiez de plusieurs garanties :
    - Garantie de parfait achèvement (1 an) : tous désordres signalés à la réception ou durant l'année suivante
    - Garantie biennale (2 ans) : bon fonctionnement des éléments d'équipement dissociables
    - Garantie décennale (10 ans) : solidité de l'ouvrage et éléments indissociables

    Pour plus d'informations ou un accompagnement personnalisé, n'hésitez pas à contacter notre équipe.
    `
  },
  {
    id: '2',
    title: 'Rénovation énergétique',
    description: 'Comment rénover votre logement pour réduire votre consommation énergétique et augmenter votre confort.',
    type: 'pdf',
    fileSize: '3.8 MB',
    lastUpdated: '2023-11-20',
    url: '/files/renovation-energetique.pdf',
    categoryId: 'renovation',
    featured: true,
    isNew: true,
    content: `
    # Guide de rénovation énergétique

    ## Pourquoi rénover énergétiquement votre logement ?
    La rénovation énergétique présente de nombreux avantages :
    - Réduction significative des factures d'énergie (jusqu'à 60% d'économies)
    - Amélioration du confort thermique été comme hiver
    - Valorisation de votre patrimoine immobilier (augmentation de la valeur jusqu'à 15%)
    - Contribution à la réduction des émissions de gaz à effet de serre
    - Possibilité de bénéficier d'aides financières importantes

    ## Les points clés d'une rénovation énergétique efficace
    
    ### 1. L'isolation thermique
    L'isolation est la priorité absolue. Concentrez-vous sur :
    - L'isolation des combles (30% des pertes de chaleur)
      * Laine minérale (R ≥ 7 m²K/W)
      * Ouate de cellulose (R ≥ 7 m²K/W)
      * Polystyrène expansé (R ≥ 7 m²K/W)
    - L'isolation des murs (25% des pertes)
      * Isolation par l'extérieur (ITE) : R ≥ 3,7 m²K/W
      * Isolation par l'intérieur (ITI) : R ≥ 3,7 m²K/W
    - Le remplacement des fenêtres (13% des pertes)
      * Double vitrage performant (Uw ≤ 1,3 W/m²K)
      * Triple vitrage dans les zones très froides (Uw ≤ 1,0 W/m²K)
    - L'isolation des planchers bas (7% des pertes)
      * Sous-face de plancher (R ≥ 3 m²K/W)
      * Chape isolante (R ≥ 2,5 m²K/W)

    ### 2. La ventilation
    Une bonne ventilation est essentielle pour :
    - Évacuer l'humidité et les polluants
    - Prévenir les problèmes de condensation et de moisissures
    - Maintenir une bonne qualité d'air intérieur
    
    Les solutions recommandées :
    - VMC simple flux hygroréglable B : renouvelle l'air en fonction du taux d'humidité
    - VMC double flux : récupère jusqu'à 90% de la chaleur de l'air extrait
    - VMC thermodynamique : combine ventilation et production d'eau chaude sanitaire

    ### 3. Le chauffage et la production d'eau chaude
    Après avoir isolé, optimisez votre système de chauffage :
    - Pompe à chaleur air/eau (COP > 4) : solution idéale pour remplacer une chaudière
    - Pompe à chaleur géothermique (COP > 5) : très performante mais investissement important
    - Chaudière à condensation gaz : solution intermédiaire si le réseau gaz est disponible
    - Poêle à bois ou granulés : chauffage d'appoint efficace et écologique
    - Chauffe-eau thermodynamique : 70% d'économies sur l'eau chaude sanitaire

    ### 4. Les énergies renouvelables
    Complétez votre rénovation par l'installation de :
    - Panneaux photovoltaïques : production d'électricité (autoconsommation ou revente)
      * Rendement moyen en PACA : 1400-1600 kWh/kWc installé
      * Durée de vie : 25-30 ans
    - Chauffe-eau solaire : couverture de 60-80% des besoins en eau chaude sanitaire
    - Récupération des eaux de pluie : économies d'eau pour jardin, WC, lave-linge

    ## La démarche pour une rénovation réussie
    1. Réaliser un audit énergétique
       * Bilan thermique complet
       * Simulation des améliorations possibles
       * Estimation des économies d'énergie
    2. Définir un plan de travaux cohérent
       * Priorisation selon l'impact énergétique
       * Organisation chronologique des interventions
       * Planification par phases si nécessaire
    3. Faire appel à des professionnels qualifiés RGE
       * Garantie de compétences reconnues
       * Accès aux aides financières
       * Assurances spécifiques
    4. S'informer sur les aides financières disponibles
       * MaPrimeRénov' (jusqu'à 20 000€)
       * CEE - Certificats d'Économie d'Énergie
       * Éco-PTZ (prêt à taux zéro jusqu'à 50 000€)
       * TVA à 5,5% pour les travaux d'économie d'énergie
       * Aides locales (régions, départements, communes)

    ## Les étapes clés d'un projet de rénovation énergétique
    1. Diagnostic initial et audit énergétique
    2. Définition du programme de travaux
    3. Recherche de financements et aides
    4. Consultation des entreprises
    5. Planification et coordination des interventions
    6. Suivi et contrôle qualité des travaux
    7. Réception et vérification des performances

    ## Coûts moyens et retour sur investissement
    - Isolation des combles : 50-100€/m² - ROI 3-5 ans
    - Isolation des murs par l'extérieur : 150-250€/m² - ROI 7-10 ans
    - Remplacement fenêtres : 400-800€/unité - ROI 8-12 ans
    - Pompe à chaleur : 12000-20000€ - ROI 7-10 ans
    - Ventilation double flux : 5000-8000€ - ROI 8-15 ans
    - Panneaux photovoltaïques : 8000-15000€ (3kWc) - ROI 10-15 ans

    Chez Progineer, nous vous accompagnons dans toutes ces étapes pour une rénovation énergétique performante et adaptée à votre budget.
    `
  },
  {
    id: '3',
    title: 'Normes de construction parasismiques',
    description: 'Comprendre les normes de construction parasismiques pour assurer la sécurité de votre bâtiment.',
    type: 'text',
    lastUpdated: '2023-09-01',
    url: '#',
    categoryId: 'reglementation',
    content: `
    # Normes de construction parasismiques en PACA

    ## Introduction
    La région PACA est particulièrement concernée par le risque sismique. Les zones sismiques en France sont classées de 1 à 5, la zone 1 étant la moins à risque et la zone 5 la plus à risque. Une grande partie de la région PACA se situe en zones 3 et 4 (risque modéré à moyen).

    ## Les principes fondamentaux de la construction parasismique
    
    ### Conception architecturale
    - **Forme et géométrie du bâtiment:** Privilégier les formes simples et symétriques
    - **Éviter les irrégularités:** Limiter les différences de hauteur entre parties adjacentes
    - **Joints parasismiques:** Séparer les structures de formes ou rigidités différentes
    - **Ductilité:** Concevoir des structures capables de se déformer sans s'effondrer

    ### Systèmes constructifs recommandés
    - **Ossature en béton armé:** Chaînages horizontaux et verticaux, dimensionnement des sections
    - **Construction en maçonnerie:** Chaînages, qualité des mortiers, positionnement des ouvertures
    - **Structures métalliques:** Contreventements, assemblages résistants aux efforts horizontaux
    - **Construction bois:** Contreventements, fixations renforcées, capacité de déformation

    ### Fondations
    - **Homogénéité:** Fondations de même type et même niveau pour tout le bâtiment
    - **Profondeur:** Adaptée à la nature du sol et à la zone sismique
    - **Liaison sol-structure:** Renforcement des connexions entre fondations et superstructure

    ## La réglementation applicable en PACA
    
    ### Zonage sismique
    - **Zone 3 (risque modéré):** Alpes-Maritimes (côte), Bouches-du-Rhône (est), Var (nord)
    - **Zone 4 (risque moyen):** Alpes-de-Haute-Provence, Hautes-Alpes, Alpes-Maritimes (arrière-pays)
    - **Zone 2 (risque faible):** Bouches-du-Rhône (ouest), Var (sud), Vaucluse

    ### Réglementation selon le type de bâtiment
    La réglementation parasismique classe les bâtiments en 4 catégories selon leur importance:
    - **Catégorie I:** Bâtiments à risque normal avec présence humaine limitée (hangars, entrepôts)
    - **Catégorie II:** Habitations individuelles, immeubles d'habitation collective, bureaux
    - **Catégorie III:** ERP, établissements scolaires, commerces > 300 personnes
    - **Catégorie IV:** Bâtiments indispensables à la sécurité civile et la défense

    Les exigences techniques augmentent avec la catégorie d'importance et la zone sismique.

    ### L'Eurocode 8
    La conception des bâtiments parasismiques doit respecter les règles de l'Eurocode 8 (EN 1998), qui définit:
    - Les méthodes de calcul des actions sismiques
    - Les critères de conception et de dimensionnement
    - Les dispositions constructives spécifiques
    - Les méthodes de vérification de la conformité

    ## Mise en œuvre pratique pour une maison individuelle en PACA
    
    ### Fondations
    - Semelles filantes armées reliées entre elles
    - Profondeur minimale: 80 cm en zone 3, 100 cm en zone 4
    - Béton de qualité minimale C25/30

    ### Structure
    - Chaînages horizontaux à chaque niveau et en couronnement
    - Chaînages verticaux aux angles, intersections de murs et encadrement des ouvertures
    - Dimensions minimales des chaînages: 15x15 cm avec 4 armatures de 10 mm

    ### Maçonnerie
    - Blocs à utiliser: blocs de béton pleins ou perforés (B40, B60, B80)
    - Mortier: dosage minimum 350 kg/m³
    - Épaisseur minimale des murs porteurs: 20 cm

    ### Ouvertures
    - Distance minimale entre ouvertures: 65 cm
    - Linteaux: débord minimum de 20 cm de part et d'autre
    - Trumeaux (parties pleines) entre ouvertures: largeur minimale de 1,5 m

    ### Toiture
    - Charpente fixée au chaînage horizontal supérieur
    - Fixations renforcées: équerres métalliques, boulons d'ancrage
    - Contreventement de la charpente dans les deux directions

    ## Contrôles et certifications
    
    ### Études préalables obligatoires
    - Étude de sol géotechnique (G2)
    - Étude béton armé avec notes de calcul parasismique
    - Plans d'exécution détaillés des éléments structuraux

    ### Contrôles pendant la construction
    - Vérification de la qualité des matériaux (béton, acier)
    - Contrôle de la mise en œuvre des armatures
    - Inspection des chaînages avant coulage du béton

    ### Contrôle technique obligatoire
    Pour certaines catégories de bâtiments, le contrôle technique par un organisme agréé est obligatoire:
    - Habitations collectives > R+2 en zone 3
    - Toutes constructions en catégories III et IV
    - ERP > 300 personnes

    ## Surcoûts liés aux dispositions parasismiques
    
    Les surcoûts générés par les dispositions parasismiques varient selon la zone et le type de construction:
    - Zone 3: surcoût de 3% à 7% du coût total de la construction
    - Zone 4: surcoût de 5% à 10% du coût total de la construction

    Ce surcoût constitue une assurance contre des dégâts qui pourraient s'avérer bien plus coûteux, voire dramatiques en cas de séisme.

    ## Conclusion
    
    Le respect des normes parasismiques est essentiel en région PACA, particulièrement dans les Alpes-Maritimes et les départements alpins. Progineer veille à l'application rigoureuse de ces normes dans tous ses projets de construction, garantissant ainsi la sécurité des occupants et la pérennité des bâtiments.

    Pour plus d'informations détaillées, n'hésitez pas à consulter notre équipe technique ou à vous référer aux guides officiels publiés par le Ministère de la Transition Écologique.
    `,
    isNew: false
  },
  {
    id: '5',
    title: 'Calculateur de surface habitable',
    description: 'Estimez rapidement la surface habitable de votre logement avec notre calculateur en ligne.',
    type: 'text',
    lastUpdated: '2023-07-01',
    url: '#',
    categoryId: 'calculateurs',
    content: `
    # Calculateur de surface habitable

    ## Définitions des surfaces en immobilier
    
    ### Surface habitable (Loi Boutin)
    La surface habitable est définie par l'article R111-2 du Code de la Construction et de l'Habitation. C'est la surface de plancher construite, après déduction des surfaces occupées par:
    - Murs, cloisons, marches et cages d'escalier
    - Gaines techniques, embrasures de portes et fenêtres
    - Espaces dont la hauteur sous plafond est inférieure à 1,80 m
    
    Ne sont pas comptabilisés dans la surface habitable:
    - Les caves, sous-sols, garages, remises
    - Les combles non aménagés, greniers
    - Les terrasses, loggias, balcons
    - Les vérandas non chauffées
    - Les locaux communs dans les copropriétés

    ### Surface Loi Carrez
    Utilisée pour les copropriétés, la surface Loi Carrez exclut:
    - Les surfaces dont la hauteur sous plafond est inférieure à 1,80 m
    - Les lots dont la surface est inférieure à 8 m²
    - Les murs, cloisons et gaines techniques
    
    ### Surface utile
    Utilisée pour les locaux professionnels, elle correspond à la surface habitable augmentée de:
    - 50% de la surface des annexes privatives (caves, parkings, etc.)
    
    ### Surface de plancher
    Utilisée dans l'urbanisme pour calculer les droits à construire, elle correspond à la somme des surfaces de tous les niveaux, après déduction:
    - Des surfaces dont la hauteur sous plafond est inférieure à 1,80 m
    - Des vides et trémies (escaliers, ascenseurs)
    - Des surfaces de stationnement
    - Des combles non aménageables

    ## Comment calculer votre surface habitable
    
    ### Méthode de calcul
    1. Mesurez chaque pièce en prenant les dimensions intérieures (de mur à mur)
    2. Pour les pièces rectangulaires: longueur × largeur
    3. Pour les pièces complexes: décomposez en rectangles simples
    4. Déduisez les surfaces non comptabilisables (placards encastrés > 0,5 m², gaines, etc.)
    5. Ne comptez que partiellement les surfaces sous rampant (hauteur < 1,80 m)
    6. Additionnez toutes les surfaces calculées

    ### Tableau pour noter vos calculs

    | Pièce | Longueur (m) | Largeur (m) | Surface brute (m²) | Déductions (m²) | Surface nette (m²) |
    |-------|--------------|-------------|-------------------|-----------------|-------------------|
    | Entrée |              |             |                   |                 |                   |
    | Cuisine |             |             |                   |                 |                   |
    | Salon |               |             |                   |                 |                   |
    | Chambre 1 |           |             |                   |                 |                   |
    | Chambre 2 |           |             |                   |                 |                   |
    | Salle de bain |       |             |                   |                 |                   |
    | WC |                  |             |                   |                 |                   |
    | Dégagement |          |             |                   |                 |                   |
    | TOTAL |               |             |                   |                 |                   |

    ## Précautions et conseils
    
    ### Matériel recommandé
    - Mètre ruban de 5m minimum
    - Télémètre laser pour plus de précision
    - Papier quadrillé pour dessiner le plan
    - Calculatrice

    ### Erreurs fréquentes à éviter
    - Inclure les placards encastrés de grande taille
    - Compter les surfaces sous escalier de moins de 1,80m
    - Négliger les débords de murs et piliers
    - Mesurer de l'extérieur des murs au lieu de l'intérieur
    - Inclure les balcons, terrasses et loggias

    ### Cas particuliers
    
    #### Mezzanines
    - Surface comptabilisée si hauteur sous plafond ≥ 1,80m
    - Accès par un escalier fixe (pas d'échelle amovible)
    - Garde-corps aux normes

    #### Combles aménagés
    - Comptabiliser uniquement les surfaces où la hauteur sous plafond ≥ 1,80m
    - Pour une meilleure estimation, diviser l'espace sous rampant en sections

    #### Verrières et bow-windows
    - Inclus dans la surface habitable si intégrés à la pièce et chauffés
    - Exclus s'ils forment une véranda non chauffée

    ## Importance de la surface habitable
    
    ### Impacts juridiques et financiers
    - Base de calcul pour les transactions immobilières
    - Référence pour les diagnostics énergétiques
    - Calcul des charges de copropriété
    - Élément déterminant pour la fiscalité (taxe foncière, taxe d'habitation)
    - Critère d'attribution pour certaines aides au logement

    ### Valorisation de votre bien
    La connaissance précise de votre surface habitable vous permet de:
    - Fixer un prix de vente ou de location conforme au marché
    - Justifier la valeur de votre bien auprès des acheteurs potentiels
    - Contester une évaluation incorrecte (impôts, diagnostics)
    - Planifier efficacement vos travaux d'aménagement ou d'extension

    ## Services professionnels de Progineer
    
    Notre équipe de géomètres et d'architectes peut réaliser un relevé précis de votre surface habitable, comprenant:
    - Mesures in situ avec matériel professionnel
    - Plans détaillés à l'échelle
    - Calcul certifié des différentes surfaces légales
    - Attestation officielle pour vos démarches administratives ou transactions immobilières

    Pour un devis personnalisé, contactez notre service technique.
    `,
    isNew: false
  },
  {
    id: '6',
    title: 'Guide des aides financières à la rénovation',
    description: 'Découvrez toutes les aides financières disponibles pour vos travaux de rénovation.',
    type: 'pdf',
    fileSize: '2.5 MB',
    lastUpdated: '2023-06-15',
    url: '/files/aides-financieres-renovation.pdf',
    categoryId: 'renovation',
    content: `
    # Guide complet des aides financières à la rénovation 2023-2024

    ## Panorama des dispositifs d'aide à la rénovation énergétique
    
    ### MaPrimeRénov'
    
    **Principe**: Aide principale de l'État pour la rénovation énergétique, versée par l'ANAH.
    
    **Bénéficiaires**:
    - Propriétaires occupants (tous revenus)
    - Propriétaires bailleurs
    - Copropriétés
    
    **Montants**: Calculés selon:
    - Revenus du foyer (4 catégories: Bleu, Jaune, Violet, Rose)
    - Nature des travaux
    - Zone géographique
    
    **Plafonds**:
    - 20 000€ maximum pour des travaux simples
    - 35 000€ pour une rénovation globale
    
    **Travaux éligibles**:
    - Isolation (toiture, murs, planchers)
    - Chauffage et ventilation
    - Audit énergétique
    - Rénovation globale
    
    **Conditions**:
    - Logement de plus de 15 ans
    - Travaux réalisés par des entreprises RGE
    - Occupation du logement pendant 3 ans (ou location)
    
    **Bonification**: +1000€ pour sortir le logement de l'état de passoire énergétique (passage d'une étiquette F ou G à E minimum)
    
    ### Certificats d'Économie d'Énergie (CEE)
    
    **Principe**: Dispositif imposant aux fournisseurs d'énergie de financer des économies d'énergie.
    
    **Bénéficiaires**: Tous les particuliers, sans condition de ressources.
    
    **Fonctionnement**:
    - Primes versées directement
    - Remises sur devis
    - Prêts bonifiés
    
    **Travaux éligibles**:
    - Isolation thermique
    - Chauffage performant
    - Régulation et programmation
    - Ventilation
    
    **Montants**: Variables selon les fournisseurs, les revenus et les travaux.
    
    **Cumulable** avec MaPrimeRénov' et la plupart des autres aides.
    
    ### Éco-Prêt à Taux Zéro (Éco-PTZ)
    
    **Principe**: Prêt sans intérêt pour financer des travaux de rénovation énergétique.
    
    **Bénéficiaires**: Propriétaires occupants ou bailleurs.
    
    **Montants**:
    - 15 000€ à 50 000€ selon les travaux
    - Jusqu'à 50 000€ pour une rénovation globale
    
    **Durée**: 3 à 15 ans
    
    **Travaux éligibles**:
    - Un ou plusieurs types de travaux d'économie d'énergie
    - Rénovation globale améliorant la performance énergétique
    - Réhabilitation d'un système d'assainissement non collectif
    
    **Condition**: Travaux réalisés par des professionnels RGE.
    
    ### TVA à taux réduit
    
    **Taux**: 5,5% (au lieu de 20%)
    
    **Travaux concernés**:
    - Travaux d'amélioration de la performance énergétique
    - Travaux induits et indissociablement liés
    
    **Bénéficiaires**: Tous les propriétaires, sans condition de ressources.
    
    **Condition**: Logement achevé depuis plus de 2 ans.
    
    ### Aides locales
    
    #### Aides régionales
    
    **Région Sud PACA**:
    - Chèque énergie durable (isolation, chauffage)
    - Aide à l'installation de panneaux solaires
    - Programme "Rénover+" (accompagnement technique)
    
    #### Aides départementales
    
    Variables selon les départements:
    - Alpes-Maritimes: subventions pour les pompes à chaleur
    - Bouches-du-Rhône: primes rénovation pour les ménages modestes
    - Var: aides à l'installation de chauffe-eau solaires
    
    #### Aides des métropoles et communes
    
    - Métropole Aix-Marseille: prime air-bois (remplacement chauffage au bois)
    - Métropole Nice Côte d'Azur: aide à la rénovation des façades
    - Toulon: subventions pour l'isolation thermique
    
    ## Dispositifs spécifiques
    
    ### MaPrimeRénov' Sérénité
    
    **Principe**: Aide renforcée pour les rénovations globales des ménages modestes.
    
    **Bénéficiaires**: Ménages aux ressources très modestes et modestes.
    
    **Montants**:
    - 50% du montant HT des travaux pour les ménages très modestes (max 30 000€)
    - 35% du montant HT des travaux pour les ménages modestes (max 20 000€)
    
    **Conditions**:
    - Gain énergétique d'au moins 35%
    - Accompagnement obligatoire par un opérateur-conseil
    
    ### Dispositif "Denormandie"
    
    **Principe**: Réduction d'impôt pour l'achat-rénovation dans l'ancien.
    
    **Bénéficiaires**: Investisseurs locatifs.
    
    **Montant**: Réduction d'impôt de 12 à 21% du coût total de l'opération.
    
    **Conditions**:
    - Travaux représentant 25% minimum du coût total
    - Location pendant 6, 9 ou 12 ans
    - Bien situé dans une commune du programme "Action Cœur de Ville"
    
    ### Prime énergie pour le chauffage
    
    **Principe**: Aide au remplacement d'une chaudière fossile par un équipement plus écologique.
    
    **Montant**: 1000 à 5000€ selon les revenus et l'équipement.
    
    **Bénéficiaires**: Tous les foyers, avec bonification pour les revenus modestes.
    
    **Équipements éligibles**:
    - Pompe à chaleur (air/eau, géothermique)
    - Chaudière biomasse
    - Système solaire combiné
    
    ## Cumul des aides et optimisation
    
    ### Aides cumulables
    
    La plupart des aides sont cumulables, avec quelques exceptions:
    - MaPrimeRénov' et MaPrimeRénov' Sérénité ne se cumulent pas
    - Certaines aides locales ne se cumulent pas entre elles
    
    ### Stratégie d'optimisation
    
    1. **Commencer par un audit énergétique** (finançable à 80% par MaPrimeRénov')
    2. **Prioriser les travaux** selon leur retour sur investissement
    3. **Envisager une rénovation globale** plutôt que des travaux par étapes pour maximiser les aides
    4. **Vérifier les aides locales** spécifiques à votre commune et département
    5. **Comparer les offres CEE** de différents fournisseurs d'énergie
    
    ### Estimation des aides possibles
    
    Pour un projet de rénovation globale à 40 000€, un ménage aux revenus intermédiaires peut obtenir:
    - MaPrimeRénov': environ 7 000€
    - CEE: environ 4 000€
    - Éco-PTZ: financement sans intérêt du reste à charge
    - TVA à 5,5%: économie d'environ 5 800€
    - Aides locales: 1 000 à 3 000€ selon la localisation
    
    **Total des aides**: 17 800 à 19 800€ (44% à 49% du coût total)
    
    ## Procédures et démarches
    
    ### Chronologie des demandes
    
    1. **Avant de signer les devis**:
       - Demander MaPrimeRénov'
       - Négocier la prime CEE
       - Faire la demande d'Éco-PTZ
       
    2. **Après acceptation des dossiers**:
       - Signer les devis
       - Faire réaliser les travaux
       
    3. **Après travaux**:
       - Transmettre les factures pour débloquer les aides
       - Faire établir l'attestation de fin de travaux
    
    ### Documents nécessaires
    
    - Devis détaillés des travaux
    - Attestations RGE des artisans
    - Avis d'imposition N-1 et N-2
    - Justificatif de propriété
    - RIB
    - Photos avant/après travaux
    - DPE avant/après travaux (pour rénovation globale)
    
    ## Services d'accompagnement
    
    ### France Rénov'
    
    Service public gratuit pour l'information et l'orientation sur la rénovation énergétique:
    - Conseils personnalisés
    - Information sur les aides
    - Orientation vers les artisans RGE
    
    Contacts: 0 808 800 700 ou france-renov.gouv.fr
    
    ### Accompagnateurs Rénov'
    
    Professionnels agréés pour un accompagnement complet:
    - Audit énergétique
    - Plan de financement
    - Sélection des artisans
    - Suivi des travaux
    - Montage des dossiers d'aides
    
    Cet accompagnement sera progressivement rendu obligatoire pour bénéficier des aides.
    
    ### Progineer : votre partenaire privilégié
    
    Notre équipe vous propose un accompagnement sur mesure:
    - Étude technique approfondie
    - Optimisation des aides financières
    - Sélection d'artisans qualifiés RGE
    - Suivi rigoureux du chantier
    - Assistance administrative complète
    
    Contactez-nous pour un premier rendez-vous gratuit et sans engagement.
    `,
    isNew: false
  },
  {
    id: '7',
    title: 'Les étapes clés d\'un projet de construction',
    description: 'Ce guide vous détaille les étapes essentielles pour mener à bien votre projet de construction.',
    type: 'text',
    lastUpdated: '2023-05-20',
    url: '#',
    categoryId: 'construction',
    content: `
    # Les étapes clés d'un projet de construction

    ## Préparation et conception (3-6 mois)
    
    ### 1. Définition des besoins et du budget
    
    **Activités principales**:
    - Élaboration du programme fonctionnel
    - Établissement des priorités (espaces, confort, performance énergétique)
    - Définition de l'enveloppe budgétaire globale
    - Identification des contraintes (délais, réglementations)
    
    **Documents/Livrables**:
    - Cahier des charges du projet
    - Estimation budgétaire préliminaire
    - Planning prévisionnel global
    
    **Intervenants**:
    - Maître d'ouvrage (vous)
    - Architecte et/ou maître d'œuvre
    - Éventuellement, conseiller financier
    
    **Durée typique**: 2-4 semaines
    
    ### 2. Recherche et acquisition du terrain
    
    **Activités principales**:
    - Recherche de terrains disponibles
    - Analyse de la localisation et de l'environnement
    - Vérification des règles d'urbanisme (PLU, servitudes)
    - Étude géotechnique préliminaire
    - Vérification des raccordements aux réseaux
    
    **Documents/Livrables**:
    - Certificat d'urbanisme opérationnel
    - Compromis puis acte de vente
    - Bornage et étude de sol G1
    
    **Intervenants**:
    - Agent immobilier ou notaire
    - Géomètre-expert
    - Géotechnicien
    
    **Durée typique**: 2-3 mois
    
    ### 3. Conception architecturale
    
    **Activités principales**:
    - Esquisses et avant-projet sommaire (APS)
    - Avant-projet définitif (APD)
    - Intégration des contraintes techniques
    - Choix des matériaux et solutions constructives
    
    **Documents/Livrables**:
    - Plans d'avant-projet
    - Images 3D ou maquette
    - Estimation affinée du coût des travaux
    
    **Intervenants**:
    - Architecte
    - Maître d'œuvre
    - Bureau d'études techniques
    
    **Durée typique**: 1-2 mois
    
    ### 4. Démarches administratives
    
    **Activités principales**:
    - Dépôt de la demande de permis de construire
    - Déclarations diverses (archéologie préventive, etc.)
    - Souscription des assurances obligatoires
    
    **Documents/Livrables**:
    - Dossier de permis de construire
    - Attestation d'assurance dommage-ouvrage
    - Étude thermique réglementaire RE2020
    
    **Intervenants**:
    - Architecte ou maître d'œuvre
    - Services d'urbanisme
    - Assureur
    
    **Durée typique**: 2-4 mois (délai d'instruction inclus)
    
    ## Préparation du chantier (1-2 mois)
    
    ### 5. Consultation des entreprises
    
    **Activités principales**:
    - Élaboration du dossier de consultation (DCE)
    - Consultation des entreprises
    - Analyse des offres
    - Négociations et mise au point des marchés
    
    **Documents/Livrables**:
    - Cahier des clauses techniques particulières (CCTP)
    - Plans d'exécution
    - Devis détaillés des entreprises
    - Contrats de travaux
    
    **Intervenants**:
    - Maître d'œuvre
    - Économiste de la construction
    - Entreprises consultées
    
    **Durée typique**: 3-6 semaines
    
    ### 6. Préparation du démarrage
    
    **Activités principales**:
    - Finalisation du planning d'exécution
    - Organisation de la réunion de démarrage
    - Déclaration d'ouverture de chantier (DOC)
    - Installation du panneau de chantier
    
    **Documents/Livrables**:
    - Planning détaillé d'exécution
    - Compte-rendu de réunion de démarrage
    - DOC validée par la mairie
    
    **Intervenants**:
    - Maître d'œuvre
    - Coordinateur SPS (si nécessaire)
    - Entreprises titulaires
    
    **Durée typique**: 2 semaines
    
    ## Réalisation des travaux (8-12 mois)
    
    ### 7. Terrassement et fondations
    
    **Activités principales**:
    - Préparation du terrain
    - Implantation du bâtiment
    - Terrassement
    - Réalisation des fondations
    - Mise en place des réseaux sous dallage
    
    **Documents/Livrables**:
    - Compte-rendus de chantier
    - PV d'implantation du géomètre
    - Étude de sol G2
    
    **Intervenants**:
    - Terrassier
    - Maçon
    - Géomètre
    
    **Durée typique**: 1-2 mois
    
    ### 8. Gros œuvre
    
    **Activités principales**:
    - Réalisation des murs de soubassement
    - Coulage de la dalle
    - Élévation des murs et refends
    - Réalisation des planchers intermédiaires
    
    **Documents/Livrables**:
    - Plans de ferraillage
    - Bons de livraison béton
    - Compte-rendus de chantier
    
    **Intervenants**:
    - Entreprise de maçonnerie
    - Bureau de contrôle technique
    
    **Durée typique**: 2-3 mois
    
    ### 9. Charpente et couverture
    
    **Activités principales**:
    - Pose de la charpente
    - Réalisation de la couverture
    - Installation des gouttières et descentes
    - Pose des menuiseries extérieures
    
    **Documents/Livrables**:
    - Plans d'exécution de charpente
    - Compte-rendus de chantier
    - PV de mise hors d'eau
    
    **Intervenants**:
    - Charpentier
    - Couvreur
    - Menuisier
    
    **Durée typique**: 1-2 mois
    
    ### 10. Second œuvre
    
    **Activités principales**:
    - Pose des réseaux (électricité, plomberie, chauffage)
    - Isolation
    - Cloisonnement intérieur
    - Plâtrerie et faux-plafonds
    - Pose des menuiseries intérieures
    - Carrelage et revêtements de sol
    - Peinture et finitions
    
    **Documents/Livrables**:
    - Plans techniques des réseaux
    - Compte-rendus de chantier
    - Fiches techniques des matériaux
    
    **Intervenants**:
    - Électricien, plombier, chauffagiste
    - Plaquiste
    - Menuisier
    - Carreleur
    - Peintre
    
    **Durée typique**: 3-5 mois
    
    ### 11. Aménagements extérieurs
    
    **Activités principales**:
    - Raccordements définitifs aux réseaux
    - Aménagement des accès
    - Terrassements paysagers
    - Plantations et engazonnement
    
    **Documents/Livrables**:
    - Plans d'aménagement extérieur
    - Certificats de conformité des raccordements
    
    **Intervenants**:
    - Paysagiste
    - VRD (Voirie et Réseaux Divers)
    - Concessionnaires (eau, électricité, etc.)
    
    **Durée typique**: 1-2 mois
    
    ## Livraison et post-livraison (1-2 mois)
    
    ### 12. Réception des travaux
    
    **Activités principales**:
    - Visite préalable à la réception
    - Correction des défauts constatés
    - Réception officielle
    - Remise des clés et des documents
    
    **Documents/Livrables**:
    - Procès-verbal de réception
    - Liste des réserves
    - Dossier des Ouvrages Exécutés (DOE)
    - Déclaration attestant l'achèvement et la conformité des travaux (DAACT)
    
    **Intervenants**:
    - Maître d'ouvrage
    - Maître d'œuvre
    - Entreprises concernées
    
    **Durée typique**: 2-4 semaines
    
    ### 13. Période de parfait achèvement
    
    **Activités principales**:
    - Levée des réserves
    - Interventions sur désordres éventuels
    - Obtention du certificat de conformité
    
    **Documents/Livrables**:
    - PV de levée des réserves
    - Certificat de conformité urbanisme
    
    **Intervenants**:
    - Maître d'œuvre
    - Entreprises concernées
    - Services d'urbanisme
    
    **Durée typique**: 1 an après réception
    
    ## Conseils pour la réussite de votre projet
    
    ### Anticipation et planification
    
    - **Anticipez les délais administratifs**, souvent plus longs que prévu
    - **Prévoyez une marge budgétaire** d'au moins 10% pour les imprévus
    - **Établissez un rétroplanning** depuis la date d'emménagement souhaitée
    
    ### Choix des intervenants
    
    - **Validez les qualifications** des professionnels (assurances, références)
    - **Privilégiez la proximité** pour faciliter les interventions
    - **Vérifiez la solidité financière** des entreprises principales
    
    ### Suivi de chantier
    
    - **Assistez aux réunions de chantier** hebdomadaires
    - **Documentez l'avancement** (photos, comptes-rendus)
    - **Validez formellement** chaque étape importante
    - **Communiquez par écrit** pour toute modification significative
    
    ### Financement et paiements
    
    - **Échelonnez les paiements** selon l'avancement réel
    - **Conservez un solde significatif** (5% minimum) jusqu'à la levée des réserves
    - **Vérifiez la concordance** entre factures et travaux effectivement réalisés
    
    ## Foire Aux Questions
    
    **Q: Quelle est la différence entre un architecte et un maître d'œuvre?**
    
    R: L'architecte est un professionnel diplômé d'État, obligatoire pour les projets dépassant 150m². Le maître d'œuvre peut intervenir sur des projets de toute taille et se concentre davantage sur la coordination technique et le suivi de chantier.
    
    **Q: Puis-je modifier mon projet après obtention du permis de construire?**
    
    R: Oui, mais selon l'importance des modifications, vous devrez déposer:
    - Un permis modificatif (pour des changements mineurs)
    - Un nouveau permis (pour des changements substantiels)
    
    **Q: Comment éviter les dépassements de budget?**
    
    R: Pour maîtriser votre budget:
    - Établissez un cahier des charges précis
    - Obtenez des devis détaillés
    - Prévoyez une provision pour imprévus (10-15%)
    - Faites suivre le chantier par un professionnel
    - Limitez les modifications en cours de chantier
    
    Chez Progineer, nous vous accompagnons à chaque étape pour sécuriser votre projet et optimiser votre investissement. N'hésitez pas à nous contacter pour un accompagnement personnalisé.
    `,
    isNew: false
  },
  {
    id: '8',
    title: 'Calculateur de prêt immobilier',
    description: 'Estimez vos mensualités et votre capacité d\'emprunt avec notre calculateur de prêt immobilier.',
    type: 'text',
    lastUpdated: '2024-04-01',
    url: '#',
    categoryId: 'calculateurs',
    content: `
    # Calculateur de prêt immobilier

    ## Introduction
    Le financement est une étape cruciale de votre projet immobilier. Ce guide vous aide à comprendre les mécanismes du prêt immobilier et à estimer précisément votre capacité d'emprunt et vos mensualités.

    ## Concepts fondamentaux du prêt immobilier
    
    ### Types de prêts immobiliers
    
    #### Prêt amortissable classique
    - **Principe**: Remboursement progressif du capital et des intérêts
    - **Durée**: Généralement de 5 à 30 ans
    - **Avantages**: Mensualités constantes, visibilité sur le coût total
    
    #### Prêt à taux fixe
    - **Principe**: Taux d'intérêt identique pendant toute la durée du prêt
    - **Avantages**: Sécurité, prévisibilité des remboursements
    - **Inconvénients**: Taux généralement plus élevé qu'un taux variable
    
    #### Prêt à taux variable
    - **Principe**: Taux indexé sur un indice de référence (Euribor)
    - **Avantages**: Taux initial souvent plus bas, possibilité de baisse
    - **Inconvénients**: Incertitude, risque de hausse des mensualités
    
    #### Prêt à taux mixte
    - **Principe**: Période à taux fixe puis période à taux variable
    - **Avantages**: Bonne visibilité initiale, possibilité de profiter d'une baisse
    
    #### Prêts réglementés
    - **Prêt à Taux Zéro (PTZ)**: Réservé aux primo-accédants, sous conditions de ressources
    - **Prêt Action Logement (ex-1% patronal)**: Pour les salariés d'entreprises cotisantes
    - **Prêt conventionné**: Permet d'obtenir les APL sous conditions
    
    ### Éléments constitutifs d'un prêt
    
    #### Le capital emprunté
    - Montant prêté par la banque
    - Déterminé en fonction de votre apport personnel et de votre capacité de remboursement
    
    #### Le taux d'intérêt
    - Exprimé en pourcentage annuel
    - Varie selon les établissements, la durée, le profil emprunteur
    - Taux moyen actuel (avril 2024): entre 3,60% et 4,20% sur 20 ans
    
    #### La durée du prêt
    - Impact majeur sur le montant des mensualités
    - Influence le coût total du crédit (plus la durée est longue, plus le coût est élevé)
    - Durées typiques: 15, 20 ou 25 ans
    
    #### L'assurance emprunteur
    - Obligatoire pour obtenir un prêt immobilier
    - Couvre les risques de décès, invalidité, incapacité de travail
    - Coût: 0,1% à 0,6% du capital emprunté par an selon l'âge et le profil
    
    #### Les frais annexes
    - Frais de dossier: 0,5% à 1% du montant emprunté
    - Frais de garantie: 1% à 3% selon le type (hypothèque, caution)
    - Frais de notaire: 7% à 8% pour un bien ancien, 2% à 3% pour un bien neuf
    
    ## Calculer sa capacité d'emprunt
    
    ### Règles bancaires à connaître
    
    #### Taux d'endettement
    - **Règle générale**: Maximum 35% des revenus nets
    - **Formule**: (Mensualité ÷ Revenus nets mensuels) × 100
    - **Exemple**: Pour 3000€ de revenus nets, la mensualité maximum sera de 1050€
    
    #### Reste à vivre
    - Montant minimum qui doit rester disponible après remboursement
    - Évalué en fonction de la composition du foyer
    - Généralement au moins 950€ pour une personne seule, +450€ par personne supplémentaire
    
    ### Calcul de la capacité d'emprunt
    
    #### Formule simplifiée
    - **Capacité d'emprunt** ≈ (Revenus nets × 35% × Durée en mois) ÷ 1,2
    - Le facteur 1,2 tient compte approximativement des intérêts
    - **Exemple**: Pour 3000€ de revenus nets sur 20 ans
      * Capacité ≈ (3000 × 0,35 × 240) ÷ 1,2 ≈ 210 000€
    
    #### Formule précise
    - Pour un calcul exact, utilisez la formule actuarielle:
      * Capital = Mensualité × [(1 - (1 + Taux mensuel)^(-Durée en mois)) ÷ Taux mensuel]
      * Taux mensuel = Taux annuel ÷ 12
    
    ## Calculer ses mensualités
    
    ### Formule de calcul
    
    #### Formule simplifiée
    - **Mensualité** ≈ (Capital emprunté × (Taux annuel + Taux assurance)) ÷ (Durée en années × 12)
    - **Exemple**: Pour 200 000€ sur 20 ans à 4%
      * Mensualité ≈ (200 000 × 0,05) ÷ 240 ≈ 1216€
    
    #### Formule précise
    - **Mensualité** = Capital × [Taux mensuel × (1 + Taux mensuel)^Durée en mois] ÷ [(1 + Taux mensuel)^Durée en mois - 1]
    - **Exemple**: Pour 200 000€ sur 20 ans (240 mois) à 4% (0,33% mensuel)
      * Mensualité = 1 212,45€ (sans assurance)
    
    ### Tableau d'amortissement
    
    Le tableau d'amortissement détaille pour chaque échéance:
    - Le capital remboursé
    - Les intérêts payés
    - L'assurance
    - Le capital restant dû
    
    **Exemple simplifié pour un prêt de 200 000€ sur 20 ans à 4%**
    
    | Année | Capital remboursé | Intérêts payés | Capital restant dû |
    |-------|------------------|----------------|-------------------|
    | 1     | 7 340€           | 7 810€         | 192 660€          |
    | 2     | 7 635€           | 7 515€         | 185 025€          |
    | 5     | 8 574€           | 6 576€         | 160 053€          |
    | 10    | 10 448€          | 4 702€         | 109 867€          |
    | 15    | 12 732€          | 2 418€         | 49 394€           |
    | 20    | 14 298€          | 343€           | 0€                |
    
    ## Optimiser son profil emprunteur
    
    ### Les critères évalués par les banques
    
    #### Stabilité professionnelle
    - CDI confirmé (période d'essai terminée)
    - Ancienneté dans l'emploi
    - Secteur d'activité
    
    #### Revenus
    - Montant des revenus nets mensuels
    - Stabilité et progression des revenus
    - Sources complémentaires (revenus locatifs, primes régulières)
    
    #### Gestion bancaire
    - Tenue du compte (absence de découverts non autorisés)
    - Capacité d'épargne
    - Relation avec la banque (ancienneté, produits détenus)
    
    #### Situation patrimoniale
    - Épargne disponible (apport personnel)
    - Biens immobiliers déjà détenus
    - Autres actifs (placements financiers, etc.)
    
    #### Charges existantes
    - Crédits en cours
    - Pensions à verser
    - Loyer actuel
    
    ### Recommandations pour optimiser votre profil
    
    #### Avant de déposer votre demande
    - Constituez un apport personnel d'au moins 10% (idéalement 20%)
    - Remboursez ou regroupez vos petits crédits en cours
    - Maintenez une gestion de compte irréprochable pendant 6 mois
    - Évitez les changements professionnels
    - Préparez des justificatifs de revenus réguliers et stables
    
    #### Lors de la négociation
    - Comparez plusieurs offres (3 banques minimum)
    - Négociez le taux d'intérêt, mais aussi l'assurance et les frais
    - Envisagez le recours à un courtier pour les profils complexes
    - Valorisez votre projet professionnel à moyen terme
    
    ## Services Progineer pour le financement
    
    Notre équipe d'experts peut vous accompagner dans:
    
    - L'évaluation précise de votre capacité d'emprunt
    - La constitution de votre dossier de financement
    - La mise en relation avec nos partenaires bancaires
    - La négociation des meilleures conditions pour votre profil
    - L'optimisation du plan de financement (combinaison de prêts)
    
    Pour bénéficier d'une étude personnalisée de votre projet de financement, contactez notre service financier.
    `,
    isNew: true
  },
  {
    id: '9',
    title: 'La réglementation thermique RE2020',
    description: 'Tout savoir sur la réglementation thermique RE2020 et ses exigences pour vos projets de construction.',
    type: 'text',
    lastUpdated: '2024-04-10',
    url: '#',
    categoryId: 'reglementation',
    content: `
    # Guide complet sur la réglementation environnementale RE2020

    ## Introduction à la RE2020
    
    La Réglementation Environnementale 2020 (RE2020) est entrée en vigueur le 1er janvier 2022, remplaçant la RT2012. Cette nouvelle réglementation marque un tournant majeur dans la conception des bâtiments neufs en France, avec une ambition renforcée en matière de performance énergétique et d'impact environnemental.
    
    ### Objectifs de la RE2020
    
    La RE2020 poursuit trois objectifs principaux:
    
    1. **Diminuer l'impact carbone des bâtiments** - Réduire les émissions de gaz à effet de serre liées à la construction et à l'exploitation
    2. **Poursuivre l'amélioration de la performance énergétique** - Réduire les consommations d'énergie
    3. **Garantir le confort d'été** - Adapter les bâtiments aux conditions climatiques futures
    
    ### Champ d'application
    
    La RE2020 s'applique:
    - Aux constructions neuves à usage d'habitation (maisons individuelles, logements collectifs)
    - Aux bureaux et bâtiments d'enseignement primaire et secondaire
    - Extensions significatives de bâtiments existants
    
    Son application est progressive selon les types de bâtiments:
    - 1er janvier 2022: logements individuels et collectifs
    - 1er juillet 2022: bureaux et bâtiments d'enseignement
    - 2023: autres bâtiments tertiaires, dont hôtels, commerces, etc.
    
    ## Les trois piliers de la RE2020
    
    ### 1. Performance énergétique
    
    #### Indicateurs énergétiques
    
    - **Bbio** (Besoin bioclimatique): exprime les besoins du bâtiment en chauffage, refroidissement et éclairage
      * Valeur de référence: Bbio max à ne pas dépasser, -30% par rapport à la RT2012
    
    - **Cep** (Consommation d'énergie primaire): somme de toutes les consommations d'énergie
      * Valeur maximale: 75 kWh/m²/an pour les maisons individuelles (contre 50 pour la RT2012, mais avec un calcul différent)
    
    - **Cep,nr** (Consommation d'énergie primaire non renouvelable)
      * Encouragement à utiliser des énergies renouvelables
    
    #### Exigences spécifiques
    
    - Fin progressive du chauffage au gaz (seuil d'émission de GES très bas)
    - Encouragement des PAC, réseaux de chaleur, biomasse, solaire thermique
    - Calcul basé sur une analyse plus fine du climat local
    
    ### 2. Impact carbone
    
    #### Le carbone dans le cycle de vie
    
    - **IC construction** (Impact Carbone de la construction):
      * Analyse du cycle de vie (ACV) des matériaux et équipements sur 50 ans
      * Seuils progressivement abaissés: 640 kgCO₂eq/m² en 2022, 530 kgCO₂eq/m² en 2025, 415 kgCO₂eq/m² en 2028
    
    - **IC énergie** (Impact Carbone lié aux consommations d'énergie):
      * Évaluation des émissions liées aux consommations énergétiques
      * Favorise les énergies peu carbonées (électricité, bois, réseaux de chaleur vertueux)
    
    #### Données environnementales
    
    Utilisation de la base INIES (données environnementales standardisées):
    - FDES: Fiches de Déclaration Environnementale et Sanitaire pour les produits de construction
    - PEP: Profils Environnementaux Produits pour les équipements
    
    ### 3. Confort d'été
    
    #### Indicateur de confort
    
    - **DH** (Degré Heure): mesure l'inconfort ressenti pendant les périodes chaudes
      * Seuil maximal: 1250 DH (équivaut à 25 jours à 30°C)
      * Calcul basé sur une météo caniculaire de type 2003
    
    #### Solutions valorisées
    
    - Conception bioclimatique (protections solaires, orientation)
    - Inertie thermique (matériaux lourds, déphasage thermique)
    - Ventilation naturelle (traversante, nocturne)
    - Puits climatiques, puits canadiens
    
    ## Implications pratiques pour les constructeurs et maîtres d'œuvre
    
    ### Évolution des pratiques constructives
    
    #### Conception architecturale
    
    - **Bioclimatisme renforcé**:
      * Orientation optimisée
      * Compacité du bâti
      * Dimensionnement des ouvertures selon l'orientation
      * Protections solaires adaptées (casquettes, brise-soleil)
    
    - **Ventilation et refroidissement naturels**:
      * Favoriser la ventilation traversante
      * Prévoir des ouvrants accessibles
      * Intégrer des stratégies de surventilation nocturne
    
    #### Enveloppe du bâtiment
    
    - **Isolation renforcée**:
      * Murs: R > 4,5 m².K/W
      * Toitures: R > 8 m².K/W
      * Planchers bas: R > 3,5 m².K/W
      * Menuiseries: Uw < 1,3 W/m².K
    
    - **Étanchéité à l'air**:
      * Valeur cible: Q4Pa-surf < 0,6 m³/h.m² en maison individuelle
      * Test d'infiltrométrie obligatoire
    
    - **Traitement des ponts thermiques**:
      * Continuité de l'isolant aux jonctions
      * Rupteurs thermiques aux points sensibles
    
    #### Systèmes énergétiques
    
    - **Chauffage et ECS bas carbone**:
      * Pompes à chaleur (air/eau, géothermiques)
      * Biomasse (granulés, bûches, plaquettes)
      * Solaire thermique
      * Réseaux de chaleur EnR
    
    - **Production locale d'électricité**:
      * Photovoltaïque en autoconsommation avec revente du surplus
    
    - **Ventilation performante**:
      * VMC double flux avec récupération de chaleur
      * VMC hygroréglable de type B
    
    ### Choix des matériaux
    
    #### Matériaux à privilégier
    
    - **Matériaux biosourcés**:
      * Bois (structure, charpente, menuiseries)
      * Isolants naturels (fibre de bois, ouate de cellulose, laine de chanvre)
      * Terre crue, pierre
    
    - **Solutions à faible impact carbone**:
      * Bétons bas carbone
      * Aciers recyclés
      * Solutions constructives hybrides
    
    #### Matériaux à utiliser avec parcimonie
    
    - Béton standard, PSE (polystyrène expansé), laine de verre standard
    - Aluminium à forte teneur en matière vierge
    - Matériaux à fort contenu énergétique
    
    ### Outils de calcul et justification
    
    - Logiciels agréés pour les calculs RE2020
    - Attestations à joindre aux permis de construire
    - Étude de faisabilité des approvisionnements en énergie
    
    ## Coûts et rentabilité
    
    ### Surcoûts estimés
    
    - **Maison individuelle**: +5% à +10% par rapport à la RT2012
      * Structure/enveloppe: +3% à +5%
      * Équipements: +2% à +5%
    
    - **Logement collectif**: +4% à +8%
      * Impact plus important sur les systèmes énergétiques
    
    ### Retour sur investissement
    
    - Économies d'énergie: 15% à 30% par rapport à la RT2012
    - Meilleure valorisation du bien à la revente (DPE A systématique)
    - Confort accru été comme hiver
    - Réduction de la vulnérabilité aux hausses des prix de l'énergie
    
    ## Recommandations Progineer
    
    ### Approche globale
    
    - **Conception intégrée** dès les premières esquisses:
      * Collaboration architecte/bureau d'études thermiques
      * Simulation thermique dynamique pour optimiser les choix
    
    - **Hiérarchisation des investissements**:
      * Prioriser l'enveloppe (isolation, menuiseries)
      * Optimiser les systèmes énergétiques
      * Intégrer progressivement les matériaux biosourcés
    
    ### Solutions adaptées à la région PACA
    
    - **Privilégier la protection solaire**:
      * Brise-soleil orientables
      * Pergolas à lames orientables
      * Végétalisation (treilles, arbres à feuilles caduques)
    
    - **Systèmes énergétiques recommandés**:
      * Pompe à chaleur air/eau
      * Chauffe-eau thermodynamique
      * Photovoltaïque en autoconsommation
    
    - **Solutions constructives adaptées**:
      * Murs à forte inertie (brique, béton)
      * Isolation extérieure (ITE)
      * Toiture très bien isolée et ventilée
    
    ### Accompagnement proposé par notre équipe
    
    - Étude d'optimisation RE2020 en phase conception
    - Simulation thermique dynamique
    - Analyse du cycle de vie simplifiée
    - Suivi des points sensibles en phase chantier
    - Test d'étanchéité à l'air intermédiaire et final
    
    Pour un accompagnement personnalisé sur votre projet RE2020 en région PACA, contactez notre équipe technique spécialisée.
    `,
    isNew: true
  },
];

