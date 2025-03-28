import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, Handshake, Building2, TrendingUp, ShieldCheck, Users, FileCheck, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PartenairesContent = () => {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Pourquoi devenir partenaire ?</h2>
        <p className="text-gray-600 mb-8">
          Rejoindre le réseau de partenaires Progineer vous offre de nombreux avantages et opportunités pour développer votre activité dans le secteur de la construction et de la rénovation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white hover:shadow-md transition-shadow">
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Network className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Réseau professionnel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600">
                Intégrez un réseau de professionnels qualifiés et bénéficiez d'opportunités de collaboration avec d'autres experts du secteur.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-md transition-shadow">
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Croissance d'activité</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600">
                Augmentez votre volume d'affaires grâce aux projets que nous vous confions et à la visibilité accrue auprès de notre clientèle.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-md transition-shadow">
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Crédibilité renforcée</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600">
                Profitez de la réputation et de l'image de marque de Progineer pour renforcer votre crédibilité auprès de la clientèle.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-khaki-50 p-8 rounded-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Qui peut devenir partenaire ?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="flex items-center text-xl font-medium mb-4 text-khaki-800">
              <Building2 className="h-5 w-5 mr-2 text-khaki-600" />
              Artisans et professionnels du BTP
            </h3>
            <ul className="ml-8 space-y-2 list-disc text-gray-700">
              <li>Maçons, carreleurs, plombiers</li>
              <li>Électriciens, plaquistes, menuisiers</li>
              <li>Couvreurs, charpentiers, façadiers</li>
              <li>Peintres, paysagistes, piscinistes</li>
              <li>Métalliers, serruriers, ferroniers</li>
              <li>Chauffagistes, climaticiens</li>
              <li>Experts en isolation et étanchéité</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="flex items-center text-xl font-medium mb-4 text-khaki-800">
              <Handshake className="h-5 w-5 mr-2 text-khaki-600" />
              Professionnels complémentaires
            </h3>
            <ul className="ml-8 space-y-2 list-disc text-gray-700">
              <li>Architectes et architectes d'intérieur</li>
              <li>Bureaux d'études et bureaux de contrôle</li>
              <li>Géomètres-experts</li>
              <li>Décorateurs et designers</li>
              <li>Agents immobiliers</li>
              <li>Courtiers et professionnels du financement</li>
              <li>Fournisseurs de matériaux et équipements</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Button className="bg-green-600 hover:bg-green-700 text-white px-8" asChild>
            <a href="#partner-form">Demander à devenir partenaire</a>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Comment fonctionne notre partenariat ?</h2>
        <p className="text-gray-600 mb-6">
          Notre approche du partenariat est basée sur la confiance, la transparence et le bénéfice mutuel.
        </p>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="flex items-center text-xl font-medium mb-4 text-khaki-800">
                <Users className="h-5 w-5 mr-2 text-khaki-600" />
                Sélection rigoureuse
              </h3>
              <p className="mb-4 text-gray-700">
                Nous sélectionnons nos partenaires selon des critères stricts : expertise, qualité de travail, fiabilité et satisfaction client.
              </p>
              
              <h3 className="flex items-center text-xl font-medium mb-4 text-khaki-800 mt-6">
                <FileCheck className="h-5 w-5 mr-2 text-khaki-600" />
                Collaboration structurée
              </h3>
              <p className="text-gray-700">
                Nous établissons un cadre de collaboration clair avec des engagements mutuels, une communication efficace et des processus optimisés.
              </p>
            </div>
            
            <div>
              <h3 className="flex items-center text-xl font-medium mb-4 text-khaki-800">
                <Calendar className="h-5 w-5 mr-2 text-khaki-600" />
                Planification optimisée
              </h3>
              <p className="mb-4 text-gray-700">
                Nous organisons les plannings d'intervention en coordination avec tous les intervenants pour une exécution fluide des projets.
              </p>
              
              <h3 className="flex items-center text-xl font-medium mb-4 text-khaki-800 mt-6">
                <TrendingUp className="h-5 w-5 mr-2 text-khaki-600" />
                Développement commun
              </h3>
              <p className="text-gray-700">
                Nous nous engageons pour le développement mutuel : recommandations clients, formations et partage d'innovations techniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-green-50 p-8 rounded-xl border border-green-100">
        <h2 className="text-2xl font-semibold mb-4 text-center text-green-800">Engagements de nos partenaires</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-4 text-green-700">Ce que nous attendons</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-gray-700">Qualité irréprochable des prestations</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-gray-700">Respect des délais et engagements</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-gray-700">Transparence et communication proactive</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-gray-700">Professionnalisme avec les clients</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-gray-700">Assurances et garanties à jour</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-4 text-green-700">Ce que nous offrons</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-gray-700">Apport régulier de nouveaux projets</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-gray-700">Dossiers techniques complets et détaillés</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-gray-700">Support technique et coordination</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-gray-700">Visibilité sur notre site web et supports marketing</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-gray-700">Paiements respectant les délais convenus</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Button className="bg-green-600 hover:bg-green-700 text-white px-8" asChild>
            <a href="#partner-form">Contactez-nous pour en savoir plus</a>
          </Button>
        </div>
      </section>

      <section id="partner-form" className="scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-6 text-center">Formulaire de demande de partenariat</h2>
        <p className="text-center text-gray-600 mb-8">
          Complétez ce formulaire pour nous faire part de votre intérêt à rejoindre notre réseau de partenaires.
        </p>
        
        {/* Placeholder for the form - it will be filled by PartnersSection component */}
      </section>
    </div>
  );
};

export default PartenairesContent;
