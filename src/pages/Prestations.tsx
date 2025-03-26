
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Construction, Wrench, Settings, Plus, Info } from 'lucide-react';
import PrestationsSubNav from '@/components/prestations/PrestationsSubNav';

// Define service categories
const services = [
  {
    id: 'construction',
    icon: <Building className="h-10 w-10 text-khaki-600" />,
    title: 'Construction sur mesure',
    description: 'Construction de maisons individuelles et petits collectifs parfaitement adaptés à vos besoins et à votre terrain.',
    features: [
      'Étude de faisabilité complète',
      'Conception architecturale personnalisée',
      'Optimisation des coûts et des délais',
      'Coordination des artisans et suivi de chantier',
      'Gestion administrative (permis de construire, déclarations)',
      'Garantie de livraison dans les délais convenus'
    ],
  },
  {
    id: 'renovation',
    icon: <Wrench className="h-10 w-10 text-khaki-600" />,
    title: 'Rénovation énergétique',
    description: 'Améliorez la performance énergétique de votre logement tout en valorisant votre patrimoine immobilier.',
    features: [
      'Audit énergétique complet',
      'Diagnostic de Performance Énergétique (DPE)',
      'Solutions adaptées aux normes RE2020',
      'Accompagnement aux aides financières (MaPrimeRénov, CEE)',
      'Isolation thermique et phonique',
      'Installation de systèmes de chauffage écologiques'
    ],
  },
  {
    id: 'extension',
    icon: <Plus className="h-10 w-10 text-khaki-600" />,
    title: 'Extension & agrandissement',
    description: 'Agrandissez votre espace de vie avec une extension harmonieuse et parfaitement intégrée à votre habitat existant.',
    features: [
      'Étude d\'intégration architecturale',
      'Optimisation de la liaison avec l\'existant',
      'Conception sur mesure (véranda, surélévation, extension latérale)',
      'Gestion des contraintes techniques et réglementaires',
      'Choix de matériaux durables et écologiques',
      'Optimisation de l\'apport lumineux naturel'
    ],
  },
  {
    id: 'optimisation',
    icon: <Settings className="h-10 w-10 text-khaki-600" />,
    title: 'Optimisation d\'espace',
    description: 'Maximisez le potentiel de votre surface habitable grâce à des solutions d\'aménagement intelligentes et fonctionnelles.',
    features: [
      'Analyse fonctionnelle des espaces',
      'Réagencement optimal des pièces',
      'Solutions de rangement intégrées',
      'Création de mezzanines ou d\'espaces modulables',
      'Optimisation des circulations',
      'Amélioration de l\'ergonomie du logement'
    ],
  },
  {
    id: 'design',
    icon: <Construction className="h-10 w-10 text-khaki-600" />,
    title: 'Design d\'espace',
    description: 'Créez des intérieurs esthétiques et fonctionnels qui reflètent votre personnalité et votre mode de vie.',
    features: [
      'Conception d\'intérieur personnalisée',
      'Choix des matériaux et des finitions',
      'Plans d\'aménagement détaillés',
      'Conseils en décoration et mobilier',
      'Moodboards et visualisations 3D',
      'Suivi de la mise en œuvre'
    ],
  },
  {
    id: 'administratif',
    icon: <Info className="h-10 w-10 text-khaki-600" />,
    title: 'Montage administratif',
    description: 'Simplifiez vos démarches administratives grâce à notre accompagnement expert pour tous vos projets de construction.',
    features: [
      'Élaboration des dossiers de permis de construire',
      'Déclarations préalables de travaux',
      'Accompagnement aux autorisations d\'urbanisme',
      'Suivi des délais d\'instruction',
      'Assistance aux recours éventuels',
      'Relations avec les services d\'urbanisme'
    ],
  },
];

