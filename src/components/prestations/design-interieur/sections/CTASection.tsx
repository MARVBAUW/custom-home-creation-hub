
import React from 'react';
import Button from '@/components/common/Button';
import { InternalLinkText } from '@/utils/internalLinking';

const CTASection = () => {
  return (
    <div className="bg-khaki-50 p-6 rounded-lg">
      <h3 className="text-2xl font-medium mb-4">Vous avez un projet de design d'intérieur ?</h3>
      <p className="mb-6">
        <InternalLinkText 
          text="Contactez-nous pour un premier échange sans engagement. Nous serons ravis d'étudier votre projet et de vous proposer des solutions créatives adaptées à vos besoins et à votre budget."
          maxOccurrences={1}
        />
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button href="/estimation" className="bg-khaki-700 hover:bg-khaki-800 text-white">
          Estimer mon projet
        </Button>
        <Button href="/contact" variant="outline" className="border-khaki-300 hover:bg-khaki-50">
          Prendre rendez-vous
        </Button>
      </div>
    </div>
  );
};

export default CTASection;
