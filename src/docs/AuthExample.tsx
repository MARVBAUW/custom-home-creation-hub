
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Exemple d'utilisation des hooks d'authentification
 * Ce composant montre comment utiliser le hook useAuth pour:
 * - Vérifier si un utilisateur est connecté
 * - Afficher différentes UI selon l'état d'authentification
 * - Gérer la connexion et la déconnexion
 */
const AuthExample: React.FC = () => {
  const { user, loading, signIn, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Formulaire de connexion
  const LoginForm = () => (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        signIn(email, password);
      }}
      className="space-y-4"
    >
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Mot de passe
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <Button type="submit" disabled={loading}>
        {loading ? 'Connexion...' : 'Se connecter'}
      </Button>
    </form>
  );

  // UI pour utilisateur connecté
  const UserProfile = () => (
    <div className="text-center">
      <div className="mb-4">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
          <span className="text-2xl">👤</span>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold">{user?.email}</h3>
      <p className="text-sm text-gray-500">ID: {user?.id}</p>
      
      <div className="mt-6">
        <Button onClick={() => signOut()} variant="outline">
          Se déconnecter
        </Button>
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          {user ? 'Profil Utilisateur' : 'Connexion'}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : user ? (
          <UserProfile />
        ) : (
          <LoginForm />
        )}
      </CardContent>
    </Card>
  );
};

export default AuthExample;
