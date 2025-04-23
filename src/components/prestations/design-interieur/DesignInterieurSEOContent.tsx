
import React from 'react';
import { Link } from 'react-router-dom';

const DesignInterieurSEOContent: React.FC = () => {
  return (
    <section className="mt-16 bg-gray-50 p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Design d'intérieur : créer un habitat qui vous ressemble</h2>
      
      <p className="mb-4">
        Fort de <strong>5 années d'expertise</strong> dans des projets d'envergure moyenne à grande, notre approche en tant 
        qu'<strong>architecte d'intérieur</strong> en région PACA vous garantit un résultat harmonieux alliant fonctionnalité 
        et esthétique. Notre maîtrise du <strong>design d'espace</strong> permet de transformer radicalement votre intérieur 
        pour qu'il reflète parfaitement votre personnalité et votre mode de vie.
      </p>

      <h3 className="text-xl font-medium my-4">L'importance de la décoration intérieure dans l'habitat méditerranéen</h3>
      <p className="mb-4">
        La <strong>décoration</strong> joue un rôle fondamental dans le bien-être quotidien, particulièrement sous notre climat 
        méditerranéen où la lumière naturelle abondante influence directement les ambiances. Nous concevons des espaces qui 
        célèbrent cette luminosité tout en créant une <strong>ambiance moderne</strong> propice à la détente. 
        Pour maximiser le potentiel de chaque mètre carré, nos solutions 
        d'<Link to="/prestations-maitre-oeuvre/optimisation-espace" className="text-khaki-700 hover:underline">optimisation d'espace</Link> 
        s'intègrent naturellement dans notre démarche de design global.
      </p>

      <h3 className="text-xl font-medium my-4">Matériaux et harmonie chromatique en Provence</h3>
      <p className="mb-4">
        L'<strong>harmonie intérieure</strong> d'un habitat en région PACA repose sur une sélection méticuleuse des 
        <strong> matériaux</strong> qui résonnent avec l'environnement local. Pierre naturelle, bois clair, terres cuites 
        et textiles naturels composent notre palette de base, sublimée par des teintes évoquant le paysage provençal : 
        ocres, bleus lavande, verts olivier et blancs éclatants. Si votre projet nécessite des transformations structurelles, 
        notre expertise en <Link to="/prestations-maitre-oeuvre/renovation" className="text-khaki-700 hover:underline">rénovation</Link> 
        vous accompagnera dans cette métamorphose complète.
      </p>

      <div className="bg-white p-6 rounded-lg my-6">
        <h3 className="text-xl font-medium mb-4">Questions fréquentes sur le design d'intérieur</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Quelle est la première étape d'un projet de design d'intérieur ?</h4>
            <p className="text-gray-600">
              Nous commençons toujours par une analyse approfondie de vos besoins, vos goûts et votre mode de vie. 
              Cette phase de diagnostic inclut un relevé précis des lieux et l'établissement d'un programme fonctionnel. 
              Nous vous invitons à <Link to="/estimation" className="text-khaki-700 hover:underline">estimer votre projet</Link> 
              pour avoir une vision claire du budget nécessaire avant de vous lancer.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Comment choisir un style de décoration adapté à ma maison provençale ?</h4>
            <p className="text-gray-600">
              Le style idéal respecte à la fois l'architecture de votre bien et votre personnalité. En PACA, nous réinterprétons 
              souvent les codes méditerranéens dans une version contemporaine : lignes épurées, matériaux authentiques et 
              palette chromatique locale. Inspirez-vous de nos 
              <Link to="/realisations-architecte-maison" className="text-khaki-700 hover:underline"> réalisations récentes</Link> 
              pour définir votre propre style.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Quel budget prévoir pour un projet de design d'intérieur en PACA ?</h4>
            <p className="text-gray-600">
              Le coût varie considérablement selon l'ampleur du projet, de 150 à 500€/m² pour une rénovation légère avec 
              redécoration, jusqu'à 1000-1500€/m² pour une transformation complète incluant des modifications structurelles. 
              Les honoraires de conception représentent généralement 8 à 15% du montant global des travaux.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-medium my-4">Une approche holistique de l'habitat</h3>
      <p className="mb-4">
        Notre vision du design intérieur s'inscrit dans une démarche globale d'amélioration de l'habitat. Pour les projets 
        plus ambitieux nécessitant des modifications structurelles, découvrez nos services 
        d'<Link to="/prestations-maitre-oeuvre/extension" className="text-khaki-700 hover:underline">extension</Link> ou de 
        <Link to="/prestations-maitre-oeuvre/construction-neuve" className="text-khaki-700 hover:underline"> construction neuve</Link>. 
        Cette approche transversale garantit une cohérence parfaite entre les volumes, les circulations et les aménagements intérieurs.
      </p>

      <p className="mb-4">
        Pour comprendre notre philosophie de création et notre méthode de travail, consultez notre page 
        <Link to="/a-propos" className="text-khaki-700 hover:underline"> À propos</Link> ou 
        <Link to="/contact" className="text-khaki-700 hover:underline"> contactez-nous directement</Link> pour échanger 
        sur votre projet de transformation intérieure en région PACA.
      </p>
    </section>
  );
};

export default DesignInterieurSEOContent;
