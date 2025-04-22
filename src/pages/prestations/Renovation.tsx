
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import Button from '@/components/common/Button';
import SEOFooter from '@/components/common/SEOFooter';
import PrestationsSubNav from '@/components/prestations/PrestationsSubNav';

const Renovation = () => {
  return (
    <>
      <SEO 
        title="Rénovation de maisons et appartements | Maître d'œuvre PACA - Progineer"
        description="Découvrez notre service de rénovation complète à Marseille et en PACA. Transformation de votre habitat par des experts en architecture et maîtrise d'œuvre."
        keywords="rénovation maison, rénovation appartement, maître d'œuvre PACA, rénovation Marseille, architecte rénovation"
        canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/renovation"
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Nos prestations
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Rénovation complète
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Des <strong>rénovations sur mesure</strong> pour transformer votre habitat existant. Nous vous accompagnons pour redonner vie à votre maison ou appartement.
            </p>
          </div>
        </Container>
      </section>

      {/* Navigation secondaire */}
      <PrestationsSubNav activeService="renovation" />

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
                      <h3 className="font-medium text-lg">Diagnostic complet</h3>
                      <p className="text-sm text-gray-600">Analyse approfondie de votre bien pour identifier les points d'amélioration.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2 mt-1 text-lg">✓</span>
                    <div>
                      <h3 className="font-medium text-lg">Optimisation des espaces</h3>
                      <p className="text-sm text-gray-600">Reconception intelligente pour maximiser le potentiel de votre habitat.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2 mt-1 text-lg">✓</span>
                    <div>
                      <h3 className="font-medium text-lg">Performance énergétique</h3>
                      <p className="text-sm text-gray-600">Amélioration significative de l'isolation et de l'efficacité énergétique.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2 mt-1 text-lg">✓</span>
                    <div>
                      <h3 className="font-medium text-lg">Valorisation patrimoniale</h3>
                      <p className="text-sm text-gray-600">Augmentation de la valeur de votre bien immobilier.</p>
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
              <h2 className="text-3xl font-semibold mb-6">Notre approche de la rénovation</h2>
              <p className="mb-8 text-gray-700">
                Chez Progineer, nous concevons des <strong>rénovations complètes personnalisées</strong> qui transforment votre habitat tout en respectant son caractère et son histoire. Notre accompagnement s'étend de l'état des lieux initial jusqu'à la livraison finale, avec une attention particulière au respect de votre budget et des délais.
              </p>

              <div className="mb-12">
                <img 
                  src="https://images.unsplash.com/photo-1574739782594-db4ead022697?q=80&w=2070&auto=format&fit=crop" 
                  alt="Exemple de rénovation complète réalisée par Progineer en PACA"
                  className="w-full h-auto rounded-xl mb-4"
                />
                <p className="text-sm text-gray-500 text-center">Rénovation d'un appartement haussmannien à Marseille</p>
              </div>

              <h3 className="text-2xl font-medium mb-4">Notre processus de rénovation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">1. Diagnostic & Conception</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• État des lieux complet</li>
                    <li>• Diagnostic technique</li>
                    <li>• Analyse des contraintes</li>
                    <li>• Plans et esquisses</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">2. Planification</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Élaboration du planning</li>
                    <li>• Sélection des artisans</li>
                    <li>• Obtention des autorisations</li>
                    <li>• Validation du budget</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">3. Travaux & Suivi</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Coordination des entreprises</li>
                    <li>• Contrôle qualité</li>
                    <li>• Réunions de chantier</li>
                    <li>• Gestion des imprévus</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-medium mb-3">4. Livraison</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Réception des travaux</li>
                    <li>• Levée des réserves</li>
                    <li>• Documentation technique</li>
                    <li>• Service après-livraison</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-medium mb-4">Nos spécialités en rénovation</h3>
              <p className="mb-6 text-gray-700">
                Notre expertise couvre tous les aspects de la rénovation, des projets simples aux transformations complètes :
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-10">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2">•</span>
                    <span>Rénovation d'appartements anciens</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2">•</span>
                    <span>Réhabilitation de maisons de caractère</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2">•</span>
                    <span>Rénovation énergétique complète</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2">•</span>
                    <span>Reconfiguration des espaces de vie</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2">•</span>
                    <span>Mise aux normes d'accessibilité</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2">•</span>
                    <span>Modernisation des installations techniques</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2">•</span>
                    <span>Transformation de locaux professionnels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-khaki-600 mr-2">•</span>
                    <span>Adaptation PMR (Personnes à Mobilité Réduite)</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium mb-4">Témoignages de clients</h3>
              <div className="mb-12 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-khaki-100 rounded-full flex items-center justify-center text-khaki-800 font-bold mr-4">
                    MC
                  </div>
                  <div>
                    <p className="font-medium">Marie & Claude</p>
                    <p className="text-sm text-gray-500">Appartement à Aix-en-Provence</p>
                  </div>
                </div>
                <p className="italic text-gray-700 mb-4">
                  "Notre appartement du centre-ville avait besoin d'un sérieux rafraîchissement. L'équipe de Progineer a transformé notre espace vieillissant en un havre de paix moderne tout en conservant les éléments de caractère. Le résultat dépasse toutes nos attentes !"
                </p>
              </div>

              <div className="bg-khaki-50 p-6 rounded-lg">
                <h3 className="text-2xl font-medium mb-4">Vous avez un projet de rénovation ?</h3>
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
        text="Rénovation de maisons et d'appartements en PACA par Progineer, maître d'œuvre spécialisé en transformation d'habitat. Nos experts vous accompagnent dans tous vos projets de rénovation à Marseille, Nice, Toulon et dans toute la région Provence-Alpes-Côte d'Azur pour améliorer votre confort et valoriser votre patrimoine."
      />
    </>
  );
};

export default Renovation;
