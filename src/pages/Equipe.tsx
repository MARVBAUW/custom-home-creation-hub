
import React from 'react';
import SEO from '@/components/common/SEO';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';

const teamMembers = [
  {
    id: 1,
    name: 'Marvin Duval',
    role: 'Fondateur & Maître d\'œuvre',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2049&auto=format&fit=crop',
    bio: 'Avec plus de 10 ans d\'expérience dans l\'architecture et la construction, Marvin a fondé Progineer en 2018 avec la vision de créer des espaces de vie parfaitement adaptés aux besoins de chacun.',
    skills: ['Architecture', 'Coordination de projets', 'Gestion de chantier', 'Conception 3D']
  },
  {
    id: 2,
    name: 'Mael Richardson',
    role: 'Architecte principal',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2074&auto=format&fit=crop',
    bio: 'Diplômé de l\'École d\'Architecture de Marseille, Mael apporte son expertise créative et technique à chaque projet, avec une approche centrée sur le design durable et l\'intégration environnementale.',
    skills: ['Design architectural', 'Architecture durable', 'Rénovation', 'Planification spatiale']
  },
  {
    id: 3,
    name: 'Sophie Lambert',
    role: 'Ingénieure structure',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2070&auto=format&fit=crop',
    bio: 'Sophie assure la solidité et la sécurité de toutes nos constructions. Spécialisée en calcul de structures, elle intervient dès la phase de conception pour garantir la faisabilité technique des projets.',
    skills: ['Calcul de structures', 'Normes réglementaires', 'Génie civil', 'Études techniques']
  },
  {
    id: 4,
    name: 'Thomas Perrin',
    role: 'Conducteur de travaux',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop',
    bio: 'Thomas supervise tous nos chantiers avec rigueur et efficacité. Sa grande expérience dans le BTP lui permet de coordonner les différents corps de métier et d\'assurer le respect des délais et de la qualité.',
    skills: ['Suivi de chantier', 'Coordination d\'équipes', 'Planification', 'Contrôle qualité']
  },
  {
    id: 5,
    name: 'Amina Badi',
    role: 'Architecte d\'intérieur',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
    bio: 'Passionnée de design d\'intérieur, Amina imagine des espaces fonctionnels et esthétiques. Elle accompagne nos clients dans le choix des matériaux, des couleurs et du mobilier pour créer des intérieurs qui leur ressemblent.',
    skills: ['Design d\'intérieur', 'Agencement', 'Décoration', 'Rendus 3D']
  },
  {
    id: 6,
    name: 'Lucas Moreau',
    role: 'Responsable administratif',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
    bio: 'Lucas gère toute la partie administrative et financière de Progineer. Il s\'occupe des devis, des factures, des contrats et du suivi budgétaire des projets pour garantir une transparence totale à nos clients.',
    skills: ['Gestion administrative', 'Finance', 'Relations clients', 'Contrats']
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
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-semibold mb-12 text-center">Notre équipe pluridisciplinaire</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-transform duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={`${member.name}, ${member.role} chez Progineer, cabinet d'architecture et de maîtrise d'œuvre en PACA`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-khaki-600 mb-4">{member.role}</p>
                  
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Compétences :</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-stone-100 text-stone-700 rounded text-xs"
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
      <section className="py-8 bg-white">
        <Container>
          <div className="text-sm text-stone-500">
            <h4 className="font-semibold mb-2">Notre équipe d'experts</h4>
            <p>
              L'équipe Progineer est composée d'architectes, de maîtres d'œuvre et d'ingénieurs expérimentés basés à Marseille et intervenant dans toute la région PACA. Nos professionnels vous accompagnent dans tous vos projets de construction, rénovation et extension de maisons individuelles en Provence-Alpes-Côte d'Azur.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Equipe;
