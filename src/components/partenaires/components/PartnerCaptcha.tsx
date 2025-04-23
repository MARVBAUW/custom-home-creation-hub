
import React from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

interface PartnerCaptchaProps {
  visible: boolean;
  onVerify: (token: string) => void;
  error?: string | null;
}

export const PartnerCaptcha: React.FC<PartnerCaptchaProps> = ({
  visible,
  onVerify,
  error
}) => {
  if (!visible) {
    return (
      <div className="p-3 mb-2 text-center">
        <p className="text-sm text-amber-600">Chargement du captcha...</p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="border border-gray-200 rounded-md p-3 bg-gray-50">
        <HCaptcha
          sitekey="10000000-ffff-ffff-ffff-000000000001" 
          onVerify={onVerify}
          onError={(err) => {
            console.error("Erreur hCaptcha:", err);
          }}
          onLoad={() => {
            console.log("hCaptcha chargé avec succès");
          }}
          languageOverride="fr"
        />
        <p className="text-xs text-gray-500 mt-2">
          Cette vérification est nécessaire pour éviter les soumissions automatisées.
          <br/>
          <span className="italic text-amber-600">Note: Ceci est une clé de test hCaptcha. En production, utilisez une clé réelle.</span>
        </p>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
