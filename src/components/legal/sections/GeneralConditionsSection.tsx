
import React from 'react';
import { ClipboardList } from 'lucide-react';
import LegalSectionHeading from '../LegalSectionHeading';
import LegalSection from '../LegalSection';

const GeneralConditionsSection = () => {
  return (
    <LegalSection
      heading={<LegalSectionHeading icon={<ClipboardList className="h-6 w-6" />} title="Article 1 - Objet et champ d'application" />}
    >
      <p>
        Les présentes Conditions Générales de Vente (CGV) constituent le socle de la relation commerciale entre 
        la société Progineer, SARL au capital de 1 000 euros, immatriculée au RCS de Marseille sous le numéro SIRET 951 045 509 00015,
        dont le siège social est situé à Marseille, France (ci-après "le Prestataire") et ses clients professionnels 
        ou particuliers (ci-après "le Client").
      </p>
      <p>
        Elles s'appliquent à toutes les prestations de services conclues par le Prestataire auprès des Clients, 
        quelles que soient les clauses pouvant figurer sur les documents du Client, et notamment ses conditions générales d'achat.
      </p>
      <p>
        Conformément à la réglementation en vigueur, ces CGV sont systématiquement communiquées à tout Client 
        qui en fait la demande, pour lui permettre de passer commande auprès du Prestataire.
      </p>
    </LegalSection>
  );
};

export default GeneralConditionsSection;
