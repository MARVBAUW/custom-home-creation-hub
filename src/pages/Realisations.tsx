
import React from 'react';
import SEO from '@/components/common/SEO';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { InternalLinkText } from '@/utils/internalLinking';
import SEOFooter from '@/components/common/SEOFooter';

import ProjectsGallery from '@/components/realisations/ProjectsGallery';
import ProjectTypesSection from '@/components/realisations/ProjectTypesSection';
import CTASection from '@/components/realisations/CTASection';

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
        title="Nos réalisations | Maître d'œuvre Progineer en PACA"
        description="Découvrez les projets de construction, rénovation et extension réalisés par Progineer, maître d'œuvre en PACA. Des réalisations uniques et sur-mesure."
        keywords="réalisations maître d'œuvre, projets construction PACA, portfolio rénovation, extension maison Marseille, références travaux"
        canonicalUrl="https://progineer.fr/realisations-architecte-maison"
      />

      <main>
        <h1 className="sr-only">Nos réalisations - Portfolio de projets de maîtrise d'œuvre en PACA</h1>
        {/* Hero section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
          <Container size="md">
            <div className="text-center">
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
                Nos réalisations
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold mb-6">
                Portfolio de nos projets
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                <InternalLinkText 
                  text="Exemples de projets réalisés par notre équipe de maîtrise d'œuvre à Marseille et en PACA. Découvrez notre savoir-faire en matière de construction et rénovation."
                  maxOccurrences={2}
                />
              </p>
            </div>
          </Container>
        </section>

        {/* Projects gallery */}
        <ProjectsGallery projects={projects} />

        {/* Types de projets section */}
        <ProjectTypesSection />

        {/* CTA section */}
        <CTASection />
      </main>

      {/* SEO Footer renforcé */}
      <SEOFooter 
        text="Portfolio de projets réalisés par Progineer, maître d'œuvre expert en PACA. Découvrez nos réalisations en construction de maisons sur mesure, rénovation et extension dans toute la région Provence-Alpes-Côte d'Azur."
        additionalKeywords={[
          "portfolio maître d'œuvre", 
          "réalisations construction PACA", 
          "projets rénovation Marseille", 
          "références extension maison", 
          "maisons contemporaines", 
          "villa écologique Toulon", 
          "rénovation appartement"
        ]}
      />
    </>
  );
};

export default Realisations;
