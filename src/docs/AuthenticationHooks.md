
# Documentation des Hooks d'Authentification

Cette documentation explique le système d'authentification refactorisé et comment utiliser les différents hooks disponibles.

## Architecture

Le système d'authentification est organisé en plusieurs modules:

- `AuthContext`: Définit le contexte d'authentification et le type des données partagées
- `AuthProvider`: Composant wrapper qui fournit l'état d'authentification à l'application
- `useAuthState`: Hook qui gère l'état d'authentification (session, utilisateur, chargement)
- `useSignIn`: Hook qui gère la connexion des utilisateurs
- `useSignUp`: Hook qui gère l'inscription des utilisateurs
- `useSignOut`: Hook qui gère la déconnexion des utilisateurs
- `useAuth`: Hook principal qui expose toutes les fonctionnalités d'authentification

## Utilisation de base

### 1. Envelopper votre application avec `AuthProvider`

```tsx
// Dans votre fichier App.tsx ou équivalent
import { AuthProvider } from '@/hooks/useAuth';

function App() {
  return (
    <AuthProvider>
      {/* Le contenu de votre application */}
    </AuthProvider>
  );
}
```

### 2. Utiliser le hook `useAuth` dans vos composants

```tsx
import { useAuth } from '@/hooks/useAuth';

function MonComposant() {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <div>Utilisateur non connecté</div>;
  }

  return (
    <div>
      <p>Bienvenue, {user.email}</p>
      <button onClick={() => signOut()}>Déconnexion</button>
    </div>
  );
}
```

## API des Hooks

### `useAuth`

Hook principal qui expose toutes les fonctionnalités d'authentification.

```tsx
const {
  session,  // Session Supabase actuelle (null si non connecté)
  user,     // Objet utilisateur actuel (null si non connecté)
  loading,  // Boolean indiquant si l'authentification est en cours de chargement
  error,    // Message d'erreur (null si pas d'erreur)
  signIn,   // Fonction pour connecter un utilisateur
  signUp,   // Fonction pour inscrire un utilisateur
  signOut   // Fonction pour déconnecter un utilisateur
} = useAuth();
```

### `useSignIn`

Hook pour connecter un utilisateur.

```tsx
// Dans useAuth.tsx, ce hook est déjà utilisé
// Voici comment il est implémenté:

const signIn = async (email: string, password: string) => {
  // Tente de connecter l'utilisateur avec Supabase
  // Gère les erreurs et notifications
};
```

### `useSignUp`

Hook pour inscrire un nouvel utilisateur.

```tsx
// Dans useAuth.tsx, ce hook est déjà utilisé
// Voici comment il est implémenté:

const signUp = async (email: string, password: string, metadata?: any) => {
  // Crée un nouvel utilisateur dans Supabase
  // Gère les erreurs et notifications
};
```

### `useSignOut`

Hook pour déconnecter un utilisateur.

```tsx
// Dans useAuth.tsx, ce hook est déjà utilisé
// Voici comment il est implémenté:

const signOut = async () => {
  // Déconnecte l'utilisateur de Supabase
  // Gère les erreurs et notifications
};
```

### `useAuthState`

Hook qui gère l'état d'authentification et les abonnements aux changements.

```tsx
// Dans AuthProvider.tsx, ce hook est déjà utilisé
// Il configure les écouteurs d'événements pour Supabase Auth
```

## Protéger les routes

Pour protéger une route et exiger l'authentification, utilisez le composant `ProtectedRoute`:

```tsx
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Dans votre configuration de routes (App.tsx ou équivalent)
<Route 
  path="/route-protegee" 
  element={
    <ProtectedRoute>
      <ComposantProtege />
    </ProtectedRoute>
  } 
/>
```

## Bonnes pratiques

1. **Gestion des erreurs**: Les hooks gèrent déjà les erreurs courantes et affichent des toasts, mais vous pouvez personnaliser les messages d'erreur.

2. **États de chargement**: Utilisez la propriété `loading` pour afficher un indicateur de chargement pendant les opérations d'authentification.

3. **Redirection**: Les hooks de connexion et déconnexion gèrent automatiquement la redirection vers les pages appropriées.

4. **Métadonnées utilisateur**: Lors de l'inscription, vous pouvez passer des métadonnées supplémentaires:
   ```tsx
   signUp('utilisateur@example.com', 'motdepasse', { 
     full_name: 'Nom Complet',
     role: 'client' 
   });
   ```

## Dépannage

### Problèmes courants

1. **"Invalid login credentials"**: Vérifiez que l'email et le mot de passe sont corrects.

2. **Redirection ne fonctionne pas**: Assurez-vous que les URL de redirection sont correctement configurées dans Supabase.

3. **Session non persistante**: Vérifiez que les cookies et le localStorage sont activés dans le navigateur.

### Débogage

Les hooks incluent des logs de débogage détaillés dans la console. Vérifiez la console du navigateur pour voir les événements d'authentification et les erreurs potentielles.
