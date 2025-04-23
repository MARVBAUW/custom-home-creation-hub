
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@/components/common/Container';
import { 
  HomeIcon, 
  Paintbrush, 
  Gauge, 
  Maximize, 
  Ruler,
  ArrowRight
} from 'lucide-react';

const services = [
  {
    icon: HomeIcon,
    title: 'Construction sur mesure',
    description: 'Maisons individuelles et petits collectifs adaptés à vos besoins et à votre terrain.',
    link: '/prestations-maitre-oeuvre#construction'
  },
  {
    icon: Gauge,
    title: 'Rénovation énergétique',
    description: 'Optimisation de votre habitat selon les normes RE2020, audits et travaux d\'amélioration.',
    link: '/prestations-maitre-oeuvre#renovation'
  },
  {
    icon: Maximize,
    title: 'Extension & agrandissement',
    description: 'Créez de nouveaux espaces de vie avec une extension parfaitement intégrée à votre habitation.',
    link: '/prestations-maitre-oeuvre#extension'
  },
  {
    icon: Ruler,
    title: 'Optimisation d\'espace',
    description: 'Réaménagement intelligent pour valoriser chaque mètre carré de votre bien immobilier.',
    link: '/prestations-maitre-oeuvre#optimisation'
  },
  {
    icon: Paintbrush,
    title: 'Design d\'espace',
    description: 'Conception d\'intérieurs fonctionnels et esthétiques pour particuliers et professionnels.',
    link: '/prestations-maitre-oeuvre#design'
  }
];

const Services = () => {
  return (
    <section className="py-24 relative">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-stone-50/95"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ 
            backgroundImage: `url('/lovable-uploads/f6c3eeaa-f404-4b27-b287-d8aeff95c06a.png')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%'
          }}
        ></div>
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
            Nos prestations
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Des solutions complètes pour votre projet
          </h2>
          <p className="text-gray-600 text-lg">
            Progineer vous propose une gamme complète de services pour concrétiser tous vos projets immobiliers en région PACA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title} 
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-khaki-100 text-khaki-700 mb-4">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link 
                to={service.link} 
                className="inline-flex items-center text-khaki-700 hover:text-khaki-800 font-medium"
              >
                En savoir plus
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Services;
