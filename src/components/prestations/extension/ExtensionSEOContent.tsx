
import React from 'react';
import { Link } from 'react-router-dom';

const ExtensionSEOContent: React.FC = () => {
  return (
    <section className="mt-16 bg-gray-50 p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Tout savoir sur l'extension de maison en région PACA</h2>
      
      <p className="mb-4">
        L'<strong>extension de maison</strong> représente une solution idéale pour gagner en surface habitable sans déménager. 
        En tant que maître d'œuvre avec <strong>5 années d'expertise</strong> dans des projets de moyenne à grande envergure, 
        nous vous accompagnons dans tous vos projets d'<strong>agrandissement résidentiel</strong> en région PACA.
      </p>

      <h3 className="text-xl font-medium my-4">Démarches administratives et règlementations pour votre extension</h3>
      <p className="mb-4">
        Avant d'entamer des travaux d'extension, il est essentiel de se conformer aux réglementations urbanistiques locales. 
        Selon la superficie de votre projet et votre localisation, un <strong>permis de construire</strong> ou une déclaration 
        préalable de travaux sera nécessaire. Le PLU (Plan Local d'Urbanisme) détermine les règles spécifiques à votre parcelle. 
        Notre équipe vous accompagne dans ces démarches administratives pour garantir la conformité de votre projet avec 
        <Link to="/estimation" className="text-khaki-700 hover:underline"> notre service d'estimation personnalisée</Link>.
      </p>

      <h3 className="text-xl font-medium my-4">Types d'extensions adaptées au climat méditerranéen</h3>
      <p className="mb-4">
        L'<strong>extension à toit plat</strong> connaît un grand succès en région PACA pour son esthétique contemporaine 
        et ses possibilités d'aménagement en terrasse. L'<strong>extension bois</strong> offre une excellente performance 
        thermique, idéale face aux variations de température méditerranéennes, tout en réduisant l'empreinte écologique 
        de votre projet. Pour une intégration harmonieuse, notre expertise en 
        <Link to="/prestations-maitre-oeuvre/design-interieur" className="text-khaki-700 hover:underline"> design d'intérieur</Link> 
        vous sera précieuse pour unifier l'existant et l'extension.
      </p>

      <p className="mb-4">
        La <strong>surélévation</strong> constitue une alternative pertinente lorsque l'emprise au sol est limitée, 
        particulièrement dans les zones urbaines denses ou sur des terrains en pente, fréquents dans notre région. 
        Cette solution optimise la vue et la luminosité tout en préservant votre jardin. Nos architectes adaptent 
        cette solution en tenant compte des contraintes sismiques propres à certaines zones de la région PACA.
      </p>

      <div className="bg-white p-6 rounded-lg my-6">
        <h3 className="text-xl font-medium mb-4">Questions fréquentes sur l'extension de maison</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Quel budget prévoir pour une extension de maison en PACA ?</h4>
            <p className="text-gray-600">
              Le coût varie généralement entre 1 500 € et 2 500 € par m² selon les matériaux et la complexité du projet. 
              Les extensions à ossature bois peuvent représenter une économie de 10 à 15%. Pour une évaluation personnalisée, 
              <Link to="/contact" className="text-khaki-700 hover:underline"> contactez nos experts</Link> pour un devis détaillé.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Quelle est la durée moyenne des travaux d'extension ?</h4>
            <p className="text-gray-600">
              Pour une extension de 20 à 30 m², comptez environ 3 à 4 mois de travaux effectifs, auxquels s'ajoutent 
              2 à 4 mois de démarches administratives. Les extensions à ossature bois peuvent réduire ce délai de 30%. 
              Découvrez nos <Link to="/realisations-architecte-maison" className="text-khaki-700 hover:underline">réalisations récentes</Link> 
              pour vous inspirer et mieux comprendre nos méthodes de travail.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Comment assurer une bonne isolation thermique de mon extension en région méditerranéenne ?</h4>
            <p className="text-gray-600">
              En PACA, nous préconisons des solutions d'isolation renforcée avec un indice R supérieur à 4 pour les murs 
              et 6 pour les toitures. L'orientation, les protections solaires et la ventilation naturelle sont également 
              essentielles pour garantir un confort thermique optimal tant en été qu'en hiver.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-medium my-4">Synergie avec d'autres projets d'amélioration de l'habitat</h3>
      <p className="mb-4">
        Un projet d'extension s'accompagne généralement d'une 
        <Link to="/prestations-maitre-oeuvre/renovation" className="text-khaki-700 hover:underline"> rénovation</Link> partielle 
        de l'existant pour harmoniser les espaces. Cette approche globale permet d'optimiser votre investissement et 
        d'améliorer significativement la performance énergétique de l'ensemble de votre habitation. Notre expertise en 
        <Link to="/prestations-maitre-oeuvre/optimisation-espace" className="text-khaki-700 hover:underline"> optimisation d'espace</Link> 
        garantit une cohérence entre l'ancien et le nouveau volume.
      </p>

      <p className="mb-4">
        Pour comprendre notre approche méthodologique et notre vision architecturale, consultez notre page 
        <Link to="/a-propos" className="text-khaki-700 hover:underline"> À propos</Link> ou explorez nos 
        <Link to="/realisations-architecte-maison" className="text-khaki-700 hover:underline"> réalisations récentes</Link> 
        en matière d'extension de maison à Marseille et dans toute la région PACA.
      </p>
    </section>
  );
};

export default ExtensionSEOContent;
