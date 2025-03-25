
import React from 'react';
import Container from '@/components/common/Container';

const ProcessSection = () => {
  return (
    <section className="py-16">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-4">
            Comment ça fonctionne ?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Le processus de partenariat avec Progineer est simple et transparent.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <ProcessStep
            number={1}
            title="Candidature"
            description="Remplissez le formulaire de contact pour nous faire part de votre intérêt."
          />
          
          <ProcessStep
            number={2}
            title="Échange"
            description="Nous vous contactons pour discuter de votre activité et de nos attentes mutuelles."
          />
          
          <ProcessStep
            number={3}
            title="Convention"
            description="Signature d'une convention de partenariat définissant les modalités de collaboration."
          />
          
          <ProcessStep
            number={4}
            title="Collaboration"
            description="Intégration à notre réseau et début des collaborations sur nos projets."
          />
        </div>
      </Container>
    </section>
  );
};

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
}

const ProcessStep = ({ number, title, description }: ProcessStepProps) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center relative">
    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-khaki-600 text-white flex items-center justify-center font-semibold">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-3 mt-4">{title}</h3>
    <p className="text-gray-600">
      {description}
    </p>
  </div>
);

export default ProcessSection;
