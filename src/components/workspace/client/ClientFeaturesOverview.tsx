
import React from 'react';
import { FileCode, Lock, Mail, ArrowRight } from 'lucide-react';
import FeatureCard from './FeatureCard';
import { useTheme } from '@/hooks/use-theme';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ClientFeaturesOverview = () => {
  const { theme } = useTheme();
  
  const features: Feature[] = [
    {
      title: "Documents sécurisés",
      description: "Tous vos documents contractuels et techniques stockés en toute sécurité dans un espace dédié.",
      icon: <Lock className={`h-10 w-10 p-2 ${theme === 'dark' ? 'bg-progineer-gold/20 text-progineer-gold' : 'bg-khaki-100 text-khaki-700'} rounded-lg`} />
    }, 
    {
      title: "Suivi de projet",
      description: "Suivez l'avancement de votre projet en temps réel, avec les plannings et mises à jour automatiques.",
      icon: <ArrowRight className={`h-10 w-10 p-2 ${theme === 'dark' ? 'bg-progineer-gold/20 text-progineer-gold' : 'bg-khaki-100 text-khaki-700'} rounded-lg`} />
    }, 
    {
      title: "Communication facilitée",
      description: "Échangez avec votre chef de projet et recevez des notifications pour chaque étape clé.",
      icon: <Mail className={`h-10 w-10 p-2 ${theme === 'dark' ? 'bg-progineer-gold/20 text-progineer-gold' : 'bg-khaki-100 text-khaki-700'} rounded-lg`} />
    }
  ];

  return (
    <div className={`rounded-xl text-white p-8 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-lg' 
        : 'bg-gradient-to-br from-khaki-600 to-khaki-800'
    }`}>
      <div className="mb-6">
        <FileCode className="h-12 w-12 mb-4 text-progineer-gold" />
        <h3 className="text-2xl font-semibold mb-2">Votre projet à portée de main</h3>
        <p className="opacity-90">
          L'espace client Progineer vous permet de suivre en temps réel l'avancement 
          de votre projet et d'accéder à l'ensemble de vos documents.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {features.map((feature, index) => (
          <FeatureCard 
            key={index} 
            title={feature.title} 
            description={feature.description} 
            icon={feature.icon} 
          />
        ))}
      </div>
    </div>
  );
};

export default ClientFeaturesOverview;
