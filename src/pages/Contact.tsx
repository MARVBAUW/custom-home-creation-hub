
import React from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact | Progineer - Architecte & Maître d'œuvre en PACA</title>
        <meta name="description" content="Contactez Progineer, votre architecte et maître d'œuvre pour vos projets de construction, rénovation et extension en région PACA." />
        <meta name="keywords" content="contact architecte Marseille, contact maître d'œuvre PACA, devis travaux, rendez-vous architecte" />
      </Helmet>

      {/* Hero section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Contact
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Parlons de votre projet
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
              et vous accompagner dans la réalisation de votre projet.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact content */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Nos coordonnées</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-khaki-100 flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-khaki-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Téléphone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+33783762156" className="hover:text-khaki-700">+33 7 83 76 21 56</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-khaki-100 flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-khaki-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:progineer.moe@gmail.com" className="hover:text-khaki-700">progineer.moe@gmail.com</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-khaki-100 flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5 text-khaki-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Zones d'intervention</h3>
                    <p className="text-gray-600">
                      Marseille, Saint-Tropez, Toulon, Nice, Cannes, Fréjus<br />
                      Toute la région Provence-Alpes-Côte d'Azur
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-khaki-100 flex items-center justify-center mr-4">
                    <Clock className="h-5 w-5 text-khaki-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Horaires</h3>
                    <p className="text-gray-600">
                      Lundi - Vendredi : 9h00 - 18h00<br />
                      Samedi : Sur rendez-vous
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-6">Nos services</h2>
                <ul className="space-y-2 text-gray-600">
                  <li>• Construction sur mesure</li>
                  <li>• Rénovation énergétique</li>
                  <li>• Extension & agrandissement</li>
                  <li>• Optimisation d'espace</li>
                  <li>• Design d'espace</li>
                  <li>• Montage administratif & réglementaire</li>
                </ul>
                
                <div className="mt-8">
                  <Button href="/estimation">Estimer mon projet</Button>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
              
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
                  <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
                    Type de projet
                  </label>
                  <select
                    id="projectType"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-khaki-500 focus:border-khaki-500"
                  >
                    <option value="">Sélectionnez un type de projet</option>
                    <option value="construction">Construction neuve</option>
                    <option value="renovation">Rénovation</option>
                    <option value="extension">Extension</option>
                    <option value="design">Design d'espace</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-khaki-500 focus:border-khaki-500"
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
                
                <Button className="w-full justify-center">
                  <Send className="mr-2 h-4 w-4" />
                  Envoyer
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* Map Placeholder Section */}
      <section className="py-16 bg-stone-50 border-t border-stone-200">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Nos zones d'intervention</h2>
            <p className="text-gray-600">
              Nous intervenons dans toute la région Provence-Alpes-Côte d'Azur
            </p>
          </div>
          
          <div className="h-[400px] bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500">Carte des zones d'intervention à venir</p>
            </div>
          </div>
        </Container>
      </section>

      {/* SEO Footer */}
      <section className="py-8 bg-white border-t border-stone-200">
        <Container>
          <div className="text-sm text-stone-500">
            <p>
              Ingénieur, maître d'œuvre à Marseille et en PACA – Spécialiste en construction de maisons sur mesure, rénovation et extension. Contactez nos architectes et ingénieurs pour votre projet dans la région Provence-Alpes-Côte d'Azur.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Contact;
