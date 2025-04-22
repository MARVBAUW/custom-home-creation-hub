
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import { InternalLinkText } from '@/utils/internalLinking';

const DesignInterieur = () => (
  <>
    <SEO
      title="Design d'intérieur | Maître d'œuvre PACA - Progineer"
      description="Design d'intérieur et d'espace sur-mesure, par un maître d'œuvre à Marseille et en région PACA."
      keywords="design d'intérieur, design d'espace, aménagement intérieur, maître d'œuvre marseille"
      canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/design-interieur"
    />
    <Container>
      <h1 className="text-4xl font-bold mb-6">Design d'intérieur à Marseille et PACA</h1>
      <p className="text-lg text-gray-700 mb-8">
        <InternalLinkText
          text="Progineer sublime vos espaces de vie ou professionnels grâce à un design d’espace sur-mesure. Notre équipe, maître d'œuvre à Marseille, accompagne vos projets de la conception à la réalisation. Profitez d’un accompagnement personnalisé en aménagement intérieur et décoration, pour créer un univers à votre image, harmonieux et fonctionnel, dans toute la région PACA."
          maxOccurrences={6}
        />
      </p>
      <h2 className="text-2xl font-semibold mb-4">Quelques missions confiées</h2>
      <ul className="list-disc ml-8 mb-8 text-gray-700">
        <li><InternalLinkText text="Revalorisation d'appartements anciens à Marseille" /></li>
        <li><InternalLinkText text="Agencement de bureaux professionnels" /></li>
        <li><InternalLinkText text="Optimisation d’espace et choix des matériaux" /></li>
      </ul>
      <p className="text-gray-700">
        <InternalLinkText
          text="Contactez notre bureau d'étude pour une prestation de design d'intérieur adaptée à vos besoins."
          maxOccurrences={3}
        />
      </p>
    </Container>
  </>
);

export default DesignInterieur;