const Prestations = () => {
  const location = useLocation();
  
  // Scroll to hash on initial load and hash changes
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Nos prestations | Architecte et Maître d'œuvre PACA - Progineer</title>
        <meta name="description" content="Progineer propose des services de maîtrise d'œuvre pour particuliers et professionnels : construction, rénovation, aménagement et optimisation énergétique." />
        <meta name="keywords" content="maître d'œuvre PACA, architecte Marseille, construction maison sur mesure, rénovation énergétique, extension maison, optimisation espace" />
      </Helmet>

      {/* Hero section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white" id="overview">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Nos prestations
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Services de maîtrise d'œuvre
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Progineer propose un accompagnement global pour vos projets de construction, de rénovation, 
              d'aménagement et d'optimisation énergétique, que vous soyez particulier ou professionnel.
            </p>
          </div>
        </Container>
      </section>

      {/* Sub-navigation */}
      <PrestationsSubNav />

      {/* Services Overview */}
      <section className="py-16">
        <Container>
          {/* Clientèle - particuliers et professionnels */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-8 text-center text-khaki-800">Nos services par clientèle</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Pour les particuliers */}
              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold mb-6 text-center text-khaki-800">Pour les particuliers</h3>
                <ul className="space-y-3">
                  <li className="flex items-start p-3 bg-khaki-50 rounded-md">
                    <span className="mr-2 text-khaki-600 font-bold">•</span>
                    <span className="text-gray-700">Construction de maisons individuelles sur mesure</span>
                  </li>
                  <li className="flex items-start p-3 bg-khaki-50 rounded-md">
                    <span className="mr-2 text-khaki-600 font-bold">•</span>
                    <span className="text-gray-700">Rénovation et extension</span>
                  </li>
                  <li className="flex items-start p-3 bg-khaki-50 rounded-md">
                    <span className="mr-2 text-khaki-600 font-bold">•</span>
                    <span className="text-gray-700">Aménagement et design d'espace</span>
                  </li>
                  <li className="flex items-start p-3 bg-khaki-50 rounded-md">
                    <span className="mr-2 text-khaki-600 font-bold">•</span>
                    <span className="text-gray-700">Audit et diagnostic</span>
                  </li>
                  <li className="flex items-start p-3 bg-khaki-50 rounded-md">
                    <span className="mr-2 text-khaki-600 font-bold">•</span>
                    <span className="text-gray-700">Accompagnement administratif et technique</span>
                  </li>
                </ul>
              </div>

              {/* Pour les professionnels */}
              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold mb-6 text-center text-khaki-800">Pour les professionnels</h3>
                <ul className="space-y-3">
                  <li className="flex items-start p-3 bg-khaki-50 rounded-md">
                    <span className="mr-2 text-khaki-600 font-bold">•</span>
                    <span className="text-gray-700">Construction ou aménagement de bureaux, commerces, hôtels</span>
                  </li>
                  <li className="flex items-start p-3 bg-khaki-50 rounded-md">
                    <span className="mr-2 text-khaki-600 font-bold">•</span>
                    <span className="text-gray-700">Accompagnement des marchands de biens et investisseurs</span>
                  </li>
                  <li className="flex items-start p-3 bg-khaki-50 rounded-md">
                    <span className="mr-2 text-khaki-600 font-bold">•</span>
                    <span className="text-gray-700">Solutions environnementales et énergétiques</span>
                  </li>
                  <li className="flex items-start p-3 bg-khaki-50 rounded-md">
                    <span className="mr-2 text-khaki-600 font-bold">•</span>
                    <span className="text-gray-700">Diagnostics techniques</span>
                  </li>
                  <li className="flex items-start p-3 bg-khaki-50 rounded-md">
                    <span className="mr-2 text-khaki-600 font-bold">•</span>
                    <span className="text-gray-700">Dossiers de subvention</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Services détaillés */}
          <div>
            <h2 className="text-2xl font-semibold mb-8 text-center text-khaki-800">Nos prestations détaillées</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {services.map((service) => (
                <Card key={service.id} id={service.id} className="border-gray-200 hover:shadow-md transition-shadow duration-300 scroll-mt-32">
                  <CardHeader>
                    <div className="mb-4">{service.icon}</div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 mt-1 text-khaki-600">•</span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button href="/contact" variant="outline" className="w-full justify-center">
                      En savoir plus
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-stone-50 border-y border-stone-100">
        <Container>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">Processus Projet</h2>
            <p className="text-gray-600">
              Nous suivons une méthodologie rigoureuse : analyse du besoin, étude de faisabilité, conception, 
              choix des entreprises, pilotage du chantier, suivi administratif et remise des clés.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-khaki-600 text-white flex items-center justify-center font-semibold text-lg">1</div>
              <h3 className="text-xl font-semibold mb-3 mt-2">Consultation initiale</h3>
              <p className="text-gray-600">
                Nous écoutons vos besoins, analysons votre projet et définissons ensemble les grandes lignes de votre projet.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-khaki-600 text-white flex items-center justify-center font-semibold text-lg">2</div>
              <h3 className="text-xl font-semibold mb-3 mt-2">Étude et conception</h3>
              <p className="text-gray-600">
                Nous élaborons les plans, estimons les coûts et proposons des solutions techniques adaptées à votre budget.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-khaki-600 text-white flex items-center justify-center font-semibold text-lg">3</div>
              <h3 className="text-xl font-semibold mb-3 mt-2">Réalisation</h3>
              <p className="text-gray-600">
                Nous coordonnons les différents corps de métier et veillons au respect du calendrier et de la qualité d'exécution.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-khaki-600 text-white flex items-center justify-center font-semibold text-lg">4</div>
              <h3 className="text-xl font-semibold mb-3 mt-2">Livraison et suivi</h3>
              <p className="text-gray-600">
                Nous effectuons la réception des travaux et assurons un suivi post-livraison pour garantir votre entière satisfaction.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-khaki-600">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6 text-white">
              Prêt à concrétiser votre projet ?
            </h2>
            <p className="text-xl opacity-90 mb-8 text-white">
              Contactez notre équipe pour discuter de vos besoins et obtenir un devis personnalisé.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="/estimation" 
                className="bg-white text-khaki-800 hover:bg-white/90"
              >
                Estimer mon projet
              </Button>
              <Button 
                href="/contact" 
                variant="outline" 
                className="border-white/30 bg-transparent hover:bg-white/10 text-white"
              >
                Nous contacter
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SEO Footer */}
      <section className="py-8 bg-stone-50 border-t border-stone-200">
        <Container>
          <div className="text-sm text-stone-500">
            <p>
              Progineer propose un accompagnement global pour vos projets de construction, de rénovation, d'aménagement et 
              d'optimisation énergétique, que vous soyez particulier ou professionnel. Nos services incluent la construction 
              de maisons individuelles sur mesure, la rénovation et l'extension, l'aménagement et le design d'espace, ainsi 
              que l'audit, le diagnostic et l'accompagnement administratif et technique dans toute la région PACA.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Prestations;
