
import React, { useEffect, useRef } from 'react';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import { ArrowRight, ChevronDown, Shield, Clock, Wrench, Users, CheckCircle, Building } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { motion } from 'framer-motion';

const Hero = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!particlesRef.current) return;

    const createParticles = () => {
      const container = particlesRef.current;
      if (!container) return;

      container.innerHTML = '';
      const particleCount = window.innerWidth < 768 ? 30 : 60;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full bg-white/30 pointer-events-none';
        
        // Tailles variées
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Positions aléatoires
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Animation avec délai
        particle.style.animation = `floatParticle ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.opacity = `${Math.random() * 0.5 + 0.2}`;
        
        container.appendChild(particle);
      }
    };

    createParticles();
    window.addEventListener('resize', createParticles);

    return () => {
      window.removeEventListener('resize', createParticles);
    };
  }, []);

  const scrollToNextSection = () => {
    const expertiseSection = document.getElementById('expertise-section');
    if (expertiseSection) {
      expertiseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative min-h-[100vh] flex items-center py-24 overflow-hidden">
        {/* Particles */}
        <div ref={particlesRef} className="absolute inset-0 z-10 overflow-hidden pointer-events-none" />
        
        {/* Background with modern gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')`,
              backgroundPosition: 'center',
            }}
          ></div>
        </div>
        
        <Container className="relative z-20 mt-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <div className="w-full flex justify-center mb-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Logo variant="metallic-full" size="lg" className="mx-auto logo-3d-effect" />
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-block px-3 py-1 mb-6 rounded-full bg-progineer-gold/30 backdrop-blur-sm text-white text-sm font-medium"
            >
              Maître d'œuvre à Marseille
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-rare tracking-wide text-white leading-tight mb-6 text-left"
            >
              Votre maître d'œuvre expert à <br className="hidden md:block" />
              <span className="text-progineer-gold bg-clip-text">Marseille et en PACA</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl text-left speakable"
            >
              Coordination des corps de métier, respect des délais et expertise technique pour vos projets 
              de construction et rénovation. Un accompagnement sur mesure par votre maître d'ouvrage à Marseille.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                href="/estimation" 
                size="lg" 
                variant="estimation" 
                className="font-medium backdrop-blur-sm border-white/10 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300"
              >
                Estimer mon projet
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                href="/prestations-maitre-oeuvre" 
                variant="outline" 
                size="lg" 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                Découvrir nos prestations
              </Button>
            </motion.div>
          </motion.div>
        </Container>

        {/* Scroll down indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatType: "loop" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToNextSection}
        >
          <div className="flex flex-col items-center">
            <span className="text-white mb-2 text-sm">Découvrir</span>
            <ChevronDown className="text-white h-6 w-6" />
          </div>
        </motion.div>
      </section>

      {/* Key features section - Completely redesigned */}
      <section id="expertise-section" className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(120,115,70,0.2),_transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,_rgba(120,115,70,0.15),_transparent_50%)]"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full border border-progineer-gold/10 opacity-20 transform rotate-45"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full border border-progineer-gold/10 opacity-10"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full border border-progineer-gold/20 opacity-30"></div>
        
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div 
              className="inline-block px-5 py-2 mb-6 rounded-full bg-progineer-gold/20 backdrop-blur-md border border-progineer-gold/30 text-white/90 text-sm font-medium"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Notre expertise à votre service
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-rare tracking-wide text-white mb-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="relative">
                Nos engagements pour votre projet
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-progineer-gold to-transparent"></span>
              </span>
            </motion.h2>
            
            <motion.p 
              className="max-w-2xl mx-auto text-white/70 text-lg"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Une maîtrise d'œuvre complète qui associe expertise technique, coordination et respect des délais
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
          >
            {[
              {
                icon: Users,
                title: "Coordination des métiers",
                description: "Orchestration experte de tous les corps de métier pour une réalisation harmonieuse et efficiente de votre projet",
                gradient: "from-amber-600/20 to-amber-700/40"
              },
              {
                icon: Clock,
                title: "Respect des délais",
                description: "Planification rigoureuse et suivi constant pour garantir la livraison de votre projet dans les temps impartis",
                gradient: "from-emerald-600/20 to-emerald-700/40"
              },
              {
                icon: Shield,
                title: "Expertise technique",
                description: "Solutions techniques innovantes et conformes aux normes en vigueur pour des résultats durables et qualitatifs",
                gradient: "from-sky-600/20 to-sky-700/40"
              },
              {
                icon: Wrench,
                title: "Maîtrise d'œuvre complète",
                description: "Un accompagnement global, de la conception initiale jusqu'à la réception finale de votre projet de construction",
                gradient: "from-purple-600/20 to-purple-700/40"
              },
              {
                icon: Building,
                title: "Sélection des matériaux",
                description: "Choix minutieux de matériaux de qualité pour garantir la durabilité et l'esthétique de votre construction",
                gradient: "from-rose-600/20 to-rose-700/40"
              },
              {
                icon: CheckCircle,
                title: "Innovation durable",
                description: "Intégration de solutions éco-responsables pour des projets respectueux de l'environnement et économes en énergie",
                gradient: "from-blue-600/20 to-blue-700/40"
              }
            ].map((item, index) => (
              <EngagementCard 
                key={index} 
                icon={item.icon} 
                title={item.title} 
                description={item.description} 
                gradient={item.gradient}
                delay={index * 0.1}
              />
            ))}
          </motion.div>
        </Container>
      </section>
    </>
  );
};

interface EngagementCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  delay: number;
}

const EngagementCard = ({ icon: Icon, title, description, gradient, delay }: EngagementCardProps) => {
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group perspective-1000"
    >
      <div className="relative transform-style-3d transition-all duration-500 group-hover:rotate-y-3 group-hover:rotate-x-3">
        <div className={`rounded-xl backdrop-blur-lg bg-gradient-to-br ${gradient} border border-white/10 p-6 h-full shadow-xl 
          group-hover:shadow-2xl group-hover:border-progineer-gold/30 transition-all duration-500`}>
          
          {/* Glowing background effect on hover */}
          <div className="absolute inset-0 bg-progineer-gold/5 rounded-xl opacity-0 group-hover:opacity-100 
            blur-xl transition-opacity duration-500"></div>
          
          {/* Icon with enhanced styling */}
          <div className="relative z-10 mb-5">
            <div className="h-14 w-14 rounded-lg flex items-center justify-center bg-gray-800/70 border border-white/5
              group-hover:scale-110 group-hover:bg-gradient-to-br from-gray-800 to-gray-900 
              transition-all duration-500 shadow-inner">
              <Icon className="h-7 w-7 text-progineer-gold group-hover:text-white group-hover:scale-110 transition-all duration-500" />
            </div>
          </div>
          
          {/* Content with improved typography */}
          <div className="relative z-10">
            <h3 className="text-xl font-semibold text-white group-hover:text-progineer-gold transition-colors duration-300 mb-3">{title}</h3>
            
            {/* Animated separator line */}
            <div className="w-12 h-0.5 bg-gradient-to-r from-progineer-gold/40 to-white/10 mb-4 transform origin-left scale-x-0
              group-hover:scale-x-100 transition-transform duration-500"></div>
            
            <p className="text-white/70 group-hover:text-white/90 text-sm leading-relaxed transition-colors duration-300">{description}</p>
          </div>
          
          {/* Decorative corner element */}
          <div className="absolute -top-1 -right-1 w-8 h-8 border-t border-r border-progineer-gold/20 opacity-0 
            group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b border-l border-progineer-gold/20 opacity-0 
            group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
