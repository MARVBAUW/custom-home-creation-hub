
import React from 'react';
import Container from '@/components/common/Container';

const SEOSection = () => {
  return (
    <section className="py-8 bg-stone-50 border-t border-stone-200">
      <Container>
        <div className="text-sm text-stone-500">
          <h2 className="text-base font-medium mb-2 text-stone-700">Entreprise d'architecture et de maîtrise d'œuvre en PACA</h2>
          <p className="mb-2">
            <strong>Progineer</strong> - Ingénieur, maître d'œuvre à Marseille et en PACA – Spécialiste en construction de maisons sur mesure, rénovation et extension. Nos architectes et ingénieurs vous accompagnent de A à Z dans tous vos projets de construction et rénovation.
          </p>
          <p>
            Nos zones d'intervention : <strong>Marseille</strong>, <strong>Saint-Tropez</strong>, <strong>Toulon</strong>, <strong>Nice</strong>, <strong>Cannes</strong>, <strong>Fréjus</strong>, toute la région <strong>Provence-Alpes-Côte d'Azur</strong>.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default SEOSection;
