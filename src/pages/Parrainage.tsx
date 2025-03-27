
import React from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { Gift, Users, PiggyBank, Medal } from 'lucide-react';
import SEO from '@/components/common/SEO';
import SEOFooter from '@/components/common/SEOFooter';

const Parrainage = () => {
  // Structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Programme de parrainage | Progineer - Architecte & Maître d'œuvre en PACA",
    "description": "Programme d'apporteurs d'affaires Progineer. Recommandez-nous et recevez une commission pour chaque nouveau client. Architecte et maître d'œuvre en région PACA.",
    "url": "https://progineer.fr/parrainage-travaux",
    "mainEntity": {
      "@type": "ProfessionalService",
      "name": "Progineer",
      "description": "Entreprise d'architecture et de maîtrise d'œuvre spécialisée dans la construction, rénovation et extension de maisons sur mesure en région PACA.",
      "image": "https://progineer.fr/images/progineer-social-card.jpg",
      "offers": {
        "@type": "Offer",
        "name": "Programme de parrainage",
        "description": "Recommandez-nous à votre entourage et soyez récompensé pour chaque nouveau client qui nous fait confiance."
      }
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".speakable"]
    }
  };

  return (
    <>
      <SEO 
        title="Programme de parrainage | Progineer - Architecte & Maître d'œuvre en PACA"
        description="Programme d'apporteurs d'affaires Progineer. Recommandez-nous et recevez une commission pour chaque nouveau client. Architecte et maître d'œuvre en région PACA."
        keywords="parrainage travaux, apporteur d'affaires architecte, recommandation maître d'œuvre, commission travaux PACA"
        canonicalUrl="https://progineer.fr/parrainage-travaux"
        structuredData={structuredData}
        ogImage="https://progineer.fr/images/progineer-social-card.jpg"
      >
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="FR-PAC" />
        <meta name="geo.placename" content="Provence-Alpes-Côte d'Azur" />
      </SEO>

      {/* Hero section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-progineer-light to-white">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-progineer-gold/10 text-progineer-gold text-sm font-medium">
              Parrainage
            </div>
            <h1 className="text-4xl md:text-5xl font-rare tracking-wide mb-6 text-progineer-dark">
              Programme d'apporteurs d'affaires
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 speakable">
              Recommandez-nous à votre entourage et soyez récompensé pour chaque 
              nouveau client qui nous fait confiance.
            </p>
          </div>
        </Container>
      </section>

      {/* How it works section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Notre programme de parrainage est simple, transparent et avantageux pour tous.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-khaki-100 flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-khaki-700" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Recommandez-nous</h3>
              <p className="text-gray-600">
                Parlez de Progineer à vos amis, votre famille ou vos collègues qui ont un projet de construction, rénovation ou extension.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-khaki-100 flex items-center justify-center mb-6">
                <Medal className="h-8 w-8 text-khaki-700" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Suivez les leads</h3>
              <p className="text-gray-600">
                Vous serez informé de l'avancement de chaque recommandation, depuis le premier contact jusqu'à la signature du contrat.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-khaki-100 flex items-center justify-center mb-6">
                <PiggyBank className="h-8 w-8 text-khaki-700" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Recevez votre commission</h3>
              <p className="text-gray-600">
                Une fois le contrat signé, vous recevez une commission calculée sur la valeur du projet, payée dans les 30 jours suivant le premier règlement du client.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits section */}
      <section className="py-16 bg-stone-50 border-y border-stone-200">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                <h3 className="text-2xl font-semibold mb-6">Recommander quelqu'un</h3>
                
                <form className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium mb-4">Vos informations</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="referrerFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                          Votre prénom
                        </label>
                        <input
                          type="text"
                          id="referrerFirstName"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-khaki-500 focus:border-khaki-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="referrerLastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Votre nom
                        </label>
                        <input
                          type="text"
                          id="referrerLastName"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-khaki-500 focus:border-khaki-500"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label htmlFor="referrerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                        Votre email
                      </label>
                      <input
                        type="email"
                        id="referrerEmail"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-khaki-500 focus:border-khaki-500"
                      />
                    </div>
                    
                    <div className="mt-4">
                      <label htmlFor="referrerPhone" className="block text-sm font-medium text-gray-700 mb-1">
                        Votre téléphone
                      </label>
                      <input
                        type="tel"
                        id="referrerPhone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-khaki-500 focus:border-khaki-500"
                      />
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-lg font-medium mb-4">Informations de la personne recommandée</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="refereeFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                          Son prénom
                        </label>
                        <input
                          type="text"
                          id="refereeFirstName"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-khaki-500 focus:border-khaki-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="refereeLastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Son nom
                        </label>
                        <input
                          type="text"
                          id="refereeLastName"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-khaki-500 focus:border-khaki-500"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label htmlFor="refereeEmail" className="block text-sm font-medium text-gray-700 mb-1">
                        Son email
                      </label>
                      <input
                        type="email"
                        id="refereeEmail"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-khaki-500 focus:border-khaki-500"
                      />
                    </div>
                    
                    <div className="mt-4">
                      <label htmlFor="refereePhone" className="block text-sm font-medium text-gray-700 mb-1">
                        Son téléphone
                      </label>
                      <input
                        type="tel"
                        id="refereePhone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-khaki-500 focus:border-khaki-500"
                      />
                    </div>
                    
                    <div className="mt-4">
                      <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
                        Type de projet
                      </label>
                      <select
                        id="projectType"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-khaki-500 focus:border-khaki-500"
                      >
                        <option value="">Sélectionner un type de projet</option>
                        <option value="construction">Construction neuve</option>
                        <option value="renovation">Rénovation</option>
                        <option value="extension">Extension</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                    
                    <div className="mt-4">
                      <label htmlFor="projectLocation" className="block text-sm font-medium text-gray-700 mb-1">
                        Lieu du projet
                      </label>
                      <input
                        type="text"
                        id="projectLocation"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-khaki-500 focus:border-khaki-500"
                        placeholder="ex: Marseille, Nice, Toulon..."
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      id="consent"
                      type="checkbox"
                      className="h-4 w-4 text-khaki-600 focus:ring-khaki-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="consent" className="ml-2 block text-sm text-gray-600">
                      J'ai obtenu l'accord de la personne recommandée pour transmettre ses coordonnées.
                    </label>
                  </div>
                  
                  <Button className="w-full justify-center">
                    <Gift className="mr-2 h-4 w-4" />
                    Envoyer ma recommandation
                  </Button>
                </form>
              </div>
            </div>
            
            <div className="lg:order-1">
              <div className="bg-khaki-50 p-8 rounded-xl border border-khaki-100 mb-8">
                <h3 className="text-2xl font-semibold mb-4">Barème de commissionnement</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-khaki-100">
                        <th className="px-4 py-3 text-left text-gray-700">Montant du projet</th>
                        <th className="px-4 py-3 text-right text-gray-700">Commission</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-khaki-100">
                      <tr className="bg-white">
                        <td className="px-4 py-3">De 5 000€ à 20 000€</td>
                        <td className="px-4 py-3 text-right font-medium">1,5%</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-4 py-3">De 20 001€ à 50 000€</td>
                        <td className="px-4 py-3 text-right font-medium">2%</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-4 py-3">De 50 001€ à 100 000€</td>
                        <td className="px-4 py-3 text-right font-medium">2,5%</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-4 py-3">Plus de 100 000€</td>
                        <td className="px-4 py-3 text-right font-medium">3%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  * Commission versée après signature du contrat et premier règlement du client.
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl font-semibold mb-6">Pourquoi participer à notre programme ?</h2>
                <p className="text-gray-600 mb-6">
                  Notre programme d'apporteurs d'affaires vous permet de gagner des commissions attractives tout en rendant service à votre entourage.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                      <svg className="h-4 w-4 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Rémunération attractive</h3>
                      <p className="text-gray-600">Jusqu'à 3% du montant du projet, sans plafond.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                      <svg className="h-4 w-4 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Simplicité</h3>
                      <p className="text-gray-600">Processus simple et transparent, aucune paperasse complexe.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                      <svg className="h-4 w-4 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Suivi des recommandations</h3>
                      <p className="text-gray-600">Vous êtes informé à chaque étape du processus.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                      <svg className="h-4 w-4 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Service de qualité</h3>
                      <p className="text-gray-600">Vous recommandez un service de qualité à votre entourage.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ section */}
      <section className="py-16">
        <Container size="md">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Questions fréquentes</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Qui peut participer au programme de parrainage ?</h3>
              <p className="text-gray-600">
                Tout le monde peut participer ! Que vous soyez un particulier, un professionnel de l'immobilier ou un artisan, vous pouvez recommander nos services et recevoir une commission.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Quand la commission est-elle versée ?</h3>
              <p className="text-gray-600">
                La commission est versée dans les 30 jours suivant le premier règlement du client, après signature du contrat. Vous recevrez une notification dès que le paiement sera effectué.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Y a-t-il une limite au nombre de recommandations ?</h3>
              <p className="text-gray-600">
                Non, il n'y a aucune limite au nombre de personnes que vous pouvez recommander. Plus vous recommandez de personnes, plus vous pouvez augmenter vos gains.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Faut-il un contrat pour participer au programme ?</h3>
              <p className="text-gray-600">
                Pour les particuliers, aucun contrat n'est nécessaire. Pour les professionnels qui souhaitent devenir apporteurs d'affaires réguliers, nous proposons un contrat spécifique avec des conditions adaptées.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* SEO Footer with updated text */}
      <SEOFooter 
        text="Ingénieur, maître d'œuvre à Marseille et en PACA – Spécialiste en construction de maisons sur mesure, rénovation et extension. Participez à notre programme de parrainage et recevez une commission pour chaque nouveau client que vous nous recommandez en région Provence-Alpes-Côte d'Azur. Notre équipe intervient à Marseille, Nice, Toulon, Cannes et dans toute la région PACA."
      />
    </>
  );
};

export default Parrainage;
