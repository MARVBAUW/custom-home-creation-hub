
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import { InternalLinkText } from '@/utils/internalLinking';

const Extension = () => (
  <>
    <SEO
      title="Extension de maison | Maître d'œuvre PACA - Progineer"
      description="Agrandissez votre maison avec une extension sur-mesure réalisée par un maître d'œuvre à Marseille et en région PACA."
      keywords="extension maison, agrandissement, maître d'œuvre marseille, extension PACA"
      canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/extension"
    />
    <Container>
      <h1 className="text-4xl font-bold mb-6">Extension de maison à Marseille et PACA</h1>
      <p className="text-lg text-gray-700 mb-8">
        <InternalLinkText
          text="Besoin de plus d’espace ? Progineer, maître d'œuvre à Marseille spécialiste de l’extension de maison, gère l’intégralité de votre projet : conception, démarches administratives, suivi de chantier. Nos extensions sont pensées pour s’intégrer harmonieusement à l’existant, dans le respect des normes et avec une optimisation de l’espace et des apports lumineux."
          maxOccurrences={6}
        />
      </p>
      <h2 className="text-2xl font-semibold mb-4">Exemples d’extensions réalisées</h2>
      <ul className="list-disc ml-8 mb-8 text-gray-700">
        <li><InternalLinkText text="Surélévation de maison à Marseille" /></li>
        <li><InternalLinkText text="Extension latérale de villa en Provence-Alpes-Côte d'Azur" /></li>
        <li><InternalLinkText text="Aménagement de véranda et d'espaces de vie supplémentaires" /></li>
        <li><InternalLinkText text="Optimisation d'espace pour un meilleur confort" /></li>
      </ul>
      <p className="text-gray-700">
        <InternalLinkText
          text="Demandez une estimation ou contactez-nous pour étudier la faisabilité de votre projet d’extension."
          maxOccurrences={3}
        />
      </p>
    </Container>
  </>
);

export default Extension;
