
import React from 'react';
import Container from '@/components/common/Container';

const AboutValues = () => {
  return (
    <section className="py-16 bg-stone-50 border-y border-stone-200">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-4">
            Nos valeurs fondamentales
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ces principes guident notre approche et notre travail au quotidien.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-khaki-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Excellence</h3>
            <p className="text-gray-600">
              Nous nous engageons à atteindre l'excellence dans chaque aspect de notre travail, en accordant une attention particulière aux détails et à la qualité d'exécution.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-khaki-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fiabilité</h3>
            <p className="text-gray-600">
              Nous sommes fidèles à nos engagements en termes de qualité, de délais et de budget. Notre fiabilité est le fondement de la confiance que nos clients nous accordent.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-khaki-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Transparence</h3>
            <p className="text-gray-600">
              Nous privilégions une communication claire et honnête à toutes les étapes du projet, en expliquant nos choix et en tenant nos clients informés de l'avancement des travaux.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-khaki-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Client au centre</h3>
            <p className="text-gray-600">
              Nous plaçons les besoins et les attentes de nos clients au cœur de notre démarche, en adoptant une approche personnalisée pour chaque projet.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutValues;
