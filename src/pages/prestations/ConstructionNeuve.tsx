
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import { InternalLinkText } from '@/utils/internalLinking';

const ConstructionNeuve = () => (
  <>
    <SEO
      title="Construction sur mesure | Maître d'œuvre PACA - Progineer"
      description="Construction neuve de maisons individuelles et petits collectifs à Marseille et en PACA, avec un maître d'œuvre pour un accompagnement de A à Z."
      keywords="construction sur mesure, construction maison, maître d'œuvre marseille, construction PACA"
      canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/construction-neuve"
    />
    <Container>
      <h1 className="text-4xl font-bold mb-6">Construction sur mesure à Marseille et PACA</h1>
      <p className="text-lg text-gray-700 mb-8">
        <InternalLinkText
          text="Confiez la réalisation de votre maison à un maître d'œuvre expérimenté à Marseille. Progineer vous accompagne dans chaque étape de la construction sur mesure, de la conception à la livraison, pour une maison qui répond pleinement à vos attentes. Notre équipe maîtrise la coordination des corps de métier, la gestion des délais et l'optimisation des coûts. Nos réalisations en Provence-Alpes-Côte d'Azur sont reconnues pour leur qualité et leur adaptation parfaite à chaque environnement."
          maxOccurrences={6}
        />
      </p>
      <h2 className="text-2xl font-semibold mb-4">Nos services sur mesure</h2>
      <ul className="list-disc ml-8 mb-8 text-gray-700">
        <li><InternalLinkText text="Étude de faisabilité et maîtrise d'œuvre complète" /></li>
        <li><InternalLinkText text="Conception sur-mesure adaptée à votre terrain" /></li>
        <li><InternalLinkText text="Gestion administrative, permis de construire et déclarations" /></li>
        <li><InternalLinkText text="Coordination de tous les corps de métier : maçon, électricien, plombier, architecte..." /></li>
        <li><InternalLinkText text="Respect des normes énergétiques RE2020" /></li>
      </ul>
      <p className="text-gray-700">
        <InternalLinkText
          text="Votre projet commence ici : contactez votre maître d'œuvre à Marseille ou demandez un devis en ligne pour votre future construction."
          maxOccurrences={4}
        />
      </p>
    </Container>
  </>
);

export default ConstructionNeuve;
