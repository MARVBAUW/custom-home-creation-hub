
import React from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import Button from '@/components/common/Button';
import SEOFooter from '@/components/common/SEOFooter';
import PrestationsSubNav from '@/components/prestations/PrestationsSubNav';

const Extension = () => {
  return (
    <>
      <SEO 
        title="Extension de maison | Maître d'œuvre PACA - Progineer"
        description="Agrandissez votre maison avec notre service d'extension en PACA. Extension en bois, surélévation, véranda : nos experts conçoivent des agrandissements harmonieux."
        keywords="extension maison, agrandissement, surélévation, véranda, extension bois, maître d'œuvre PACA"
        canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/extension"
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Nos prestations
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Extension et agrandissement
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Des <strong>extensions sur mesure</strong> pour agrandir votre espace de vie. Nous vous accompagnons pour créer un agrandissement harmonieux et fonctionnel.
            </p>
          </div>
        </Container>
      </section>

      {/* Navigation secondaire */}
      <PrestationsSubNav activeService="extension" />

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
                      <h3 className="font-medium text-lg">Intégration parfaite</h3>
                      <p className="text-sm text-gray-600">Extensions conçues en harmonie avec votre habitat existant.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2 mt-1 text-lg">✓</span>
                    <div>
                      <h3 className="font-medium text-lg">Solutions adaptées</h3>
                      <p className="text-sm text-gray-600">Extensions latérales, surélévations ou vérandas selon vos besoins.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2 mt-1 text-lg">✓</span>
                    <div>
                      <h3 className="font-medium text-lg">Expertise technique</h3>
                      <p className="text-sm text-gray-600">Gestion des contraintes structurelles et réglementaires.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2 mt-1 text-lg">✓</span>
                    <div>
                      <h3 className="font-medium text-lg">Gain d'espace optimisé</h3>
                      <p className="text-sm text-gray-600">Maximisation de la surface habitable et de la luminosité.</p>
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
              <h2 className="text-3xl font-semibold mb-6">Notre approche de l'extension</h2>
              <p className="mb-8 text-gray-700">
                Chez Progineer, nous concevons des <strong>extensions et agrandissements</strong> qui s'intègrent harmonieusement à votre habitat existant tout en augmentant significativement votre espace de vie. Notre approche combine esthétique, fonctionnalité et respect des contraintes techniques pour créer un agrandissement durable et valorisant.
              </p>

              <div className="mb-12">
                <img 
                  src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2070&auto=format&fit=crop" 
                  alt="Exemple d'extension de maison réalisée par Progineer en PACA"
                  className="w-full h-auto rounded-xl mb-4"
                />
                <p className="text-sm text-gray-500 text-center">Extension contemporaine d'une villa à Toulon</p>
              </div>

              <h3 className="text-2xl font-medium mb-4">Types d'extensions proposées</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">Extension horizontale</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Agrandissement latéral ou arrière</li>
                    <li>• Extension de plain-pied</li>
                    <li>• Création de pièce supplémentaire</li>
                    <li>• Augmentation des espaces de vie</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">Surélévation</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Ajout d'un étage complet</li>
                    <li>• Création de combles habitables</li>
                    <li>• Valorisation sans perte de terrain</li>
                    <li>• Solution idéale en zone urbaine</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">Véranda & jardin d'hiver</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Espace lumineux et convivial</li>
                    <li>• Connexion avec l'extérieur</li>
                    <li>• Modèles contemporains ou classiques</li>
                    <li>• Performance thermique optimisée</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">Extension à ossature bois</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Construction rapide et écologique</li>
                    <li>• Excellente isolation thermique</li>
                    <li>• Légèreté et adaptabilité</li>
                    <li>• Esthétique contemporaine</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-medium mb-4">Notre processus d'extension</h3>
              <p className="mb-6 text-gray-700">
                La réussite d'un projet d'extension passe par une démarche structurée et rigoureuse :
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-10">
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="w-6 h-6 rounded-full bg-khaki-200 text-khaki-800 flex items-center justify-center font-medium mr-3 flex-shrink-0">1</span>
                    <div>
                      <h4 className="font-medium">Étude de faisabilité</h4>
                      <p className="text-sm text-gray-600">Analyse du terrain, de la structure existante et des contraintes réglementaires (PLU, règles d'urbanisme).</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="w-6 h-6 rounded-full bg-khaki-200 text-khaki-800 flex items-center justify-center font-medium mr-3 flex-shrink-0">2</span>
                    <div>
                      <h4 className="font-medium">Conception architecturale</h4>
                      <p className="text-sm text-gray-600">Élaboration des plans et perspectives 3D pour visualiser l'intégration de l'extension.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="w-6 h-6 rounded-full bg-khaki-200 text-khaki-800 flex items-center justify-center font-medium mr-3 flex-shrink-0">3</span>
                    <div>
                      <h4 className="font-medium">Démarches administratives</h4>
                      <p className="text-sm text-gray-600">Montage et dépôt du dossier de permis de construire ou déclaration préalable.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="w-6 h-6 rounded-full bg-khaki-200 text-khaki-800 flex items-center justify-center font-medium mr-3 flex-shrink-0">4</span>
                    <div>
                      <h4 className="font-medium">Réalisation des travaux</h4>
                      <p className="text-sm text-gray-600">Coordination des différents corps de métier et suivi régulier du chantier.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="w-6 h-6 rounded-full bg-khaki-200 text-khaki-800 flex items-center justify-center font-medium mr-3 flex-shrink-0">5</span>
                    <div>
                      <h4 className="font-medium">Réception et finalisation</h4>
                      <p className="text-sm text-gray-600">Contrôle qualité, levée des réserves et remise des documents techniques.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <h3 className="text-2xl font-medium mb-4">Témoignages de clients</h3>
              <div className="mb-12 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-khaki-100 rounded-full flex items-center justify-center text-khaki-800 font-bold mr-4">
                    FD
                  </div>
                  <div>
                    <p className="font-medium">Famille Durand</p>
                    <p className="text-sm text-gray-500">Extension à La Ciotat</p>
                  </div>
                </div>
                <p className="italic text-gray-700 mb-4">
                  "Avec l'arrivée de notre troisième enfant, notre maison était devenue trop petite. Progineer nous a conçu une extension de 35m² qui s'intègre parfaitement à notre maison traditionnelle. Le chantier s'est déroulé sans encombre malgré les contraintes du site, et nous sommes ravis du résultat !"
                </p>
              </div>

              <div className="bg-khaki-50 p-6 rounded-lg">
                <h3 className="text-2xl font-medium mb-4">Vous avez un projet d'extension ?</h3>
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
        text="Extension et agrandissement de maison en PACA par Progineer, maître d'œuvre spécialisé dans les surélévations, vérandas et extensions en bois. Nos experts vous accompagnent dans tous vos projets d'agrandissement à Marseille, Nice, Toulon et dans toute la région Provence-Alpes-Côte d'Azur pour créer des espaces de vie supplémentaires harmonieux et fonctionnels."
      />
    </>
  );
};

export default Extension;
