
import React from 'react';
import { FileCode, Lock, Mail, ArrowRight } from 'lucide-react';
import FeatureCard from './FeatureCard';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ClientFeaturesOverview = () => {
  const features: Feature[] = [
    {
      title: "Documents sécurisés",
      description: "Tous vos documents contractuels et techniques stockés en toute sécurité dans un espace dédié.",
      icon: <Lock className="h-10 w-10 p-2 bg-khaki-100 text-khaki-700 rounded-lg" />
    },
    {
      title: "Suivi de projet",
      description: "Suivez l'avancement de votre projet en temps réel, avec les plannings et mises à jour automatiques.",
      icon: <ArrowRight className="h-10 w-10 p-2 bg-khaki-100 text-khaki-700 rounded-lg" />
    },
    {
      title: "Communication facilitée",
      description: "Échangez avec votre chef de projet et recevez des notifications pour chaque étape clé.",
      icon: <Mail className="h-10 w-10 p-2 bg-khaki-100 text-khaki-700 rounded-lg" />
    }
  ];
  
  return (
    <div className="bg-gradient-to-br from-khaki-600 to-khaki-800 rounded-xl text-white p-8">
      <div className="mb-6">
        <FileCode className="h-12 w-12 mb-4" />
        <h3 className="text-2xl font-semibold mb-2">Votre projet à portée de main</h3>
        <p className="opacity-90">
          L'espace client Progineer vous permet de suivre en temps réel l'avancement 
          de votre projet et d'accéder à l'ensemble de vos documents.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
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
