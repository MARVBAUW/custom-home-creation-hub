
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface SignUpSuccessProps {
  isAdminSignup: boolean;
}

const SignUpSuccess: React.FC<SignUpSuccessProps> = ({ isAdminSignup }) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default SignUpSuccess;
