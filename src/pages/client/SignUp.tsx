import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, UserPlus, LogIn, ArrowLeft } from 'lucide-react';
import SimpleCaptcha from '@/components/auth/SimpleCaptcha';

// Liste des emails administrateurs pour l'affichage conditionnel
const ADMIN_EMAILS = ['marvinbauwens@gmail.com', 'progineer.moe@gmail.com'];

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, signUpWithGoogle, loading, error, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isAdminSignup, setIsAdminSignup] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // Vérifier si l'email entré est un email administrateur
  useEffect(() => {
    setIsAdminSignup(ADMIN_EMAILS.includes(email.toLowerCase()));
  }, [email]);

  useEffect(() => {
    // Si l'utilisateur est déjà connecté, redirigez-le vers l'espace client
    if (user) {
      navigate('/workspace/client-area');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!isAdminSignup) {
      if (!fullName.trim()) {
        setFormError('Le nom complet est requis');
        return;
      }

      if (password.length < 6) {
        setFormError('Le mot de passe doit contenir au moins 6 caractères');
        return;
      }
    }

    if (!email.trim()) {
      setFormError('L\'email est requis');
      return;
    }

    if (!password.trim()) {
      setFormError('Le mot de passe est requis');
      return;
    }

    if (captchaVerified) {
      setFormError('Veuillez compléter la vérification de sécurité');
      return;
    }

    try {
      await signUp(email, password, { 
        full_name: fullName || (isAdminSignup ? 'Administrateur' : 'Nouvel Utilisateur'),
      });
      // If not an admin signup, redirect to onboarding form after successful signup
      if (!isAdminSignup && user) {
        navigate('/workspace/client-onboarding');
      }
    } catch (err) {
      console.error('Error during signup:', err);
    }
  };

  // Pré-remplir les champs pour l'administrateur
  useEffect(() => {
    if (isAdminSignup && !fullName) {
      setFullName('Administrateur');
    }
  }, [isAdminSignup, fullName]);

  // Redirect to onboarding for normal users, admin goes straight to dashboard
  useEffect(() => {
    if (user) {
      if (isAdminSignup) {
        navigate('/workspace/client-area');
      } else {
        navigate('/workspace/client-onboarding');
      }
    }
  }, [user, navigate, isAdminSignup]);

  const handleGoogleSignUp = async () => {
    try {
      await signUpWithGoogle();
    } catch (err) {
      console.error('Google Sign-Up Error:', err);
      setFormError('Erreur lors de la création du compte avec Google');
    }
  };

  return (
    <>
      <Helmet>
        <title>Créer un compte | Progineer - Architecte & Maître d'œuvre en PACA</title>
        <meta name="description" content="Créez votre compte Progineer pour accéder à votre espace client personnalisé." />
      </Helmet>

      <section className="pt-20 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="md">
          <div className="text-center">
            <div className="mb-6">
              <Link to="/workspace" className="flex items-center text-sm font-medium text-gray-600 hover:text-khaki-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour au workspace
              </Link>
            </div>
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Espace Client
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              {isAdminSignup ? 'Créer un compte administrateur' : 'Créer un compte'}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              {isAdminSignup 
                ? 'Création d\'un compte administrateur Progineer avec privilèges spéciaux.' 
                : 'Rejoignez Progineer et accédez à votre espace client personnalisé.'}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container size="sm">
          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600 mb-4"></div>
                <p className="text-gray-600">Création de votre compte...</p>
              </div>
            ) : user ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Compte créé avec succès</h3>
                <p className="text-gray-600 mb-6">
                  {isAdminSignup 
                    ? 'Votre compte administrateur est prêt. Vous pouvez maintenant vous connecter.'
                    : 'Vérifiez votre email pour confirmer votre compte.'}
                </p>
                <Button 
                  onClick={() => navigate('/workspace/sign-in')} 
                  className="bg-khaki-600 hover:bg-khaki-700 text-white"
                >
                  Se connecter
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {isAdminSignup ? 'Créer un compte administrateur' : 'Créez votre compte'}
                  </h2>
                  <p className="text-gray-600 mt-2">Remplissez le formulaire ci-dessous pour vous inscrire</p>
                </div>

                {isAdminSignup && (
                  <Alert className="mb-4 bg-amber-50 border-amber-200">
                    <AlertDescription className="text-amber-700">
                      Compte administrateur pour <strong>{email}</strong>.
                      Le mot de passe spécifié sera utilisé pour ce compte avec des privilèges étendus.
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
                    <Label htmlFor="fullName">Nom complet</Label>
                    <Input 
                      id="fullName" 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={isAdminSignup ? "Administrateur" : "Jean Dupont"}
                      className="border-gray-300 focus:ring-khaki-500 focus:border-khaki-500"
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className={`border-gray-300 focus:ring-khaki-500 focus:border-khaki-500 ${
                        isAdminSignup ? 'bg-amber-50 border-amber-200' : ''
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

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="border-gray-300 focus:ring-khaki-500 focus:border-khaki-500"
                      disabled={loading}
                    />
                  </div>

                  <div className="flex justify-center my-4">
                    <SimpleCaptcha onVerify={setCaptchaVerified} />
                  </div>

                  <Button 
                    type="submit" 
                    className={`w-full text-white ${
                      isAdminSignup 
                        ? 'bg-amber-600 hover:bg-amber-700' 
                        : 'bg-khaki-600 hover:bg-khaki-700'
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Création en cours...
                      </>
                    ) : isAdminSignup ? 'Créer le compte administrateur' : 'Créer mon compte'}
                  </Button>
                </form>
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300"></span>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Ou inscrivez-vous avec
                    </span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full text-gray-700 hover:bg-gray-50"
                  onClick={handleGoogleSignUp}
                  disabled={loading}
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  S'inscrire avec Google
                </Button>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Vous avez déjà un compte ?{' '}
                    <Link 
                      to="/workspace/sign-in" 
                      className="text-khaki-600 hover:text-khaki-700 font-medium"
                    >
                      Se connecter
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default SignUp;
