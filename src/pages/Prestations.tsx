
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Construction, Wrench, Settings, Plus, Info } from 'lucide-react';

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
  return (
    <>
      <Helmet>
        <title>Nos prestations | Architecte et Maître d'œuvre PACA - Progineer</title>
        <meta name="description" content="Découvrez nos prestations de maîtrise d'œuvre à Marseille et en PACA : construction sur mesure, rénovation énergétique, extension et design d'espace." />
        <meta name="keywords" content="maître d'œuvre PACA, architecte Marseille, construction maison sur mesure, rénovation énergétique, extension maison, optimisation espace" />
      </Helmet>

      {/* Hero section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Nos prestations
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Services de maîtrise d'œuvre
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              De la conception à la réalisation, Progineer vous accompagne dans tous vos projets de construction, 
              rénovation et aménagement en région PACA.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <Card key={service.id} id={service.id} className="border-gray-200 hover:shadow-md transition-shadow duration-300">
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
                        <span>{feature}</span>
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
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-stone-50 border-y border-stone-100">
        <Container>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">Notre processus d'accompagnement</h2>
            <p className="text-gray-600">
              Une méthodologie éprouvée pour mener à bien votre projet, de la première idée à la livraison finale.
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

      {/* Why Choose Us */}
      <section className="py-16">
        <Container>
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-semibold mb-6">Pourquoi choisir Progineer ?</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-khaki-100 flex items-center justify-center mr-4 shrink-0">
                    <span className="text-khaki-800 font-semibold">01</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Expertise technique</h3>
                    <p className="text-gray-600">
                      Notre équipe combine des compétences en architecture, ingénierie et gestion de projet pour une approche complète et efficace.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-khaki-100 flex items-center justify-center mr-4 shrink-0">
                    <span className="text-khaki-800 font-semibold">02</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Communication transparente</h3>
                    <p className="text-gray-600">
                      Nous vous tenons informés à chaque étape de l'avancement de votre projet et restons disponibles pour répondre à vos questions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-khaki-100 flex items-center justify-center mr-4 shrink-0">
                    <span className="text-khaki-800 font-semibold">03</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Maîtrise des coûts</h3>
                    <p className="text-gray-600">
                      Nos méthodes de travail optimisées nous permettent de respecter scrupuleusement les budgets établis, sans mauvaises surprises.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="h-full rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1460574283810-2aab119d8511?q=80&w=3512&auto=format&fit=crop" 
                  alt="Architecture moderne" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-khaki-600 text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">
              Prêt à concrétiser votre projet ?
            </h2>
            <p className="text-xl opacity-90 mb-8">
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
                className="border-white/30 bg-transparent hover:bg-white/10"
              >
                Nous contacter
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Questions fréquentes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Vous avez des questions sur nos services ? Consultez nos réponses ci-dessous ou contactez-nous directement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-3">Quelle est la différence entre un maître d'œuvre et un architecte ?</h3>
              <p className="text-gray-600">
                Le maître d'œuvre, comme Progineer, coordonne et supervise l'ensemble du projet de construction, tandis que l'architecte se concentre davantage sur la conception. Nous travaillons en collaboration avec des architectes lorsque nécessaire pour certains projets.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-3">Quel est le délai moyen pour un projet de construction ?</h3>
              <p className="text-gray-600">
                Les délais varient selon la nature et l'ampleur du projet. Pour une maison individuelle, comptez environ 8 à 12 mois entre la conception et la livraison. Une extension prend généralement 4 à 6 mois, et une rénovation 2 à 6 mois selon sa complexité.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-3">Quelles garanties offrez-vous sur vos prestations ?</h3>
              <p className="text-gray-600">
                Nous sommes couverts par une assurance décennale et une responsabilité civile professionnelle. De plus, nous garantissons la conformité des travaux avec les plans et le respect des normes en vigueur, notamment la RE2020.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-3">Intervenez-vous sur toute la région PACA ?</h3>
              <p className="text-gray-600">
                Oui, nous intervenons dans toute la région Provence-Alpes-Côte d'Azur, notamment à Marseille, Toulon, Nice, Cannes, Saint-Tropez, Fréjus et leurs environs. N'hésitez pas à nous contacter pour vérifier notre disponibilité dans votre zone.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link to="/faq" className="text-khaki-600 hover:text-khaki-800 font-medium">
              Voir toutes les questions fréquentes →
            </Link>
          </div>
        </Container>
      </section>

      {/* SEO Footer */}
      <section className="py-8 bg-stone-50 border-t border-stone-200">
        <Container>
          <div className="text-sm text-stone-500">
            <p>
              Ingénieur, maître d'œuvre à Marseille et en PACA – Spécialiste en construction de maisons sur mesure, rénovation énergétique et extension. Nos architectes et ingénieurs assurent la maîtrise d'ouvrage complète de votre projet. Optimisation des espaces, design d'intérieur et montage administratif pour particuliers et professionnels dans toute la région Provence-Alpes-Côte d'Azur.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Prestations;
