
import React from 'react';
import Container from '@/components/common/Container';
import { Shield, Clock, Wrench, Users, CheckCircle, Building } from 'lucide-react';

const ExpertiseSection = () => {
  return (
    <section className="py-20 bg-stone-50">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-rare tracking-wide mb-4">
            Pourquoi faire appel à un maître d'œuvre à Marseille ?
          </h2>
          <p className="text-gray-600">
            Notre expertise technique et notre coordination des corps de métier garantissent la réussite de votre projet
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
            <Shield className="w-12 h-12 text-progineer-gold mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expertise technique</h3>
            <p className="text-gray-600">
              Notre maîtrise d'œuvre assure une expertise technique pointue pour chaque projet de construction ou rénovation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
            <Users className="w-12 h-12 text-progineer-gold mb-4" />
            <h3 className="text-xl font-semibold mb-2">Coordination des corps de métier</h3>
            <p className="text-gray-600">
              Nous coordonnons efficacement tous les corps de métier pour une réalisation harmonieuse de votre projet.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
            <Clock className="w-12 h-12 text-progineer-gold mb-4" />
            <h3 className="text-xl font-semibold mb-2">Respect des délais</h3>
            <p className="text-gray-600">
              Notre engagement : respecter scrupuleusement les délais fixés pour votre projet de construction.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
            <Wrench className="w-12 h-12 text-progineer-gold mb-4" />
            <h3 className="text-xl font-semibold mb-2">Choix des matériaux</h3>
            <p className="text-gray-600">
              Bénéficiez de notre expertise pour sélectionner les meilleurs matériaux adaptés à votre projet.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
            <Building className="w-12 h-12 text-progineer-gold mb-4" />
            <h3 className="text-xl font-semibold mb-2">Projets de rénovation</h3>
            <p className="text-gray-600">
              Spécialiste de la rénovation à Marseille, nous transformons vos espaces avec expertise.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
            <CheckCircle className="w-12 h-12 text-progineer-gold mb-4" />
            <h3 className="text-xl font-semibold mb-2">Suivi de chantier</h3>
            <p className="text-gray-600">
              Un maître d'ouvrage dédié suit votre chantier de A à Z pour garantir une réalisation parfaite.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ExpertiseSection;
