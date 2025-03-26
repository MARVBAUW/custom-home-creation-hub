
import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Button from '@/components/common/Button';

const ContactInfo = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Nos coordonnées</h2>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-progineer-gold/10 flex items-center justify-center mr-4">
            <Phone className="h-5 w-5 text-progineer-gold" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-1">Téléphone</h3>
            <p className="text-gray-600 dark:text-gray-300">
              <a href="tel:+33783762156" className="hover:text-progineer-gold">+33 7 83 76 21 56 (Marvin)</a>
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <a href="tel:+33611498716" className="hover:text-progineer-gold">+33 6 11 49 87 16 (Mael)</a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-progineer-gold/10 flex items-center justify-center mr-4">
            <Mail className="h-5 w-5 text-progineer-gold" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-1">Email</h3>
            <p className="text-gray-600 dark:text-gray-300">
              <a href="mailto:progineer.moe@gmail.com" className="hover:text-progineer-gold">progineer.moe@gmail.com</a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-progineer-gold/10 flex items-center justify-center mr-4">
            <MapPin className="h-5 w-5 text-progineer-gold" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-1">Zones d'intervention</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Marseille, Saint-Tropez, Toulon, Nice, Cannes, Fréjus<br />
              Toute la région Provence-Alpes-Côte d'Azur
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-progineer-gold/10 flex items-center justify-center mr-4">
            <Clock className="h-5 w-5 text-progineer-gold" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-1">Horaires</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Lundi - Vendredi : 9h00 - 18h00<br />
              Samedi : Sur rendez-vous
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-6">Nos services</h2>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          <li>• Construction sur mesure</li>
          <li>• Rénovation énergétique</li>
          <li>• Extension & agrandissement</li>
          <li>• Optimisation d'espace</li>
          <li>• Design d'espace</li>
          <li>• Montage administratif & réglementaire</li>
        </ul>
        
        <div className="mt-8">
          <Button href="/estimation" className="bg-progineer-gold hover:bg-progineer-gold/90 text-white">
            Estimer mon projet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
