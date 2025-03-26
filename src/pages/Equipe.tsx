
import React from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { Briefcase, Building, GraduationCap, Mail, Phone, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

const Equipe = () => {
  return (
    <>
      <Helmet>
        <title>Notre équipe | Progineer - Architecte & Maître d'œuvre en PACA</title>
        <meta name="description" content="Découvrez l'équipe de Progineer, experts en architecture et maîtrise d'œuvre pour vos projets de construction et rénovation en région PACA." />
        <meta name="keywords" content="équipe architecte, maître d'œuvre PACA, experts construction, ingénieurs bâtiment Marseille" />
      </Helmet>

      {/* Hero section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium dark:bg-khaki-800/30 dark:text-khaki-400">
              Notre équipe
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 dark:text-white">
              Une équipe de professionnels à votre service
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 dark:text-gray-300">
              Découvrez les experts qui rendront votre projet de construction, rénovation ou extension possible, de la conception à la réalisation.
            </p>
          </div>
        </Container>
      </section>

      {/* Team section */}
      <section className="py-16 dark:bg-gray-950">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Team Member - Marvin Bauwens */}
            <div className="flex flex-col gap-8 items-start bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow dark:bg-gray-900 dark:border-gray-800">
              <div className="w-full">
                <div className="rounded-xl overflow-hidden mb-6 aspect-square max-w-[240px] mx-auto">
                  <img 
                    src="/lovable-uploads/23fe2b30-1f84-472d-a3c8-d4c413ffbbc4.png" 
                    alt="Marvin Bauwens" 
                    className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold mb-1 dark:text-white">Marvin Bauwens</h2>
                  <p className="text-khaki-700 font-medium dark:text-khaki-400">PRÉSIDENT DIRECTEUR GÉNÉRAL</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-center">
                    <Mail className="h-5 w-5 text-khaki-700 mr-2 dark:text-khaki-400" />
                    <a href="mailto:m.bauwens@progineer.fr" className="text-gray-600 hover:text-khaki-700 dark:text-gray-400 dark:hover:text-khaki-400">
                      m.bauwens@progineer.fr
                    </a>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <Phone className="h-5 w-5 text-khaki-700 mr-2 dark:text-khaki-400" />
                    <a href="tel:+33783762156" className="text-gray-600 hover:text-khaki-700 dark:text-gray-400 dark:hover:text-khaki-400">
                      +33 7 83 76 21 56
                    </a>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <Linkedin className="h-5 w-5 text-khaki-700 mr-2 dark:text-khaki-400" />
                    <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-khaki-700 dark:text-gray-400 dark:hover:text-khaki-400">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="w-full space-y-6">
                <div className="flex items-start gap-2">
                  <GraduationCap className="h-5 w-5 text-khaki-700 mt-1 shrink-0 dark:text-khaki-400" />
                  <div>
                    <h3 className="text-lg font-medium mb-1 dark:text-white">Formation</h3>
                    <p className="text-gray-600 dark:text-gray-300">Master Génie Civil Architecture et Urbanisme</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Briefcase className="h-5 w-5 text-khaki-700 mt-1 shrink-0 dark:text-khaki-400" />
                  <div>
                    <h3 className="text-lg font-medium mb-1 dark:text-white">Expertise</h3>
                    <p className="text-gray-600 dark:text-gray-300">Maîtrise d'œuvre, Maîtrise d'ouvrage, Économiste</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Building className="h-5 w-5 text-khaki-700 mt-1 shrink-0 dark:text-khaki-400" />
                  <div>
                    <h3 className="text-lg font-medium mb-1 dark:text-white">Secteurs</h3>
                    <p className="text-gray-600 dark:text-gray-300">Tertiaire, Industrie, Résidentiel</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-1 dark:text-white">Compétences</h3>
                  <p className="text-gray-600 dark:text-gray-300">Tous corps d'état, Gros œuvre, Second œuvre, Charpente, CAO/DAO</p>
                </div>
              </div>
            </div>

            {/* Team Member - Mael Allano */}
            <div className="flex flex-col gap-8 items-start bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow dark:bg-gray-900 dark:border-gray-800">
              <div className="w-full">
                <div className="rounded-xl overflow-hidden mb-6 aspect-square max-w-[240px] mx-auto">
                  <img 
                    src="/lovable-uploads/3f77f084-4061-4e36-9f32-85cb08372b51.png" 
                    alt="Mael Allano" 
                    className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold mb-1 dark:text-white">Mael Allano</h2>
                  <p className="text-khaki-700 font-medium dark:text-khaki-400">DIRECTEUR GÉNÉRAL</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-center">
                    <Mail className="h-5 w-5 text-khaki-700 mr-2 dark:text-khaki-400" />
                    <a href="mailto:m.allano@progineer.fr" className="text-gray-600 hover:text-khaki-700 dark:text-gray-400 dark:hover:text-khaki-400">
                      m.allano@progineer.fr
                    </a>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <Phone className="h-5 w-5 text-khaki-700 mr-2 dark:text-khaki-400" />
                    <a href="tel:+33783762156" className="text-gray-600 hover:text-khaki-700 dark:text-gray-400 dark:hover:text-khaki-400">
                      +33 7 83 76 21 56
                    </a>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <Linkedin className="h-5 w-5 text-khaki-700 mr-2 dark:text-khaki-400" />
                    <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-khaki-700 dark:text-gray-400 dark:hover:text-khaki-400">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="w-full space-y-6">
                <div className="flex items-start gap-2">
                  <GraduationCap className="h-5 w-5 text-khaki-700 mt-1 shrink-0 dark:text-khaki-400" />
                  <div>
                    <h3 className="text-lg font-medium mb-1 dark:text-white">Formation</h3>
                    <p className="text-gray-600 dark:text-gray-300">Master Génie Civil Architecture et Urbanisme</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Briefcase className="h-5 w-5 text-khaki-700 mt-1 shrink-0 dark:text-khaki-400" />
                  <div>
                    <h3 className="text-lg font-medium mb-1 dark:text-white">Expertise</h3>
                    <p className="text-gray-600 dark:text-gray-300">Entreprise générale, Maîtrise d'œuvre, Contractant général</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Building className="h-5 w-5 text-khaki-700 mt-1 shrink-0 dark:text-khaki-400" />
                  <div>
                    <h3 className="text-lg font-medium mb-1 dark:text-white">Secteurs</h3>
                    <p className="text-gray-600 dark:text-gray-300">Tertiaire, Industrie, Résidentiel</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-1 dark:text-white">Compétences</h3>
                  <p className="text-gray-600 dark:text-gray-300">Conception architecturale, Ingénierie des structures, Gestion de projet</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Skills section */}
      <section className="py-16 bg-stone-50 border-t border-stone-200 dark:bg-gray-900 dark:border-gray-800">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 dark:text-white">Nos savoir-faire</h2>
            <p className="text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
              Progineer réunit des compétences variées pour vous offrir un accompagnement complet sur tous vos projets de construction et d'aménagement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              "Réglementation et démarches administratives",
              "Optimisation énergétique et environnementale",
              "Pilotage d'appels d'offres",
              "Conseil en aménagement urbain et territorial",
              "Assistance à la réception et livraison des travaux",
              "Planification et gestion budgétaire",
              "Études de marché et valorisation immobilière",
              "Expertise en rénovation et réhabilitation",
              "Accompagnement en design d'espace",
              "Conseil en montage financier et subventions"
            ].map((skill, index) => (
              <div 
                key={index} 
                className={cn(
                  "bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex items-center justify-center text-center h-full",
                  "dark:bg-gray-800 dark:border-gray-700"
                )}
              >
                <p className="text-gray-700 font-medium dark:text-gray-200">{skill}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* History section */}
      <section className="py-16 dark:bg-gray-950">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 dark:text-white">Notre histoire</h2>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-8 dark:bg-gray-900 dark:border-gray-800">
            <div className="max-w-3xl mx-auto space-y-6 text-gray-600 dark:text-gray-300">
              <p>
                Progineer est une entreprise d'architecture et de maîtrise d'œuvre travaillant sur des projets de construction, rénovation ou de modification du bâti existant. 
                Nous réalisons les études, le dépôt des autorisations administratives, l'appel d'offre et le suivi des travaux.
              </p>
              
              <p>
                Nous intervenons principalement à Marseille et ses alentours, nous sommes également présent sur toute de la côte d'azur 
                en passant par Saint Tropez, Toulon, Nice, Cannes, Fréjus.
              </p>
              
              <p>
                Progineer s'engage à mettre en œuvre des réalisations qui reflètent vos aspirations et vos besoins, 
                en alliant innovation, savoir-faire et respect des délais.
              </p>
            </div>
          </div>
          
          <div className="bg-khaki-50 p-8 rounded-xl shadow-sm border border-khaki-100 dark:bg-khaki-900/20 dark:border-khaki-800/30">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold mb-4 text-center dark:text-white">Progineer garantit :</h3>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-khaki-500 mr-2 mt-2"></span>
                  <span>Une écoute attentive, afin d'offrir un suivi personnalisé respectant au mieux vos besoins et votre budget.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-khaki-500 mr-2 mt-2"></span>
                  <span>Une communication transparente, pour assurer une coordination efficace entre vous et les entreprises partenaires de votre projet.</span>
                </li>
                <li className="mt-4">
                  <p>
                    Que vous soyez un particulier ou un professionnel, nous sommes à votre disposition pour vous accompagner dans la concrétisation de vos idées, 
                    afin d'obtenir un résultat à la hauteur de vos attentes.
                  </p>
                </li>
              </ul>
              
              <div className="mt-8 text-center">
                <Button href="/contact">Contactez-nous pour échanger sur votre projet</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SEO Footer */}
      <section className="py-8 bg-white border-t border-stone-200 dark:bg-gray-950 dark:border-gray-800">
        <Container>
          <div className="text-sm text-stone-500 dark:text-stone-400">
            <p>
              Ingénieur, maître d'œuvre à Marseille et en PACA – Spécialiste en construction de maisons sur mesure, rénovation et extension. Notre équipe d'architectes et d'ingénieurs vous accompagne de A à Z dans tous vos projets immobiliers en région Provence-Alpes-Côte d'Azur.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Equipe;
