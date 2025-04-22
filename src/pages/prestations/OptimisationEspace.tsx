
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import { InternalLinkText } from '@/utils/internalLinking';

const OptimisationEspace = () => (
  <>
    <SEO
      title="Optimisation d'espace | Maître d'œuvre PACA - Progineer"
      description="Optimisez votre surface habitable ou professionnelle à Marseille ou PACA avec nos solutions innovantes d'optimisation d'espace."
      keywords="optimisation d'espace, aménagement intérieur, maître d'œuvre marseille"
      canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/optimisation-espace"
    />
    <Container>
      <h1 className="text-4xl font-bold mb-6">Optimisation d’espace à Marseille et PACA</h1>
      <p className="text-lg text-gray-700 mb-8">
        <InternalLinkText
          text="Vous souhaitez maximiser votre espace de vie ou de travail ? Progineer, maître d'œuvre à Marseille, vous propose des solutions d’aménagement intelligent : création de rangements, cloisons modulables, transformation de combles ou sous-sols. Notre savoir-faire s’étend aux habitations comme aux bureaux en region Provence-Alpes-Côte d'Azur."
          maxOccurrences={6}
        />
      </p>
      <h2 className="text-2xl font-semibold mb-4">Nos conseils d’expert</h2>
      <ul className="list-disc ml-8 mb-8 text-gray-700">
        <li><InternalLinkText text="Analyse fonctionnelle pour un agencement optimal" /></li>
        <li><InternalLinkText text="Aménagement intérieur personnalisé" /></li>
        <li><InternalLinkText text="Design d'espace et décoration sur-mesure" /></li>
      </ul>
      <p className="text-gray-700">
        <InternalLinkText
          text="Améliorez votre confort et valorisez votre bien grâce à notre maîtrise d’œuvre experte."
          maxOccurrences={3}
        />
      </p>
    </Container>
  </>
);

export default OptimisationEspace;
