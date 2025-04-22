import React from 'react';
import SEO from '@/components/common/SEO';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import SEOFooter from '@/components/common/SEOFooter';

const teamMembers = [
  {
    id: 1,
    name: 'Marvin Bauwens',
    role: 'Fondateur & Maître d\'œuvre',
    image: '/lovable-uploads/aa0d9792-6c78-477d-9203-0c92cc4c6035.png',
    bio: "Diplômé d’un master en génie civil décerné par l’INSA, Marvin a ensuite acquis de l’expérience dans divers corps de métiers. Il a notamment été représentant de la maîtrise d’ouvrage pour une foncière nationale d’envergure, ainsi que chef de projet de maîtrise d’œuvre. Missionné pour gérer les actifs immobiliers de différentes entités, Marvin a démontré son efficacité tant dans la conception que dans le suivi opérationnel des travaux, apportant une réelle valeur ajoutée à chaque étape du projet.",
    skills: ['Expertise technique', 'Gestion de projet', 'Coordination', 'Pilotage travaux']
  },
  {
    id: 2,
    name: 'Maël Allano',
    role: 'Maître d\'œuvre & chargé d\'études',
    image: '/lovable-uploads/e78983ec-3921-43f5-93e1-7dee7f23a28a.png',
    bio: "Également diplômé du master en génie civil de l’INSA, Maël a débuté comme chef de chantier dans une entreprise de second œuvre. Développant les aspects techniques au niveau des finitions du bâtiment, il s’est ensuite orienté vers une entreprise générale du bâtiment spécialisée dans l’industrie et le tertiaire, en tant que chargé d’études de prix et d’analyse de structure. Maël a su diversifier son panel de connaissances et acquérir une vision globale de l’étude et de la réalisation de divers types de projets.",
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
    description: 'Nous ne faisons aucun compromis sur la qualité. De la conception à la réalisation, nous visons l\'excellence dans chaque détail.',
    icon: '🏆'
  },
  {
    title: 'Innovation & Durabilité',
    description: 'Nous intégrons les dernières innovations techniques et environnementales pour créer des bâtiments performants et respectueux de la planète.',
    icon: '🌱'
  },
  {
    title: 'Transparence & Confiance',
    description: 'La relation de confiance est au cœur de notre approche. Nous travaillons en toute transparence sur les coûts, les délais et les solutions proposées.',
    icon: '🤝'
  }
];

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

      {/* Team members section */}
      <section className="py-16" style={{ background: "transparent" }}>
        <Container>
          <h2 className="text-3xl font-semibold mb-12 text-center text-white">Notre équipe pluridisciplinaire</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="bg-transparent rounded-xl overflow-visible shadow-none border-0 flex flex-col items-center"
              >
                <div className="w-52 h-52 flex justify-center items-end mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-contain"
                    style={{ background: 'transparent' }}
                  />
                </div>
                <div className="px-2 text-center">
                  <h3 className="text-2xl font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-progineer-gold mb-4">{member.role}</p>
                  <p className="text-white text-sm mb-4">{member.bio}</p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2 text-progineer-gold">Compétences :</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-white/10 text-white rounded text-xs border border-white/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values section */}
      <section className="py-16 bg-stone-50">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-semibold mb-4">Nos valeurs</h2>
            <p className="text-gray-600">
              Ces principes guident chacune de nos actions et définissent notre approche professionnelle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4" aria-hidden="true">{value.icon}</span>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                </div>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Approach section */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold mb-6">Notre approche</h2>
              <p className="text-gray-700 mb-4">
                Chez Progineer, nous croyons qu'un projet réussi commence par une <strong>écoute attentive</strong> de vos besoins et aspirations. 
                Notre approche collaborative nous permet de créer des espaces qui reflètent votre personnalité tout en respectant votre budget.
              </p>
              <p className="text-gray-700 mb-4">
                Nous mettons un point d'honneur à maintenir une <strong>communication transparente</strong> tout au long du projet, 
                en vous tenant informé de chaque étape et en vous impliquant dans les décisions importantes.
              </p>
              <p className="text-gray-700 mb-6">
                Notre expertise technique et notre créativité se combinent pour vous offrir des solutions <strong>innovantes</strong> et <strong>durables</strong>, 
                adaptées aux spécificités de la région PACA et aux normes les plus exigeantes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contact">Rencontrer notre équipe</Button>
                <Button href="/realisations-architecte-maison" variant="outline">Voir nos réalisations</Button>
              </div>
            </div>
            
            <div className="bg-stone-100 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Notre processus de travail</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-khaki-600 text-white flex items-center justify-center font-semibold mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Écoute et analyse</h4>
                    <p className="text-sm text-gray-600">Nous prenons le temps de comprendre vos besoins, vos contraintes et vos aspirations.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-khaki-600 text-white flex items-center justify-center font-semibold mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Conception et proposition</h4>
                    <p className="text-sm text-gray-600">Nous élaborons des solutions adaptées à votre projet, avec plans et visualisations 3D.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-khaki-600 text-white flex items-center justify-center font-semibold mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Planification détaillée</h4>
                    <p className="text-sm text-gray-600">Nous établissons un planning précis, sélectionnons les intervenants et préparons les démarches administratives.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-khaki-600 text-white flex items-center justify-center font-semibold mr-4 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Réalisation et suivi</h4>
                    <p className="text-sm text-gray-600">Nous coordonnons les travaux, contrôlons la qualité et veillons au respect des délais et du budget.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-khaki-600 text-white flex items-center justify-center font-semibold mr-4 flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Livraison et suivi</h4>
                    <p className="text-sm text-gray-600">Nous vous accompagnons lors de la réception des travaux et restons disponibles pour tout besoin ultérieur.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

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

      {/* SEO Footer */}
      <SEOFooter 
        text="Notre équipe composée d'architectes et de maîtres d'œuvre à Marseille vous accompagne dans vos projets de construction, rénovation et extension de maisons en région PACA. Des professionnels expérimentés à votre écoute pour donner vie à vos projets immobiliers."
        additionalKeywords={["équipe d'architectes", "maître d'œuvre Marseille", "professionnels de la construction", "expertise bâtiment PACA", "architecte maison individuelle"]}
      />
    </>
  );
};

export default Equipe;
