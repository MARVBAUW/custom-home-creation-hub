
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import LegalSectionHeading from '../LegalSectionHeading';
import LegalSection from '../LegalSection';

const ForceMajeureSection = () => {
  return (
    <LegalSection
      heading={<LegalSectionHeading icon={<AlertTriangle className="h-6 w-6" />} title="Article 12 - Force majeure" />}
    >
      <p>
        La responsabilité du Prestataire ne pourra pas être mise en œuvre si la non-exécution ou le retard dans 
        l'exécution de l'une de ses obligations décrites dans les présentes conditions générales de vente découle 
        d'un cas de force majeure. À ce titre, la force majeure s'entend de tout événement extérieur, imprévisible 
        et irrésistible au sens de l'article 1218 du Code civil.
      </p>
    </LegalSection>
  );
};

export default ForceMajeureSection;
