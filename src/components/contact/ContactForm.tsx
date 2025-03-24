
import React from 'react';
import { Send } from 'lucide-react';
import Button from '@/components/common/Button';

const ContactForm = () => {
  return (
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-progineer-gold focus:border-progineer-gold"
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-progineer-gold focus:border-progineer-gold"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-progineer-gold focus:border-progineer-gold"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-progineer-gold focus:border-progineer-gold"
          />
        </div>
        
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
            Type de projet
          </label>
          <select
            id="projectType"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-progineer-gold focus:border-progineer-gold"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-progineer-gold focus:border-progineer-gold"
          ></textarea>
        </div>
        
        <div className="flex items-start">
          <input
            id="privacy"
            type="checkbox"
            className="h-4 w-4 text-progineer-gold focus:ring-progineer-gold border-gray-300 rounded mt-1"
          />
          <label htmlFor="privacy" className="ml-2 block text-sm text-gray-600">
            J'accepte que mes données personnelles soient traitées conformément à la politique de confidentialité.
          </label>
        </div>
        
        <Button className="w-full justify-center bg-progineer-gold hover:bg-progineer-gold/90 text-white">
          <Send className="mr-2 h-4 w-4" />
          Envoyer
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
