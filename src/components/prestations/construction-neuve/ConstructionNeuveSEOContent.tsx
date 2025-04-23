
import React from 'react';
import { Link } from 'react-router-dom';

const ConstructionNeuveSEOContent: React.FC = () => {
  return (
    <section className="mt-16 bg-gray-50 p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">La construction de maison individuelle sur mesure en PACA</h2>
      
      <p className="mb-4">
        La <strong>construction neuve</strong> représente l'opportunité de créer un habitat entièrement personnalisé, 
        adapté à vos besoins spécifiques et à votre mode de vie. Fort de nos <strong>5 années d'expertise</strong> dans 
        des projets de moyenne à grande envergure en région PACA, nous vous accompagnons dans cette aventure passionnante 
        qu'est la création de votre maison sur mesure.
      </p>

      <h3 className="text-xl font-medium my-4">Les étapes clés d'un projet de construction réussi</h3>
      <p className="mb-4">
        Un projet de <strong>construction de maison individuelle</strong> s'articule autour de phases distinctes qui 
        garantissent sa réussite. L'étude de faisabilité constitue la première étape cruciale, permettant d'évaluer 
        les contraintes techniques, réglementaires et financières. Notre service 
        <Link to="/estimation" className="text-khaki-700 hover:underline"> d'estimation détaillée</Link> vous aide à 
        définir précisément l'enveloppe budgétaire nécessaire pour concrétiser votre projet.
      </p>

      <h3 className="text-xl font-medium my-4">Architectures contemporaines adaptées au climat méditerranéen</h3>
      <p className="mb-4">
        La région PACA bénéficie d'un ensoleillement exceptionnel qui influence directement la conception des 
        <strong> maisons modernes</strong>. Nos architectes intègrent des principes bioclimatiques avec des 
        protections solaires adaptées, des ouvertures stratégiquement placées et des matériaux à forte inertie thermique. 
        Ces éléments sont complétés par des installations techniques performantes pour lesquelles notre expertise en 
        <Link to="/prestations-maitre-oeuvre/optimisation-espace" className="text-khaki-700 hover:underline"> optimisation d'espace</Link> 
        est déterminante.
      </p>

      <div className="bg-white p-6 rounded-lg my-6">
        <h3 className="text-xl font-medium mb-4">Questions fréquentes sur la construction neuve</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Quel budget prévoir pour une construction neuve en PACA ?</h4>
            <p className="text-gray-600">
              Le coût moyen d'une construction neuve en région PACA oscille entre 1 800 € et 3 000 € par m² selon 
              le niveau de finition et la complexité architecturale. À ce montant s'ajoutent les frais de viabilisation, 
              les taxes d'urbanisme et les honoraires de maîtrise d'œuvre. Pour obtenir une estimation précise, 
              <Link to="/contact" className="text-khaki-700 hover:underline"> prenez rendez-vous avec nos experts</Link>.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Quelles sont les normes énergétiques à respecter pour une construction neuve ?</h4>
            <p className="text-gray-600">
              Depuis janvier 2022, la réglementation environnementale RE2020 impose des standards élevés de performance 
              énergétique et environnementale. Nos conceptions intègrent systématiquement ces exigences en privilégiant 
              des solutions d'isolation renforcée, des équipements à haute efficacité énergétique et des matériaux à 
              faible empreinte carbone.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Combien de temps faut-il pour construire une maison individuelle ?</h4>
            <p className="text-gray-600">
              La durée moyenne d'un projet complet est de 12 à 18 mois, incluant 3 à 6 mois pour les études et démarches 
              administratives, suivis de 6 à 12 mois de travaux selon la complexité du projet. Découvrez nos 
              <Link to="/realisations-architecte-maison" className="text-khaki-700 hover:underline"> réalisations récentes</Link> 
              pour mieux comprendre notre approche et nos délais de réalisation.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-medium my-4">Intégration architecturale dans le paysage provençal</h3>
      <p className="mb-4">
        Une <strong>maison contemporaine</strong> en région PACA doit s'intégrer harmonieusement dans son environnement. 
        Notre approche architecturale conjugue modernité et respect des codes méditerranéens traditionnels : volumes simples, 
        toitures adaptées, colorimétrie locale et aménagements extérieurs valorisant la végétation méditerranéenne. 
        Notre expertise en <Link to="/prestations-maitre-oeuvre/design-interieur" className="text-khaki-700 hover:underline">design d'intérieur</Link> 
        complète cette démarche pour une cohérence globale.
      </p>

      <p className="mb-4">
        Pour approfondir votre compréhension de notre philosophie de construction et découvrir notre approche personnalisée, 
        consultez notre page <Link to="/a-propos" className="text-khaki-700 hover:underline">À propos</Link> ou contactez 
        directement notre équipe via notre <Link to="/contact" className="text-khaki-700 hover:underline">formulaire de contact</Link>.
      </p>
    </section>
  );
};

export default ConstructionNeuveSEOContent;
