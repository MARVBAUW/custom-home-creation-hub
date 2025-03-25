
import React from 'react';
import Container from '@/components/common/Container';
import { Building2, Handshake, Globe, Users } from 'lucide-react';

const BenefitsSection = () => {
  return (
    <section className="py-16">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-4">
            Pourquoi devenir partenaire ?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            En rejoignant notre réseau, vous bénéficiez de nombreux avantages pour développer votre activité.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <BenefitCard 
            icon={<Building2 className="h-6 w-6 text-khaki-700" />}
            title="Projets de qualité"
            description="Accédez à des projets sérieux et bien préparés, avec des clients accompagnés par notre équipe."
          />
          
          <BenefitCard 
            icon={<Handshake className="h-6 w-6 text-khaki-700" />}
            title="Collaboration simplifiée"
            description="Bénéficiez d'une coordination efficace et d'une communication fluide avec tous les intervenants."
          />
          
          <BenefitCard 
            icon={<Globe className="h-6 w-6 text-khaki-700" />}
            title="Visibilité accrue"
            description="Gagnez en visibilité grâce à notre plateforme et nos recommandations auprès de nos clients."
          />
          
          <BenefitCard 
            icon={<Users className="h-6 w-6 text-khaki-700" />}
            title="Réseau professionnel"
            description="Intégrez un réseau de professionnels qualifiés et développez de nouvelles opportunités d'affaires."
          />
        </div>
      </Container>
    </section>
  );
};

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard = ({ icon, title, description }: BenefitCardProps) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
    <div className="mx-auto w-12 h-12 rounded-full bg-khaki-100 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default BenefitsSection;
