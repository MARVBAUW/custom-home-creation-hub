
import React, { useState } from 'react';
import Container from '@/components/common/Container';
import { SearchIcon } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    id: 'difference-moe-architecte',
    question: "Quelle est la différence entre un maître d'œuvre, un architecte et une entreprise générale ?",
    answer: (
      <>
        <p className="mb-3">
          Un <strong>maître d'œuvre</strong> est un professionnel qui coordonne et supervise l'ensemble des travaux de construction ou de rénovation. Il fait le lien entre le client et les différents corps de métier.
        </p>
        <p className="mb-3">
          Un <strong>architecte</strong> est principalement chargé de la conception et du design du bâtiment, avec une approche plus artistique et technique.
        </p>
        <p className="mb-3">
          Une <strong>entreprise générale</strong>, quant à elle, réalise directement les travaux avec ses propres équipes ou des sous-traitants.
        </p>
        <p>
          Chez Progineer, nous combinons les compétences de maîtrise d'œuvre et d'architecture pour vous offrir un service complet.
        </p>
      </>
    ),
    category: "Métiers"
  },
  {
    id: 'budget-extension',
    question: "Quel est le budget moyen pour une extension de maison ?",
    answer: (
      <>
        <p className="mb-3">
          Le budget d'une extension varie considérablement selon plusieurs facteurs : la surface, le type de construction (à toit plat, à deux pans, etc.), les matériaux utilisés, la complexité technique, et la région.
        </p>
        <p className="mb-3">
          En moyenne, pour une extension de qualité en région PACA, il faut compter entre <strong>1 500 et 2 500 €/m²</strong>. Une extension en ossature bois peut coûter entre <strong>1 800 et 2 200 €/m²</strong>, tandis qu'une extension traditionnelle en maçonnerie peut varier de <strong>1 500 à 2 500 €/m²</strong>.
        </p>
        <p>
          Ces prix incluent le gros œuvre et les finitions standards, mais peuvent augmenter avec des matériaux haut de gamme ou des contraintes techniques particulières.
        </p>
      </>
    ),
    category: "Budget"
  },
  {
    id: 'cout-construction',
    question: "Comment estimer le coût d'un projet de construction ?",
    answer: (
      <>
        <p className="mb-3">
          L'estimation d'un projet de construction prend en compte plusieurs éléments :
        </p>
        <ul className="list-disc pl-5 mb-3 space-y-1">
          <li>La surface habitable</li>
          <li>Le type de construction</li>
          <li>La qualité des matériaux</li>
          <li>La complexité architecturale</li>
          <li>Les équipements</li>
          <li>L'emplacement géographique</li>
          <li>Les contraintes du terrain</li>
        </ul>
        <p className="mb-3">
          Pour une maison individuelle de qualité en PACA, le budget moyen oscille entre <strong>1 800 et 3 000 €/m²</strong>, hors terrain. Ce prix peut augmenter pour des constructions haut de gamme ou avec des particularités techniques.
        </p>
        <p>
          Progineer propose une <a href="/estimation" className="text-khaki-600 underline">estimation personnalisée</a> qui tient compte de tous ces facteurs et de vos besoins spécifiques.
        </p>
      </>
    ),
    category: "Budget"
  },
  {
    id: 'delai-construction',
    question: "Quels sont les délais moyens pour un projet de construction neuve ?",
    answer: (
      <>
        <p className="mb-3">
          Les délais d'un projet de construction neuve se décomposent généralement comme suit :
        </p>
        <h4 className="text-lg font-medium mb-2">Phase préparatoire : 4 à 6 mois</h4>
        <ul className="list-disc pl-5 mb-3 space-y-1">
          <li><strong>Conception et plans</strong> : 1 à 2 mois</li>
          <li><strong>Dépôt et obtention du permis de construire</strong> : 2 à 3 mois</li>
          <li><strong>Consultation des entreprises</strong> : 1 mois</li>
        </ul>
        <h4 className="text-lg font-medium mb-2">Phase de construction : 8 à 12 mois</h4>
        <ul className="list-disc pl-5 mb-3 space-y-1">
          <li><strong>Terrassement et fondations</strong> : 1 à 2 mois</li>
          <li><strong>Gros œuvre</strong> : 3 à 4 mois</li>
          <li><strong>Second œuvre et finitions</strong> : 4 à 6 mois</li>
        </ul>
        <p>
          Au total, il faut prévoir entre <strong>12 et 18 mois</strong> entre le début du projet et la livraison de la maison. Ce délai peut varier selon la complexité du projet, les aléas météorologiques et la disponibilité des artisans.
        </p>
      </>
    ),
    category: "Délais"
  },
  {
    id: 'permis-construire',
    question: "Faut-il un permis de construire pour tous les travaux ?",
    answer: (
      <>
        <p className="mb-3">
          Non, tous les travaux ne nécessitent pas un permis de construire. Voici les principales règles :
        </p>
        <h4 className="text-lg font-medium mb-2">Permis de construire obligatoire</h4>
        <ul className="list-disc pl-5 mb-3 space-y-1">
          <li>Construction nouvelle de plus de 20 m² de surface</li>
          <li>Extension de plus de 40 m² (ou plus de 20 m² en zone urbaine)</li>
          <li>Changement de destination avec modification de façade ou structure</li>
        </ul>
        <h4 className="text-lg font-medium mb-2">Déclaration préalable de travaux</h4>
        <ul className="list-disc pl-5 mb-3 space-y-1">
          <li>Construction nouvelle de 5 à 20 m²</li>
          <li>Extension de moins de 40 m² (ou moins de 20 m² en zone urbaine)</li>
          <li>Modification de l'aspect extérieur (façade, toiture, fenêtres)</li>
          <li>Changement de destination sans travaux structurels</li>
        </ul>
        <h4 className="text-lg font-medium mb-2">Aucune formalité</h4>
        <ul className="list-disc pl-5 mb-3 space-y-1">
          <li>Construction nouvelle de moins de 5 m²</li>
          <li>Petits travaux d'entretien ou de réparation</li>
        </ul>
        <p>
          Ces règles peuvent varier selon les zones (PLU, secteur sauvegardé, etc.). Progineer vous accompagne dans toutes vos <strong>démarches administratives</strong> pour déterminer les autorisations nécessaires à votre projet.
        </p>
      </>
    ),
    category: "Réglementation"
  },
  {
    id: 'renovation-energetique',
    question: "Quelles sont les aides disponibles pour une rénovation énergétique ?",
    answer: (
      <>
        <p className="mb-3">
          Plusieurs dispositifs d'aide sont disponibles pour financer vos travaux de rénovation énergétique :
        </p>
        <h4 className="text-lg font-medium mb-2">Aides principales</h4>
        <ul className="list-disc pl-5 mb-3 space-y-1">
          <li><strong>MaPrimeRénov'</strong> : aide calculée en fonction des revenus et du gain écologique des travaux</li>
          <li><strong>Éco-prêt à taux zéro</strong> : prêt sans intérêts jusqu'à 50 000 € sur 20 ans maximum</li>
          <li><strong>TVA réduite</strong> à 5,5% pour les travaux d'amélioration énergétique</li>
          <li><strong>Certificats d'économie d'énergie (CEE)</strong> : primes versées par les fournisseurs d'énergie</li>
          <li><strong>Aides de l'Anah</strong> : pour les ménages aux ressources modestes</li>
        </ul>
        <h4 className="text-lg font-medium mb-2">Aides locales</h4>
        <p className="mb-3">
          En complément, certaines collectivités territoriales (région PACA, départements, communes) proposent des aides spécifiques pour les travaux d'économie d'énergie.
        </p>
        <p>
          Notre équipe vous accompagne pour <strong>optimiser vos aides financières</strong> et vous orienter vers les dispositifs les plus avantageux selon votre situation et votre projet.
        </p>
      </>
    ),
    category: "Aides financières"
  }
];

const FAQContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Extract unique categories
  const categories = Array.from(new Set(faqItems.map(item => item.category)));
  
  // Filter items based on search term and active category
  const filteredItems = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory ? item.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16">
      <Container>
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher une question..."
            className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-khaki-600 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeCategory === null 
                ? 'bg-khaki-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Toutes les questions
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === category 
                  ? 'bg-khaki-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">Questions fréquentes</h2>
          {filteredItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600">Aucun résultat trouvé pour votre recherche.</p>
              <button 
                onClick={() => {setSearchTerm(''); setActiveCategory(null);}}
                className="mt-4 text-khaki-600 underline"
              >
                Réinitialiser la recherche
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  id={item.id}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                >
                  <h3 className="text-xl font-semibold mb-4">{item.question}</h3>
                  <div className="text-gray-700">{item.answer}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default FAQContent;
