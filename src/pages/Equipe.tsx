
import React from 'react';
import SEO from '@/components/common/SEO';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import SEOFooter from '@/components/common/SEOFooter';
import TeamMembersSection from '@/components/about/TeamMembersSection';
import ValuesSection from '@/components/about/ValuesSection';
import ApproachSection from '@/components/about/ApproachSection';

// --- Data ---
const teamMembers = [
  {
    id: 1,
    name: 'Marvin Bauwens',
    role: "Fondateur & Maître d'œuvre",
    image: '/lovable-uploads/aa0d9792-6c78-477d-9203-0c92cc4c6035.png',
    bio: "Diplômé d'un master en génie civil décerné par l'INSA, Marvin a ensuite acquis de l'expérience dans divers corps de métiers. Il a notamment été représentant de la maîtrise d'ouvrage pour une foncière nationale d'envergure, ainsi que chef de projet de maîtrise d'œuvre. Missionné pour gérer les actifs immobiliers de différentes entités, Marvin a démontré son efficacité tant dans la conception que dans le suivi opérationnel des travaux, apportant une réelle valeur ajoutée à chaque étape du projet.",
    skills: ['Expertise technique', 'Gestion de projet', 'Coordination', 'Pilotage travaux']
  },
  {
    id: 2,
    name: 'Maël Allano',
    role: "Maître d'œuvre & chargé d'études",
    image: '/lovable-uploads/e78983ec-3921-43f5-93e1-7dee7f23a28a.png',
    bio: "Également diplômé du master en génie civil de l'INSA, Maël a débuté comme chef de chantier dans une entreprise de second œuvre. Développant les aspects techniques au niveau des finitions du bâtiment, il s'est ensuite orienté vers une entreprise générale du bâtiment spécialisée dans l'industrie et le tertiaire, en tant que chargé d'études de prix et d'analyse de structure. Maël a su diversifier son panel de connaissances et acquérir une vision globale de l'étude et de la réalisation de divers types de projets.",
    skills: ['Finitions', 'Études de prix', 'Analyse de structure', 'Conduite de chantier']
  }
];

const values = [
  {
    title: 'Écoute & Personnalisation',
    description: 'Chaque projet est unique, tout comme les besoins de nos clients. Nous prenons le temps de vous écouter pour créer des espaces qui vous ressemblent.',
    icon: '👂'
  },
  {
    title: 'Excellence & Qualité',
    description: "Nous ne faisons aucun compromis sur la qualité. De la conception à la réalisation, nous visons l'excellence dans chaque détail.",
    icon: '🏆'
  },
  {
    title: 'Innovation & Durabilité',
    description: "Nous intégrons les dernières innovations techniques et environnementales pour créer des bâtiments performants et respectueux de la planète.",
    icon: '🌱'
  },
  {
    title: 'Transparence & Confiance',
    description: "La relation de confiance est au cœur de notre approche. Nous travaillons en toute transparence sur les coûts, les délais et les solutions proposées.",
    icon: '🤝'
  }
];

// --- Page ---
const Equipe = () => {
  return (
    <>
      <SEO 
        title="Notre équipe | Architecte et Maître d'œuvre à Marseille - Progineer"
        description="Découvrez l'équipe de Progineer, architectes et maîtres d'œuvre spécialisés dans la construction et rénovation de maisons en PACA. Des professionnels passionnés à votre service."
        keywords="équipe architecte, maître d'œuvre Marseille, professionnels construction PACA, ingénieurs bâtiment, architecte intérieur"
        canonicalUrl="https://progineer.fr/equipe-maitrise-oeuvre"
      />

      {/* Hero section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-stone-50 to-white">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Notre équipe
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Des professionnels à votre service
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Découvrez l'équipe <strong>passionnée et expérimentée</strong> qui donnera vie à votre projet. 
              Architectes, ingénieurs et spécialistes en construction vous accompagnent à chaque étape.
            </p>
          </div>
        </Container>
      </section>

      <TeamMembersSection members={teamMembers} />
      <ValuesSection values={values} />
      <ApproachSection />

      {/* CTA section */}
      <section className="py-16 bg-stone-50 border-y border-stone-200">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              Travaillons ensemble sur votre projet
            </h2>
            <p className="text-gray-600 mb-8">
              Notre équipe est prête à mettre son expertise à votre service. Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous aider à le concrétiser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/estimation" className="bg-khaki-700 hover:bg-khaki-800 text-white">Estimer mon projet</Button>
              <Button href="/contact" variant="outline" className="border-khaki-300 hover:bg-khaki-50">Prendre rendez-vous</Button>
            </div>
          </div>
        </Container>
      </section>

      <SEOFooter 
        text="Notre équipe composée d'architectes et de maîtres d'œuvre à Marseille vous accompagne dans vos projets de construction, rénovation et extension de maisons en région PACA. Des professionnels expérimentés à votre écoute pour donner vie à vos projets immobiliers."
        additionalKeywords={["équipe d'architectes", "maître d'œuvre Marseille", "professionnels de la construction", "expertise bâtiment PACA", "architecte maison individuelle"]}
      />
    </>
  );
};

export default Equipe;
