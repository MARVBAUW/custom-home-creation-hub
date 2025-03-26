
import React from 'react';
import Container from '@/components/common/Container';
import { 
  Ruler, Shield, Building, BookOpen, Users, BarChart, Calculator, 
  PenTool, Lightbulb, Landmark
} from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const expertise = [
  {
    title: "Réglementation et démarches administratives",
    icon: BookOpen,
    description: "Maîtrise des normes urbanistiques et des processus d'autorisation"
  },
  {
    title: "Optimisation énergétique",
    icon: Lightbulb,
    description: "Solutions performantes pour réduire l'empreinte carbone"
  },
  {
    title: "Pilotage d'appels d'offres",
    icon: Users,
    description: "Sélection rigoureuse des partenaires et prestataires"
  },
  {
    title: "Aménagement urbain",
    icon: Building,
    description: "Expertise en planification et développement territorial"
  },
  {
    title: "Réception et livraison",
    icon: Shield,
    description: "Contrôle qualité et conformité aux cahiers des charges"
  },
  {
    title: "Planification budgétaire",
    icon: Calculator,
    description: "Gestion financière et optimisation des coûts"
  },
  {
    title: "Études de marché immobilier",
    icon: BarChart,
    description: "Analyse des tendances et valorisation des biens"
  },
  {
    title: "Rénovation et réhabilitation",
    icon: Ruler,
    description: "Transformation et mise aux normes de bâtiments existants"
  },
  {
    title: "Design d'espace",
    icon: PenTool,
    description: "Création d'aménagements fonctionnels et esthétiques"
  },
  {
    title: "Montage financier",
    icon: Landmark,
    description: "Accompagnement dans l'obtention de subventions et financements"
  }
];

const ExpertiseSection = () => {
  const { theme } = useTheme();
  const goldColor = theme === 'dark' ? "#FFFFFF" : "#c8a86d";
  
  return (
    <section className="py-20 bg-stone-50 dark:bg-gray-900">
      <Container>
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 dark:text-white">
            Nos savoir-faire
          </h2>
          <div className="w-20 h-1 bg-progineer-gold mx-auto mb-8"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Progineer réunit des compétences variées pour vous offrir un accompagnement complet sur tous vos projets de construction et d'aménagement.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertise.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index} 
                className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow text-center"
              >
                <div className="mb-4 bg-khaki-100 dark:bg-gray-700 p-4 rounded-full">
                  <IconComponent className="h-8 w-8" style={{ color: goldColor }} />
                </div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Notre équipe pluridisciplinaire combine des compétences techniques et créatives pour vous garantir un accompagnement sur mesure et une réalisation à la hauteur de vos attentes.
          </p>
          <div className="inline-block px-4 py-2 border border-progineer-gold text-progineer-gold dark:text-white font-medium rounded">
            + de 15 ans d'expérience cumulée dans le domaine
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ExpertiseSection;
