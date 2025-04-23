
import React from 'react';
import { Link } from 'react-router-dom';

const ExtensionSEOContent: React.FC = () => {
  return (
    <section className="mt-16 bg-gray-50 p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Tout savoir sur l'extension de maison en région PACA</h2>
      
      <p className="mb-4">
        L'<strong>extension de maison</strong> est une solution idéale pour gagner de l'espace sans déménager. 
        Que vous souhaitiez créer une nouvelle pièce à vivre, agrandir votre cuisine ou aménager un espace de travail, 
        l'<strong>agrandissement</strong> de votre habitat permet de valoriser votre bien tout en l'adaptant à vos besoins actuels.
      </p>

      <h3 className="text-xl font-medium my-4">Les démarches administratives pour votre extension</h3>
      <p className="mb-4">
        Avant d'entamer des travaux d'extension, il est essentiel de se renseigner sur les démarches administratives. 
        Selon la superficie de votre projet, un <strong>permis de construire</strong> ou une déclaration préalable de travaux 
        sera nécessaire. Notre équipe vous accompagne dans la constitution de votre dossier pour vous assurer 
        une procédure sans encombre. Pour une estimation précise de votre projet, utilisez notre 
        <Link to="/estimation" className="text-khaki-700 hover:underline"> service d'estimation en ligne</Link>.
      </p>

      <h3 className="text-xl font-medium my-4">Différents types d'extensions pour votre maison</h3>
      <p className="mb-4">
        Il existe plusieurs types d'extensions, chacun avec ses avantages et ses contraintes. 
        L'<strong>extension à toit plat</strong> est particulièrement appréciée pour son esthétique contemporaine et sa facilité 
        d'intégration. L'<strong>extension bois</strong>, quant à elle, séduit par ses qualités écologiques et sa rapidité 
        de mise en œuvre. Si vous disposez d'un espace limité, notre service 
        d'<Link to="/prestations-maitre-oeuvre/optimisation-espace" className="text-khaki-700 hover:underline">optimisation d'espace</Link> peut 
        vous aider à maximiser chaque mètre carré.
      </p>

      <p className="mb-4">
        La <strong>surélévation</strong> est une autre option d'agrandissement qui consiste à ajouter un étage à votre 
        maison. Cette solution est idéale lorsque l'emprise au sol est limitée. Pour une intégration harmonieuse 
        de votre extension dans votre habitat existant, notre expertise en 
        <Link to="/prestations-maitre-oeuvre/design-interieur" className="text-khaki-700 hover:underline"> design d'intérieur</Link> vous 
        sera précieuse.
      </p>

      <div className="bg-white p-6 rounded-lg my-6">
        <h3 className="text-xl font-medium mb-4">FAQ Extension de Maison</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Quel budget prévoir pour une extension de maison ?</h4>
            <p className="text-gray-600">
              Le coût d'une extension varie selon la superficie, les matériaux choisis et les contraintes techniques. 
              En moyenne, il faut compter entre 1 500 et 2 500 € par m². Pour une évaluation personnalisée, 
              <Link to="/contact" className="text-khaki-700 hover:underline"> contactez nos experts</Link>.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Combien de temps durent les travaux d'extension ?</h4>
            <p className="text-gray-600">
              La durée des travaux varie selon l'ampleur du projet, généralement entre 3 et 6 mois. Découvrez nos 
              <Link to="/realisations-architecte-maison" className="text-khaki-700 hover:underline"> réalisations</Link> pour 
              vous inspirer.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-medium my-4">Extension et rénovation : une combinaison gagnante</h3>
      <p className="mb-4">
        Dans de nombreux cas, un projet d'extension s'accompagne d'une 
        <Link to="/prestations-maitre-oeuvre/renovation" className="text-khaki-700 hover:underline"> rénovation</Link> de l'existant pour 
        assurer une cohérence globale. Cette approche permet d'harmoniser les espaces, tant au niveau esthétique 
        qu'énergétique. Si vous envisagez un projet plus ambitieux, notre expertise en 
        <Link to="/prestations-maitre-oeuvre/construction-neuve" className="text-khaki-700 hover:underline"> construction neuve</Link> peut 
        également vous intéresser.
      </p>

      <p className="mb-4">
        Pour en savoir plus sur notre approche et notre philosophie, n'hésitez pas à consulter notre page 
        <Link to="/a-propos" className="text-khaki-700 hover:underline"> À propos</Link>.
      </p>
    </section>
  );
};

export default ExtensionSEOContent;
