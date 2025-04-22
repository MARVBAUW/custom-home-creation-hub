
import React from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import Button from '@/components/common/Button';
import SEOFooter from '@/components/common/SEOFooter';
import PrestationsSubNav from '@/components/prestations/PrestationsSubNav';

const DesignInterieur = () => {
  return (
    <>
      <SEO 
        title="Design d'intérieur | Architecte d'intérieur PACA - Progineer"
        description="Transformez votre espace de vie avec notre service de design d'intérieur en PACA. Nos architectes d'intérieur créent des ambiances uniques et personnalisées."
        keywords="design intérieur, architecte intérieur, décoration, aménagement, maître d'œuvre PACA"
        canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/design-interieur"
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Nos prestations
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Design d'intérieur
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Des <strong>intérieurs qui vous ressemblent</strong>, conçus par nos experts en architecture d'intérieur. Nous créons des espaces esthétiques, fonctionnels et personnalisés.
            </p>
          </div>
        </Container>
      </section>

      {/* Navigation secondaire */}
      <PrestationsSubNav activeService="design-interieur" />

      {/* Main Content */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 bg-stone-50 rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Pourquoi nous choisir ?</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2 mt-1 text-lg">✓</span>
                    <div>
                      <h3 className="font-medium text-lg">Style personnalisé</h3>
                      <p className="text-sm text-gray-600">Des intérieurs qui reflètent votre personnalité et vos aspirations.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2 mt-1 text-lg">✓</span>
                    <div>
                      <h3 className="font-medium text-lg">Expertise globale</h3>
                      <p className="text-sm text-gray-600">Maîtrise des aspects techniques, esthétiques et fonctionnels.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2 mt-1 text-lg">✓</span>
                    <div>
                      <h3 className="font-medium text-lg">Matériaux premium</h3>
                      <p className="text-sm text-gray-600">Sélection rigoureuse pour un intérieur durable et raffiné.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2 mt-1 text-lg">✓</span>
                    <div>
                      <h3 className="font-medium text-lg">Visualisation 3D</h3>
                      <p className="text-sm text-gray-600">Projection réaliste de votre futur intérieur avant les travaux.</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-8 space-y-4">
                  <Button href="/estimation" className="w-full justify-center">
                    Estimer mon projet
                  </Button>
                  <Button href="/contact" variant="outline" className="w-full justify-center">
                    Prendre rendez-vous
                  </Button>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-3">
              <h2 className="text-3xl font-semibold mb-6">Notre approche du design d'intérieur</h2>
              <p className="mb-8 text-gray-700">
                Chez Progineer, nos <strong>architectes d'intérieur</strong> conçoivent des espaces qui allient esthétique, fonctionnalité et bien-être. Nous créons des ambiances sur mesure qui vous ressemblent, en tenant compte de vos goûts, de votre mode de vie et de vos aspirations. Notre approche globale intègre tous les aspects de l'aménagement intérieur pour une harmonie parfaite.
              </p>

              <div className="mb-12">
                <img 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2080&auto=format&fit=crop" 
                  alt="Exemple de design d'intérieur réalisé par Progineer en PACA"
                  className="w-full h-auto rounded-xl mb-4"
                />
                <p className="text-sm text-gray-500 text-center">Design d'intérieur contemporain dans une villa à Cannes</p>
              </div>

              <h3 className="text-2xl font-medium mb-4">Nos services de design d'intérieur</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">Conception d'intérieur</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Étude des volumes et circulations</li>
                    <li>• Plans d'aménagement détaillés</li>
                    <li>• Conception d'espaces sur mesure</li>
                    <li>• Optimisation fonctionnelle</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">Direction artistique</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Définition du style et des ambiances</li>
                    <li>• Création de planches tendances</li>
                    <li>• Harmonisation des espaces</li>
                    <li>• Conseils personnalisés</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">Sélection des matériaux</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Choix des revêtements sols et murs</li>
                    <li>• Sélection des essences de bois</li>
                    <li>• Conseils sur les textiles et tissus</li>
                    <li>• Échantillonnage personnalisé</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">Mobilier et décoration</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Création de mobilier sur mesure</li>
                    <li>• Sélection de pièces design</li>
                    <li>• Conseils en art et objets décoratifs</li>
                    <li>• Mise en place et styling</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">Éclairage</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Étude d'éclairage fonctionnel</li>
                    <li>• Mise en valeur architecturale</li>
                    <li>• Sélection des luminaires</li>
                    <li>• Scénarios lumineux personnalisés</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">Suivi de réalisation</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Coordination des artisans</li>
                    <li>• Contrôle de la qualité d'exécution</li>
                    <li>• Respect des délais et du budget</li>
                    <li>• Installation finale et mise en scène</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-medium mb-4">Notre processus créatif</h3>
              <p className="mb-6 text-gray-700">
                La création d'un intérieur réussi passe par une méthodologie éprouvée :
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-10">
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="w-6 h-6 rounded-full bg-khaki-200 text-khaki-800 flex items-center justify-center font-medium mr-3 flex-shrink-0">1</span>
                    <div>
                      <h4 className="font-medium">Entretien découverte</h4>
                      <p className="text-sm text-gray-600">Discussion approfondie pour comprendre vos besoins, goûts, mode de vie et budget.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="w-6 h-6 rounded-full bg-khaki-200 text-khaki-800 flex items-center justify-center font-medium mr-3 flex-shrink-0">2</span>
                    <div>
                      <h4 className="font-medium">Concept design</h4>
                      <p className="text-sm text-gray-600">Élaboration du concept global et création de planches d'ambiance pour visualiser le style proposé.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="w-6 h-6 rounded-full bg-khaki-200 text-khaki-800 flex items-center justify-center font-medium mr-3 flex-shrink-0">3</span>
                    <div>
                      <h4 className="font-medium">Design détaillé</h4>
                      <p className="text-sm text-gray-600">Création des plans d'aménagement, sélection précise des matériaux et visualisations 3D.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="w-6 h-6 rounded-full bg-khaki-200 text-khaki-800 flex items-center justify-center font-medium mr-3 flex-shrink-0">4</span>
                    <div>
                      <h4 className="font-medium">Documentation technique</h4>
                      <p className="text-sm text-gray-600">Élaboration des plans d'exécution pour les artisans et spécifications détaillées.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="w-6 h-6 rounded-full bg-khaki-200 text-khaki-800 flex items-center justify-center font-medium mr-3 flex-shrink-0">5</span>
                    <div>
                      <h4 className="font-medium">Réalisation et installation</h4>
                      <p className="text-sm text-gray-600">Supervision des travaux, coordination des livraisons et mise en place finale.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <h3 className="text-2xl font-medium mb-4">Témoignages de clients</h3>
              <div className="mb-12 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-khaki-100 rounded-full flex items-center justify-center text-khaki-800 font-bold mr-4">
                    SM
                  </div>
                  <div>
                    <p className="font-medium">Sophie M.</p>
                    <p className="text-sm text-gray-500">Appartement à Antibes</p>
                  </div>
                </div>
                <p className="italic text-gray-700 mb-4">
                  "Progineer a transformé mon appartement en un espace que je ne reconnais plus tant il est beau ! L'équipe a su capturer mon style et l'interpréter de façon magistrale. Les matériaux sont superbes, la lumière parfaitement maîtrisée et chaque détail a été pensé. C'est un plaisir de vivre dans cet environnement."
                </p>
              </div>

              <div className="bg-khaki-50 p-6 rounded-lg">
                <h3 className="text-2xl font-medium mb-4">Vous avez un projet de design d'intérieur ?</h3>
                <p className="mb-6">
                  Contactez-nous pour un premier échange sans engagement. Nous serons ravis d'étudier votre projet et de vous proposer des solutions créatives adaptées à votre style et à votre budget.
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
            </div>
          </div>
        </Container>
      </section>

      <SEOFooter 
        text="Design d'intérieur en PACA par Progineer, experts en architecture intérieure et décoration. Nos architectes d'intérieur créent des espaces personnalisés qui vous ressemblent à Marseille, Nice, Toulon et dans toute la région Provence-Alpes-Côte d'Azur. Conception d'ambiances, aménagement sur mesure et sélection de matériaux haut de gamme pour transformer votre espace de vie."
      />
    </>
  );
};

export default DesignInterieur;
