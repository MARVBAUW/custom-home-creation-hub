
import React from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';

const projects = [
  {
    id: 1,
    title: 'Villa en bord de mer',
    location: 'Martignas sur Jalles',
    category: 'Construction neuve',
    description: 'Villa contemporaine avec piscine à débordement et vue sur la mer. Une architecture minimaliste qui s\'intègre parfaitement dans son environnement.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Restructuration d\'une friche',
    location: 'Lomme / Lille',
    category: 'Réhabilitation',
    description: 'Transformation d\'un site industriel en espace de vie moderne et fonctionnel. Conservation des éléments architecturaux d\'origine.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Logements collectifs',
    location: 'Clermont-Ferrand',
    category: 'Petit collectif',
    description: 'Ensemble de logements collectifs alliant confort, esthétique et durabilité. Espaces communs végétalisés et matériaux biosourcés.',
    image: 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Rénovation appartement haussmannien',
    location: 'Marseille',
    category: 'Rénovation',
    description: 'Rénovation complète d\'un appartement haussmannien alliant éléments d\'époque et design contemporain.',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2074&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Extension contemporaine',
    location: 'Aix-en-Provence',
    category: 'Extension',
    description: 'Extension en ossature bois créant un espace de vie lumineux ouvert sur le jardin. Baies vitrées XXL et toiture végétalisée.',
    image: 'https://images.unsplash.com/photo-1619542402915-dcaf30e4e2a1?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'Maison passive',
    location: 'Toulon',
    category: 'Construction écologique',
    description: 'Maison à énergie positive utilisant des matériaux biosourcés et des technologies innovantes pour un impact environnemental minimal.',
    image: 'https://images.unsplash.com/photo-1606744858291-9763e4e785fa?q=80&w=2074&auto=format&fit=crop'
  },
];

const Realisations = () => {
  return (
    <>
      <Helmet>
        <title>Nos réalisations | Architecte et Maître d'œuvre PACA - Progineer</title>
        <meta name="description" content="Découvrez les projets de construction, rénovation et extension réalisés par Progineer, architecte et maître d'œuvre en région PACA." />
        <meta name="keywords" content="réalisations architecte, projets maison sur mesure, portfolio maître d'œuvre, construction PACA, rénovation Marseille" />
      </Helmet>

      {/* Hero section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Nos réalisations
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Portfolio de nos projets
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Exemples de projets réalisés par notre bureau d'étude à Marseille et en PACA.
              Découvrez notre savoir-faire en matière de construction et rénovation.
            </p>
          </div>
        </Container>
      </section>

      {/* Projects gallery */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-transform duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">{project.location}</span>
                    <span className="px-3 py-1 bg-khaki-100 text-khaki-800 text-xs rounded-full">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                  
                  <Button variant="outline" className="w-full justify-center">
                    Voir le projet
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-stone-50 border-y border-stone-200">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              Vous avez un projet similaire ?
            </h2>
            <p className="text-gray-600 mb-8">
              Contactez-nous pour discuter de votre projet et découvrir comment notre expertise peut vous aider à le concrétiser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/estimation">Estimer mon projet</Button>
              <Button href="/contact" variant="outline">Prendre rendez-vous</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SEO Footer */}
      <section className="py-8 bg-white">
        <Container>
          <div className="text-sm text-stone-500">
            <p>
              Exemples de projets réalisés par notre bureau d'étude à Marseille et en PACA. Ingénieur, maître d'œuvre spécialisé en construction de maisons sur mesure, rénovation et extension dans toute la région Provence-Alpes-Côte d'Azur.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Realisations;
