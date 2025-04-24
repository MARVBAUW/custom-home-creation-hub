
import React from 'react';
import Button from '@/components/common/Button';
import { InternalLinkText } from '@/utils/internalLinking';

const DesignInterieurContent = () => {
  return (
    <>
      <h2 className="text-3xl font-semibold mb-6">Transformez votre intérieur</h2>
      <p className="mb-8 text-gray-700">
        Chez Progineer, notre équipe de <strong>designers d'intérieur</strong> crée des espaces qui vous ressemblent. Nous concevons des intérieurs harmonieux, fonctionnels et esthétiques qui répondent à vos besoins spécifiques et reflètent votre personnalité. Chaque projet est unique et bénéficie d'une approche personnalisée.
      </p>

      <div className="mb-12">
        <img 
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" 
          alt="Exemple de design d'intérieur réalisé par Progineer en PACA"
          className="w-full h-auto rounded-xl mb-4"
        />
        <p className="text-sm text-gray-500 text-center">Aménagement intérieur contemporain à Marseille</p>
      </div>

      <h3 className="text-2xl font-medium mb-4">Notre processus créatif</h3>
      <div className="grid grid-cols-1 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-start">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">1</span>
            <div>
              <h4 className="text-xl font-medium mb-2">Écoute et analyse</h4>
              <p className="text-gray-600">
                <InternalLinkText 
                  text="Nous commençons par comprendre vos besoins, vos goûts et votre mode de vie pour saisir l'essence de votre projet. Cette étape d'échange est fondamentale pour créer un intérieur qui vous correspond."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-start">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">2</span>
            <div>
              <h4 className="text-xl font-medium mb-2">Concept et planches d'ambiance</h4>
              <p className="text-gray-600">
                <InternalLinkText 
                  text="Nous élaborons un concept qui répond à vos attentes et créons des moodboards pour vous présenter notre vision. Ces planches d'ambiance illustrent les couleurs, textures et matériaux envisagés."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-start">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">3</span>
            <div>
              <h4 className="text-xl font-medium mb-2">Plans et visualisations 3D</h4>
              <p className="text-gray-600">
                <InternalLinkText 
                  text="Nous concevons des plans détaillés et réalisons des visualisations 3D pour vous permettre de vous projeter dans votre futur intérieur avant même le début des travaux."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-start">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">4</span>
            <div>
              <h4 className="text-xl font-medium mb-2">Coordination et réalisation</h4>
              <p className="text-gray-600">
                <InternalLinkText 
                  text="Nous supervisons la mise en œuvre du projet, de la sélection des artisans à la livraison finale, en passant par le choix des mobiliers et des éléments de décoration."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-medium mb-4">Nos compétences en design</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Agencement spatial</h4>
          <p className="text-gray-600 text-sm">
            <InternalLinkText 
              text="Optimisation des circulations et création d'espaces fonctionnels adaptés à votre quotidien"
              maxOccurrences={1}
            />
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Harmonie chromatique</h4>
          <p className="text-gray-600 text-sm">
            <InternalLinkText 
              text="Sélection de palettes de couleurs équilibrées et cohérentes avec votre style"
              maxOccurrences={1}
            />
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Sélection de matériaux</h4>
          <p className="text-gray-600 text-sm">
            <InternalLinkText 
              text="Choix de revêtements et matériaux durables et esthétiques"
              maxOccurrences={1}
            />
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Éclairage architectural</h4>
          <p className="text-gray-600 text-sm">
            <InternalLinkText 
              text="Conception de plans lumière pour valoriser vos espaces"
              maxOccurrences={1}
            />
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Mobilier sur mesure</h4>
          <p className="text-gray-600 text-sm">
            <InternalLinkText 
              text="Création de pièces uniques adaptées à vos espaces et besoins"
              maxOccurrences={1}
            />
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Art & décoration</h4>
          <p className="text-gray-600 text-sm">
            <InternalLinkText 
              text="Sélection d'œuvres et accessoires pour personnaliser votre intérieur"
              maxOccurrences={1}
            />
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-medium mb-4">Exemples de réalisations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Appartement haussmannien</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Rénovation complète avec préservation des éléments d'époque et intégration de touches contemporaines."
              maxOccurrences={1}
            />
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Villa contemporaine</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Design intérieur minimaliste et épuré avec des matériaux nobles et des jeux de lumière naturelle."
              maxOccurrences={1}
            />
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Espaces professionnels</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Aménagement de bureaux alliant confort, ergonomie et image de marque pour une entreprise locale."
              maxOccurrences={1}
            />
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Rénovation de commerce</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Redesign complet d'une boutique avec création d'une identité visuelle forte et d'un parcours client optimisé."
              maxOccurrences={1}
            />
          </p>
        </div>
      </div>

      <div className="bg-khaki-50 p-6 rounded-lg">
        <h3 className="text-2xl font-medium mb-4">Vous avez un projet de design d'intérieur ?</h3>
        <p className="mb-6">
          <InternalLinkText 
            text="Contactez-nous pour un premier échange sans engagement. Nous serons ravis d'étudier votre projet et de vous proposer des solutions créatives adaptées à vos besoins et à votre budget."
            maxOccurrences={1}
          />
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/estimation" className="bg-khaki-700 hover:bg-khaki-800 text-white">
            Estimer mon projet
          </Button>
          <Button href="/contact" variant="outline" className="border-khaki-300 hover:bg-khaki-50">
            Prendre rendez-vous
          </Button>
        </div>
      </div>
    </>
  );
};

export default DesignInterieurContent;
