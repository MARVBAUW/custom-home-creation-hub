
import React, { useRef } from 'react';
import Container from '@/components/common/Container';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Home, 
  Building, 
  CircleHelp, 
  Users2, 
  FileText,
  LayoutDashboard,
  Construction,
  Brush,
  Building2,
  Ruler,
  Lightbulb,
  FileCode,
  RefreshCw
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import './animations.css';

const InnovationHub = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const sections = [
    {
      title: "Nos prestations",
      icon: Construction,
      color: "bg-gradient-to-br from-indigo-50 to-purple-50 shadow-indigo-100/50",
      iconColor: "text-indigo-500",
      borderColor: "border-indigo-100",
      links: [
        { name: "Construction neuve", path: "/prestations-maitre-oeuvre/construction-neuve", icon: Home },
        { name: "Rénovation", path: "/prestations-maitre-oeuvre/renovation", icon: Building },
        { name: "Extension", path: "/prestations-maitre-oeuvre/extension", icon: Building2 },
        { name: "Design d'intérieur", path: "/prestations-maitre-oeuvre/design-interieur", icon: Brush },
        { name: "Optimisation d'espace", path: "/prestations-maitre-oeuvre/optimisation-espace", icon: Ruler }
      ]
    },
    {
      title: "Notre entreprise",
      icon: Users2,
      color: "bg-gradient-to-br from-emerald-50 to-green-50 shadow-emerald-100/50",
      iconColor: "text-emerald-500",
      borderColor: "border-emerald-100",
      links: [
        { name: "À propos", path: "/a-propos", icon: FileText },
        { name: "Nos réalisations", path: "/realisations-architecte-maison", icon: LayoutDashboard },
        { name: "Notre équipe", path: "/equipe-maitrise-oeuvre", icon: Users2 },
        { name: "Programme de parrainage", path: "/parrainage", icon: RefreshCw },
        { name: "Devenir partenaire", path: "/devenir-partenaire", icon: Building }
      ]
    },
    {
      title: "Informations",
      icon: CircleHelp,
      color: "bg-gradient-to-br from-amber-50 to-yellow-50 shadow-amber-100/50",
      iconColor: "text-amber-500",
      borderColor: "border-amber-100",
      links: [
        { name: "Estimer mon projet", path: "/estimation", icon: Lightbulb },
        { name: "Nous contacter", path: "/contact", icon: FileCode },
        { name: "FAQ", path: "/faq", icon: CircleHelp },
        { name: "Mentions légales", path: "/mentions-legales", icon: FileText },
        { name: "Plan du site", path: "/sitemap", icon: LayoutDashboard }
      ]
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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
  
  const linkVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    })
  };

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-stone-100 to-white relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-progineer-gold/5 blur-3xl"></div>
      <div className="absolute bottom-20 -left-20 w-80 h-80 rounded-full bg-progineer-gold/10 blur-3xl"></div>
      
      {/* Lignes de connexion */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-progineer-gold/30 to-transparent"></div>
        <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-progineer-gold/20 to-transparent"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-progineer-gold/10 to-transparent"></div>
        
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-progineer-gold/30 to-transparent"></div>
        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-progineer-gold/20 to-transparent"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-progineer-gold/10 to-transparent"></div>
      </div>
      
      <Container>
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="relative z-10"
        >
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.div variants={itemVariants} className="inline-block px-4 py-1 mb-4 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Centre d'innovation
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-semibold mb-4">
              Explorez nos ressources
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-gray-600 text-lg">
              Découvrez l'écosystème complet de nos services et ressources pour vous accompagner dans tous vos projets.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                variants={itemVariants}
                className={`rounded-2xl p-8 ${section.color} border ${section.borderColor} shadow-lg transform transition-transform duration-300 hover:scale-[1.02]`}
              >
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${section.iconColor} bg-white mr-4 shadow-sm`}>
                    <section.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
                </div>
                
                <ul className="space-y-3 pb-2">
                  {section.links.map((link, linkIndex) => (
                    <motion.li 
                      key={link.name}
                      custom={linkIndex}
                      variants={linkVariants}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <Link 
                        to={link.path} 
                        className="flex items-center p-3 rounded-lg bg-white/70 hover:bg-white transition-colors duration-300 group"
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${section.iconColor} bg-white/50 group-hover:bg-white transition-colors duration-300`}>
                          <link.icon className="h-4 w-4" />
                        </div>
                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{link.name}</span>
                        <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          {/* Badge futuriste en bas de section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex justify-center mt-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-khaki-100 via-progineer-gold/20 to-khaki-100 shadow-sm backdrop-blur-sm">
              <span className="text-khaki-800 text-sm mr-2">Découvrez notre approche innovante</span>
              <div className="w-2 h-2 rounded-full bg-progineer-gold animate-pulse"></div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default InnovationHub;
