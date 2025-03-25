
import React from 'react';
import { Copyright } from 'lucide-react';
import LegalSectionHeading from '../LegalSectionHeading';
import LegalSection from '../LegalSection';

const IntellectualPropertySection = () => {
  return (
    <LegalSection
      heading={<LegalSectionHeading icon={<Copyright className="h-6 w-6" />} title="3. Propriété intellectuelle" />}
    >
      <p>
        L'ensemble des éléments constituant le site progineer.fr (textes, graphismes, logiciels, photographies, 
        images, vidéos, sons, plans, logos, marques, etc.) ainsi que le site lui-même, sont la propriété exclusive 
        de Progineer ou de ses partenaires. Ces éléments sont protégés par les lois françaises et internationales 
        relatives à la propriété intellectuelle.
      </p>
      <p>
        Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments 
        du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable 
        de Progineer.
      </p>
    </LegalSection>
  );
};

export default IntellectualPropertySection;
