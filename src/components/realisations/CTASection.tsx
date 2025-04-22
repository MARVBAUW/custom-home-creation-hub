
import React from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { InternalLinkText } from "@/utils/internalLinking";

const CTASection = () => (
  <section className="py-16 bg-stone-50 border-y border-stone-200">
    <Container>
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Vous avez un projet similaire ?
        </h2>
        <p className="text-gray-600 mb-8">
          <InternalLinkText 
            text="Contactez-nous pour discuter de votre projet et découvrir comment notre expertise peut vous aider à le concrétiser."
            maxOccurrences={2}
          />
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/estimation" className="bg-khaki-700 hover:bg-khaki-800 text-white">Estimer mon projet</Button>
          <Button href="/contact" variant="outline" className="border-khaki-300 hover:bg-khaki-50">Prendre rendez-vous</Button>
        </div>
      </div>
    </Container>
  </section>
);

export default CTASection;
