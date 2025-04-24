
import React from 'react';
import ProcessSection from './sections/ProcessSection';
import SkillsGrid from './sections/SkillsGrid';
import RealizationsGrid from './sections/RealizationsGrid';
import CTASection from './sections/CTASection';

const DesignInterieurContent = () => {
  return (
    <>
      <h2 className="text-3xl font-semibold mb-6">Transformez votre intérieur</h2>
      <p className="mb-8 text-gray-700">
        Chez Progineer, notre équipe de <strong>designers d'intérieur</strong> crée des espaces qui vous ressemblent. Nous concevons des intérieurs harmonieux, fonctionnels et esthétiques qui répondent à vos besoins spécifiques et reflètent votre personnalité. Chaque projet est unique et bénéficie d'une approche personnalisée.
      </p>

      <div className="mb-12">
        <img 
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" 
          alt="Exemple de design d'intérieur réalisé par Progineer en PACA"
          className="w-full h-auto rounded-xl mb-4"
        />
        <p className="text-sm text-gray-500 text-center">Aménagement intérieur contemporain à Marseille</p>
      </div>

      <h3 className="text-2xl font-medium mb-4">Notre processus créatif</h3>
      <ProcessSection />

      <h3 className="text-2xl font-medium mb-4">Nos compétences en design</h3>
      <SkillsGrid />

      <h3 className="text-2xl font-medium mb-4">Exemples de réalisations</h3>
      <RealizationsGrid />

      <CTASection />
    </>
  );
};

export default DesignInterieurContent;
