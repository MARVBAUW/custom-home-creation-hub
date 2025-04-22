
import React from 'react';
import { Phone, Mail, Calculator, Calendar } from 'lucide-react';
import Button from '@/components/common/Button';
import { InternalLinkText } from '@/utils/internalLinking';

const ConstructionNeuveSidebar = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Besoin d'un devis ?</h3>
        <p className="text-gray-600 mb-6">
          <InternalLinkText 
            text="Contactez-nous pour échanger sur votre projet de construction neuve et obtenir un devis personnalisé."
            maxOccurrences={1}
          />
        </p>
        <div className="space-y-4">
          <Button href="/contact" className="w-full justify-center">
            <Phone className="mr-2 h-4 w-4" /> Nous appeler
          </Button>
          <Button href="/contact" variant="outline" className="w-full justify-center">
            <Mail className="mr-2 h-4 w-4" /> Nous écrire
          </Button>
        </div>
      </div>
      
      <div className="bg-khaki-50 p-6 rounded-xl border border-khaki-100">
        <h3 className="text-xl font-semibold mb-4">Outils pratiques</h3>
        <div className="space-y-4">
          <Button href="/estimation" variant="outline" className="w-full justify-center bg-white hover:bg-gray-50">
            <Calculator className="mr-2 h-4 w-4" /> Estimer mon projet
          </Button>
          <Button href="/contact" variant="outline" className="w-full justify-center bg-white hover:bg-gray-50">
            <Calendar className="mr-2 h-4 w-4" /> Prendre rendez-vous
          </Button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Ils nous font confiance</h3>
        <div className="flex flex-col space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="italic text-gray-600 text-sm mb-3">
              "Progineer a su mener notre projet de construction de A à Z avec professionnalisme et rigueur. Nous sommes enchantés du résultat."
            </p>
            <p className="text-sm font-semibold">Famille Martin, Marseille</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="italic text-gray-600 text-sm mb-3">
              "Une équipe à l'écoute qui a su transformer notre vision en réalité tout en respectant notre budget."
            </p>
            <p className="text-sm font-semibold">M. Dupont, Aix-en-Provence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstructionNeuveSidebar;
