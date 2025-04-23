
import React from 'react';
import { Link } from 'react-router-dom';

const ExtensionSEOContent: React.FC = () => {
  return (
    <section className="mt-16 bg-gray-50 p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Tout savoir sur l'extension de maison en région PACA</h2>
      
      <p className="mb-4">
        L'<strong>extension de maison</strong> est une solution idéale pour gagner de l'espace sans déménager. 
        En tant que maître d'œuvre avec 5 années d'expertise dans des projets de moyenne à grande envergure, 
        nous vous accompagnons dans tous vos projets d'<strong>agrandissement</strong>.
      </p>

      <h3 className="text-xl font-medium my-4">Les démarches administratives pour votre extension</h3>
      <p className="mb-4">
        Avant d'entamer des travaux d'extension, il est essentiel de se renseigner sur les démarches administratives. 
        Selon la superficie de votre projet, un <strong>permis de construire</strong> ou une déclaration préalable de travaux 
        sera nécessaire. Pour évaluer précisément votre projet, utilisez notre 
        <Link to="/estimation" className="text-khaki-700 hover:underline"> service d'estimation en ligne</Link>.
      </p>

      <h3 className="text-xl font-medium my-4">Différents types d'extensions pour votre maison</h3>
      <p className="mb-4">
        L'<strong>extension à toit plat</strong> est particulièrement appréciée pour son esthétique contemporaine. 
        L'<strong>extension bois</strong> séduit par ses qualités écologiques et sa rapidité de mise en œuvre. 
        Pour une intégration harmonieuse, notre expertise en 
        <Link to="/prestations-maitre-oeuvre/design-interieur" className="text-khaki-700 hover:underline"> design d'intérieur</Link> vous 
        sera précieuse.
      </p>

      <p className="mb-4">
        La <strong>surélévation</strong> est une option d'agrandissement qui consiste à ajouter un étage. 
        Cette solution est idéale lorsque l'emprise au sol est limitée. Pour maximiser l'espace disponible, 
        découvrez nos solutions d'<Link to="/prestations-maitre-oeuvre/optimisation-espace" className="text-khaki-700 hover:underline">optimisation d'espace</Link>.
      </p>

      <div className="bg-white p-6 rounded-lg my-6">
        <h3 className="text-xl font-medium mb-4">FAQ Extension de Maison</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Quel budget prévoir pour une extension de maison ?</h4>
            <p className="text-gray-600">
              Le coût varie selon la superficie et les matériaux. Pour une évaluation personnalisée, 
              <Link to="/contact" className="text-khaki-700 hover:underline"> contactez nos experts</Link>.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Quelle est la durée moyenne des travaux ?</h4>
            <p className="text-gray-600">
              La durée varie selon l'ampleur du projet. Découvrez nos 
              <Link to="/realisations-architecte-maison" className="text-khaki-700 hover:underline"> réalisations</Link> pour 
              vous inspirer.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-medium my-4">Une approche globale de votre projet</h3>
      <p className="mb-4">
        Souvent, un projet d'extension s'accompagne d'une 
        <Link to="/prestations-maitre-oeuvre/renovation" className="text-khaki-700 hover:underline"> rénovation</Link> de l'existant. 
        Si vous envisagez un projet plus ambitieux, notre expertise en 
        <Link to="/prestations-maitre-oeuvre/construction-neuve" className="text-khaki-700 hover:underline"> construction neuve</Link> peut 
        également vous intéresser.
      </p>

      <p className="mb-4">
        Pour en savoir plus sur notre approche, consultez notre page 
        <Link to="/a-propos" className="text-khaki-700 hover:underline"> À propos</Link>.
      </p>
    </section>
  );
};

export default ExtensionSEOContent;
