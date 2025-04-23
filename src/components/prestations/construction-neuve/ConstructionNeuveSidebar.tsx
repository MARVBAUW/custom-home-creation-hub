
import React from 'react';
import Button from '@/components/common/Button';
import { InternalLinkText } from '@/utils/internalLinking';
import { formatCityName } from '@/utils/localSEOUtils';

interface ConstructionNeuveSidebarProps {
  city?: string;
}

const ConstructionNeuveSidebar: React.FC<ConstructionNeuveSidebarProps> = ({ city }) => {
  const cityName = city ? formatCityName(city) : '';

  return (
    <div className="space-y-6">
      <div className="bg-khaki-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">
          {cityName ? `Services de construction à ${cityName}` : 'Nos services de construction'}
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="mr-2 text-khaki-600 font-bold">→</span>
            <span><InternalLinkText text="Étude de faisabilité et conception architecturale" /></span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-khaki-600 font-bold">→</span>
            <span><InternalLinkText text="Dépôt de permis de construire" /></span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-khaki-600 font-bold">→</span>
            <span><InternalLinkText text="Consultation et sélection des entreprises" /></span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-khaki-600 font-bold">→</span>
            <span><InternalLinkText text="Coordination des travaux" /></span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-khaki-600 font-bold">→</span>
            <span><InternalLinkText text="Suivi de chantier hebdomadaire" /></span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-khaki-600 font-bold">→</span>
            <span><InternalLinkText text="Réception des travaux et livraison" /></span>
          </li>
        </ul>
        <div className="mt-6">
          <Button href="/contact" className="w-full justify-center">
            Discuter de votre projet
          </Button>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">
          {cityName ? `Construction à ${cityName}` : 'Typologies de construction'}
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="mr-2 text-khaki-600 font-bold">•</span>
            <span><InternalLinkText text={`Maisons contemporaines${cityName ? ` à ${cityName}` : ''}`} /></span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-khaki-600 font-bold">•</span>
            <span><InternalLinkText text={`Villas méditerranéennes${cityName ? ` à ${cityName}` : ''}`} /></span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-khaki-600 font-bold">•</span>
            <span><InternalLinkText text={`Maisons à étage${cityName ? ` à ${cityName}` : ''}`} /></span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-khaki-600 font-bold">•</span>
            <span><InternalLinkText text={`Constructions écologiques${cityName ? ` à ${cityName}` : ''}`} /></span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-khaki-600 font-bold">•</span>
            <span><InternalLinkText text={`Maisons de plain-pied${cityName ? ` à ${cityName}` : ''}`} /></span>
          </li>
        </ul>
      </div>

      <div className="bg-green-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Pourquoi nous choisir ?</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="mr-2 text-green-600 font-bold">✓</span>
            <span><InternalLinkText text={`Plus de 15 ans d'expérience${cityName ? ` à ${cityName} et en PACA` : ' en PACA'}`} /></span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-600 font-bold">✓</span>
            <span><InternalLinkText text="Projets livrés dans les délais" /></span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-600 font-bold">✓</span>
            <span><InternalLinkText text="Garantie décennale" /></span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-600 font-bold">✓</span>
            <span><InternalLinkText text={`Connaissance du marché local${cityName ? ` à ${cityName}` : ''}`} /></span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-600 font-bold">✓</span>
            <span><InternalLinkText text="Suivi personnalisé de votre projet" /></span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ConstructionNeuveSidebar;
