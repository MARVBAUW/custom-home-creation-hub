
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { Filter, MapPin, Tag, ArrowRight } from 'lucide-react';
import ThemeToggle from '@/components/theme/ThemeToggle';
import { useTheme } from '@/hooks/use-theme';

const projects = [
  {
    id: 1,
    title: 'Villa en bord de mer',
    location: 'Martignas sur Jalles',
    category: 'Construction neuve',
    description: 'Villa contemporaine avec piscine à débordement et vue sur la mer.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Restructuration d\'une friche',
    location: 'Lomme / Lille',
    category: 'Réhabilitation',
    description: 'Transformation d\'un site industriel en espace de vie moderne et fonctionnel.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Logements collectifs',
    location: 'Clermont-Ferrand',
    category: 'Petit collectif',
    description: 'Ensemble de logements collectifs alliant confort, esthétique et durabilité.',
    image: 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Villa enclavée',
    location: 'Laon',
    category: 'Construction',
    description: 'Villa moderne parfaitement intégrée dans son environnement naturel.',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2074&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Villa Golf du Sart',
    location: 'Wasquehal',
    category: 'Construction',
    description: 'Résidence de luxe avec vue panoramique sur le golf.',
    image: 'https://images.unsplash.com/photo-1619542402915-dcaf30e4e2a1?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'Galerie Centre Commercial',
    location: 'Roye',
    category: 'Commercial',
    description: 'Espace commercial moderne avec circulation fluide et design contemporain.',
    image: 'https://images.unsplash.com/photo-1606744858291-9763e4e785fa?q=80&w=2074&auto=format&fit=crop'
  },
  {
    id: 7,
    title: 'Rénovation Énergétique',
    location: 'St Quentin',
    category: 'Rénovation',
    description: 'Optimisation énergétique complète d\'un bâtiment existant.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 8,
    title: 'Villa Mougins',
    location: 'Mougins (13)',
    category: 'Construction',
    description: 'Villa contemporaine avec jardin paysager.',
    image: '/images/villa-mougins.jpg'
  }
];

const categories = ['Tous', 'Construction', 'Rénovation', 'Réhabilitation', 'Commercial', 'Petit collectif'];

const Realisations = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'Tous' 
    ? projects 
    : projects.filter(project => project.category.includes(activeCategory));

  return (
    <>
      <Helmet>
        <title>Nos réalisations | Architecte et Maître d'œuvre PACA - Progineer</title>
        <meta name="description" content="Découvrez les projets de construction, rénovation et extension réalisés par Progineer, architecte et maître d'œuvre en région PACA." />
        <meta name="keywords" content="réalisations architecte, projets maison sur mesure, portfolio maître d'œuvre, construction PACA, rénovation Marseille" />
      </Helmet>

      {/* Hero section avec une image plein écran et un overlay */}
      <section className="relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>
        </div>
        
        <div className="relative pt-40 pb-24 text-white">
          <Container size="md">
            <div className="text-center animate-fade-in">
              <div className="inline-block px-3 py-1 mb-6 rounded-full backdrop-blur-sm bg-progineer-gold/20 text-progineer-gold text-sm font-medium border border-progineer-gold/20">
                Nos réalisations
              </div>
              <h1 className="text-4xl md:text-5xl font-rare tracking-wide mb-6 drop-shadow-md">
                Portfolio de nos projets
              </h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8 drop-shadow">
                Exemples de projets réalisés par notre bureau d'étude à Marseille et en PACA.
                Découvrez notre savoir-faire en matière de construction et rénovation.
              </p>
              
              <div className="absolute top-6 right-6">
                <ThemeToggle />
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* Filtres de catégories */}
      <section className={`sticky top-0 z-10 py-4 px-2 ${theme === 'dark' ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-md border-b border-gray-200 dark:border-gray-800`}>
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Filter size={16} className="text-gray-400 mr-1" />
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                  activeCategory === category
                  ? 'bg-progineer-gold text-white shadow-md'
                  : theme === 'dark' 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Projects gallery */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <div 
                key={project.id} 
                className={`group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gray-900 hover:shadow-xl hover:shadow-progineer-gold/10' 
                    : 'bg-white hover:shadow-xl hover:shadow-progineer-gold/20'
                } hover:-translate-y-2`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <span className="px-3 py-1 bg-progineer-gold text-white text-xs rounded-full flex items-center">
                      <Tag size={12} className="mr-1" /> {project.category}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-300">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-progineer-gold mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-sm text-white/90">{project.location}</span>
                        <h3 className="text-xl font-semibold text-white mt-1">{project.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`p-6 ${theme === 'dark' ? 'border-t border-gray-800' : ''}`}>
                  <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.description}
                  </p>
                  
                  <Button 
                    variant={theme === 'dark' ? 'outline' : 'primary'}
                    className={`w-full justify-center ${
                      hoveredProject === project.id 
                        ? 'bg-progineer-gold text-white dark:bg-progineer-gold dark:text-white' 
                        : ''
                    }`}
                    href={`/realisations-architecte-maison/${project.id}`}
                  >
                    Voir le projet
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA section with gradient background */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-950' : 'bg-gradient-to-br from-gray-50 to-white'}`}>
        <Container>
          <div className={`text-center max-w-3xl mx-auto p-12 rounded-2xl ${
            theme === 'dark' 
              ? 'bg-gray-900/50 border border-gray-800' 
              : 'bg-white/80 shadow-xl border border-gray-100'
          }`}>
            <div className="w-16 h-16 rounded-full bg-progineer-gold/10 flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 22H22" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 22L3 11C3 7.229 3 5.343 4.172 4.172C5.343 3 7.229 3 11 3L13 3C16.771 3 18.657 3 19.828 4.172C21 5.343 21 7.229 21 11V22" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 22V17C11 15.895 11.895 15 13 15H14C15.105 15 16 15.895 16 17V22" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 11H12" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 7H16" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className={`text-2xl md:text-3xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Vous avez un projet similaire ?
            </h2>
            <p className={`mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Contactez-nous pour discuter de votre projet et découvrir comment notre expertise peut vous aider à le concrétiser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/estimation" size="lg" className="font-medium">
                Estimer mon projet
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="font-medium">
                Demander un devis
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer with company info */}
      <section className={`py-8 ${theme === 'dark' ? 'bg-gray-950 border-t border-gray-800' : 'bg-white border-t border-gray-100'}`}>
        <Container>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-stone-500'}`}>
            <p>SAS PROGINEER - SIREN 935185785 - 365 Avenue du Prado, 13008 Marseilles - PROGINEER 2024 © Tous droits réservés</p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Realisations;
