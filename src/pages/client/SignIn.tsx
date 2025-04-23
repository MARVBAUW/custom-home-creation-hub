import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, UserPlus, LogIn, Github } from 'lucide-react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

// Liste des emails administrateurs pour l'affichage conditionnel
const ADMIN_EMAILS = ['marvinbauwens@gmail.com', 'progineer.moe@gmail.com'];

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle, loading, error, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [isAdminSignin, setIsAdminSignin] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Vérifier si l'email entré est un email administrateur
  useEffect(() => {
    setIsAdminSignin(ADMIN_EMAILS.includes(email.toLowerCase()));
  }, [email]);

  useEffect(() => {
    // Si l'utilisateur est déjà connecté, redirigez-le vers l'espace client
    if (user) {
      console.log('User already signed in, redirecting to client area');
      navigate('/workspace/client-area');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email.trim()) {
      setFormError('L\'email est requis');
      return;
    }

    if (!password.trim()) {
      setFormError('Le mot de passe est requis');
      return;
    }

    if (!captchaToken) {
      setFormError('Veuillez valider le captcha');
      return;
    }

    console.log('Submitting login form with email:', email);
    
    if (isCreatingAccount) {
      // Créer un nouveau compte
      console.log('Creating new account with email:', email);
      await signUp(email, password, { 
        full_name: isAdminSignin ? 'Administrateur' : 'Nouvel Utilisateur',
        captchaToken 
      });
    } else {
      // Se connecter avec un compte existant
      console.log('Attempting to sign in with:', email);
      await signIn(email, password);
    }
  };

  // Pré-remplir le champ email pour faciliter la connexion admin
  useEffect(() => {
    // Si l'URL contient un paramètre pour faciliter la connexion admin
    const searchParams = new URLSearchParams(window.location.search);
    const adminLogin = searchParams.get('admin');
    if (adminLogin === 'true' && email === '') {
      setEmail('marvinbauwens@gmail.com');
      setPassword('Baullanowens1112.');
    }
  }, [email]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error('Google Sign-In Error:', err);
      setFormError('Erreur lors de la connexion avec Google');
    }
  };

  return (
    <>
      <Helmet>
        <title>Connexion Espace Client | Progineer - Architecte & Maître d'œuvre en PACA</title>
        <meta name="description" content="Connectez-vous à votre espace client Progineer pour suivre l'avancement de vos projets et accéder à vos documents." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Espace Client
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              {isCreatingAccount ? 'Créer un compte' : 'Connexion'}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              {isCreatingAccount 
                ? 'Créez votre compte pour accéder à votre espace client personnel.' 
                : 'Accédez à votre espace client pour suivre vos projets et consulter vos documents.'}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container size="sm">
          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
            {loading && !user ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600 mb-4"></div>
                <p className="text-gray-600">Vérification de l'authentification...</p>
              </div>
            ) : !user ? (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {isCreatingAccount ? 'Créez votre compte' : 'Connectez-vous à votre compte'}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    {isCreatingAccount 
                      ? 'Remplissez le formulaire ci-dessous pour créer votre compte' 
                      : 'Entrez vos identifiants pour accéder à votre espace client'}
                  </p>
                </div>

                {isAdminSignin && (
                  <Alert className="mb-4 bg-amber-50 border-amber-200">
                    <AlertDescription className="text-amber-700">
                      <strong>Connexion administrateur</strong> - Accès privilégié pour {email}
                    </AlertDescription>
                  </Alert>
                )}

                {(error || formError) && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>
                      {formError || error}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className={`border-gray-300 focus:ring-khaki-500 focus:border-khaki-500 ${
                        isAdminSignin ? 'bg-amber-50 border-amber-200' : ''
                      }`}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-gray-300 focus:ring-khaki-500 focus:border-khaki-500"
                      disabled={loading}
                    />
                  </div>

                  <div className="flex justify-center my-4">
                    <HCaptcha
                      sitekey="10000000-ffff-ffff-ffff-000000000001"
                      onVerify={(token) => setCaptchaToken(token)}
                      languageOverride="fr"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className={`w-full text-white ${
                      isAdminSignin 
                        ? 'bg-amber-600 hover:bg-amber-700' 
                        : 'bg-khaki-600 hover:bg-khaki-700'
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isCreatingAccount ? 'Création en cours...' : 'Connexion en cours...'}
                      </>
                    ) : (
                      isCreatingAccount ? 'Créer mon compte' : (isAdminSignin ? 'Connexion administrateur' : 'Se connecter')
                    )}
                  </Button>
                </form>
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300"></span>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Ou continuer avec
                    </span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full text-gray-700 hover:bg-gray-50"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  <Github className="mr-2 h-5 w-5" />
                  Continuer avec Google
                </Button>

                <div className="mt-6 text-center">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setIsCreatingAccount(!isCreatingAccount)}
                  >
                    {isCreatingAccount ? (
                      'J\'ai déjà un compte'
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Créer un nouveau compte
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Vous êtes connecté</h3>
                <p className="text-gray-600 mb-4">Redirection vers votre espace client...</p>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default SignIn;
