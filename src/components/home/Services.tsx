
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
import './animations.css';

const serviceIcons = {
  HomeIcon,
  Gauge,
  Maximize,
  Ruler,
  Paintbrush
};

const services = [
  {
    icon: HomeIcon,
    title: 'Construction sur mesure',
    description: 'Maisons individuelles et petits collectifs adaptés à vos besoins et à votre terrain.',
    link: '/prestations-maitre-oeuvre/construction-neuve#services',
    bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    iconColor: 'text-indigo-500',
    borderColor: 'border-indigo-100',
    id: 'construction'
  },
  {
    icon: Gauge,
    title: 'Rénovation énergétique',
    description: 'Optimisation de votre habitat selon les normes RE2020, audits et travaux d\'amélioration.',
    link: '/prestations-maitre-oeuvre/renovation#energy',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
    iconColor: 'text-emerald-500',
    borderColor: 'border-emerald-100',
    id: 'renovation'
  },
  {
    icon: Maximize,
    title: 'Extension & agrandissement',
    description: 'Créez de nouveaux espaces de vie avec une extension parfaitement intégrée à votre habitation.',
    link: '/prestations-maitre-oeuvre/extension#services',
    bgColor: 'bg-gradient-to-br from-amber-50 to-yellow-50',
    iconColor: 'text-amber-500',
    borderColor: 'border-amber-100',
    id: 'extension'
  },
  {
    icon: Ruler,
    title: 'Optimisation d\'espace',
    description: 'Réaménagement intelligent pour valoriser chaque mètre carré de votre bien immobilier.',
    link: '/prestations-maitre-oeuvre/optimisation-espace#services',
    bgColor: 'bg-gradient-to-br from-purple-50 to-violet-50',
    iconColor: 'text-violet-500',
    borderColor: 'border-violet-100',
    id: 'optimisation'
  },
  {
    icon: Paintbrush,
    title: 'Design d\'espace',
    description: 'Conception d\'intérieurs fonctionnels et esthétiques pour particuliers et professionnels.',
    link: '/prestations-maitre-oeuvre/design-interieur#services',
    bgColor: 'bg-gradient-to-br from-rose-50 to-pink-50',
    iconColor: 'text-rose-500',
    borderColor: 'border-rose-100',
    id: 'design'
  }
];

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 10 }
    }
  };

  return (
    <section id="services-section" className="py-28 bg-gradient-to-br from-stone-50 to-stone-100/50 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-khaki-200/20 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-khaki-300/10 blur-3xl"></div>
      
      <Container>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="relative z-10"
        >
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.div variants={itemVariants} className="inline-block px-4 py-1 mb-4 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Nos prestations
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-semibold mb-4">
              Des solutions complètes pour votre projet
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-gray-600 text-lg">
              Progineer vous propose une gamme complète de services pour concrétiser tous vos projets immobiliers en région PACA.
            </motion.p>
          </div>

          {/* Grid asymétrique pour les services */}
          <div className="grid grid-cols-12 gap-6">
            {services.map((service, index) => {
              // Définir les colonnes pour un design asymétrique mais responsive
              let colSpan = "col-span-12 md:col-span-6";
              
              if (index === 0) { 
                colSpan = "col-span-12 md:col-span-8";
              } else if (index === 1) {
                colSpan = "col-span-12 md:col-span-4";
              } else if (index === 2) {
                colSpan = "col-span-12 md:col-span-4";
              } else if (index === 3) {
                colSpan = "col-span-12 md:col-span-4";
              } else if (index === 4) {
                colSpan = "col-span-12 md:col-span-4";
              }
              
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className={`${colSpan} perspective-700`}
                  id={service.id}
                >
                  <div className="transform-style-3d h-full w-full">
                    <div 
                      className={`${service.bgColor} rounded-xl p-7 shadow-sm border ${service.borderColor} 
                        transition-all duration-300 hover:shadow-lg h-full group transform`}
                      style={{transformStyle: 'preserve-3d'}}
                    >
                      <div className="flex flex-col h-full">
                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg ${service.iconColor} mb-4 
                          relative overflow-hidden group-hover:scale-110 transition-transform duration-300`}>
                          <div className="absolute inset-0 bg-current opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                          <Icon className="h-7 w-7 relative z-10" />
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-3 group-hover:translate-z-10 transition-transform duration-300">
                          {service.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 flex-grow">
                          {service.description}
                        </p>
                        
                        <Link 
                          to={service.link} 
                          className={`inline-flex items-center text-gray-700 hover:${service.iconColor} font-medium transition-colors duration-300 mt-2 group-hover:translate-z-5`}
                        >
                          <span>En savoir plus</span>
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Services;
