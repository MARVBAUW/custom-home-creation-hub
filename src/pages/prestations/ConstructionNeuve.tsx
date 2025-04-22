
import React from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import Button from '@/components/common/Button';
import SEOFooter from '@/components/common/SEOFooter';
import PrestationsSubNav from '@/components/prestations/PrestationsSubNav';

const ConstructionNeuve = () => {
  return (
    <>
      <SEO 
        title="Construction de maisons neuves | Maître d'œuvre PACA - Progineer"
        description="Découvrez notre service de construction de maisons individuelles sur mesure en PACA. Conception, plans, démarches administratives et suivi de chantier par nos experts."
        keywords="construction maison neuve, maison individuelle, architecte PACA, maître d'œuvre Marseille, maisons sur mesure"
        canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/construction-neuve"
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Nos prestations
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Construction de maisons neuves
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Des <strong>maisons sur mesure</strong> parfaitement adaptées à vos besoins, votre style de vie et votre budget. Nous vous accompagnons de la conception jusqu'à la livraison.
            </p>
          </div>
        </Container>
      </section>

      {/* Navigation secondaire */}
      <PrestationsSubNav activeService="construction-neuve" />

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
                      <h3 className="font-medium text-lg">Conception personnalisée</h3>
                      <p className="text-sm text-gray-600">Chaque projet est unique et conçu sur mesure selon vos besoins spécifiques.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2 mt-1 text-lg">✓</span>
                    <div>
                      <h3 className="font-medium text-lg">Garantie décennale</h3>
                      <p className="text-sm text-gray-600">Tous nos projets sont couverts par notre assurance professionnelle.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2 mt-1 text-lg">✓</span>
                    <div>
                      <h3 className="font-medium text-lg">Respect des délais</h3>
                      <p className="text-sm text-gray-600">Nous nous engageons sur un planning précis, régulièrement mis à jour.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2 mt-1 text-lg">✓</span>
                    <div>
                      <h3 className="font-medium text-lg">Maîtrise du budget</h3>
                      <p className="text-sm text-gray-600">Transparence totale et suivi financier tout au long du projet.</p>
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
              <h2 className="text-3xl font-semibold mb-6">Notre approche de la construction neuve</h2>
              <p className="mb-8 text-gray-700">
                Chez Progineer, nous concevons des <strong>maisons individuelles personnalisées</strong> qui reflètent votre style de vie et répondent parfaitement à vos besoins. Bien plus qu'un simple constructeur, nous vous accompagnons de l'idée initiale jusqu'à la remise des clés, en veillant au respect du budget, des délais et de la qualité d'exécution.
              </p>

              <div className="mb-12">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Exemple de maison moderne construite par Progineer en PACA"
                  className="w-full h-auto rounded-xl mb-4"
                />
                <p className="text-sm text-gray-500 text-center">Villa contemporaine réalisée à Aix-en-Provence</p>
              </div>

              <h3 className="text-2xl font-medium mb-4">Notre processus de construction</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">1. Conception</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Analyse de votre terrain</li>
                    <li>• Définition de vos besoins</li>
                    <li>• Esquisse et avant-projet</li>
                    <li>• Plans détaillés</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">2. Démarches administratives</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Dépôt du permis de construire</li>
                    <li>• Suivi de l'instruction</li>
                    <li>• Obtention des autorisations</li>
                    <li>• Déclaration d'ouverture de chantier</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">3. Préparation du chantier</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Sélection des entreprises</li>
                    <li>• Validation des devis</li>
                    <li>• Planification détaillée</li>
                    <li>• Coordination des intervenants</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">4. Suivi de chantier</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Réunions hebdomadaires</li>
                    <li>• Contrôle qualité</li>
                    <li>• Respect du planning</li>
                    <li>• Gestion des modifications</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">5. Livraison</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Réception des travaux</li>
                    <li>• Levée des réserves</li>
                    <li>• Remise des clés</li>
                    <li>• Dossier des ouvrages exécutés</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">6. Garanties</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Garantie de parfait achèvement (1 an)</li>
                    <li>• Garantie biennale (2 ans)</li>
                    <li>• Garantie décennale (10 ans)</li>
                    <li>• Service après-vente</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-medium mb-4">Nos engagements qualité</h3>
              <p className="mb-6 text-gray-700">
                Toutes nos constructions répondent aux <strong>normes RT 2020</strong> et peuvent aller jusqu'aux standards <strong>passifs ou à énergie positive</strong>. Nous mettons l'accent sur :
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-10">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2">•</span>
                    <span>L'efficacité énergétique</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2">•</span>
                    <span>Le confort thermique été comme hiver</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2">•</span>
                    <span>La qualité de l'air intérieur</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2">•</span>
                    <span>L'isolation acoustique performante</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2">•</span>
                    <span>Les matériaux durables et sains</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2">•</span>
                    <span>L'intégration architecturale</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2">•</span>
                    <span>L'optimisation des espaces de vie</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2">•</span>
                    <span>La luminosité naturelle</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium mb-4">Témoignages de clients</h3>
              <div className="mb-12 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-khaki-100 rounded-full flex items-center justify-center text-khaki-800 font-bold mr-4">
                    SL
                  </div>
                  <div>
                    <p className="font-medium">Sophie & Laurent</p>
                    <p className="text-sm text-gray-500">Villa à Cassis</p>
                  </div>
                </div>
                <p className="italic text-gray-700 mb-4">
                  "Nous avons été accompagnés par Progineer pour la construction de notre maison à Cassis. De la conception à la livraison, l'équipe a fait preuve d'un grand professionnalisme. Ils ont su transformer nos idées en une maison qui nous ressemble parfaitement."
                </p>
              </div>

              <div className="bg-khaki-50 p-6 rounded-lg">
                <h3 className="text-2xl font-medium mb-4">Vous avez un projet de construction ?</h3>
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
        text="Construction de maisons individuelles en PACA par Progineer, maître d'œuvre spécialisé dans les projets sur mesure. Nos architectes et ingénieurs vous accompagnent de la conception à la réalisation de votre maison neuve à Marseille, Nice, Toulon et dans toute la région Provence-Alpes-Côte d'Azur."
      />
    </>
  );
};

export default ConstructionNeuve;
