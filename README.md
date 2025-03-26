
# Progineer - Documentation du Projet

## Organisation des Styles

Le système de styles de Progineer est basé sur Tailwind CSS avec une architecture modulaire pour faciliter la maintenance et les évolutions. Les styles sont organisés en fichiers thématiques pour une meilleure séparation des préoccupations.

### Structure des Fichiers CSS

```
src/
├── App.css              # Point d'entrée principal important tous les fichiers CSS
├── index.css            # Imports Tailwind et autres fichiers CSS globaux
└── styles/
    ├── animations.css   # Animations et transitions
    ├── base.css         # Styles de base, variables CSS, configuration de la racine
    ├── buttons.css      # Styles des boutons et éléments interactifs
    ├── cards.css        # Styles pour les cartes et conteneurs de contenu
    ├── containers.css   # Layouts, sections et conteneurs
    ├── estimation.css   # Styles spécifiques à la fonctionnalité d'estimation
    ├── footer.css       # Styles spécifiques au footer
    ├── gantt.css        # Styles pour les diagrammes de Gantt
    ├── logo.css         # Styles et animations du logo
    ├── theme.css        # Définition des thèmes clair/sombre
    ├── typography.css   # Styles typographiques
    └── ui-elements.css  # Composants d'interface utilisateur réutilisables
```

### Utilisation des Classes Prédéfinies

Notre système de design utilise des classes utilitaires prédéfinies pour maintenir la cohérence visuelle :

#### Conteneurs et Mise en Page

```html
<!-- Conteneurs -->
<div className="container-lg">...</div>     <!-- Grand conteneur -->
<div className="container-md">...</div>     <!-- Conteneur moyen -->
<div className="container-sm">...</div>     <!-- Petit conteneur -->

<!-- Sections -->
<section className="section">...</section>  <!-- Section standard avec padding -->

<!-- Effets visuels -->
<div className="glassmorphism">...</div>    <!-- Effet verre dépoli -->
<div className="glass-card">...</div>       <!-- Carte avec effet verre -->
```

#### Typographie

```html
<!-- Titres spécifiques à Progineer -->
<h1 className="progineer-title">Titre Principal</h1>
<h2 className="progineer-subtitle">Sous-titre</h2>

<!-- Mise en valeur de texte -->
<span className="highlight-text">Texte important</span>

<!-- Améliorations de lisibilité -->
<p className="text-balance">Texte équilibré sur plusieurs lignes</p>

<!-- Séparateur décoratif -->
<div className="progineer-divider"></div>
```

#### Boutons

```html
<!-- Boutons principaux -->
<button className="btn-primary">Action Principale</button>
<button className="btn-secondary">Action Secondaire</button>
<button className="btn-outline">Action Tertiaire</button>
```

#### Animations

```html
<!-- Animation de construction progressive -->
<div className="build-element">Élément qui apparaît graduellement</div>

<!-- Animation d'apparition avec délai -->
<div className="fade-in" style={{ animationDelay: '0.2s' }}>Apparaît après délai</div>

<!-- Animations de direction -->
<div className="slide-in-left">Arrive depuis la gauche</div>
<div className="slide-in-right">Arrive depuis la droite</div>

<!-- Animation de pulsation -->
<div className="pulsate-element">Élément qui pulse</div>
```

#### Estimation et Calculateur

```html
<!-- Conteneur de formulaire d'estimation -->
<div className="estimation-form-container">...</div>

<!-- Champs de saisie stylisés -->
<input className="estimation-input" />

<!-- Animation de résultat -->
<div className="result-appear">Résultat qui apparaît</div>
```

### Composant Logo

Le logo Progineer dispose de plusieurs variantes qui peuvent être utilisées selon le contexte :

```jsx
import Logo from '@/components/common/Logo';

// Variantes de logo
<Logo variant="default" size="md" />       // Logo standard
<Logo variant="metallic" size="lg" />      // Logo avec effet métallique
<Logo variant="metallic-full" size="xl" /> // Logo métallique complet avec texte
<Logo variant="white" size="md" />         // Logo en blanc pour fonds sombres
<Logo variant="icon" size="sm" />          // Version iconique du logo

// Avec slogan
<Logo variant="default" size="md" withTagline={true} />

// Sans lien (pour empêcher la navigation)
<Logo variant="default" size="md" asLink={false} />
```

Tailles disponibles : `xs`, `sm`, `md`, `lg`, `xl`

### Thème et Mode Sombre

Le projet utilise les variables CSS pour définir les couleurs et prend en charge le mode sombre :

```css
/* Accès aux variables de couleur dans les styles personnalisés */
.custom-element {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: 1px solid hsl(var(--border));
}
```

Les couleurs spécifiques à Progineer :
- `progineer-gold` : Couleur or signature (#D4AF37)
- `progineer-dark` : Couleur sombre signature (#222222)

### Bonnes Pratiques

1. **Privilégier Tailwind** : Utiliser les classes Tailwind en priorité pour maintenir la cohérence
2. **Composants sur mesure** : Créer des composants réutilisables pour les patterns récurrents
3. **Préfixe Progineer** : Préfixer les classes personnalisées avec `progineer-` pour éviter les conflits
4. **Responsive** : Toujours concevoir en mobile-first avec les préfixes Tailwind (`sm:`, `md:`, `lg:`, etc.)
5. **Accessibilité** : Assurer un contraste suffisant pour tous les textes (WCAG AA minimum)

### Extension du Système

Pour ajouter de nouveaux styles, suivez ces étapes :

1. Identifiez la catégorie de style appropriée
2. Ajoutez vos styles dans le fichier CSS thématique correspondant
3. Utilisez `@layer components` pour les classes réutilisables
4. Documentez vos ajouts dans ce README ou dans des commentaires de code
5. Pour les nouvelles variables de couleur ou de taille, ajoutez-les dans `tailwind.config.ts`

## Structure du Projet

(Les autres sections de documentation du projet peuvent être ajoutées ici)
