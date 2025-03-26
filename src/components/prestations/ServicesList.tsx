
import React from 'react';
import { Building, Construction, Wrench, Settings, Plus, Info } from 'lucide-react';
import ServicesCard from './ServicesCard';

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

const ServicesList = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8 text-center text-khaki-800">Nos prestations détaillées</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {services.map((service) => (
          <ServicesCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
