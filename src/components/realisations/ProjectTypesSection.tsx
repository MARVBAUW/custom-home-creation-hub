
import React from "react";
import Container from "@/components/common/Container";
import { InternalLinkText } from "@/utils/internalLinking";

const ProjectTypesSection = () => (
  <section className="py-16 bg-stone-50">
    <Container>
      <h2 className="text-3xl font-semibold mb-10 text-center">Types de projets réalisés</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-2xl font-medium mb-4">Construction neuve</h3>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span><InternalLinkText text="Maisons individuelles sur mesure" /></span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span><InternalLinkText text="Villas contemporaines et traditionnelles" /></span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span><InternalLinkText text="Petit collectif résidentiel" /></span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span><InternalLinkText text="Bureaux et locaux professionnels" /></span>
            </li>
          </ul>
          <p className="text-gray-600 text-sm">
            <InternalLinkText 
              text="Nos constructions neuves sont conçues dans le respect des normes énergétiques et environnementales actuelles, avec une attention particulière portée à l'intégration dans leur environnement."
              maxOccurrences={2} 
            />
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-2xl font-medium mb-4">Rénovation & Extension</h3>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span><InternalLinkText text="Rénovation complète d'appartements" /></span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span><InternalLinkText text="Réhabilitation de bâtiments anciens" /></span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span><InternalLinkText text="Extensions de maisons existantes" /></span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span><InternalLinkText text="Surélévations et aménagements de combles" /></span>
            </li>
          </ul>
          <p className="text-gray-600 text-sm">
            <InternalLinkText 
              text="Nos projets de rénovation et d'extension valorisent le patrimoine existant tout en y apportant le confort moderne et une amélioration des performances énergétiques."
              maxOccurrences={2}
            />
          </p>
        </div>
      </div>
    </Container>
  </section>
);

export default ProjectTypesSection;
