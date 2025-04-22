import React from 'react';
import SEO from '@/components/common/SEO';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { Link } from 'react-router-dom';
import { InternalLinkText } from '@/utils/internalLinking';
import SEOFooter from '@/components/common/SEOFooter';

const projects = [
  {
    id: 1,
    title: 'Maison contemporaine avec vue panoramique',
    location: 'PACA',
    category: 'Construction neuve',
    description: 'Villa moderne à l\'architecture audacieuse, intégrant des matériaux contemporains et des lignes épurées, conçue par notre maître d\'œuvre à Marseille.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
    slug: 'maison-contemporaine-vue-panoramique'
  },
  {
    id: 2,
    title: 'Restructuration d\'une friche',
    location: 'Lomme / Lille',
    category: 'Réhabilitation',
    description: 'Transformation d\'un site industriel en espace de vie moderne et fonctionnel. Conservation des éléments architecturaux d\'origine.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
    slug: 'restructuration-friche-lomme'
  },
  {
    id: 3,
    title: 'Logements collectifs',
    location: 'Clermont-Ferrand',
    category: 'Petit collectif',
    description: 'Ensemble de logements collectifs alliant confort, esthétique et durabilité. Espaces communs végétalisés et matériaux biosourcés.',
    image: 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2070&auto=format&fit=crop',
    slug: 'logements-collectifs-clermont'
  },
  {
    id: 4,
    title: 'Rénovation appartement haussmannien',
    location: 'Marseille',
    category: 'Rénovation',
    description: 'Rénovation complète d\'un appartement haussmannien alliant éléments d\'époque et design contemporain.',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2074&auto=format&fit=crop',
    slug: 'renovation-haussmannien-marseille'
  },
  {
    id: 5,
    title: 'Extension contemporaine',
    location: 'Aix-en-Provence',
    category: 'Extension',
    description: 'Extension en ossature bois créant un espace de vie lumineux ouvert sur le jardin. Baies vitrées XXL et toiture végétalisée.',
    image: 'https://images.unsplash.com/photo-1619542402915-dcaf30e4e2a1?q=80&w=2070&auto=format&fit=crop',
    slug: 'extension-contemporaine-aix'
  },
  {
    id: 6,
    title: 'Maison passive',
    location: 'Toulon',
    category: 'Construction écologique',
    description: 'Maison à énergie positive utilisant des matériaux biosourcés et des technologies innovantes pour un impact environnemental minimal.',
    image: '/lovable-uploads/732fa99d-df25-4869-9ca9-b49ccf6f51a4.png',
    slug: 'maison-passive-toulon'
  },
];

const Realisations = () => {
  return (
    <>
      <SEO 
        title="Nos réalisations | Architecte et Maître d'œuvre PACA - Progineer"
        description="Découvrez les projets de construction, rénovation et extension réalisés par Progineer, architecte et maître d'œuvre en région PACA."
        keywords="réalisations architecte, projets maison sur mesure, portfolio maître d'œuvre, construction PACA, rénovation Marseille"
        canonicalUrl="https://progineer.fr/realisations-architecte-maison"
      />

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
              <InternalLinkText 
                text="Exemples de projets réalisés par notre bureau d'étude à Marseille et en PACA. Découvrez notre savoir-faire en matière de construction et rénovation."
                maxOccurrences={2}
              />
            </p>
          </div>
        </Container>
      </section>

      {/* Projects gallery */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-semibold mb-10 text-center">Nos derniers projets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-transform duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={`Projet ${project.title} à ${project.location}`}
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
                  <p className="text-gray-600 text-sm mb-4">
                    <InternalLinkText text={project.description} maxOccurrences={1} />
                  </p>
                  
                  <Link to={`/realisations-architecte-maison/${project.slug}`}>
                    <Button variant="outline" className="w-full justify-center">
                      Voir le projet
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Types de projets section */}
      <section className="py-16 bg-stone-50">
        <Container>
          <h2 className="text-3xl font-semibold mb-10 text-center">Types de projets réalisés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Construction neuve</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-khaki-600 mr-2">✓</span>
                  <span><InternalLinkText text="Maisons individuelles sur mesure" /></span>
                </li>
                <li className="flex items-start">
                  <span className="text-khaki-600 mr-2">✓</span>
                  <span><InternalLinkText text="Villas contemporaines et traditionnelles" /></span>
                </li>
                <li className="flex items-start">
                  <span className="text-khaki-600 mr-2">✓</span>
                  <span><InternalLinkText text="Petit collectif résidentiel" /></span>
                </li>
                <li className="flex items-start">
                  <span className="text-khaki-600 mr-2">✓</span>
                  <span><InternalLinkText text="Bureaux et locaux professionnels" /></span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Nos constructions neuves sont conçues dans le respect des normes énergétiques et environnementales actuelles, avec une attention particulière portée à l'intégration dans leur environnement."
                  maxOccurrences={2} 
                />
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Rénovation & Extension</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-khaki-600 mr-2">✓</span>
                  <span><InternalLinkText text="Rénovation complète d'appartements" /></span>
                </li>
                <li className="flex items-start">
                  <span className="text-khaki-600 mr-2">✓</span>
                  <span><InternalLinkText text="Réhabilitation de bâtiments anciens" /></span>
                </li>
                <li className="flex items-start">
                  <span className="text-khaki-600 mr-2">✓</span>
                  <span><InternalLinkText text="Extensions de maisons existantes" /></span>
                </li>
                <li className="flex items-start">
                  <span className="text-khaki-600 mr-2">✓</span>
                  <span><InternalLinkText text="Surélévations et aménagements de combles" /></span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Nos projets de rénovation et d'extension valorisent le patrimoine existant tout en y apportant le confort moderne et une amélioration des performances énergétiques."
                  maxOccurrences={2}
                />
              </p>
            </div>
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
              <InternalLinkText 
                text="Contactez-nous pour discuter de votre projet et découvrir comment notre expertise peut vous aider à le concrétiser."
                maxOccurrences={2}
              />
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/estimation" className="bg-khaki-700 hover:bg-khaki-800 text-white">Estimer mon projet</Button>
              <Button href="/contact" variant="outline" className="border-khaki-300 hover:bg-khaki-50">Prendre rendez-vous</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SEO Footer renforcé */}
      <SEOFooter 
        text="Exemples de projets réalisés par notre bureau d'étude à Marseille et en PACA. Ingénieur, maître d'œuvre spécialisé en construction de maisons sur mesure, rénovation et extension dans toute la région Provence-Alpes-Côte d'Azur."
        additionalKeywords={[
          "réalisations architecturales", 
          "projets maître d'œuvre", 
          "portfolio construction", 
          "rénovation appartement", 
          "extension maison PACA", 
          "maison écologique Toulon", 
          "villa contemporaine Marseille"
        ]}
      />
    </>
  );
};

export default Realisations;
