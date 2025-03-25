
import React from 'react';
import Button from '@/components/common/Button';

const PartnerContactForm = () => {
  return (
    <>
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
    </>
  );
};

export default PartnerContactForm;
