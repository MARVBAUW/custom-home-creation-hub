
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import { InternalLinkText } from '@/utils/internalLinking';

const MontageAdministratif = () => {
  return (
    <>
      <SEO 
        title="Montage administratif | Maître d'œuvre PACA - Progineer"
        description="Accompagnement complet dans le montage administratif de votre projet immobilier en région PACA."
        keywords="montage administratif, permis de construire, dossier administratif, maître d'œuvre PACA"
        canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/montage-administratif"
      />
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-bold mb-6">Montage administratif</h1>
          <InternalLinkText
            text="Progineer vous accompagne dans toutes vos démarches de montage administratif : dépôt de permis de construire, déclaration préalable, autorisations et gestion des formalités auprès des collectivités. Notre équipe de maître d'œuvre à Marseille, Nice ou Toulon optimise votre projet de construction, rénovation, extension ou réhabilitation."
            maxOccurrences={2}
            className="text-lg text-gray-700 mb-4"
          />
        </Container>
      </section>
    </>
  );
};
export default MontageAdministratif;
