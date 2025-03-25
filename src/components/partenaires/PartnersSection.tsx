
import React from 'react';
import Container from '@/components/common/Container';

const PartnersSection = () => {
  return (
    <section className="py-16 bg-stone-50 border-y border-stone-200">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Qui peut devenir partenaire ?</h2>
            <p className="text-gray-600 mb-8">
              Nous recherchons des professionnels qualifiés et passionnés pour compléter notre réseau et offrir un service d'excellence à nos clients.
            </p>
            
            <div className="space-y-6">
              <PartnerCategory
                title="Artisans et entreprises du BTP"
                items={[
                  "Maçons, charpentiers, plombiers, électriciens",
                  "Entreprises de gros œuvre et second œuvre",
                  "Peintres, carreleurs, menuisiers"
                ]}
              />
              
              <PartnerCategory
                title="Professionnels du secteur immobilier"
                items={[
                  "Agents immobiliers",
                  "Courtiers en prêt immobilier",
                  "Promoteurs immobiliers"
                ]}
              />
              
              <PartnerCategory
                title="Autres professionnels"
                items={[
                  "Architectes d'intérieur",
                  "Paysagistes",
                  "Bureaux d'études techniques"
                ]}
              />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
            <PartnerContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
};

interface PartnerCategoryProps {
  title: string;
  items: string[];
}

const PartnerCategory = ({ title, items }: PartnerCategoryProps) => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
            <svg className="h-3 w-3 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-gray-600">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default PartnersSection;
