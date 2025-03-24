
import React from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { FilePlus2, FileSpreadsheet, FileText, FileCode, FileCheck } from 'lucide-react';

const Workspace = () => {
  return (
    <>
      <Helmet>
        <title>Workspace | Progineer - Architecte & Maître d'œuvre en PACA</title>
        <meta name="description" content="Workspace Progineer - Ressources et outils pour vos projets de construction, rénovation et extension en région PACA." />
        <meta name="keywords" content="ressources construction, guides rénovation, outils maître d'œuvre, documentation architecture" />
      </Helmet>

      {/* Hero section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Workspace
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Espace ressources
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Retrouvez bientôt nos guides, modèles, fichiers Excel de rentabilité, 
              veille réglementaire et outils de gestion de projet.
            </p>
          </div>
        </Container>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16">
        <Container>
          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold mb-8 text-center">En développement</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-stone-50 p-6 rounded-lg border border-stone-200 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-khaki-100 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-khaki-700" />
                </div>
                <h3 className="text-lg font-medium mb-2">Guides pratiques</h3>
                <p className="text-gray-600 text-sm">
                  Conseils et astuces pour vos projets de construction et rénovation
                </p>
              </div>
              
              <div className="bg-stone-50 p-6 rounded-lg border border-stone-200 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-khaki-100 flex items-center justify-center mb-4">
                  <FileSpreadsheet className="h-6 w-6 text-khaki-700" />
                </div>
                <h3 className="text-lg font-medium mb-2">Calculateurs</h3>
                <p className="text-gray-600 text-sm">
                  Outils Excel pour estimer vos coûts et calculer la rentabilité
                </p>
              </div>
              
              <div className="bg-stone-50 p-6 rounded-lg border border-stone-200 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-khaki-100 flex items-center justify-center mb-4">
                  <FileCheck className="h-6 w-6 text-khaki-700" />
                </div>
                <h3 className="text-lg font-medium mb-2">Réglementation</h3>
                <p className="text-gray-600 text-sm">
                  Veille réglementaire et documents administratifs à jour
                </p>
              </div>
              
              <div className="bg-stone-50 p-6 rounded-lg border border-stone-200 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-khaki-100 flex items-center justify-center mb-4">
                  <FileCode className="h-6 w-6 text-khaki-700" />
                </div>
                <h3 className="text-lg font-medium mb-2">Espace client</h3>
                <p className="text-gray-600 text-sm">
                  Accès sécurisé à vos documents et au suivi de votre projet
                </p>
              </div>
            </div>
            
            <div className="text-center bg-khaki-50 p-8 rounded-xl border border-khaki-100">
              <h3 className="text-xl font-semibold mb-4">Soyez informé du lancement</h3>
              <p className="text-gray-600 mb-6">
                Inscrivez-vous pour être informé en priorité lorsque notre espace ressources sera disponible.
              </p>
              
              <div className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    className="px-4 py-2 border border-gray-300 rounded-md flex-grow focus:ring-khaki-500 focus:border-khaki-500"
                  />
                  <Button>
                    <FilePlus2 className="mr-2 h-4 w-4" />
                    S'inscrire
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  En vous inscrivant, vous acceptez de recevoir des emails de Progineer. 
                  Vous pourrez vous désinscrire à tout moment.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Preview Section */}
      <section className="py-16 bg-stone-50 border-t border-stone-200">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Ce que vous trouverez bientôt
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Notre équipe travaille actuellement sur de nombreuses ressources pour faciliter vos projets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Pour les particuliers</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                    <svg className="h-3 w-3 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Guide pour comprendre un devis de travaux</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                    <svg className="h-3 w-3 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Checklist pour le suivi de chantier</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                    <svg className="h-3 w-3 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Calculateur de budget pour une rénovation</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                    <svg className="h-3 w-3 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Guide des démarches administratives</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                    <svg className="h-3 w-3 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Informations sur les aides financières</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Pour les professionnels</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                    <svg className="h-3 w-3 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Tableaux de suivi de chantier</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                    <svg className="h-3 w-3 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Modèles de contrats et documents types</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                    <svg className="h-3 w-3 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Veille réglementaire et normes RT2020</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                    <svg className="h-3 w-3 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Outils de calcul de rentabilité</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                    <svg className="h-3 w-3 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Fiches techniques et conseils d'experts</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* SEO Footer */}
      <section className="py-8 bg-white border-t border-stone-200">
        <Container>
          <div className="text-sm text-stone-500">
            <p>
              Ingénieur, maître d'œuvre à Marseille et en PACA – Spécialiste en construction de maisons sur mesure, rénovation et extension. Retrouvez bientôt toutes nos ressources et outils pour faciliter vos projets immobiliers en région Provence-Alpes-Côte d'Azur.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Workspace;
