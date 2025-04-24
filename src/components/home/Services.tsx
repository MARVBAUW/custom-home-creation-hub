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

const services = [
  {
    icon: HomeIcon,
    title: 'Construction sur mesure',
    description: 'Maisons individuelles et petits collectifs adaptés à vos besoins et à votre terrain.',
    link: '/prestations-maitre-oeuvre#construction',
    gradient: 'from-khaki-500/20 to-khaki-600/10'
  },
  {
    icon: Gauge,
    title: 'Rénovation énergétique',
    description: 'Optimisation de votre habitat selon les normes RE2020, audits et travaux d\'amélioration.',
    link: '/prestations-maitre-oeuvre#renovation',
    gradient: 'from-khaki-500/20 to-khaki-600/10'
  },
  {
    icon: Maximize,
    title: 'Extension & agrandissement',
    description: 'Créez de nouveaux espaces de vie avec une extension parfaitement intégrée à votre habitation.',
    link: '/prestations-maitre-oeuvre#extension',
    gradient: 'from-khaki-500/20 to-khaki-600/10'
  },
  {
    icon: Ruler,
    title: 'Optimisation d\'espace',
    description: 'Réaménagement intelligent pour valoriser chaque mètre carré de votre bien immobilier.',
    link: '/prestations-maitre-oeuvre#optimisation',
    gradient: 'from-khaki-500/20 to-khaki-600/10'
  },
  {
    icon: Paintbrush,
    title: 'Design d\'espace',
    description: 'Conception d\'intérieurs fonctionnels et esthétiques pour particuliers et professionnels.',
    link: '/prestations-maitre-oeuvre#design',
    gradient: 'from-khaki-500/20 to-khaki-600/10'
  }
];

const Services = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-stone-50/50">
      <Container>
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 mb-4 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium"
          >
            Nos prestations
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl font-semibold mb-4"
          >
            Des solutions complètes pour votre projet
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-600 text-lg"
          >
            Progineer vous propose une gamme complète de services pour concrétiser tous vos projets immobiliers en région PACA.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={service.link}
                  className="group block h-full bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:translate-y-[-4px] relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-khaki-100 text-khaki-700 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-left">{service.title}</h3>
                    <p className="text-gray-600 mb-4 text-left">{service.description}</p>
                    <div className="inline-flex items-center text-khaki-700 hover:text-khaki-800 font-medium">
                      En savoir plus
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Services;
