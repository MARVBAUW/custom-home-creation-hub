
import React from 'react';
import Container from '@/components/common/Container';

const ProcessSection = () => {
  return (
    <section className="py-16 bg-stone-50 border-y border-stone-100">
      <Container>
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6">Processus Projet</h2>
          <p className="text-gray-600">
            Nous suivons une méthodologie rigoureuse : analyse du besoin, étude de faisabilité, conception, 
            choix des entreprises, pilotage du chantier, suivi administratif et remise des clés.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-khaki-600 text-white flex items-center justify-center font-semibold text-lg">1</div>
            <h3 className="text-xl font-semibold mb-3 mt-2">Consultation initiale</h3>
            <p className="text-gray-600">
              Nous écoutons vos besoins, analysons votre projet et définissons ensemble les grandes lignes de votre projet.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-khaki-600 text-white flex items-center justify-center font-semibold text-lg">2</div>
            <h3 className="text-xl font-semibold mb-3 mt-2">Étude et conception</h3>
            <p className="text-gray-600">
              Nous élaborons les plans, estimons les coûts et proposons des solutions techniques adaptées à votre budget.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-khaki-600 text-white flex items-center justify-center font-semibold text-lg">3</div>
            <h3 className="text-xl font-semibold mb-3 mt-2">Réalisation</h3>
            <p className="text-gray-600">
              Nous coordonnons les différents corps de métier et veillons au respect du calendrier et de la qualité d'exécution.
            </p>
          </div>

          {/* Step 4 */}
          <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-khaki-600 text-white flex items-center justify-center font-semibold text-lg">4</div>
            <h3 className="text-xl font-semibold mb-3 mt-2">Livraison et suivi</h3>
            <p className="text-gray-600">
              Nous effectuons la réception des travaux et assurons un suivi post-livraison pour garantir votre entière satisfaction.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProcessSection;
