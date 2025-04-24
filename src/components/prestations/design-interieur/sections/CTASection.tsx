
import React from 'react';
import Button from '@/components/common/Button';
import { InternalLinkText } from '@/utils/internalLinking';
import { CalculatorIcon, ArrowRightIcon } from 'lucide-react';

const CTASection = () => {
  return (
    <div className="bg-khaki-50 p-6 rounded-lg shadow-sm">
      <h3 className="text-2xl font-medium mb-4">Vous avez un projet de design d'intérieur ?</h3>
      <p className="mb-6">
        <InternalLinkText 
          text="Contactez-nous pour un premier échange sans engagement. Nous serons ravis d'étudier votre projet et de vous proposer des solutions créatives adaptées à vos besoins et à votre budget."
          maxOccurrences={1}
        />
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          href="/estimation" 
          className="bg-khaki-700 hover:bg-khaki-800 text-white flex items-center justify-center gap-2 group transition-all duration-300 transform hover:scale-105"
        >
          <CalculatorIcon className="h-5 w-5 transition-transform group-hover:rotate-12" />
          Estimer mon projet gratuitement
          <ArrowRightIcon className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
        </Button>
        <Button href="/contact" variant="outline" className="border-khaki-300 hover:bg-khaki-50">
          Prendre rendez-vous
        </Button>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Utilisez notre outil d'estimation détaillée pour générer un rapport complet pour votre banque ou votre assurance.
      </p>
    </div>
  );
};

export default CTASection;
