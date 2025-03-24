
import React from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { Users, Handshake, Globe, Building2 } from 'lucide-react';

const Partenaires = () => {
  return (
    <>
      <Helmet>
        <title>Devenir partenaire | Progineer - Architecte & Maître d'œuvre en PACA</title>
        <meta name="description" content="Devenez partenaire de Progineer, architecte et maître d'œuvre en région PACA. Opportunités pour artisans, professionnels du BTP et agents commerciaux." />
        <meta name="keywords" content="partenaire architecte, artisans BTP PACA, réseau professionnels construction, collaboration maître d'œuvre" />
      </Helmet>

      {/* Hero section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Partenaires
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Devenez partenaire Progineer
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Rejoignez notre réseau de professionnels du bâtiment et bénéficiez 
              d'opportunités de collaboration sur des projets en région PACA.
            </p>
          </div>
        </Container>
      </section>

      {/* Benefits section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">
              Pourquoi devenir partenaire ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              En rejoignant notre réseau, vous bénéficiez de nombreux avantages pour développer votre activité.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-khaki-100 flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-khaki-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Projets de qualité</h3>
              <p className="text-gray-600">
                Accédez à des projets sérieux et bien préparés, avec des clients accompagnés par notre équipe.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-khaki-100 flex items-center justify-center mb-4">
                <Handshake className="h-6 w-6 text-khaki-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Collaboration simplifiée</h3>
              <p className="text-gray-600">
                Bénéficiez d'une coordination efficace et d'une communication fluide avec tous les intervenants.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-khaki-100 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-khaki-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visibilité accrue</h3>
              <p className="text-gray-600">
                Gagnez en visibilité grâce à notre plateforme et nos recommandations auprès de nos clients.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-khaki-100 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-khaki-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Réseau professionnel</h3>
              <p className="text-gray-600">
                Intégrez un réseau de professionnels qualifiés et développez de nouvelles opportunités d'affaires.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Who Can Apply section */}
      <section className="py-16 bg-stone-50 border-y border-stone-200">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold mb-6">Qui peut devenir partenaire ?</h2>
              <p className="text-gray-600 mb-8">
                Nous recherchons des professionnels qualifiés et passionnés pour compléter notre réseau et offrir un service d'excellence à nos clients.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-2">Artisans et entreprises du BTP</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                        <svg className="h-3 w-3 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600">Maçons, charpentiers, plombiers, électriciens</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                        <svg className="h-3 w-3 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600">Entreprises de gros œuvre et second œuvre</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                        <svg className="h-3 w-3 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600">Peintres, carreleurs, menuisiers</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-2">Professionnels du secteur immobilier</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                        <svg className="h-3 w-3 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600">Agents immobiliers</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                        <svg className="h-3 w-3 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600">Courtiers en prêt immobilier</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                        <svg className="h-3 w-3 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600">Promoteurs immobiliers</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-2">Autres professionnels</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                        <svg className="h-3 w-3 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600">Architectes d'intérieur</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                        <svg className="h-3 w-3 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600">Paysagistes</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-khaki-100 flex items-center justify-center mt-1 mr-3">
                        <svg className="h-3 w-3 text-khaki-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600">Bureaux d'études techniques</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
              <h3 className="text-2xl font-semibold mb-6">Formulaire de contact partenaire</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-khaki-500 focus:border-khaki-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-khaki-500 focus:border-khaki-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-khaki-500 focus:border-khaki-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="activity" className="block text-sm font-medium text-gray-700 mb-1">
                    Activité
                  </label>
                  <select
                    id="activity"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-khaki-500 focus:border-khaki-500"
                  >
                    <option value="">Sélectionnez votre activité</option>
                    <option value="artisan">Artisan</option>
                    <option value="entreprise">Entreprise du BTP</option>
                    <option value="immobilier">Professionnel de l'immobilier</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-khaki-500 focus:border-khaki-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-khaki-500 focus:border-khaki-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Présentez-vous et votre activité
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-khaki-500 focus:border-khaki-500"
                    placeholder="Parlez-nous de votre expérience, vos compétences et vos motivations pour rejoindre notre réseau."
                  ></textarea>
                </div>
                
                <div className="flex items-start">
                  <input
                    id="privacy"
                    type="checkbox"
                    className="h-4 w-4 text-khaki-600 focus:ring-khaki-500 border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="privacy" className="ml-2 block text-sm text-gray-600">
                    J'accepte que mes données personnelles soient traitées conformément à la politique de confidentialité.
                  </label>
                </div>
                
                <Button className="w-full justify-center">Envoyer ma candidature</Button>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* How it works section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">
              Comment ça fonctionne ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Le processus de partenariat avec Progineer est simple et transparent.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-khaki-600 text-white flex items-center justify-center font-semibold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Candidature</h3>
              <p className="text-gray-600">
                Remplissez le formulaire de contact pour nous faire part de votre intérêt.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-khaki-600 text-white flex items-center justify-center font-semibold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Échange</h3>
              <p className="text-gray-600">
                Nous vous contactons pour discuter de votre activité et de nos attentes mutuelles.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-khaki-600 text-white flex items-center justify-center font-semibold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Convention</h3>
              <p className="text-gray-600">
                Signature d'une convention de partenariat définissant les modalités de collaboration.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-khaki-600 text-white flex items-center justify-center font-semibold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Collaboration</h3>
              <p className="text-gray-600">
                Intégration à notre réseau et début des collaborations sur nos projets.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* SEO Footer */}
      <section className="py-8 bg-stone-50 border-t border-stone-200">
        <Container>
          <div className="text-sm text-stone-500">
            <p>
              Ingénieur, maître d'œuvre à Marseille et en PACA – Spécialiste en construction de maisons sur mesure, rénovation et extension. Rejoignez notre réseau de partenaires artisans et professionnels du bâtiment pour collaborer sur des projets de qualité dans la région Provence-Alpes-Côte d'Azur.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Partenaires;
