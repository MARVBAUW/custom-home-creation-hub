import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import SimpleCaptcha from './SimpleCaptcha';
import FormField from './FormField';
import AuthButton from './AuthButton';

// Liste des emails administrateurs pour l'affichage conditionnel
const ADMIN_EMAILS = ['marvinbauwens@gmail.com', 'progineer.moe@gmail.com'];

const SignUpForm = () => {
  const navigate = useNavigate();
  const { signUp, signUpWithGoogle, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isAdminSignup, setIsAdminSignup] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  useEffect(() => {
    setIsAdminSignup(ADMIN_EMAILS.includes(email.toLowerCase()));
  }, [email]);

  useEffect(() => {
    if (isAdminSignup && !fullName) {
      setFullName('Administrateur');
    }
  }, [isAdminSignup, fullName]);

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
    } catch (err) {
      console.error('Error during signup:', err);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signUpWithGoogle();
    } catch (err) {
      console.error('Google Sign-Up Error:', err);
      setFormError('Erreur lors de la création du compte avec Google');
    }
  };

  return (
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
        <FormField
          id="fullName"
          label="Nom complet"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder={isAdminSignup ? "Administrateur" : "Jean Dupont"}
          disabled={loading}
        />

        <FormField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          isAdmin={isAdminSignup}
          disabled={loading}
        />

        <FormField
          id="password"
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <FormField
          id="confirmPassword"
          label="Confirmer le mot de passe"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
        />

        <div className="flex justify-center my-4">
          <SimpleCaptcha onVerify={setCaptchaVerified} />
        </div>

        <AuthButton loading={loading} isAdmin={isAdminSignup}>
          {loading ? 'Création en cours...' : isAdminSignup ? 'Créer le compte administrateur' : 'Créer mon compte'}
        </AuthButton>
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
      
      <AuthButton
        type="button"
        onClick={handleGoogleSignUp}
        disabled={loading}
        className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
      >
        <LogIn className="mr-2 h-5 w-5" />
        S'inscrire avec Google
      </AuthButton>

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
  );
};

export default SignUpForm;
