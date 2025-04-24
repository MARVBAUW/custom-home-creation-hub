
import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/common/Container';
import { Award, Clock, Wrench, Users, Shield, Leaf } from 'lucide-react';
import EngagementCard from './engagement/EngagementCard';
import { cn } from '@/lib/utils';

const StatsSection = () => {
  const engagements = [
    {
      icon: "Users",
      title: "Coordination des corps de métier",
      description: "Gestion experte de tous les intervenants pour une exécution harmonieuse de votre projet",
      gradient: "from-amber-500/80 to-orange-600/80"
    },
    {
      icon: "Clock",
      title: "Respect des délais garantis",
      description: "Planification rigoureuse et suivi constant pour livrer votre projet dans les temps",
      gradient: "from-emerald-500/80 to-teal-600/80"
    },
    {
      icon: "Shield",
      title: "Expertise technique",
      description: "Solutions innovantes et conformes aux normes pour des résultats durables",
      gradient: "from-sky-500/80 to-blue-600/80"
    },
    {
      icon: "Award",
      title: "Maîtrise d'œuvre complète",
      description: "Accompagnement global de la conception à la réalisation de votre projet",
      gradient: "from-violet-500/80 to-purple-600/80"
    },
    {
      icon: "Wrench",
      title: "Sélection des matériaux",
      description: "Choix minutieux des matériaux pour une qualité et une durabilité optimales",
      gradient: "from-rose-500/80 to-pink-600/80"
    },
    {
      icon: "Leaf",
      title: "Innovation durable",
      description: "Solutions éco-responsables pour des projets respectueux de l'environnement",
      gradient: "from-lime-500/80 to-green-600/80"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-stone-900 to-stone-950">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-progineer-gold/20 via-transparent to-transparent opacity-60"></div>
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-stone-800/50 to-transparent"></div>
      
      <Container>
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-progineer-gold/20 text-progineer-gold text-sm font-medium mb-4">
              Notre expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-rare tracking-wide mb-4 text-white">
              Nos engagements pour votre projet
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Une approche professionnelle et rigoureuse pour garantir la réussite de vos projets de construction et rénovation
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {engagements.map((engagement, index) => (
              <EngagementCard
                key={index}
                icon={engagement.icon}
                title={engagement.title}
                description={engagement.description}
                gradient={engagement.gradient}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Bottom transition to next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-stone-50 to-transparent"></div>
    </section>
  );
};

export default StatsSection;
