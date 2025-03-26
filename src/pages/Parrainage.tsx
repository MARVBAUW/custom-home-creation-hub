
import React from 'react';
import { Helmet } from 'react-helmet';

const Parrainage = () => {
  return (
    <>
      <Helmet>
        <title>Programme de Parrainage | Progineer - Architecte & Maître d'œuvre en PACA</title>
        <meta name="description" content="Parrainez vos proches pour leurs projets de construction et recevez des avantages exclusifs. Programme de parrainage Progineer en région PACA." />
        <meta name="keywords" content="parrainage travaux, parrainage architecte, recommandation maître d'œuvre, parrainage construction PACA" />
      </Helmet>
      
      <div className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-semibold text-center mb-8">
            Programme de Parrainage Travaux
          </h1>
          <p className="text-lg text-gray-700 mb-10 text-center">
            Parrainez vos proches pour leurs projets de construction, rénovation ou extension 
            et bénéficiez d'avantages exclusifs.
          </p>
          
          <div className="bg-khaki-50 p-8 rounded-lg mb-10">
            <h2 className="text-2xl font-semibold mb-4">Comment ça marche ?</h2>
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="flex items-center justify-center bg-progineer-gold text-white rounded-full w-6 h-6 mr-3 flex-shrink-0 mt-1">1</span>
                <p>Recommandez Progineer à vos amis, votre famille ou vos collègues qui ont un projet immobilier.</p>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center bg-progineer-gold text-white rounded-full w-6 h-6 mr-3 flex-shrink-0 mt-1">2</span>
                <p>Votre filleul nous contacte en mentionnant votre nom comme parrain.</p>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center bg-progineer-gold text-white rounded-full w-6 h-6 mr-3 flex-shrink-0 mt-1">3</span>
                <p>Si votre filleul signe un contrat avec nous, vous recevez votre récompense.</p>
              </li>
            </ol>
          </div>
          
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-6">Vos avantages</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-3">Pour vous, le parrain</h3>
                <p>Recevez une carte cadeau d'une valeur de 200€ pour chaque filleul qui concrétise un projet avec nous.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-3">Pour votre filleul</h3>
                <p>Votre filleul bénéficie d'une remise de 5% sur nos prestations de maîtrise d'œuvre.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-10">
            <h2 className="text-2xl font-semibold mb-4">Conditions</h2>
            <ul className="space-y-2">
              <li>• Le parrainage est valable uniquement pour les nouveaux clients.</li>
              <li>• La récompense est versée après la signature du contrat de maîtrise d'œuvre.</li>
              <li>• Offre non cumulable avec d'autres promotions en cours.</li>
              <li>• Sans limite du nombre de parrainages possibles.</li>
            </ul>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Vous avez des questions ?</h2>
            <p className="mb-8">
              N'hésitez pas à nous contacter pour en savoir plus sur notre programme de parrainage.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-progineer-gold hover:bg-progineer-gold/90 text-white font-medium py-3 px-6 rounded transition-colors"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Parrainage;
