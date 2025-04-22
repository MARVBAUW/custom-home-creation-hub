
import React from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import Button from '@/components/common/Button';
import SEOFooter from '@/components/common/SEOFooter';
import PrestationsSubNav from '@/components/prestations/PrestationsSubNav';

const OptimisationEspace = () => {
  return (
    <>
      <SEO 
        title="Optimisation d'espace | Maître d'œuvre PACA - Progineer"
        description="Maximisez le potentiel de votre habitat avec notre service d'optimisation d'espace en PACA. Nos experts transforment vos pièces pour un confort optimal."
        keywords="optimisation espace, aménagement intérieur, gain de place, réagencement, maître d'œuvre PACA"
        canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/optimisation-espace"
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Nos prestations
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Optimisation d'espace
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Des <strong>solutions ingénieuses</strong> pour maximiser chaque mètre carré de votre habitation. Nous repensons vos espaces pour un confort et une fonctionnalité optimale.
            </p>
          </div>
        </Container>
      </section>

      {/* Navigation secondaire */}
      <PrestationsSubNav activeService="optimisation-espace" />

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
                      <h3 className="font-medium text-lg">Analyse fonctionnelle</h3>
                      <p className="text-sm text-gray-600">Étude approfondie de vos modes de vie et besoins spécifiques.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2 mt-1 text-lg">✓</span>
                    <div>
                      <h3 className="font-medium text-lg">Solutions sur mesure</h3>
                      <p className="text-sm text-gray-600">Propositions adaptées à votre espace et à votre budget.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2 mt-1 text-lg">✓</span>
                    <div>
                      <h3 className="font-medium text-lg">Meubles intégrés</h3>
                      <p className="text-sm text-gray-600">Conception de rangements et mobiliers sur mesure.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2 mt-1 text-lg">✓</span>
                    <div>
                      <h3 className="font-medium text-lg">Transformation complète</h3>
                      <p className="text-sm text-gray-600">Modification des volumes et des circulations pour un habitat optimal.</p>
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
              <h2 className="text-3xl font-semibold mb-6">Notre approche de l'optimisation d'espace</h2>
              <p className="mb-8 text-gray-700">
                Chez Progineer, nous sommes spécialisés dans l'<strong>optimisation des espaces de vie</strong> pour exploiter pleinement chaque mètre carré de votre habitat. Que vous viviez dans un petit appartement ou une grande maison, notre équipe d'experts analyse vos besoins et contraintes pour proposer des solutions ingénieuses qui transformeront votre espace.
              </p>

              <div className="mb-12">
                <img 
                  src="https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?q=80&w=2087&auto=format&fit=crop" 
                  alt="Exemple d'optimisation d'espace réalisée par Progineer en PACA"
                  className="w-full h-auto rounded-xl mb-4"
                />
                <p className="text-sm text-gray-500 text-center">Optimisation d'un studio à Marseille</p>
              </div>

              <h3 className="text-2xl font-medium mb-4">Nos solutions d'optimisation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">Réagencement des pièces</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Modification des cloisons</li>
                    <li>• Ouverture des espaces</li>
                    <li>• Amélioration des circulations</li>
                    <li>• Création de zones fonctionnelles</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">Rangements intégrés</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Placards sur mesure</li>
                    <li>• Bibliothèques encastrées</li>
                    <li>• Solutions sous escalier</li>
                    <li>• Mobilier multifonction</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">Espaces modulables</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Cloisons amovibles</li>
                    <li>• Meubles transformables</li>
                    <li>• Lits escamotables</li>
                    <li>• Zones polyvalentes</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">Mezzanines & espaces verticaux</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Création de niveaux intermédiaires</li>
                    <li>• Exploitation des hauteurs</li>
                    <li>• Escaliers gain de place</li>
                    <li>• Augmentation de la surface utile</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-medium mb-4">Notre processus d'optimisation</h3>
              <p className="mb-6 text-gray-700">
                Transformer votre espace de vie nécessite une approche méthodique et personnalisée :
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-10">
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="w-6 h-6 rounded-full bg-khaki-200 text-khaki-800 flex items-center justify-center font-medium mr-3 flex-shrink-0">1</span>
                    <div>
                      <h4 className="font-medium">Diagnostic spatial</h4>
                      <p className="text-sm text-gray-600">Analyse complète de l'espace existant, relevé précis et identification des contraintes techniques.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="w-6 h-6 rounded-full bg-khaki-200 text-khaki-800 flex items-center justify-center font-medium mr-3 flex-shrink-0">2</span>
                    <div>
                      <h4 className="font-medium">Définition des besoins</h4>
                      <p className="text-sm text-gray-600">Entretien détaillé pour comprendre votre mode de vie, vos attentes et vos priorités.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="w-6 h-6 rounded-full bg-khaki-200 text-khaki-800 flex items-center justify-center font-medium mr-3 flex-shrink-0">3</span>
                    <div>
                      <h4 className="font-medium">Conception créative</h4>
                      <p className="text-sm text-gray-600">Élaboration de plusieurs scénarios d'aménagement avec visualisations 2D et 3D.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="w-6 h-6 rounded-full bg-khaki-200 text-khaki-800 flex items-center justify-center font-medium mr-3 flex-shrink-0">4</span>
                    <div>
                      <h4 className="font-medium">Planification détaillée</h4>
                      <p className="text-sm text-gray-600">Sélection des matériaux, création des plans d'exécution et coordination des intervenants.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="w-6 h-6 rounded-full bg-khaki-200 text-khaki-800 flex items-center justify-center font-medium mr-3 flex-shrink-0">5</span>
                    <div>
                      <h4 className="font-medium">Réalisation et suivi</h4>
                      <p className="text-sm text-gray-600">Mise en œuvre des solutions retenues avec contrôle qualité rigoureux.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <h3 className="text-2xl font-medium mb-4">Témoignages de clients</h3>
              <div className="mb-12 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-khaki-100 rounded-full flex items-center justify-center text-khaki-800 font-bold mr-4">
                    JP
                  </div>
                  <div>
                    <p className="font-medium">Julien & Pierre</p>
                    <p className="text-sm text-gray-500">Appartement à Nice</p>
                  </div>
                </div>
                <p className="italic text-gray-700 mb-4">
                  "Notre appartement de 45m² semblait trop petit pour nos besoins. L'équipe de Progineer a complètement repensé l'agencement, créé des rangements sur mesure et même une mezzanine pour le couchage. Nous avons gagné 15m² de surface utile sans agrandir l'appartement !"
                </p>
              </div>

              <div className="bg-khaki-50 p-6 rounded-lg">
                <h3 className="text-2xl font-medium mb-4">Vous souhaitez optimiser votre espace ?</h3>
                <p className="mb-6">
                  Contactez-nous pour un premier échange sans engagement. Nous serons ravis d'étudier votre projet et de vous proposer des solutions adaptées à vos besoins et à votre budget.
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
        text="Optimisation d'espace en PACA par Progineer, maître d'œuvre spécialisé dans le réagencement et l'aménagement intérieur. Nos experts maximisent chaque mètre carré de votre habitat à Marseille, Nice, Toulon et dans toute la région Provence-Alpes-Côte d'Azur pour créer des espaces fonctionnels et esthétiques adaptés à votre mode de vie."
      />
    </>
  );
};

export default OptimisationEspace;
