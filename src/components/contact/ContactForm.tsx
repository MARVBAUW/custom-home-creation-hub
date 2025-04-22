
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import { Mail, Phone, AlertCircle, Check } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
};

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // En production, envoyer les données à une API
      console.log('Form data submitted:', data);
      
      // Simuler un délai de réponse du serveur
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Réinitialiser le formulaire et afficher le message de succès
      reset();
      setIsSubmitted(true);
      
      // Masquer le message de succès après 5 secondes
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
      <h3 className="text-2xl font-semibold mb-6">Nous contacter</h3>
      
      {/* Success Message */}
      {isSubmitted && (
        <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-md flex items-start">
          <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-green-800 font-medium">Message envoyé avec succès !</p>
            <p className="text-green-700 text-sm">Nous vous répondrons dans les plus brefs délais.</p>
          </div>
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-red-800 font-medium">Erreur</p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Nom */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nom complet <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-khaki-500 focus:border-transparent transition-colors ${
                errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Votre nom et prénom"
              aria-required="true"
              aria-invalid={errors.name ? "true" : "false"}
              {...register('name', { required: 'Ce champ est requis' })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Adresse email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-khaki-500 focus:border-transparent transition-colors ${
                errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="votre.email@exemple.com"
              aria-required="true"
              aria-invalid={errors.email ? "true" : "false"}
              {...register('email', { 
                required: 'Ce champ est requis',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Adresse email invalide'
                }
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          {/* Téléphone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <input
              id="phone"
              type="tel"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-khaki-500 focus:border-transparent transition-colors ${
                errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="06 12 34 56 78"
              aria-invalid={errors.phone ? "true" : "false"}
              {...register('phone')}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
          
          {/* Sujet */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Sujet <span className="text-red-500">*</span>
            </label>
            <select
              id="subject"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-khaki-500 focus:border-transparent transition-colors ${
                errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              aria-required="true"
              aria-invalid={errors.subject ? "true" : "false"}
              {...register('subject', { required: 'Ce champ est requis' })}
            >
              <option value="">Sélectionnez un sujet</option>
              <option value="devis">Demande de devis</option>
              <option value="information">Renseignements</option>
              <option value="rendez-vous">Prise de rendez-vous</option>
              <option value="autre">Autre demande</option>
            </select>
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
            )}
          </div>
        </div>
        
        {/* Message */}
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-khaki-500 focus:border-transparent transition-colors ${
              errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Décrivez votre projet ou votre demande..."
            aria-required="true"
            aria-invalid={errors.message ? "true" : "false"}
            {...register('message', { required: 'Ce champ est requis' })}
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>
        
        {/* Consentement */}
        <div className="mb-8">
          <div className="flex items-start">
            <input
              id="consent"
              type="checkbox"
              className={`h-5 w-5 rounded border-gray-300 text-khaki-600 focus:ring-khaki-500 mr-2 mt-0.5 ${
                errors.consent ? 'border-red-300' : ''
              }`}
              aria-required="true"
              aria-invalid={errors.consent ? "true" : "false"}
              {...register('consent', { required: 'Vous devez accepter la politique de confidentialité' })}
            />
            <label htmlFor="consent" className="text-sm text-gray-700">
              J'accepte que mes données soient traitées conformément à la <a href="/privacy-policy" className="text-khaki-600 hover:underline">politique de confidentialité</a> de Progineer. <span className="text-red-500">*</span>
            </label>
          </div>
          {errors.consent && (
            <p className="mt-1 text-sm text-red-600">{errors.consent.message}</p>
          )}
        </div>
        
        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            className="w-full justify-center bg-khaki-700 hover:bg-khaki-800 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi en cours...
              </>
            ) : (
              'Envoyer ma demande'
            )}
          </Button>
        </div>
      </form>
      
      {/* Alternative Contact Methods */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-lg font-medium mb-4">Autres moyens de nous contacter</h4>
        <div className="space-y-4">
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-khaki-600 mr-3" />
            <a href="tel:+33783762156" className="text-gray-700 hover:text-khaki-600 transition-colors">
              +33 7 83 76 21 56
            </a>
          </div>
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-khaki-600 mr-3" />
            <a href="mailto:progineer.moe@gmail.com" className="text-gray-700 hover:text-khaki-600 transition-colors">
              progineer.moe@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
