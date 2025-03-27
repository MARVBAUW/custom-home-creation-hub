
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, ExternalLink, Check, Eye, Video, File, FileArchive } from 'lucide-react';
import Button from '@/components/common/Button';
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const WorkspaceGuides = () => {
  const { toast } = useToast();
  const [downloadedGuides, setDownloadedGuides] = useState<string[]>([]);
  const [selectedGuide, setSelectedGuide] = useState<any>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  
  const categories = [
    { id: 'construction', label: 'Construction' },
    { id: 'renovation', label: 'Rénovation' },
    { id: 'admin', label: 'Administratif' },
    { id: 'financement', label: 'Financement' },
    { id: 'reglementation', label: 'Réglementation' },
    { id: 'technique', label: 'Technique' }
  ];

  const guides = [
    {
      title: "Guide complet du permis de construire",
      description: "Tous les détails pour préparer et déposer votre permis de construire dans les règles.",
      category: "construction",
      downloadable: true,
      size: "3.2 MB",
      content: `
# Guide complet du permis de construire

## Introduction
Le permis de construire est une autorisation d'urbanisme délivrée par la mairie. Il est obligatoire pour toutes les constructions nouvelles, même sans fondation, de plus de 20 m² de surface de plancher ou d'emprise au sol.

## Quand faut-il demander un permis de construire ?
- Pour toute construction nouvelle de plus de 20 m²
- Pour des travaux sur une construction existante qui modifient son volume ou créent une surface de plancher supérieure à 40 m² en zone urbaine
- Pour un changement de destination accompagné de travaux modifiant les structures porteuses ou la façade
- Pour les piscines couvertes de plus de 100 m² ou dont la couverture fait plus de 1,80 m de hauteur

## Constitution du dossier
### Documents obligatoires
1. Formulaire CERFA n°13406*07 (construction de maison individuelle) ou n°13409*07 (autres constructions)
2. Plan de situation du terrain
3. Plan de masse des constructions
4. Plan de coupe du terrain et de la construction
5. Notice descriptive du projet
6. Plan des façades et des toitures
7. Document graphique d'insertion dans l'environnement
8. Photographie permettant de situer le terrain dans son environnement proche
9. Photographie permettant de situer le terrain dans son environnement lointain

### Documents complémentaires selon les cas
- Attestation RT2020
- Étude de sol pour les terrains en zone argileuse
- Étude d'impact environnemental
- Attestation PPR (Plan de Prévention des Risques)

## Dépôt de la demande
Le dossier complet doit être déposé en mairie en 4 exemplaires, accompagné des pièces nécessaires. Un récépissé de dépôt vous sera remis.

## Délais d'instruction
- 2 mois pour une maison individuelle
- 3 mois pour les autres constructions
- Délais prolongés si le projet est situé dans un secteur protégé ou nécessite des consultations spécifiques

## Affichage et recours
Une fois le permis obtenu, un panneau d'affichage réglementaire doit être placé sur le terrain, visible depuis la voie publique. Le délai de recours des tiers est de 2 mois à compter du premier jour d'affichage.

## Validité et prolongation
- Validité de 3 ans
- Possibilité de prolongation d'un an, deux fois maximum
- La demande de prolongation doit être faite 2 mois avant l'expiration du délai de validité

## Déclaration d'ouverture de chantier
À déposer en mairie dès le commencement des travaux.

## Déclaration attestant l'achèvement et la conformité des travaux (DAACT)
À déposer en mairie à la fin des travaux. La mairie dispose alors de 3 à 5 mois pour contester la conformité.
      `
    },
    {
      title: "Les fondamentaux d'une construction de qualité",
      description: "Découvrez les étapes clés et points de vigilance pour une construction durable.",
      category: "construction",
      downloadable: true,
      size: "4.8 MB",
      content: `
# Les fondamentaux d'une construction de qualité

## Introduction
Une construction de qualité repose sur des fondamentaux essentiels qui, lorsqu'ils sont respectés, garantissent la durabilité, le confort et la performance énergétique de votre bâtiment.

## 1. Études préalables approfondies
### Étude de sol
Indispensable pour déterminer la nature du terrain et adapter les fondations en conséquence. Une étude de sol permet d'éviter des problèmes structurels majeurs.

### Orientation et implantation
- Tenir compte de l'ensoleillement pour optimiser les apports solaires passifs
- Analyser la direction des vents dominants
- Étudier l'environnement proche (bâtiments voisins, végétation, etc.)

## 2. Fondations solides
Les fondations constituent la base de toute construction durable. Selon la nature du sol, on privilégiera:
- Semelles filantes pour les sols stables
- Radier pour les sols de faible portance
- Pieux pour les terrains instables ou en pente

Le béton utilisé doit être adapté à l'environnement (gel, humidité, etc.) et correctement dosé.

## 3. Structure porteuse adaptée
### Murs porteurs
- En béton: résistant mais nécessitant une bonne isolation thermique
- En brique: bon comportement thermique naturel, inertie intéressante
- En ossature bois: léger, performant thermiquement, rapide à mettre en œuvre

### Planchers intermédiaires
- Dalle béton: excellente inertie thermique et acoustique
- Plancher bois: plus léger mais nécessitant une attention particulière à l'acoustique

## 4. Étanchéité parfaite
### Toiture
- Pente minimale adaptée au matériau de couverture
- Mise en œuvre soignée des éléments d'étanchéité (écran sous-toiture, solins, etc.)
- Traitement approprié des points singuliers (faîtage, noues, etc.)

### Murs
- Pose correcte du pare-pluie pour les constructions à ossature bois
- Traitement des ponts thermiques au niveau des menuiseries
- Drainage périphérique au pied des murs enterrés

## 5. Isolation performante
Une isolation continue et sans pont thermique est essentielle:
- Toiture: R ≥ 8 m².K/W
- Murs: R ≥ 4,5 m².K/W
- Sol: R ≥ 3 m².K/W

Techniques d'isolation:
- ITE (Isolation Thermique par l'Extérieur): supprime efficacement les ponts thermiques
- ITI (Isolation Thermique par l'Intérieur): nécessite un traitement attentif des ponts thermiques
- Isolation répartie: dans le cas des murs à isolation intégrée (brique alvéolaire, etc.)

## 6. Menuiseries de qualité
- Double ou triple vitrage avec coefficient Uw ≤ 1,3 W/m².K
- Pose en applique extérieure pour limiter les ponts thermiques
- Étanchéité à l'air soignée grâce à des joints et une mise en œuvre appropriée

## 7. Ventilation efficace
Une ventilation maîtrisée permet d'évacuer l'humidité et les polluants:
- VMC simple flux hygroréglable type B: ajustement du débit selon l'humidité
- VMC double flux: récupération de chaleur sur l'air extrait, filtration de l'air entrant

## 8. Systèmes techniques adaptés
### Chauffage
Choisir un système dimensionné selon les besoins réels du bâtiment après isolation:
- Pompe à chaleur: COP ≥ 4 pour une efficacité optimale
- Chaudière à condensation: rendement ≥ 109%
- Poêle à bois: rendement ≥ 80%

### Production d'eau chaude sanitaire
- Ballon thermodynamique: COP ≥ 3
- Chauffe-eau solaire: couverture solaire ≥ 60%

## 9. Matériaux durables et sains
Privilégier:
- Matériaux à faible impact environnemental (biosourcés si possible)
- Produits peu émissifs en COV (Composés Organiques Volatils)
- Matériaux résistants adaptés à l'usage prévu

## 10. Mise en œuvre soignée
- Respect des DTU (Documents Techniques Unifiés)
- Formation adéquate des intervenants
- Contrôle qualité régulier pendant le chantier

## Conclusion
Une construction de qualité est le fruit d'une conception réfléchie et d'une exécution soignée. L'investissement dans ces fondamentaux assure un bâtiment confortable, économe en énergie et durable dans le temps.
      `
    },
    {
      title: "Guide technique des fondations spéciales",
      description: "Maîtriser les techniques de fondations spéciales pour terrains difficiles.",
      category: "technique",
      downloadable: true,
      size: "5.3 MB",
      content: `
# Guide technique des fondations spéciales

## Introduction aux fondations spéciales
Les fondations spéciales sont des solutions techniques adaptées aux terrains difficiles ou aux ouvrages soumis à des contraintes particulières. Ce guide présente les différentes techniques et leur mise en œuvre.

## 1. Les micropieux
### Principe
Les micropieux sont des pieux forés de petit diamètre (généralement < 300 mm) qui transmettent les charges en profondeur par frottement latéral principalement.

### Mise en œuvre
1. Forage à la tarière ou au marteau fond de trou
2. Mise en place de l'armature (tube métallique et/ou cage d'armature)
3. Injection du coulis de ciment sous pression (IGU ou IRS)

### Applications
- Reprise en sous-œuvre
- Terrain à faible portance
- Zones d'accès difficile
- Ouvrages soumis à des efforts d'arrachement

### Dimensionnement
- Charge admissible: 300 à 1000 kN selon diamètre et technique d'injection
- Longueur: 5 à 25 m selon la géologie

## 2. Les pieux
### Types de pieux
- Pieux forés: réalisés par extraction du sol puis bétonnage
- Pieux battus: préfabriqués et enfoncés dans le sol par battage
- Pieux vissés: enfoncés par rotation

### Techniques de forage
- Tarière continue
- Tube de travail
- Boue bentonitique
- Virole perdue

### Dimensionnement
- Diamètre: 400 à 2000 mm
- Profondeur: jusqu'à 50 m
- Charge admissible: jusqu'à 10 MN selon diamètre

## 3. Les parois moulées
### Principe
Réalisation d'une paroi en béton armé coulée dans une tranchée préalablement excavée sous boue.

### Étapes de réalisation
1. Réalisation des murettes-guides
2. Excavation sous boue bentonitique
3. Mise en place des cages d'armature
4. Bétonnage par tube plongeur de bas en haut

### Applications
- Soutènement pour excavations profondes
- Parois étanches
- Fondations d'ouvrages importants

### Caractéristiques
- Épaisseur: 50 à 120 cm
- Profondeur: jusqu'à 60 m
- Panneaux: 2,50 à 7 m de long

## 4. Les colonnes ballastées
### Principe
Amélioration des caractéristiques du sol par incorporation de colonnes de matériaux granulaires compactés.

### Méthode d'exécution
1. Pénétration du vibreur jusqu'à la profondeur souhaitée
2. Remontée par paliers avec apport de matériaux granulaires
3. Compactage des matériaux à chaque palier

### Avantages
- Adapté aux sols compressibles
- Économique par rapport aux pieux
- Accélération de la consolidation des sols

### Dimensionnement
- Diamètre: 60 à 120 cm
- Maillage: 1,5 à 3 m
- Profondeur: jusqu'à 25 m

## 5. Les injections de sol
### Types d'injection
- Imprégnation: remplissage des vides du sol
- Claquage: création de lentilles de coulis dans le sol
- Jet-grouting: déstructuration du sol et mélange avec le coulis

### Coulis utilisés
- Suspensions (ciment, bentonite)
- Solutions (silicates, résines)
- Émulsions (bitume)

### Applications
- Étanchéité
- Consolidation
- Compensation de tassements

## 6. Parois clouées et parois berlinoises
### Paroi clouée
Technique associant une excavation par passes et un renforcement du sol par des inclusions métalliques scellées au terrain.

### Paroi berlinoise
Technique de soutènement par profilés métalliques verticaux et blindage horizontal mis en place au fur et à mesure de l'excavation.

## 7. Contrôle et instrumentation
### Essais préalables
- Essais de chargement statique
- Essais de chargement dynamique
- Essais d'impédance mécanique

### Instrumentation
- Inclinomètres
- Extensomètres
- Cellules de pression
- Piézomètres

## Conclusion
Le choix d'une technique de fondation spéciale dépend des conditions géotechniques, des charges à reprendre, de l'environnement du chantier et des contraintes économiques. Une étude géotechnique approfondie et une expertise en ingénierie sont essentielles pour définir la solution optimale.
      `
    },
    {
      title: "Rénovation énergétique : guide pratique",
      description: "Comment améliorer la performance énergétique de votre logement étape par étape.",
      category: "renovation",
      downloadable: true,
      size: "2.6 MB",
      content: `
# Rénovation énergétique : guide pratique

## Introduction
La rénovation énergétique permet de réduire la consommation d'énergie d'un bâtiment tout en améliorant le confort des occupants. Ce guide vous présente les étapes clés pour mener à bien votre projet.

## Étape 1 : Diagnostic initial
### Audit énergétique
Réalisé par un professionnel, l'audit énergétique comprend :
- Analyse des consommations énergétiques actuelles
- Identification des points faibles du bâtiment
- Proposition de solutions techniques adaptées
- Estimation des économies d'énergie potentielles
- Évaluation du coût des travaux et du retour sur investissement

### DPE (Diagnostic de Performance Énergétique)
Document obligatoire qui classe le logement sur une échelle de A à G selon :
- Sa consommation d'énergie primaire (kWh/m²/an)
- Son impact en termes d'émissions de gaz à effet de serre

## Étape 2 : Définition du projet
### Objectifs
- Amélioration du confort (thermique, acoustique, qualité de l'air)
- Réduction des factures énergétiques
- Valorisation du patrimoine
- Obtention d'un label (BBC-Effinergie Rénovation, etc.)

### Approche
- Rénovation globale : traitement simultané de tous les postes
- Rénovation par étapes : programmation des travaux selon un parcours cohérent

## Étape 3 : Isolation
### Toiture
Premier poste de déperdition (jusqu'à 30%)
- Combles perdus : isolation sur plancher (R ≥ 7 m².K/W)
- Combles aménagés : isolation sous rampants (R ≥ 6 m².K/W)
- Toiture-terrasse : isolation par l'extérieur (R ≥ 4,5 m².K/W)

### Murs
- Isolation par l'extérieur (ITE) :
  * Avantages : suppression des ponts thermiques, maintien de l'inertie
  * Techniques : enduit sur isolant, bardage, vêture
  * Performance : R ≥ 3,7 m².K/W

- Isolation par l'intérieur (ITI) :
  * Avantages : coût modéré, préservation de l'aspect extérieur
  * Techniques : complexe isolant + plaque de plâtre, ossature métallique
  * Performance : R ≥ 3,7 m².K/W
  * Points d'attention : traitement des ponts thermiques, perte de surface habitable

### Planchers bas
- Sur terre-plein : isolation sous chape ou sur dalle (R ≥ 3 m².K/W)
- Sur vide sanitaire accessible : isolation en sous-face (R ≥ 3 m².K/W)
- Sur local non chauffé : isolation en sous-face ou sur plancher (R ≥ 3 m².K/W)

## Étape 4 : Menuiseries
### Remplacement des fenêtres
- Double vitrage à isolation renforcée : Uw ≤ 1,3 W/m².K
- Triple vitrage : Uw ≤ 1,0 W/m².K (zones froides)
- Facteur solaire : Sw ≥ 0,36 (apports solaires)
- Transmission lumineuse : TLw ≥ 0,6 (confort visuel)

### Traitement de l'étanchéité à l'air
- Calfeutrement des menuiseries
- Pose de joints de qualité
- Traitement des passages de câbles et canalisations
- Test d'infiltrométrie pour validation

## Étape 5 : Ventilation
### VMC simple flux
- Hygroréglable type A : entrées d'air fixes, extraction modulée
- Hygroréglable type B : entrées d'air et extraction modulées
- Avantages : coût modéré, facilité d'installation
- Inconvénients : pas de récupération de chaleur

### VMC double flux
- Principe : récupération de chaleur sur l'air extrait
- Rendement : ≥ 90% pour les meilleurs systèmes
- Avantages : économies d'énergie, filtration de l'air entrant
- Inconvénients : coût d'installation, encombrement, entretien régulier

## Étape 6 : Chauffage et eau chaude sanitaire
### Chauffage
- Pompe à chaleur :
  * Air/eau : COP ≥ 4
  * Géothermique : COP ≥ 5
  * Conditions : bonne isolation préalable, émetteurs basse température

- Chaudière à condensation :
  * Rendement ≥ 109%
  * Compatible avec radiateurs existants

- Poêle à bois/granulés :
  * Rendement ≥ 80%
  * Label Flamme Verte 7 étoiles

### Eau chaude sanitaire
- Chauffe-eau thermodynamique : COP ≥ 3
- Solaire thermique : couverture solaire ≥ 60%
- Couplage avec système de chauffage

## Étape 7 : Financement
### Aides financières
- MaPrimeRénov'
- TVA à taux réduit (5,5%)
- Éco-prêt à taux zéro
- Certificats d'Économies d'Énergie (CEE)
- Aides locales (régions, départements, communes)

### Conditions d'obtention
- Recours à des professionnels RGE (Reconnu Garant de l'Environnement)
- Respect des critères techniques de performance
- Plafonds de ressources pour certaines aides

## Étape 8 : Réalisation des travaux
### Choix des entreprises
- Qualification RGE adaptée aux travaux
- Vérification des assurances et garanties
- Analyse détaillée des devis

### Suivi de chantier
- Respect des techniques de mise en œuvre
- Coordination entre corps de métier
- Contrôle de la qualité des réalisations

## Étape 9 : Évaluation post-travaux
- Nouveau DPE
- Suivi des consommations
- Vérification des performances (test d'étanchéité, thermographie)
- Ajustement des systèmes si nécessaire

## Conclusion
Une rénovation énergétique réussie nécessite une vision globale du bâtiment et une approche coordonnée des différents travaux. L'investissement initial est compensé par la réduction des consommations, l'amélioration du confort et la valorisation du bien immobilier.
      `
    },
    {
      title: "Réussir la rénovation de votre maison ancienne",
      description: "Conseils d'experts pour préserver le cachet tout en modernisant votre habitat.",
      category: "renovation",
      downloadable: true,
      size: "5.1 MB",
      content: `
# Réussir la rénovation de votre maison ancienne

## Introduction
La rénovation d'une maison ancienne est un défi passionnant qui demande une approche spécifique. Il s'agit de moderniser le bâti tout en respectant son caractère et ses particularités constructives.

## 1. Comprendre votre maison ancienne
### Identifier le type de construction
- Maison en pierre (calcaire, meulière, granit...)
- Construction à pan de bois
- Bâtisse en terre crue (pisé, bauge, adobe)
- Maison de maître du XIXe siècle
- Villa début XXe

### Analyser les caractéristiques techniques
- Mode constructif (murs massifs, ossature...)
- Matériaux utilisés et leur comportement
- Systèmes d'évacuation d'humidité traditionnels
- Particularités architecturales à préserver

### Réaliser un diagnostic complet
- État sanitaire de la structure
- Présence de pathologies spécifiques (humidité, fissures...)
- Évaluation des éléments à conserver/remplacer
- Diagnostic des réseaux existants

## 2. Élaborer un projet respectueux
### Définir les objectifs
- Niveau de confort souhaité
- Performance énergétique visée
- Budget disponible
- Calendrier des travaux

### S'entourer de professionnels compétents
- Architecte spécialisé en patrimoine
- Bureau d'études techniques
- Artisans maîtrisant les techniques traditionnelles
- Économiste de la construction

### Respecter l'architecture existante
- Conserver les proportions
- Préserver les éléments remarquables
- Maintenir l'harmonie des façades
- Respecter les techniques constructives d'origine

## 3. Traiter la structure et le clos-couvert
### Consolider la structure
- Reprise des fondations si nécessaire
- Traitement des fissures
- Renforcement des planchers
- Restauration de la charpente

### Résoudre les problèmes d'humidité
- Drainage périphérique
- Traitement des remontées capillaires
- Assèchement des murs
- Création d'une ventilation du soubassement

### Rénover la toiture
- Révision ou remplacement de la couverture
- Amélioration de l'étanchéité
- Isolation adaptée aux spécificités de la charpente
- Restauration des éléments décoratifs (épis, lucarnes...)

### Reprendre les menuiseries
- Restauration des menuiseries anciennes à forte valeur patrimoniale
- Remplacement par des menuiseries sur mesure respectant le style d'origine
- Amélioration de l'étanchéité et de l'isolation (double vitrage)
- Conservation et restauration des ferronneries

## 4. Améliorer la performance énergétique
### Choisir une isolation adaptée
- Murs en pierre : enduits isolants perspirants, correction thermique intérieure
- Pans de bois : isolation entre montants, enduits chaux-chanvre
- Techniques à proscrire : isolation par l'extérieur sur façades remarquables, matériaux étanches à la vapeur d'eau

### Optimiser le chauffage
- Remise en service des cheminées et poêles existants
- Installation d'un système central adapté au volume des pièces
- Utilisation des inerties thermiques naturelles du bâti

### Ventiler efficacement
- Création d'une ventilation naturelle ou hybride
- VMC adaptée aux contraintes du bâti ancien
- Préservation de la respiration naturelle des murs

## 5. Aménager les espaces intérieurs
### Respecter la distribution d'origine
- Conservation des pièces principales et de leur hiérarchie
- Maintien des circulations caractéristiques
- Préservation des volumes significatifs

### Restaurer les éléments décoratifs
- Moulures et corniches
- Parquets anciens
- Cheminées
- Escaliers remarquables
- Portes et quincaillerie d'origine

### Intégrer discrètement la modernité
- Cuisine et salles d'eau contemporaines
- Réseaux électriques aux normes
- Domotique non invasive
- Éclairage adapté aux volumes

## 6. Traiter les abords
### Restaurer les éléments extérieurs
- Murs de clôture
- Dépendances
- Puits, fontaines
- Terrasses et perrons

### Aménager le jardin
- Respect de la composition d'origine
- Choix d'essences adaptées au style de la maison
- Conservation des arbres remarquables
- Restauration des allées, bassins, etc.

## 7. Aspects administratifs et financiers
### Autorisations d'urbanisme
- Déclaration préalable ou permis de construire
- Consultation ABF si secteur protégé
- Autorisations spécifiques si bâtiment classé

### Financement
- Aides spécifiques au patrimoine (Fondation du Patrimoine)
- Subventions ANAH pour l'habitat ancien
- Défiscalisation (Malraux, Monuments Historiques)
- Aides à la rénovation énergétique adaptées au bâti ancien

## Conclusion
La rénovation d'une maison ancienne demande patience, respect du bâti et expertise technique. Une approche équilibrée entre préservation du patrimoine et adaptation aux standards de confort actuels garantira un résultat harmonieux et durable.
      `
    },
    {
      title: "Dossier complet sur les aides financières 2024",
      description: "Toutes les aides disponibles pour vos projets immobiliers expliquées simplement.",
      category: "financement",
      downloadable: true,
      size: "1.9 MB",
      content: `
# Dossier complet sur les aides financières 2024

## Introduction
Ce guide recense l'ensemble des dispositifs d'aide financière disponibles en 2024 pour vos projets immobiliers, qu'il s'agisse d'acquisition, de construction ou de rénovation.

## 1. Aides à l'accession à la propriété
### Prêt à Taux Zéro (PTZ)
**Principe**: Prêt sans intérêts, complémentaire à un prêt principal
**Bénéficiaires**: Primo-accédants sous conditions de ressources
**Montant**: Jusqu'à 40% du prix du logement selon zone géographique
**Durée**: 20 à 25 ans avec différé de remboursement de 5 à 15 ans
**Conditions 2024**:
- Plafonds de ressources revalorisés de 2,5%
- Zonage maintenu (A, B1, B2, C)
- Étendu à l'ancien avec travaux en zones B2 et C

### Prêt d'Accession Sociale (PAS)
**Principe**: Prêt à taux avantageux garanti par l'État
**Bénéficiaires**: Ménages sous plafonds de ressources
**Taux**: Inférieur aux taux du marché
**Avantages**: Frais de dossier plafonnés, garantie gratuite

### Prêt Action Logement (ex-1% Logement)
**Principe**: Prêt accordé par Action Logement
**Bénéficiaires**: Salariés d'entreprises privées de plus de 10 employés
**Montant**: Jusqu'à 40 000 € selon zones
**Taux**: 0,5% (hors assurance)
**Durée**: 25 ans maximum

## 2. Aides à la rénovation énergétique
### MaPrimeRénov'
**Principe**: Aide forfaitaire pour travaux d'économies d'énergie
**Bénéficiaires**: Propriétaires occupants et bailleurs
**Montant**: Variable selon revenus et gains énergétiques
**Nouveautés 2024**:
- Bonification pour rénovations globales (gains > 55%)
- Simplification des démarches administratives
- Extension aux copropriétés dégradées

**Barème 2024 par type de ménage**:
- Bleu (très modestes): Jusqu'à 90% du montant des travaux
- Jaune (modestes): Jusqu'à 75% du montant des travaux
- Violet (intermédiaires): Jusqu'à 60% du montant des travaux
- Rose (aisés): Jusqu'à 40% du montant des travaux

### MaPrimeRénov' Sérénité
**Principe**: Aide pour rénovation globale (gain énergétique > 35%)
**Bénéficiaires**: Propriétaires occupants aux ressources modestes et très modestes
**Montant**:
- Ménages très modestes: 50% du montant HT des travaux (plafond 30 000 €)
- Ménages modestes: 35% du montant HT des travaux (plafond 30 000 €)
**Accompagnement**: Assistance technique obligatoire

### Certificats d'Économies d'Énergie (CEE)
**Principe**: Prime versée par les fournisseurs d'énergie
**Bénéficiaires**: Tous les propriétaires et locataires
**Montant**: Variable selon travaux et fournisseur
**Cumul**: Possible avec MaPrimeRénov'

### TVA à taux réduit
**Taux**: 5,5% pour travaux d'amélioration énergétique
**Bénéficiaires**: Logements de plus de 2 ans
**Travaux concernés**: Isolation, chauffage, ventilation, diagnostic

### Éco-Prêt à Taux Zéro
**Principe**: Prêt sans intérêts pour financer des travaux d'économie d'énergie
**Montant**: Jusqu'à 50 000 € selon type de travaux
**Durée**: 20 ans maximum
**Prolongation**: Jusqu'au 31 décembre 2024

## 3. Aides locales
### Aides régionales
Chaque région propose des dispositifs spécifiques complémentaires aux aides nationales.
Exemples:
- Île-de-France: prime jusqu'à 2 000 € pour remplacement chaudière fioul
- Occitanie: éco-chèque logement jusqu'à 1 500 €
- Grand Est: Climaxion pour rénovation globale

### Aides départementales et communales
Subventions variables selon territoires:
- Aides à la rénovation des façades
- Primes pour installation d'énergies renouvelables
- Subventions pour adaptation logement seniors

## 4. Aides fiscales
### Déficit foncier
**Principe**: Imputation des déficits sur le revenu global
**Plafond**: 10 700 € par an
**Intérêt**: Report du déficit pendant 10 ans

### Dispositif Denormandie
**Principe**: Réduction d'impôt pour rénovation dans l'ancien
**Zones éligibles**: Centres-villes dégradés (222 communes)
**Conditions**:
- Travaux représentant 25% minimum du coût total
- Location 6, 9 ou 12 ans
**Taux de réduction**: 12%, 18% ou 21% selon durée d'engagement

### Dispositif Malraux
**Principe**: Réduction d'impôt pour restauration immeubles anciens
**Zones éligibles**: Secteurs sauvegardés, PSMV, SPR
**Taux**:
- 30% en secteur sauvegardé
- 22% en site patrimonial remarquable
**Plafond**: 400 000 € sur 4 ans

## 5. Prêts spécifiques
### Prêt travaux d'amélioration Action Logement
**Bénéficiaires**: Salariés entreprises privées
**Montant**: Jusqu'à 20 000 €
**Taux**: 1% (hors assurance)

### Prêt CAF amélioration de l'habitat
**Bénéficiaires**: Allocataires avec prestations familiales
**Montant**: Jusqu'à 80% des dépenses (plafond 1 067,14 €)
**Taux**: 1%

### Prêt adaptation du logement au vieillissement
**Bénéficiaires**: Retraités du secteur privé
**Montant**: Jusqu'à 5 000 €
**Taux**: 0%

## 6. Aides pour publics spécifiques
### Aides ANAH pour personnes âgées ou handicapées
**Principe**: Subvention pour adaptation du logement
**Montant**:
- Ménages très modestes: 50% du montant HT (plafond 10 000 €)
- Ménages modestes: 35% du montant HT (plafond 7 000 €)

### Prime d'adaptation du logement pour l'autonomie
**Montant**: Forfait de 3 000 €
**Conditions**: Travaux éligibles d'adaptation

### Crédit d'impôt pour l'adaptation du logement
**Taux**: 25% des dépenses
**Plafond**: 5 000 € personne seule, 10 000 € couple
**Équipements**: Sanitaires adaptés, monte-escalier, rampes...

## 7. Cumul des aides
### Règles générales
- MaPrimeRénov' + CEE possible
- MaPrimeRénov' + aides locales possible
- Éco-PTZ + tous dispositifs possible

### Exemples de cumul optimal
- Rénovation globale: MaPrimeRénov' + CEE + Éco-PTZ + aides locales
- Travaux ponctuels: MaPrimeRénov' + CEE + TVA 5,5%
- Adaptation seniors: ANAH + crédit d'impôt + prêt Action Logement

## 8. Démarches et conseils
### France Rénov'
Service public gratuit d'information et de conseil:
- 450 espaces conseil France Rénov'
- Numéro unique: 0 808 800 700
- Accompagnement personnalisé

### Mon Accompagnateur Rénov'
Assistance pour:
- Audit énergétique
- Plan de financement
- Choix des artisans
- Suivi des travaux
- Aides à la réception

### Points de vigilance
- Vérifier l'éligibilité avant de commencer les travaux
- Exiger des devis détaillés
- Contrôler les certifications RGE des professionnels
- Conserver tous les justificatifs
- Séquencer les travaux pour optimiser les aides

## Conclusion
Le paysage des aides financières 2024 offre de nombreuses opportunités pour concrétiser vos projets immobiliers. Un accompagnement personnalisé vous permettra d'optimiser ces dispositifs en fonction de votre situation.
      `
    },
    {
      title: "Guide complet sur la réglementation RE2020",
      description: "Tout ce que vous devez savoir sur la réglementation environnementale 2020.",
      category: "reglementation",
      downloadable: true,
      size: "6.3 MB",
      content: `
# Guide complet sur la réglementation RE2020

## Introduction à la RE2020
La Réglementation Environnementale 2020 (RE2020) constitue une évolution majeure de la réglementation thermique des bâtiments neufs en France. Entrée en vigueur le 1er janvier 2022, elle remplace la RT2012 avec des objectifs plus ambitieux visant à diminuer l'impact carbone des bâtiments et à améliorer leur performance énergétique.

## 1. Fondements et objectifs de la RE2020
### Objectifs principaux
- Diminuer l'impact sur le climat des bâtiments neufs
- Poursuivre l'amélioration de leur performance énergétique
- Garantir le confort des occupants en cas de forte chaleur

### Évolution par rapport à la RT2012
- Approche environnementale globale (versus approche uniquement thermique)
- Analyse du cycle de vie (ACV) du bâtiment
- Prise en compte du confort d'été de manière renforcée
- Exigences accrues sur l'enveloppe du bâtiment

### Calendrier d'application
- 1er janvier 2022 : Logements individuels et collectifs
- 1er juillet 2022 : Bureaux et bâtiments d'enseignement primaire et secondaire
- 1er janvier 2023 : Extensions et constructions provisoires
- Horizon 2024-2025 : Autres typologies de bâtiments

## 2. Les trois piliers de la RE2020
### 1. Sobriété énergétique
**Indicateurs clés :**
- Bbio : Besoin bioclimatique (besoins de chauffage, refroidissement et éclairage)
- Cep : Consommation d'énergie primaire
- Cep,nr : Consommation d'énergie primaire non renouvelable

**Exigences :**
- Bbio,max renforcé de 30% par rapport à la RT2012
- Cep,max abaissé de 15 à 30% selon typologie
- Introduction du Cep,nr pour valoriser les énergies renouvelables

### 2. Décarbonation
**Indicateurs clés :**
- IC énergie : Impact sur le changement climatique associé aux consommations d'énergie
- IC construction : Impact sur le changement climatique associé aux matériaux et équipements

**Exigences :**
- Favoriser les énergies peu carbonées (électricité, bois, réseaux de chaleur)
- Pénaliser les énergies fossiles (gaz, fioul)
- Encourager les matériaux biosourcés et le réemploi

### 3. Confort d'été
**Indicateur clé :**
- DH (Degrés-Heures) : Mesure l'inconfort ressenti pendant les périodes chaudes

**Exigences :**
- Seuil maximal de 1250 DH (haute performance)
- Calcul basé sur une séquence caniculaire de référence
- Valorisation de la conception bioclimatique et de l'inertie

## 3. Méthodologie et calculs
### Analyse du Cycle de Vie (ACV)
- Évaluation sur 50 ans
- Prise en compte des impacts depuis l'extraction des matières premières jusqu'à la fin de vie
- Utilisation de la base de données INIES (FDES et PEP)

### Outils de calcul
- Logiciels agréés intégrant les modules réglementaires
- Moteur de calcul 3CL adapté à la RE2020
- Interfaces avec les bases de données environnementales

### Paramètres de calcul
- Données climatiques par zone géographique
- Scénarios d'occupation normalisés
- Coefficients de conversion énergie finale/énergie primaire
- Facteurs d'émission de gaz à effet de serre

## 4. Exigences techniques détaillées
### Enveloppe du bâtiment
- Renforcement de l'isolation thermique
- Traitement optimisé des ponts thermiques
- Amélioration de l'étanchéité à l'air
- Protection solaire des baies vitrées

### Systèmes énergétiques
- Sortie progressive du chauffage au gaz
- Promotion des pompes à chaleur et chauffage bois
- Valorisation des énergies renouvelables locales
- Efficacité renforcée des systèmes de ventilation

### Matériaux et équipements
- Encouragement des matériaux à faible impact carbone
- Valorisation du stockage carbone (bois, biosourcés)
- Durabilité des équipements
- Facilité d'entretien et de remplacement

## 5. Impact sur les choix constructifs
### Construction individuelle
- Orientation vers l'ossature bois
- Développement des solutions béton bas carbone
- Généralisation des pompes à chaleur
- Optimisation des surfaces vitrées et protections solaires

### Logement collectif
- Mixité des matériaux (structure béton/façade légère)
- Solutions d'isolation par l'extérieur optimisées
- Ventilation double flux plus répandue
- Systèmes énergétiques mutualisés et hybrides

### Tertiaire
- Conception bioclimatique renforcée
- Free cooling et stratégies passives
- Matériaux à forte inertie
- Systèmes énergétiques intelligents

## 6. Attestations et contrôles
### Études préalables
- Étude de faisabilité des approvisionnements énergétiques
- Étude thermique et environnementale complète
- Simulation thermique dynamique pour le confort d'été

### Attestations réglementaires
- Attestation au dépôt du permis de construire
- Attestation à l'achèvement des travaux
- Vérification de conformité par un contrôleur technique

### Contrôles de conformité
- Test d'étanchéité à l'air
- Vérification des équipements installés
- Respect des caractéristiques environnementales déclarées

## 7. Labellisations et certifications complémentaires
### Label RE2020
- Niveaux progressifs anticipant les futures exigences
- Valorisation des bâtiments les plus performants
- Critères additionnels (acoustique, qualité de l'air...)

### Autres certifications
- E+C- (expérimentation précurseur de la RE2020)
- NF Habitat HQE
- BBCA (Bâtiment Bas Carbone)
- Effinergie+

## 8. Aspects économiques
### Surcoûts estimés
- Maisons individuelles : +3 à 8%
- Logements collectifs : +4 à 10%
- Bâtiments tertiaires : +5 à 12%

### Retour sur investissement
- Économies d'énergie sur la durée de vie
- Valorisation patrimoniale
- Amélioration du confort et de la qualité d'usage

### Aides financières
- MaPrimeRénov' pour certaines extensions
- Prêt à taux zéro
- Aides locales spécifiques

## 9. Perspectives d'évolution
### Calendrier de renforcement
- 2025 : Durcissement des seuils carbone
- 2028 : Nouvelles exigences sur les équipements
- 2031 : Exigences définitives pour l'ensemble des indicateurs

### Innovation et recherche
- Développement des matériaux bas carbone
- Solutions constructives innovantes
- Systèmes énergétiques intelligents

### Convergence européenne
- Directive européenne sur la performance énergétique des bâtiments
- Taxonomie verte européenne
- Normes harmonisées

## Conclusion
La RE2020 représente un tournant décisif dans la conception et la construction des bâtiments en France. Elle induit une transformation profonde des pratiques et des solutions techniques, avec pour objectif la neutralité carbone du secteur du bâtiment à l'horizon 2050.

## Annexes
- Tableaux des seuils réglementaires par typologie et année
- Exemples de solutions techniques conformes
- Glossaire des termes techniques
- Ressources et références bibliographiques
      `
    },
    {
      title: "Webinaire explicatif RE2020 (replay)",
      description: "Enregistrement complet du webinaire sur la nouvelle réglementation environnementale.",
      category: "reglementation",
      downloadable: true,
      size: "284 MB",
      type: "video",
      content: "Lien vers la vidéo de replay du webinaire explicatif sur la RE2020"
    },
    {
      title: "Texte intégral de la réglementation RE2020",
      description: "Version complète des textes réglementaires et annexes techniques.",
      category: "reglementation",
      downloadable: true,
      size: "8.7 MB",
      type: "document",
      content: "Lien vers le document complet de la réglementation RE2020"
    },
    {
      title: "Guide des démarches administratives (permis de construire)",
      description: "Processus détaillé pour l'obtention d'un permis de construire et des autorisations annexes.",
      category: "admin",
      downloadable: true,
      size: "2.3 MB",
      content: `
# Guide des démarches administratives pour le permis de construire

## Introduction
Ce guide détaille l'ensemble des démarches administratives nécessaires pour l'obtention d'un permis de construire et des autorisations connexes. Il est destiné aux particuliers et professionnels engagés dans un projet de construction neuve ou de rénovation lourde.

## 1. Avant le dépôt du permis de construire
### Vérification préalable de la constructibilité
**Consultation des documents d'urbanisme**
- Plan Local d'Urbanisme (PLU) ou Plan Local d'Urbanisme intercommunal (PLUi)
- Carte communale
- Règlement National d'Urbanisme (RNU) si absence de document local
- Servitudes d'utilité publique

**Obtention du certificat d'urbanisme**
- CU informatif (CUa) : renseigne sur les règles applicables
- CU opérationnel (CUb) : indique si votre projet est réalisable
- Validité : 18 mois, prolongeable
- Délai d'instruction : 1 mois (CUa) ou 2 mois (CUb)

### Études préalables
**Bornage et délimitation du terrain**
- Intervention d'un géomètre-expert
- Procès-verbal de bornage
- Plan de bornage à joindre au dossier

**Étude de sol**
- Obligatoire en zones argileuses (loi ELAN)
- Recommandée dans tous les cas
- Types d'études selon projet : G1, G2, G3

**Études spécifiques selon contexte**
- Étude hydraulique en zone inondable
- Diagnostic archéologique si prescrit
- Étude d'impact environnemental pour grands projets

## 2. Constitution du dossier de permis de construire
### Formulaires CERFA
- **Construction maison individuelle** : CERFA n°13406*07
- **Autres constructions** : CERFA n°13409*07
- **Permis modificatif** : CERFA n°13411*07
- **Transfert de permis** : CERFA n°13412*07

### Pièces obligatoires
**PC1 - Plan de situation**
- Échelle recommandée : 1/5000e à 1/25000e
- Localisation du terrain dans la commune
- Orientation (indication du Nord)

**PC2 - Plan de masse**
- Échelle recommandée : 1/200e à 1/500e
- Projet dans sa totalité
- Accès, raccordements, plantations, clôtures
- Côtes du terrain et implantation des constructions
- Indication des bâtiments à démolir

**PC3 - Plan de coupe**
- Profil du terrain avant et après travaux
- Implantation de la construction par rapport au terrain
- Échelle recommandée : 1/100e ou 1/200e

**PC4 - Notice descriptive**
- Description du terrain et du projet
- Matériaux et couleurs utilisés
- Traitements des espaces extérieurs
- Modalités de raccordement aux réseaux

**PC5 - Plan des façades et toitures**
- Aspect extérieur de la construction
- Échelle recommandée : 1/100e
- Indication des matériaux et couleurs

**PC6 - Document graphique d'insertion**
- Montage photographique ou perspective
- Intégration du projet dans son environnement

**PC7 & PC8 - Photographies**
- Environnement proche (PC7)
- Paysage lointain (PC8)
- Prises de vue à indiquer sur le plan de masse

### Pièces complémentaires selon les cas
**Attestations spécifiques**
- RT2020
- Prise en compte des risques (zones PPR)
- Accessibilité pour ERP
- Acoustique en cas de construction à proximité d'un aérodrome

**Études techniques**
- Étude thermique
- Étude d'impact
- Notice de sécurité pour ERP
- Dossier loi sur l'eau

## 3. Instruction du permis de construire
### Dépôt du dossier
**Où déposer ?**
- Mairie du lieu du projet
- Dépôt contre récépissé ou envoi en LRAR
- Nombre d'exemplaires : 4 (+ exemplaires supplémentaires selon consultations)
- Possibilité de dépôt dématérialisé dans certaines communes

**Affichage en mairie**
- Dans les 15 jours suivant le dépôt
- Pendant toute la durée de l'instruction

### Délais d'instruction
**Délais de base**
- Maison individuelle : 2 mois
- Autres constructions : 3 mois
- ERP, bâtiments classés : 5 mois

**Majorations possibles**
- Consultation ABF : +1 mois
- Monument historique : +2 mois
- Établissement recevant du public : +2 mois
- Projet soumis à autorisation environnementale : délai de cette autorisation

**Demande de pièces complémentaires**
- Dans le 1er mois suivant le dépôt
- Délai de réponse : 3 mois
- Suspension du délai d'instruction jusqu'à réception des pièces

### Consultations et avis
**Services consultés selon projet**
- Architecte des Bâtiments de France (secteur protégé)
- Commission sécurité et accessibilité (ERP)
- Direction de l'Aviation Civile
- Gestionnaires de réseaux
- Commission départementale de préservation des espaces naturels

**Nature des avis**
- Avis conformes (s'imposent à l'autorité qui délivre le permis)
- Avis simples (consultatifs)

## 4. Décision et suites du permis de construire
### Obtention du permis
**Forme de la décision**
- Arrêté municipal ou préfectoral
- Notification au demandeur par LRAR
- Affichage en mairie pendant 2 mois

**Contenu de l'arrêté**
- Prescriptions particulières à respecter
- Participations financières (taxe d'aménagement, etc.)
- Durée de validité (3 ans)

### Affichage sur le terrain
**Panneau réglementaire**
- Dimensions minimales : 80 cm × 80 cm
- Couleur : visible et contrastée (généralement jaune)
- Informations obligatoires (bénéficiaire, date, nature des travaux, surface, hauteur, etc.)

**Durée d'affichage**
- Depuis la notification jusqu'à la fin du chantier
- Visible depuis la voie publique
- Constat d'huissier recommandé pour preuve d'affichage

### Recours des tiers
**Délai de recours**
- 2 mois à compter du premier jour d'affichage sur le terrain
- 6 mois pour le contrôle de légalité (préfet)

**Types de recours**
- Recours gracieux (auprès de l'autorité qui a délivré le permis)
- Recours contentieux (tribunal administratif)
- Recours des associations

**Cristallisation des moyens**
- Aucun moyen nouveau après 2 mois suivant la communication du premier mémoire en défense

## 5. Avant le démarrage des travaux
### Déclaration d'ouverture de chantier (DOC)
**Modalités**
- Formulaire CERFA n°13407*03
- Dépôt en mairie en 3 exemplaires
- Possible par voie électronique

**Délai**
- Avant tout commencement des travaux
- Pendant la durée de validité du permis

### Affichage des autorisations sur le chantier
**Obligations**
- Affichage du permis de construire
- Coordonnées des entreprises
- Panneau "chantier interdit au public"

### Référé préventif
**Objectif**
- État des lieux avant travaux pour prévenir les litiges
- Désignation d'un expert par le tribunal judiciaire
- Frais à la charge du demandeur

**Cas particuliers**
- Travaux à proximité de bâtiments existants
- Travaux en mitoyenneté
- Zones urbaines denses

## 6. Pendant les travaux
### Modifications éventuelles
**Permis modificatif**
- Pour modifications mineures : aspects extérieurs, réduction ou augmentation mineure de l'emprise
- CERFA n°13411*07
- Instruction : 2 mois (maison individuelle) ou 3 mois (autres constructions)

**Permis de régularisation**
- Pour travaux non conformes au permis initial
- Possible tant que la conformité n'a pas été contestée
- Mêmes règles qu'un permis normal

### Contrôles administratifs
**Visites de chantier**
- Agents assermentés de la commune
- DDT(M) pour contrôle de l'accessibilité et de la sécurité
- Contrôles inopinés possibles

## 7. À l'achèvement des travaux
### Déclaration attestant l'achèvement et la conformité des travaux (DAACT)
**Modalités**
- Formulaire CERFA n°13408*05
- Dépôt en mairie en 3 exemplaires
- Signée par le bénéficiaire du permis

**Pièces jointes selon cas**
- Attestation RT2020
- Attestation de prise en compte des règles parasismiques
- Attestation de respect des règles d'accessibilité

### Contrôle de conformité
**Délai pour contester**
- 3 mois en général
- 5 mois en site protégé ou secteur sauvegardé

**Contestation de la conformité**
- Mise en demeure de déposer un dossier modificatif
- Ou mise en demeure de se mettre en conformité
- Possibilité de poursuites pénales

### Obtention du certificat de conformité
**Délivrance**
- Sur demande expresse
- Si aucune contestation dans les délais
- Transmission par LRAR

## 8. Fiscalité et contributions financières
### Taxe d'aménagement
**Calcul**
- Surface taxable × valeur forfaitaire × taux communal (+ départemental + régional)
- Surface taxable = somme des surfaces de plancher closes et couvertes > 1,80 m de hauteur

**Exonérations possibles**
- Reconstructions à l'identique
- Constructions < 5 m²
- Exonérations locales (décisions des collectivités)

**Paiement**
- En 2 fois si montant > 1.500 €
- 12 et 24 mois après autorisation

### Autres participations financières
**Participation pour équipements publics exceptionnels**
- Si équipements spécifiques rendus nécessaires par le projet
- Montant proportionnel au coût des équipements

**Projet urbain partenarial (PUP)**
- Convention entre collectivité et porteur de projet
- Financement d'équipements publics
- Exonération de taxe d'aménagement pendant 10 ans maximum

## Conclusion
L'obtention d'un permis de construire est une procédure encadrée qui nécessite rigueur et anticipation. Un dossier complet et conforme aux règles d'urbanisme, suivi d'une réalisation respectant les autorisations obtenues, est la clé d'un projet réussi et sécurisé juridiquement.

## Annexes
- Modèles de CERFA complétés
- Exemples de plans et documents graphiques
- Contacts utiles
- Références réglementaires
      `
    },
    {
      title: "Modèles de contrats professionnels",
      description: "Pack de modèles de contrats et documents juridiques pour les professionnels de la construction.",
      category: "admin",
      downloadable: true,
      size: "1.8 MB",
      content: `
# Modèles de contrats professionnels pour le secteur de la construction

## Introduction
Ce document contient plusieurs modèles de contrats essentiels pour les professionnels de la construction. Ces modèles doivent être adaptés à chaque situation spécifique et peuvent nécessiter l'avis d'un avocat spécialisé.

## Sommaire
1. Contrat de maîtrise d'œuvre
2. Contrat d'entreprise / Marché de travaux
3. Convention de mission d'architecte
4. Contrat d'assistance à maîtrise d'ouvrage
5. Procès-verbal de réception de travaux
6. Contrat de sous-traitance
7. Devis type
8. Ordre de service
9. Avenant à un marché de travaux
10. Mise en demeure

## 1. Contrat de maîtrise d'œuvre
### ENTRE LES SOUSSIGNÉS
**Le Maître d'Ouvrage :**
[Raison sociale/Nom, Prénom] _________________________________
Adresse : _________________________________________________
Représenté par : ___________________________________________
N° SIRET (si applicable) : ____________________________________

**Le Maître d'Œuvre :**
[Raison sociale/Nom, Prénom] _________________________________
Adresse : _________________________________________________
Représenté par : ___________________________________________
N° SIRET : ________________________________________________
N° Inscription à l'Ordre (si architecte) : _________________________
Assurance professionnelle : ___________________________________

### ARTICLE 1 : OBJET DU CONTRAT
Le Maître d'Ouvrage confie au Maître d'Œuvre une mission de maîtrise d'œuvre pour l'opération définie ci-après :
- Nature de l'opération : _____________________________________
- Adresse du chantier : ______________________________________
- Références cadastrales : ____________________________________
- Surface approximative : _____________________________________
- Montant prévisionnel des travaux : ____________________________

### ARTICLE 2 : CONTENU DE LA MISSION
La mission confiée au Maître d'Œuvre comprend les éléments suivants :
□ Études préliminaires (EP)
□ Esquisse (ESQ)
□ Avant-projet sommaire (APS)
□ Avant-projet définitif (APD)
□ Études de projet (PRO)
□ Assistance pour la passation des contrats de travaux (ACT)
□ Visa des études d'exécution (VISA)
□ Direction de l'exécution des travaux (DET)
□ Assistance aux opérations de réception (AOR)
□ Ordonnancement, pilotage et coordination (OPC)

Le contenu détaillé de chaque élément de mission est précisé en annexe du présent contrat.

### ARTICLE 3 : DÉLAIS D'EXÉCUTION
Le Maître d'Œuvre s'engage à remettre les documents correspondant à chaque élément de mission dans les délais suivants, à compter de la notification de l'ordre de service correspondant :
- EP/ESQ : ___ semaines
- APS : ___ semaines
- APD : ___ semaines
- PRO : ___ semaines
- ACT : ___ semaines
- DET : Durée du chantier estimée à ___ mois
- AOR : ___ semaines après réception

### ARTICLE 4 : RÉMUNÉRATION
La rémunération du Maître d'Œuvre est fixée selon les modalités suivantes :
□ Forfait définitif de _______________ € HT
□ Pourcentage de _____% du montant final des travaux HT

Cette rémunération est répartie par élément de mission comme suit :
- EP/ESQ : ___% soit _______________ € HT
- APS : ___% soit _______________ € HT
- APD : ___% soit _______________ € HT
- PRO : ___% soit _______________ € HT
- ACT : ___% soit _______________ € HT
- VISA : ___% soit _______________ € HT
- DET : ___% soit _______________ € HT
- AOR : ___% soit _______________ € HT
- OPC (si inclus) : ___% soit _______________ € HT

### ARTICLE 5 : MODALITÉS DE PAIEMENT
Les honoraires sont payables par acomptes correspondant à l'avancement de la mission, selon l'échéancier suivant :
- À la signature du contrat : _____% du montant total
- À la remise de chaque phase : _____% du montant affecté à cette phase
- Le solde : à la remise du dossier des ouvrages exécutés

Les factures sont payables à ___ jours à compter de leur date d'émission.

### ARTICLE 6 : PROPRIÉTÉ INTELLECTUELLE
Le Maître d'Œuvre conserve la propriété intellectuelle de ses plans et études. Le Maître d'Ouvrage s'engage à ne pas les utiliser pour d'autres opérations sans accord préalable et rémunération complémentaire.

### ARTICLE 7 : ASSURANCES
Le Maître d'Œuvre déclare être assuré pour sa responsabilité professionnelle auprès de la compagnie d'assurance _________________, sous le numéro de police _________________, pour un montant de garantie de _________________ €.

Le Maître d'Ouvrage déclare être assuré pour l'opération auprès de la compagnie _________________, sous le numéro de police _________________.

### ARTICLE 8 : RÉSILIATION
Le présent contrat pourra être résilié dans les conditions suivantes :
- Par le Maître d'Ouvrage, moyennant le paiement des honoraires correspondant aux prestations effectuées et une indemnité de _____% du solde des honoraires prévus
- Par le Maître d'Œuvre, en cas de non-respect par le Maître d'Ouvrage de ses obligations, après mise en demeure restée infructueuse pendant ___ jours

### ARTICLE 9 : LITIGES
En cas de litige sur l'interprétation ou l'exécution du présent contrat, les parties s'engagent à rechercher un règlement amiable. À défaut, le tribunal compétent sera celui du lieu de l'opération.

Fait à _________________, le _________________

En deux exemplaires originaux

Le Maître d'Ouvrage                    Le Maître d'Œuvre
(Signature)                            (Signature)

## [Suite avec les autres modèles de contrats...]
      `
    },
    {
      title: "Dimensionnement des structures en béton armé",
      description: "Guide technique pour le calcul et le dimensionnement des structures en béton selon l'Eurocode 2.",
      category: "technique",
      downloadable: true,
      size: "7.2 MB",
      content: `
# Dimensionnement des structures en béton armé
## Guide technique selon l'Eurocode 2

## Introduction
Ce guide présente les méthodes de calcul et de dimensionnement des structures en béton armé conformément à l'Eurocode 2 (EN 1992-1-1). Il s'adresse aux ingénieurs, architectes et professionnels de la construction impliqués dans la conception de structures en béton.

## 1. Bases de calcul
### Normes applicables
- **Eurocode 0** : Bases de calcul des structures
- **Eurocode 1** : Actions sur les structures
- **Eurocode 2** : Calcul des structures en béton
- **Eurocode 7** : Calcul géotechnique
- **Eurocode 8** : Calcul des structures pour leur résistance aux séismes (si applicable)

### Principes fondamentaux
#### États limites
- **États Limites Ultimes (ELU)** : résistance, stabilité, équilibre
- **États Limites de Service (ELS)** : fissuration, déformation, vibration

#### Combinaisons d'actions
**ELU - Situations durables et transitoires**
```
1,35 G + 1,5 Q + 1,5 (ψ₀,i × Qi)
```

**ELU - Situations accidentelles**
```
G + Ad + (ψ₁ ou ψ₂) × Q
```

**ELS - Combinaison caractéristique (rare)**
```
G + Q + (ψ₀,i × Qi)
```

**ELS - Combinaison fréquente**
```
G + ψ₁ × Q + (ψ₂,i × Qi)
```

**ELS - Combinaison quasi-permanente**
```
G + (ψ₂ × Q)
```

Où :
- G : actions permanentes
- Q : action variable dominante
- Qi : autres actions variables
- ψ : coefficients de combinaison
- Ad : action accidentelle

## 2. Propriétés des matériaux
### Béton
#### Classes de résistance
Désignation : C fck/fck,cube
- fck : résistance caractéristique en compression sur cylindre (MPa)
- fck,cube : résistance caractéristique en compression sur cube (MPa)

Exemple : C25/30, C30/37, C35/45, etc.

#### Propriétés mécaniques
- **Résistance de calcul en compression** : fcd = αcc × fck / γc
  * αcc : coefficient tenant compte des effets à long terme (1,0 en France)
  * γc : coefficient partiel (1,5 pour situations durables et transitoires)

- **Résistance de calcul en traction** : fctd = αct × fctk,0.05 / γc
  * fctk,0.05 : fractile 5% de la résistance en traction
  * αct : coefficient (1,0 en France)

- **Module d'élasticité** : Ecm = 22 [(fcm)/10]^0.3 (GPa)
  * fcm = fck + 8 MPa

- **Coefficient de Poisson** : ν = 0,2

- **Diagramme contrainte-déformation**
  * Parabole-rectangle (calcul non linéaire)
  * Diagramme bilinéaire (calcul simplifié)
  * Diagramme rectangulaire (calcul simplifié)

### Acier
#### Types d'armatures
- Armatures à haute adhérence (HA)
- Treillis soudés
- Armatures de précontrainte (torons, barres)

#### Classes de ductilité
- A : ductilité normale (εuk ≥ 2,5%)
- B : haute ductilité (εuk ≥ 5,0%)
- C : très haute ductilité (εuk ≥ 7,5%)

#### Propriétés mécaniques
- **Résistance de calcul** : fyd = fyk / γs
  * fyk : limite d'élasticité caractéristique
  * γs : coefficient partiel (1,15 pour situations durables et transitoires)

- **Module d'élasticité** : Es = 200 GPa

- **Diagramme contrainte-déformation**
  * Bilinéaire avec ou sans palier d'écrouissage

## 3. Durabilité et enrobage
### Classes d'exposition
- **X0** : Aucun risque de corrosion ni d'attaque
- **XC1 à XC4** : Corrosion induite par carbonatation
- **XD1 à XD3** : Corrosion induite par les chlorures
- **XS1 à XS3** : Corrosion induite par les chlorures marins
- **XF1 à XF4** : Attaque gel/dégel
- **XA1 à XA3** : Attaques chimiques

### Enrobage minimal
```
cmin = max(cmin,b ; cmin,dur + Δcdur,γ - Δcdur,st - Δcdur,add ; 10 mm)
```
Où :
- cmin,b : enrobage minimal pour l'adhérence
- cmin,dur : enrobage minimal selon les conditions environnementales
- Δcdur,γ : marge de sécurité
- Δcdur,st : réduction pour acier inoxydable
- Δcdur,add : réduction pour protection supplémentaire

### Enrobage nominal
```
cnom = cmin + Δcdev
```
Où :
- Δcdev : marge pour les tolérances d'exécution (généralement 10 mm)

## 4. Dimensionnement des éléments structuraux
### 4.1 Poutres
#### Analyse structurale
- Méthode des trois moments
- Méthode de la poutre continue
- Méthode des déplacements
- Méthode des éléments finis

#### Vérification à la flexion simple
**Détermination du moment résistant ultime**
```
MRd = As × fyd × z
```
Où :
- As : section d'armatures tendues
- z : bras de levier interne

**Détermination du moment appliqué**
```
MEd = combinaison d'actions selon ELU
```

**Condition à vérifier**
```
MRd ≥ MEd
```

**Détermination de la section d'armatures requise**
```
As,req = MEd / (fyd × z)
```
Avec z ≈ 0,9d pour une première approximation

**Vérification des sections minimales et maximales**
```
As,min = max(0,26 × fctm/fyk × bt × d ; 0,0013 × bt × d)
As,max = 0,04 × Ac
```
Où :
- bt : largeur de la zone tendue
- d : hauteur utile
- Ac : aire de la section de béton

#### Vérification à l'effort tranchant
**Résistance sans armature d'effort tranchant**
```
VRd,c = [CRd,c × k × (100 × ρl × fck)^(1/3) + k1 × σcp] × bw × d
```
Avec un minimum de :
```
VRd,c,min = (vmin + k1 × σcp) × bw × d
```
Où :
- CRd,c = 0,18/γc
- k = 1 + √(200/d) ≤ 2,0 (d en mm)
- ρl = Asl/(bw × d) ≤ 0,02
- Asl : section d'armature longitudinale tendue
- k1 = 0,15
- σcp : contrainte normale due à l'effort normal
- vmin = 0,035 × k^(3/2) × fck^(1/2)

**Résistance avec armatures d'effort tranchant**
```
VRd,s = Asw/s × z × fywd × cotθ
```
Où :
- Asw : section d'armatures d'effort tranchant
- s : espacement des armatures d'effort tranchant
- fywd : limite d'élasticité de calcul des armatures d'effort tranchant
- cotθ : cotangente de l'angle θ des bielles (1 ≤ cotθ ≤ 2,5)

**Condition à vérifier**
```
VRd ≥ VEd
```

**Vérification de la résistance maximale des bielles**
```
VRd,max = αcw × bw × z × ν1 × fcd / (cotθ + tanθ)
```
Où :
- αcw : coefficient tenant compte de l'état de contrainte dans la membrure comprimée
- ν1 = 0,6 × [1 - fck/250] (fck en MPa)

#### Vérification de la fissuration (ELS)
**Calcul de l'ouverture des fissures**
```
wk = sr,max × (εsm - εcm)
```
Où :
- sr,max : espacement maximal des fissures
- εsm : déformation moyenne des armatures
- εcm : déformation moyenne du béton entre les fissures

**Limitation de l'ouverture des fissures**
Classes d'exposition :
- X0, XC1 : wmax = 0,4 mm
- XC2, XC3, XC4, XD1, XS1 : wmax = 0,3 mm
- XD2, XD3, XS2, XS3 : wmax = 0,2 mm

#### Vérification des flèches (ELS)
**Méthodes de calcul**
- Méthode directe par intégration de la courbure
- Méthode simplifiée (coefficients forfaitaires)
- Limitation du rapport portée/hauteur utile

**Limitation des flèches**
- Toiture plates : L/250
- Planchers : L/250 à L/500 selon destination
- Éléments portant des cloisons fragiles : L/500

### 4.2 Poteaux
#### Sollicitations
- Compression simple
- Flexion composée
- Flambement

#### Dimensionnement à la compression simple
**Résistance en compression pure**
```
NRd = 0,8 × Ac × fcd + As × σs
```
Où :
- Ac : section de béton
- As : section totale d'armatures
- σs : contrainte dans les armatures (= fyd si εc = 0,002)

**Section minimale d'armatures longitudinales**
```
As,min = max(0,10 × NEd/fyd ; 0,002 × Ac)
```

**Section maximale d'armatures longitudinales**
```
As,max = 0,04 × Ac (sections courantes)
As,max = 0,08 × Ac (zones de recouvrement)
```

**Diamètre minimal des armatures longitudinales**
- 8 mm en général
- 12 mm pour poteaux préfabriqués

#### Dimensionnement à la flexion composée
**Diagramme d'interaction M-N**
- Méthode exacte par intégration des contraintes
- Méthodes simplifiées (abaques, formules approchées)

#### Prise en compte du flambement
**Élancement limite**
```
λlim = 20 × A × B × C / √n
```
Où :
- A : coefficient dépendant du fluage
- B : coefficient dépendant de l'excentricité relative
- C : coefficient dépendant du ferraillage
- n : effort normal réduit = NEd/(Ac × fcd)

**Méthode basée sur la courbure nominale**
Moment du second ordre :
```
M2 = NEd × e2
```
Avec :
```
e2 = (1/r) × L0²/c
```
Où :
- 1/r : courbure
- L0 : longueur de flambement
- c : coefficient dépendant de la distribution de la courbure (généralement = 10)

**Méthode basée sur la rigidité nominale**
Moment du second ordre :
```
M2 = NEd × e2 = NEd × (1/NEd - 1/NB)
```
Où :
- NB : charge critique d'Euler basée sur la rigidité nominale

### 4.3 Dalles
#### Types de dalles
- Dalles sur appuis ponctuels
- Dalles sur appuis linéaires
- Dalles-champignons
- Dalles nervurées

#### Méthodes d'analyse
- Méthode des lignes de rupture
- Méthode des portiques équivalents
- Méthode des éléments finis
- Méthode des bandes

#### Vérification à la flexion
Similaire aux poutres, mais en considérant une bande de largeur unitaire.

#### Vérification au poinçonnement
**Contrainte de cisaillement au périmètre critique**
```
vEd = β × VEd / (ui × d)
```
Où :
- β : coefficient tenant compte de l'excentricité
- VEd : effort tranchant appliqué
- ui : périmètre de contrôle considéré
- d : hauteur utile moyenne

**Résistance au poinçonnement sans armatures spécifiques**
```
vRd,c = CRd,c × k × (100 × ρl × fck)^(1/3) + k1 × σcp
```

**Résistance au poinçonnement avec armatures**
```
vRd,cs = 0,75 × vRd,c + 1,5 × (d/sr) × Asw × fywd,ef × (1/ui × d)
```
Où :
- sr : espacement radial des armatures de poinçonnement
- Asw : section d'une armature de poinçonnement
- fywd,ef : résistance effective des armatures de poinçonnement

### 4.4 Fondations
#### Semelles isolées
**Dimensionnement géotechnique**
```
NEd ≤ A × qref
```
Où :
- NEd : effort normal de calcul
- A : surface de la semelle
- qref : capacité portante du sol

**Dimensionnement en flexion**
```
MEd = σd × b × (a-a0)²/2
```
Où :
- σd : contrainte du sol à l'ELU
- b : largeur de la semelle
- a : longueur de la console
- a0 : distance du bord au nu du poteau

**Vérification au poinçonnement**
Similaire aux dalles.

#### Semelles filantes
Similaire aux semelles isolées, mais avec analyse en bande.

#### Radiers
- Méthode des éléments finis
- Méthode des grilles de poutres

## 5. Détails constructifs
### Dispositions pour les poutres
#### Armatures longitudinales
- Diamètre minimal : 8 mm
- Espacement minimal : max(Φ ; dg+5 ; 20 mm)
- Espacement maximal : min(2h ; 250 mm)

#### Armatures transversales
- Diamètre minimal : max(6 mm ; Φlong/4)
- Espacement maximal : min(0,75d ; 600 mm)

#### Ancrages et recouvrements
**Longueur d'ancrage de référence**
```
lb,rqd = (Φ/4) × (σsd/fbd)
```
Où :
- Φ : diamètre de la barre
- σsd : contrainte de calcul
- fbd : contrainte ultime d'adhérence

**Longueur d'ancrage nette**
```
lbd = α1 × α2 × α3 × α4 × α5 × lb,rqd ≥ lb,min
```
Où α1 à α5 sont des coefficients correctifs.

**Longueur de recouvrement**
```
l0 = α1 × α2 × α3 × α5 × α6 × lb,rqd ≥ l0,min
```

### Dispositions pour les poteaux
#### Armatures longitudinales
- Nombre minimal : 4 pour sections rectangulaires, 3 pour sections circulaires
- Espacement maximal : 150 mm

#### Armatures transversales (cadres)
- Diamètre minimal : max(6 mm ; Φlong/4)
- Espacement maximal : min(15Φlong ; dimension minimale du poteau ; 300 mm)
- Réduction de l'espacement à 0,6 fois près des appuis

### Dispositions pour les dalles
#### Armatures principales
- Diamètre minimal : 8 mm
- Espacement maximal : min(2h ; 250 mm)

#### Armatures de répartition
- Section minimale : 20% des armatures principales
- Espacement maximal : min(3h ; 400 mm)

## 6. Exemples de calcul
### Exemple 1 : Dimensionnement d'une poutre en flexion simple
[Détail du calcul avec application numérique]

### Exemple 2 : Dimensionnement d'un poteau en flexion composée
[Détail du calcul avec application numérique]

### Exemple 3 : Dimensionnement d'une dalle sur appuis ponctuels
[Détail du calcul avec application numérique]

### Exemple 4 : Dimensionnement d'une semelle isolée
[Détail du calcul avec application numérique]

## Annexes
- Tableaux des coefficients partiels γ
- Tableaux des coefficients ψ
- Tables de ferraillage
- Formulaire général
- Références normatives

## Références bibliographiques
- EN 1992-1-1: Eurocode 2: Design of concrete structures - Part 1-1: General rules and rules for buildings
- EN 1992-1-2: Eurocode 2: Design of concrete structures - Part 1-2: General rules - Structural fire design
- EN 1990: Eurocode - Basis of structural design
- EN 1991: Eurocode 1: Actions on structures
      `
    },
    {
      title: "Analyse technique des ponts thermiques",
      description: "Méthodes d'analyse et solutions pour traiter les ponts thermiques dans les constructions.",
      category: "technique",
      downloadable: true,
      size: "4.2 MB",
      content: `
# Analyse technique des ponts thermiques

## Introduction
Les ponts thermiques constituent des points faibles dans l'enveloppe thermique des bâtiments. Ils sont responsables de pertes de chaleur significatives, de risques de condensation et de développement de moisissures. Ce guide présente les méthodes d'analyse et les solutions de traitement des ponts thermiques, dans le cadre de la réglementation thermique en vigueur.

## 1. Définition et impact des ponts thermiques
### Définition
Un pont thermique est une zone ponctuelle ou linéaire où la résistance thermique est altérée dans l'enveloppe d'un bâtiment. Il s'agit d'une discontinuité dans l'isolation thermique qui favorise les transferts de chaleur.

### Types de ponts thermiques
#### Ponts thermiques linéaires (ψ)
- Liaison façade/plancher
- Liaison façade/refend
- Liaison façade/toiture
- Contour des baies
- Acrotères

#### Ponts thermiques ponctuels (χ)
- Ancrages ponctuels
- Fixations traversantes
- Balcons ponctuels

### Impact énergétique
- Augmentation des déperditions thermiques (jusqu'à 20% des pertes totales)
- Réduction de la performance globale de l'enveloppe
- Surcoûts de chauffage

### Impact sur le confort et la salubrité
- Parois froides et sensation d'inconfort
- Risques de condensation superficielle
- Développement de moisissures
- Dégradation des finitions

## 2. Méthodes d'analyse et de calcul
### Grandeurs physiques caractéristiques
#### Coefficient de transmission thermique linéique (ψ)
Exprimé en W/(m.K), il caractérise les ponts thermiques linéaires.

#### Coefficient de transmission thermique ponctuel (χ)
Exprimé en W/K, il caractérise les ponts thermiques ponctuels.

#### Température de surface intérieure (θsi)
- Permet d'évaluer le risque de condensation
- S'exprime via le facteur de température (fRsi)

### Méthodes de calcul
#### Méthode des éléments finis (2D et 3D)
- Modélisation numérique
- Norme EN ISO 10211
- Logiciels spécialisés (THERM, HEAT, TRISCO, FLIXO)

#### Méthode des valeurs tabulées
- Catalogues de ponts thermiques
- Fascicule 5/5 des règles Th-U
- Normes EN ISO 14683 et EN ISO 6946

#### Méthode simplifiée
- Majoration forfaitaire pour l'étude thermique
- Précision limitée, approche conservatrice

### Facteur de température fRsi
```
fRsi = (θsi - θe) / (θi - θe)
```
Où :
- θsi : température de surface intérieure (°C)
- θe : température extérieure (°C)
- θi : température intérieure (°C)

Pour éviter la condensation superficielle :
```
fRsi > fRsi,min
```
Avec fRsi,min dépendant des conditions climatiques et d'usage du local.

## 3. Réglementation et exigences
### Réglementation thermique RE2020
#### Exigences sur les ponts thermiques
- Ratio de transmission thermique linéique moyen global : ψmoyen ≤ 0,33 W/(m².K)
- Ponts thermiques entre planchers intermédiaires et façades : ψ ≤ 0,6 W/(m.K)

#### Traitement spécifique pour les bâtiments passifs
- Objectif : ψmoyen ≤ 0,05 W/(m².K)
- Valeur ψ ≤ 0,01 W/(m.K) pour les liaisons optimisées

### Prévention des risques de condensation
#### Facteur de température minimum
- Logements, bureaux, écoles : fRsi,min ≥ 0,73
- Locaux à forte hygrométrie : fRsi,min ≥ 0,80

## 4. Solutions constructives pour les principaux ponts thermiques
### Liaison façade/plancher bas
#### Plancher sur terre-plein
- Isolation périphérique horizontale prolongée (min. 1m)
- Isolation verticale des soubassements
- Rupteurs de pont thermique en about de plancher

#### Plancher sur vide sanitaire ou local non chauffé
- Isolation continue sous plancher
- Remontée d'isolation en périphérie
- Plancher à prédalles isolées

### Liaison façade/plancher intermédiaire
#### Façade maçonnée avec ITE
- Décalage de plancher vers l'intérieur
- Rupteurs de pont thermique
- Encadrement de nez de plancher

#### Façade en béton avec ITE
- Corbeau isolé
- Balcons désolidarisés ou sur structure indépendante
- Rupteurs thermiques structurels

#### Façade avec ITI
- Recouvrement de l'isolant au niveau du plancher
- Isolation en sous-face de plancher sur 60 cm
- Désolidarisation partielle du plancher

### Liaison façade/plancher toiture-terrasse
#### Toiture-terrasse béton
- Acrotère à isolation continue
- Relevé d'étanchéité avec isolant vertical
- Désolidarisation des acrotères

#### Toiture-terrasse bois
- Passage de l'isolant de façade devant la structure
- Réduction des sections de bois traversantes
- Détails d'aboutage spécifiques

### Contour des baies
#### Retours d'isolant en tableaux
- Épaisseur minimale : 3 à 6 cm selon configuration
- Continuité avec l'isolant de façade
- Traitement spécifique du linteau

#### Pose de menuiseries
- Pose en applique extérieure
- Précadres isolants
- Coffres de volets roulants isolés

### Balcons et loggias
#### Balcons
- Balcons autoportants (structure indépendante)
- Balcons rapportés sur structure secondaire
- Rupteurs thermiques structurels

#### Loggias
- Isolation périphérique complète
- Traitement des retours verticaux
- Isolation du plancher et du plafond

## 5. Matériaux spécifiques et solutions industrielles
### Rupteurs de ponts thermiques
#### Rupteurs pour planchers
- Composition : béton fibré/isolant/acier inoxydable
- Performance : ψ réduit jusqu'à 0,05 W/(m.K)
- Considérations structurelles : résistance au cisaillement, comportement au feu

#### Rupteurs pour acrotères et refends
- Solutions préfabriquées
- Capacités de charge adaptées
- Performances thermiques certifiées

### Précadres et coffres isolants
- Matériaux isolants structurels
- Systèmes sous Avis Techniques
- Intégration dans les systèmes d'ITE

### Solutions pour façades à ossature bois
- Liteaux à rupture de pont thermique
- Équerres thermiquement optimisées
- Fixations à faible conductivité

## 6. Méthodes de mise en œuvre
### Précautions générales
- Continuité de l'isolation
- Traitement des interfaces entre matériaux
- Gestion des tolérances dimensionnelles
- Protection contre les intempéries pendant le chantier

### Points clés par type de liaison
#### Jonction façade/fondations
- Ordre des interventions
- Étanchéité à l'eau et à l'air
- Protection mécanique des isolants enterrés

#### Intégration des menuiseries
- Calepinage précis
- Étanchéité périphérique
- Positionnement optimal des menuiseries

#### Gestion des réseaux
- Éviter les percements d'isolant
- Prévoir des gaines et réservations
- Solutions pour passages obligatoires

## 7. Études de cas et retours d'expérience
### Bâtiments résidentiels
#### Maison individuelle passive
- Plancher bas sur dalle isolée
- Ossature bois à montants décalés
- Performance atteinte : ψmoyen = 0,04 W/(m².K)

#### Immeuble collectif RT2012
- Structure béton avec ITE
- Balcons sur structure indépendante
- Performance atteinte : ψmoyen = 0,28 W/(m².K)

### Bâtiments tertiaires
#### Immeuble de bureaux RE2020
- Façade à ossature bois préfabriquée
- Isolation continue
- Performance atteinte : ψmoyen = 0,18 W/(m².K)

#### Bâtiment d'enseignement
- Structure mixte béton/bois
- Double mur isolé pour façades
- Performance atteinte : ψmoyen = 0,22 W/(m².K)

## 8. Approche économique
### Coûts des solutions
- Surcoûts liés au traitement des ponts thermiques : 2 à 5% du coût construction
- Analyse par type de liaison (€/ml)
- Comparaison solutions traditionnelles/optimisées

### Retour sur investissement
- Économies d'énergie annuelles
- Durée de vie des solutions
- Temps de retour : 7 à 15 ans selon les configurations

### Aides financières mobilisables
- MaPrimeRénov'
- CEE spécifiques
- Aides locales

## 9. Conception bioclimatique et impact global
### Conception intégrée
- Approche dès l'esquisse architecturale
- Optimisation de la compacité du bâtiment
- Réduction du linéaire de ponts thermiques

### Analyse multicritères
- Impact thermique
- Complexité de mise en œuvre
- Durabilité des solutions
- Impact carbone des matériaux

## 10. Contrôle et mesures sur site
### Méthodes de contrôle
#### Thermographie infrarouge
- Période optimale : saison froide
- Écart de température intérieur/extérieur > 10°C
- Interprétation des thermogrammes

#### Mesures de températures de surface
- Capteurs de température
- Conditions de mesure normalisées
- Vérification du facteur fRsi

#### Test d'étanchéité à l'air
- Localisation des fuites aux jonctions
- Impact sur la performance globale
- Remédiation post-contrôle

## Conclusion
Le traitement efficace des ponts thermiques nécessite une approche globale dès la conception du bâtiment. Les solutions techniques disponibles permettent aujourd'hui d'atteindre des performances élevées, contribuant significativement à l'efficacité énergétique globale et au confort des occupants.

## Annexes
- Catalogue détaillé de solutions constructives
- Tableaux de valeurs ψ selon configurations
- Fiches techniques matériaux spécifiques
- Glossaire et références normatives
      `
    },
    {
      title: "Les architectures bioclimatiques en climat méditerranéen",
      description: "Principes et techniques de conception bioclimatique adaptées au climat méditerranéen.",
      category: "technique",
      downloadable: true,
      size: "6.8 MB",
      content: `
# Les architectures bioclimatiques en climat méditerranéen

## Introduction
L'architecture bioclimatique en zone méditerranéenne s'appuie sur des principes ancestraux revisités à la lumière des connaissances contemporaines. Elle vise à tirer parti des conditions climatiques spécifiques du bassin méditerranéen pour offrir un confort optimal aux occupants tout en minimisant les consommations énergétiques.

Ce guide présente les principes, stratégies et techniques de conception bioclimatique adaptés au climat méditerranéen, caractérisé par des étés chauds et secs et des hivers doux mais humides.

## 1. Caractéristiques du climat méditerranéen
### Données climatiques
#### Température
- Étés chauds : 25-35°C en moyenne
- Hivers doux : 5-15°C en moyenne
- Amplitude thermique journalière : 10-15°C

#### Ensoleillement
- Intensité solaire élevée : 1400-1800 kWh/m²/an
- Durée d'ensoleillement : 2500-3000 heures/an
- Angle solaire élevé en été, bas en hiver

#### Précipitations
- Concentration sur la période automne-hiver
- Étés secs (< 30 mm/mois)
- Cumul annuel : 400-800 mm

#### Vents
- Vents dominants variables selon localisation
- Brises littorales (terre-mer)
- Vents saisonniers spécifiques (Mistral, Tramontane, Sirocco)

### Spécificités régionales
- Littoral : influence maritime, amplitude thermique modérée
- Arrière-pays : continentalité plus marquée, amplitudes plus importantes
- Zones montagneuses : effets d'altitude et d'orientation des versants

## 2. Principes fondamentaux de l'architecture bioclimatique méditerranéenne
### Stratégie hiver/été
#### Hiver
- Capter l'énergie solaire
- Stocker la chaleur
- Conserver l'énergie
- Se protéger des vents froids

#### Été
- Se protéger du rayonnement solaire
- Dissiper la chaleur excédentaire
- Favoriser la ventilation naturelle
- Utiliser l'inertie thermique

### Adaptation au site
- Analyse microclimatique préalable
- Prise en compte de la topographie
- Influence de la végétation et des plans d'eau
- Effets d'obstacles proches (bâtiments, relief)

### Intégration de l'architecture vernaculaire
- Compacité des volumes
- Orientation raisonnée
- Dimensionnement des ouvertures
- Matériaux locaux à forte inertie

## 3. Implantation et orientation
### Choix du terrain
#### Critères bioclimatiques
- Exposition solaire (sud à sud-est optimal)
- Protection contre les vents dominants
- Topographie favorable (éviter les fonds de vallées humides)
- Présence de végétation et masses d'eau

#### Evaluation du potentiel bioclimatique
- Diagramme solaire spécifique
- Rose des vents locale
- Masques solaires naturels et construits
- Analyse des ombres portées saisonnières

### Orientation du bâtiment
#### Façades principales
- Axe longitudinal est-ouest
- Façade principale orientée sud à sud-est (± 20°)
- Minimisation des surfaces est et ouest

#### Organisation des espaces intérieurs
- Espaces de vie au sud
- Espaces tampons au nord
- Zonage thermique progressif
- Circulation des flux d'air

### Forme et compacité
- Compacité modérée (coefficient de forme 0,7-1,0)
- Articulation de volumes simples
- Décrochements limités mais judicieux
- Volumes intérieurs modulables

## 4. Enveloppe et inertie thermique
### Murs et isolation
#### Solutions constructives adaptées
- Murs épais à forte inertie
- Isolation thermique par l'extérieur
- Doubles murs avec isolation intermédiaire
- Façades ventilées

#### Matériaux traditionnels revisités
- Pierre calcaire locale (30-50 cm)
- Terre crue (pisé, bauge, adobe)
- Béton de chanvre/chaux
- Briques de terre cuite alvéolaires

### Toitures
#### Formes adaptées
- Toitures-terrasses accessibles
- Toitures à faible pente
- Double toiture ventilée
- Combles habitables isolés

#### Solutions spécifiques
- Toitures végétalisées (extensives ou semi-intensives)
- Sur-toiture ventilée
- Couverture à forte réflectivité solaire
- Intégration de capteurs solaires

### Inertie thermique
#### Principes de fonctionnement
- Décalage thermique jour/nuit (déphasage 8-12h)
- Amortissement des pics de température
- Stockage de chaleur solaire passive en hiver
- Rafraîchissement nocturne en été

#### Mise en œuvre
- Masses thermiques exposées à l'intérieur
- Continuité des matériaux à inertie
- Couplage avec ventilation nocturne
- Solutions d'inertie réparties

## 5. Ouvertures et protections solaires
### Dimensionnement des baies
#### Façade sud
- Ratio vitrage/surface de plancher : 15-25%
- Hauteur optimisée pour capter le soleil d'hiver
- Allèges pleines pour inertie

#### Autres orientations
- Est/Ouest : surfaces limitées (< 10% de la façade)
- Nord : ouvertures réduites (5-10% de la façade)
- Zénithales : contrôlées et protégées

### Protections solaires
#### Fixes
- Débords de toiture calculés
- Brise-soleil horizontaux (sud)
- Brise-soleil verticaux (est/ouest)
- Pergolas et treilles

#### Mobiles
- Volets persiennés extérieurs
- Stores à projection
- Toiles tendues et voiles
- Persiennes coulissantes

#### Végétales
- Arbres à feuilles caduques (sud)
- Treilles et pergolas végétalisées
- Plantes grimpantes saisonnières
- Haies brise-vent décidues

### Vitrages performants
- Double vitrage à contrôle solaire (facteur solaire g = 0,30-0,40)
- Transmission lumineuse élevée (TL > 50%)
- Coefficient thermique adapté (Uw < 1,3 W/m².K)
- Facteur de transmission solaire modulé selon orientations

## 6. Ventilation naturelle et rafraîchissement passif
### Principes de ventilation naturelle
#### Ventilation traversante
- Orientation par rapport aux vents dominants et brises
- Différence de pression entre façades
- Dimensionnement des ouvertures entrée/sortie
- Cheminement de l'air intérieur optimisé

#### Effet cheminée
- Exploitation des différences de température
- Utilisation de volumes en hauteur
- Extracteurs statiques en toiture
- Tours à vent et capteurs d'air

### Solutions architecturales spécifiques
#### Patios et cours intérieures
- Microclimat contrôlé
- Effet de cheminée accentué
- Source de fraîcheur en été
- Protection contre les vents en hiver

#### Moucharabiehs contemporains
- Filtration de la lumière
- Modulation de la ventilation
- Protection visuelle
- Élément architectural identitaire

#### Espaces tampons
- Serres bioclimatiques au sud (hiver)
- Galeries ventilées (été)
- Vérandas à usage saisonnier
- Espaces intermédiaires intérieur/extérieur

### Rafraîchissement évaporatif
- Fontaines et bassins intérieurs/extérieurs
- Murs d'eau et cascades
- Brumisation contrôlée
- Végétation transpirante

## 7. Stratégies d'ombrage et végétalisation
### Conception des espaces extérieurs
#### Minéralité contrôlée
- Revêtements à albédo élevé
- Perméabilité des sols
- Alternance ombre/lumière
- Création de microclimats

#### Disposition de la végétation
- Arbres à feuilles caduques au sud et à l'ouest
- Haies brise-vent au nord
- Pergolas végétalisées
- Jardins en terrasses

### Végétalisation du bâti
#### Façades végétalisées
- Plantes grimpantes caduques
- Murs végétaux
- Balcons et terrasses plantés
- Double peau végétale

#### Toitures végétalisées méditerranéennes
- Sélection de plantes xérophytes
- Substrat adapté (drainant, léger)
- Rétention d'eau limitée
- Irrigation par récupération d'eau de pluie

### Gestion de l'eau
- Récupération des eaux pluviales
- Stockage saisonnier
- Réutilisation pour irrigation
- Jardins secs et plantes méditerranéennes

## 8. Systèmes passifs et actifs complémentaires
### Chauffage passif
#### Systèmes solaires passifs
- Murs Trombe ventilés
- Serres bioclimatiques
- Murs capteurs
- Planchers solaires directs

#### Chauffage d'appoint adapté
- Poêles à bois à inertie
- Planchers chauffants basse température
- Radiateurs à inertie

### Rafraîchissement passif et basse consommation
#### Puits provençal/canadien
- Dimensionnement adapté au climat méditerranéen
- Profondeur optimale : 2-3 m
- Longueur : 30-50 m
- Couplage avec ventilation mécanique

#### Brasseurs d'air
- Ventilateurs de plafond basse consommation
- Pilotage selon température
- Complément à la ventilation naturelle

#### Climatisation solaire
- Machines à absorption
- Couplage avec capteurs solaires thermiques
- Stockage de chaleur

### Éclairage naturel
- Optimisation de la lumière naturelle
- Réflecteurs et conduits de lumière
- Protection contre l'éblouissement
- Complémentarité avec l'éclairage artificiel

## 9. Matériaux et techniques de construction
### Matériaux traditionnels revisités
#### Pierre
- Pierre massive locale (calcaire, grès)
- Gabions et structures mixtes
- Pierres de parement sur isolation
- Graviers et pierres concassées pour inertie externe

#### Terre crue
- Pisé contemporain
- BTC (Briques de Terre Compressée)
- Enduits terre-chaux
- Terre allégée (terre-paille, terre-copeaux)

#### Chaux
- Enduits perspirables
- Badigeons réflectifs
- Béton de chaux isolant
- Mortiers adaptés

### Matériaux contemporains adaptés
#### Bétons spéciaux
- Béton de chanvre
- BHP (Bétons Hautes Performances) à inertie
- Bétons bas carbone
- Bétons isolants structurels

#### Bois méditerranéens
- Essences locales adaptées (pin d'Alep, chêne vert)
- Structures légères pour extensions
- Bardages ventilés
- Protection contre les insectes xylophages

### Revêtements et finitions
- Enduits à la chaux perspirants
- Peintures minérales à fort albédo
- Carrelages et terres cuites à inertie
- Stucs et tadelakt

## 10. Études de cas méditerranéens
### Villa Méditerranée contemporaine (Provence)
- Conception: orientation sud avec protection solaire calculée
- Matériaux: pierre massive, bois local, toiture végétalisée
- Systèmes: puits provençal, récupération d'eau, panneaux solaires
- Performance: consommation 30 kWh/m²/an, confort été sans climatisation

### Rénovation bioclimatique (Languedoc)
- Bâti ancien en pierre
- Isolation respirante par l'intérieur
- Création d'une cour intérieure
- Ventilation naturelle optimisée
- Économies d'énergie: 75% après rénovation

### Habitat collectif (Côte d'Azur)
- Gradins avec terrasses végétalisées
- Ventilation traversante pour chaque logement
- Double peau ventilée en façade sud
- Gestion collective de l'eau
- Confort d'été sans climatisation

### Bâtiment tertiaire bioclimatique (Catalogne)
- Atrium central régulateur thermique
- Façade sud à double peau
- Rafraîchissement adiabatique
- Ventilation nocturne automatisée
- Consommation totale: 40 kWh/m²/an

## 11. Intégration aux réglementations et labels
### Adaptation à la RE2020
- Optimisation du Bbio
- Stratégies pour le confort d'été (DH)
- Réduction de l'impact carbone
- Valorisation des énergies renouvelables

### Labels spécifiques
- BDM (Bâtiments Durables Méditerranéens)
- Passivhaus méditerranéen
- LEED adaptation régionale
- BREEAM adaptation méditerranéenne

### Aides financières mobilisables
- Aides régionales spécifiques
- Ma Prime Rénov' adaptée
- CEE bonifié pour solutions bioclimatiques
- Subventions européennes (FEDER)

## Conclusion
L'architecture bioclimatique en climat méditerranéen représente une synthèse entre tradition et innovation. En s'appuyant sur une compréhension fine du climat local et des ressources disponibles, elle permet de créer des bâtiments confortables, économes en énergie et parfaitement adaptés à leur contexte. Face aux défis du changement climatique et de la transition énergétique, ces approches constituent une voie d'avenir pour la construction et la rénovation du bâti méditerranéen.

## Annexes
- Données climatiques détaillées par sous-régions méditerranéennes
- Diagrammes solaires pour différentes latitudes méditerranéennes
- Détails constructifs types
- Palette de matériaux adaptés
- Ressources et références bibliographiques
      `
    }
  ];

  const handleDownloadGuide = (guide) => {
    // Vérifier si le guide a déjà été téléchargé
    if (downloadedGuides.includes(guide.title)) {
      // Si déjà téléchargé, on ouvre le guide
      setSelectedGuide(guide);
      setIsGuideOpen(true);
    } else {
      // Simuler un téléchargement
      setTimeout(() => {
        // Ajouter le guide à la liste des téléchargés
        setDownloadedGuides([...downloadedGuides, guide.title]);
        
        toast({
          title: "Guide téléchargé",
          description: `"${guide.title}" a été téléchargé avec succès.`,
          duration: 3000,
        });
        
        // Ouvre le guide après le premier téléchargement
        setSelectedGuide(guide);
        setIsGuideOpen(true);
      }, 800);
    }
  };

  const handleCloseGuide = () => {
    setIsGuideOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Guides pratiques</h2>
        <p className="text-gray-600">Des ressources complètes pour vous accompagner dans vos projets.</p>
      </div>

      <Tabs defaultValue="construction" className="w-full">
        <TabsList className="mb-6 bg-khaki-50">
          {categories.map(category => (
            <TabsTrigger 
              key={category.id}
              value={category.id}
              className="data-[state=active]:bg-khaki-100 data-[state=active]:text-khaki-800"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guides
                .filter(guide => guide.category === category.id)
                .map((guide, index) => (
                  <Card key={index} className="border border-gray-200 hover:border-khaki-300 transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg font-medium">{guide.title}</CardTitle>
                        {guide.type === 'video' ? (
                          <Video className="h-5 w-5 text-khaki-600" />
                        ) : guide.type === 'document' ? (
                          <FileArchive className="h-5 w-5 text-khaki-600" />
                        ) : (
                          <FileText className="h-5 w-5 text-khaki-600" />
                        )}
                      </div>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between pt-2 text-sm text-gray-600">
                      <span>{guide.size}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadGuide(guide)}
                        className={downloadedGuides.includes(guide.title) ? "bg-green-50 text-green-600 border-green-200" : ""}
                      >
                        {downloadedGuides.includes(guide.title) ? (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            Consulter
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Section des webinaires et ressources additionnelles */}
      <div className="mt-10 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Ressources complémentaires</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-gray-200">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-medium">Webinaires explicatifs</CardTitle>
                <Video className="h-5 w-5 text-khaki-600" />
              </div>
              <CardDescription>Accédez à nos webinaires en replay sur différentes thématiques</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <ul className="space-y-3">
                <li className="flex items-center text-sm">
                  <File className="h-4 w-4 mr-2 text-khaki-500" />
                  <span>Webinaire RE2020 - Janvier 2024</span>
                </li>
                <li className="flex items-center text-sm">
                  <File className="h-4 w-4 mr-2 text-khaki-500" />
                  <span>Rénovation énergétique - Mars 2024</span>
                </li>
                <li className="flex items-center text-sm">
                  <File className="h-4 w-4 mr-2 text-khaki-500" />
                  <span>Financement de projets - Février 2024</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Voir tous les webinaires
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border border-gray-200">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-medium">Textes réglementaires</CardTitle>
                <FileArchive className="h-5 w-5 text-khaki-600" />
              </div>
              <CardDescription>Consultez les textes officiels et documents de référence</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <ul className="space-y-3">
                <li className="flex items-center text-sm">
                  <File className="h-4 w-4 mr-2 text-khaki-500" />
                  <span>Texte intégral RE2020</span>
                </li>
                <li className="flex items-center text-sm">
                  <File className="h-4 w-4 mr-2 text-khaki-500" />
                  <span>Arrêtés techniques (compilation)</span>
                </li>
                <li className="flex items-center text-sm">
                  <File className="h-4 w-4 mr-2 text-khaki-500" />
                  <span>DTU et normes applicables</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Accéder à la bibliothèque
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border border-gray-200">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-medium">Outils et Modèles</CardTitle>
                <FileText className="h-5 w-5 text-khaki-600" />
              </div>
              <CardDescription>Téléchargez nos modèles et outils pratiques</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <ul className="space-y-3">
                <li className="flex items-center text-sm">
                  <File className="h-4 w-4 mr-2 text-khaki-500" />
                  <span>Modèles de contrats</span>
                </li>
                <li className="flex items-center text-sm">
                  <File className="h-4 w-4 mr-2 text-khaki-500" />
                  <span>Outils d'évaluation énergétique</span>
                </li>
                <li className="flex items-center text-sm">
                  <File className="h-4 w-4 mr-2 text-khaki-500" />
                  <span>Fiches techniques matériaux</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Voir tous les outils
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Guide Viewer Dialog */}
      {selectedGuide && (
        <Dialog open={isGuideOpen} onOpenChange={handleCloseGuide}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">{selectedGuide.title}</DialogTitle>
              <DialogDescription className="text-base">{selectedGuide.description}</DialogDescription>
            </DialogHeader>
            
            <div className="mt-4 border-t border-gray-200 pt-4">
              {selectedGuide.content ? (
                <div className="prose prose-khaki max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: selectedGuide.content.replace(/\n/g, '<br />').replace(/^# (.*$)/gm, '<h1>$1</h1>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/^### (.*$)/gm, '<h3>$1</h3>').replace(/^- (.*$)/gm, '<li>$1</li>') }} />
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">
                    Contenu en cours de chargement ou non disponible en aperçu.
                    <br />
                    Veuillez télécharger le guide complet pour accéder à l'ensemble du contenu.
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Format PDF • {selectedGuide.size}
              </div>
              <Button onClick={handleCloseGuide}>
                Fermer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default WorkspaceGuides;
