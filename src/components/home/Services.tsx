
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
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Service images (using placeholder images that would be replaced with real ones)
const serviceImages = {
  construction: "/lovable-uploads/2ab0f303-213f-43c9-94dc-75e0e8e55718.png",
  renovation: "/lovable-uploads/e43a5d5c-afde-4564-96ae-58128955dcf7.png",
  extension: "/lovable-uploads/3f77f084-4061-4e36-9f32-85cb08372b51.png", 
  optimisation: "/lovable-uploads/2443b8c7-2cec-45ef-becc-407fb5078cf6.jpg",
  design: "/lovable-uploads/732fa99d-df25-4869-9ca9-b49ccf6f51a4.png"
};

const services = [
  {
    icon: HomeIcon,
    title: 'Construction sur mesure',
    description: 'Maisons individuelles et petits collectifs adaptés à vos besoins et à votre terrain.',
    link: '/prestations-maitre-oeuvre#construction',
    image: serviceImages.construction,
    color: 'khaki'
  },
  {
    icon: Gauge,
    title: 'Rénovation énergétique',
    description: 'Optimisation de votre habitat selon les normes RE2020, audits et travaux d\'amélioration.',
    link: '/prestations-maitre-oeuvre#renovation',
    image: serviceImages.renovation,
    color: 'emerald'
  },
  {
    icon: Maximize,
    title: 'Extension & agrandissement',
    description: 'Créez de nouveaux espaces de vie avec une extension parfaitement intégrée à votre habitation.',
    link: '/prestations-maitre-oeuvre#extension',
    image: serviceImages.extension,
    color: 'amber'
  },
  {
    icon: Ruler,
    title: 'Optimisation d\'espace',
    description: 'Réaménagement intelligent pour valoriser chaque mètre carré de votre bien immobilier.',
    link: '/prestations-maitre-oeuvre#optimisation',
    image: serviceImages.optimisation,
    color: 'blue'
  },
  {
    icon: Paintbrush,
    title: 'Design d\'espace',
    description: 'Conception d\'intérieurs fonctionnels et esthétiques pour particuliers et professionnels.',
    link: '/prestations-maitre-oeuvre#design',
    image: serviceImages.design,
    color: 'violet'
  }
];

const getColorClass = (color) => {
  const colors = {
    khaki: 'bg-khaki-100 text-khaki-700',
    emerald: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    blue: 'bg-blue-100 text-blue-700',
    violet: 'bg-violet-100 text-violet-700'
  };
  
  return colors[color] || colors.khaki;
};

const Services = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section className="py-24 bg-stone-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-khaki-100/30 mix-blend-multiply blur-3xl"></div>
      <div className="absolute -bottom-48 right-1/4 w-96 h-96 rounded-full bg-khaki-200/20 mix-blend-multiply blur-3xl"></div>
      
      <Container>
        <div className="text-center mb-16 max-w-2xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1 mb-4 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
            Nos prestations
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Des solutions complètes pour votre projet
          </h2>
          <p className="text-gray-600 text-lg">
            Progineer vous propose une gamme complète de services pour concrétiser tous vos projets immobiliers en région PACA.
          </p>
          <div className="mt-6 w-32 h-1 bg-khaki-300 mx-auto rounded-full"></div>
        </div>

        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
        >
          {services.map((service, index) => (
            <motion.div 
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-all duration-300"
            >
              <div className="h-48 w-full overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
              </div>
              
              <div className="p-6 relative">
                <div className={`absolute -top-8 left-6 inline-flex items-center justify-center w-14 h-14 rounded-lg shadow-lg ${getColorClass(service.color)}`}>
                  <service.icon className="h-7 w-7" />
                </div>
                
                <div className="pt-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-khaki-700 transition-colors">{service.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                  <Link 
                    to={service.link} 
                    className="inline-flex items-center text-khaki-700 hover:text-khaki-800 font-medium group/link"
                  >
                    En savoir plus
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default Services;
