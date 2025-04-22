
import React from 'react';
import { Phone, Mail, Calculator, Calendar } from 'lucide-react';
import Button from '@/components/common/Button';
import { InternalLinkText } from '@/utils/internalLinking';

const ExtensionSidebar = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Besoin d'un devis ?</h3>
        <p className="text-gray-600 mb-6">
          <InternalLinkText
            text="Contactez-nous pour échanger sur votre projet d'extension de maison et obtenir un devis personnalisé auprès de notre maître d'œuvre à Marseille ou en région PACA."
            maxOccurrences={2}
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
        <h3 className="text-xl font-semibold mb-4">Types d'extensions</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">•</span>
            <InternalLinkText text="Extension horizontale" />
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">•</span>
            <InternalLinkText text="Surélévation" />
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">•</span>
            <InternalLinkText text="Véranda" />
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">•</span>
            <InternalLinkText text="Aménagement de combles" />
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">•</span>
            <InternalLinkText text="Extension à ossature bois" />
          </li>
        </ul>
        <div className="mt-6 space-y-4">
          <Button href="/estimation" variant="outline" className="w-full justify-center bg-white hover:bg-gray-50">
            <Calculator className="mr-2 h-4 w-4" /> Estimer mon projet
          </Button>
          <Button href="/contact" variant="outline" className="w-full justify-center bg-white hover:bg-gray-50">
            <Calendar className="mr-2 h-4 w-4" /> Prendre rendez-vous
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExtensionSidebar;
