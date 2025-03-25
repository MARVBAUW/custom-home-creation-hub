
import React from 'react';
import { FileWarning } from 'lucide-react';
import LegalSectionHeading from '../LegalSectionHeading';
import LegalSection from '../LegalSection';

const GuaranteesSection = () => {
  return (
    <LegalSection
      heading={<LegalSectionHeading icon={<FileWarning className="h-6 w-6" />} title="Article 10 - Garanties" />}
    >
      <p>
        Le Prestataire est assuré pour sa responsabilité civile professionnelle auprès d'une compagnie notoirement solvable.
      </p>
      <p>
        Le Prestataire garantit le Client contre tout défaut de conformité des prestations et tout vice caché, 
        provenant d'un défaut de conception ou de réalisation des prestations fournies.
      </p>
    </LegalSection>
  );
};

export default GuaranteesSection;
