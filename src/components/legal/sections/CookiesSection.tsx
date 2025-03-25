
import React from 'react';
import { Shield } from 'lucide-react';
import LegalSectionHeading from '../LegalSectionHeading';
import LegalSection from '../LegalSection';

const CookiesSection = () => {
  return (
    <LegalSection
      heading={<LegalSectionHeading icon={<Shield className="h-6 w-6" />} title="5. Cookies" />}
    >
      <p>
        Le site progineer.fr peut utiliser des cookies pour améliorer l'expérience de navigation des utilisateurs.
        Un cookie est un fichier de petite taille stocké sur le disque dur de l'utilisateur. Ces cookies ne 
        contiennent aucune information permettant d'identifier personnellement l'utilisateur.
      </p>
      <p>
        Vous pouvez configurer votre navigateur pour refuser les cookies ou être averti lorsqu'un cookie est envoyé.
      </p>
    </LegalSection>
  );
};

export default CookiesSection;
