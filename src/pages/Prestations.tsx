
import React from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { 
  HomeIcon, 
  Paintbrush, 
  Gauge, 
  Maximize, 
  Ruler,
  FileText
} from 'lucide-react';

const services = [
  {
    id: "construction",
    icon: HomeIcon,
    title: 'Construction sur mesure',
    description: 'Nous concevons et réalisons des maisons individuelles et petits collectifs adaptés à vos besoins, votre budget et votre terrain. Notre approche personnalisée garantit un projet qui vous ressemble parfaitement.',
    features: [
      'Étude de faisabilité complète',
      'Conception architecturale adaptée à vos besoins',
      'Suivi de chantier rigoureux',
      'Respect des normes RT2020',
      'Matériaux de qualité supérieure'
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: "renovation",
    icon: Gauge,
    title: 'Rénovation énergétique',
    description: 'Optimisez votre habitat selon les normes RE2020 avec nos services d\'audit énergétique et de travaux d\'amélioration. Réduisez votre consommation et augmentez le confort de votre logement.',
    features: [
      'Audit énergétique complet',
      'DPE (Diagnostic de Performance Énergétique)',
      'Isolation thermique optimisée',
      'Installation de systèmes écoénergétiques',
      'Accompagnement pour les aides financières'
    ],
    image: 'https://images.unsplash.com/photo-1607400201515-c2c41c07d307?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: "extension",
    icon: Maximize,
    title: 'Extension & agrandissement',
    description: 'Créez de nouveaux espaces de vie avec une extension parfaitement intégrée à votre habitation existante. Nous gérons toutes les démarches administratives et techniques.',
    features: [
      'Étude de faisabilité et contraintes urbanistiques',
      'Conception harmonieuse avec l\'existant',
      'Gestion des autorisations administratives',
      'Coordination des corps de métier',
      'Suivi budgétaire précis'
    ],
    image: 'https://images.unsplash.com/photo-1561061046-7f214e269c4a?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: "optimisation",
    icon: Ruler,
    title: 'Optimisation d\'espace',
    description: 'Réaménagement intelligent pour valoriser chaque mètre carré de votre bien immobilier. Nous repensons vos espaces pour les rendre plus fonctionnels et adaptés à votre mode de vie.',
    features: [
      'Analyse des besoins et usages',
      'Création de plans optimisés',
      'Solutions de rangement sur mesure',
      'Aménagements multifonctionnels',
      'Mise en valeur de l\'espace existant'
    ],
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: "design",
    icon: Paintbrush,
    title: 'Design d\'espace',
    description: 'Conception d\'intérieurs fonctionnels et esthétiques pour particuliers et professionnels. Nous créons des espaces qui reflètent votre personnalité et répondent à vos besoins.',
    features: [
      'Étude des espaces et circulation',
      'Sélection des matériaux et finitions',
      'Conception d\'aménagements sur mesure',
      'Conseils en décoration et mobilier',
      'Plans et rendus 3D détaillés'
    ],
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2074&auto=format&fit=crop'
  },
  {
    id: "administratif",
    icon: FileText,
    title: 'Montage administratif & réglementaire',
    description: 'Nous prenons en charge toutes les démarches administratives liées à votre projet : permis de construire, déclarations de travaux, et coordination avec les différentes administrations.',
    features: [
      'Constitution des dossiers de permis de construire',
      'Déclarations préalables de travaux',
      'Relations avec les services d\'urbanisme',
      'Suivi des autorisations',
      'Conformité aux réglementations locales'
    ],
    image: 'https://images.unsplash.com/photo-1590402494610-2c378a9114c6?q=80&w=2070&auto=format&fit=crop'
  }
];

const Prestations = () => {
  return (
    <>
      <Helmet>
        <title>Nos prestations | Maître d'œuvre & Architecte en PACA - Progineer</title>
        <meta name="description" content="Construction sur mesure, rénovation énergétique, extension, design d'espace - découvrez toutes les prestations de Progineer en région PACA." />
        <meta name="keywords" content="construction maison sur mesure, rénovation énergétique PACA, extension maison Marseille, design d'espace, maître d'œuvre" />
      </Helmet>

      {/* Hero section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Nos prestations
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Des services complets pour votre projet
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Progineer vous accompagne de A à Z dans tous vos projets de construction, 
              rénovation et aménagement en région PACA.
            </p>
          </div>
        </Container>
      </section>

      {/* Services sections */}
      {services.map((service, index) => (
        <section 
          key={service.id}
          id={service.id}
          className={`py-20 ${index % 2 === 1 ? 'bg-stone-50' : 'bg-white'}`}
        >
          <Container>
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="order-2 lg:order-none">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-khaki-100 text-khaki-700 mb-6">
                  <service.icon className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-semibold mb-4">{service.title}</h2>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                        <svg className="h-3 w-3 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button href="/estimation">Estimer mon projet</Button>
                  <Button href="/contact" variant="outline">Prendre rendez-vous</Button>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden shadow-md">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>
            </div>
          </Container>
        </section>
      ))}

      {/* CTA section */}
      <section className="py-16 bg-khaki-600 text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">
              Vous avez un projet ?
            </h2>
            <p className="text-white/90 mb-8">
              Contactez-nous dès aujourd'hui pour discuter de votre projet et obtenir un devis personnalisé.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" className="bg-white text-khaki-800 hover:bg-white/90">
                Nous contacter
              </Button>
              <Button href="/realisations-architecte-maison" variant="outline" className="border-white/30 bg-transparent hover:bg-white/10">
                Voir nos réalisations
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
              Ingénieur, maître d'œuvre à Marseille et en PACA – Spécialiste en construction de maisons sur mesure, rénovation et extension. Nos architectes et ingénieurs vous accompagnent de A à Z pour tous vos projets dans la région Provence-Alpes-Côte d'Azur.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Prestations;
