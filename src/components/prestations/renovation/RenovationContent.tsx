
import React from 'react';
import RenovationProcess from './RenovationProcess';
import Button from '@/components/common/Button';

const RenovationContent = () => {
  return (
    <>
      <h2 className="text-3xl font-semibold mb-6">Notre approche de la rénovation</h2>
      <p className="mb-8 text-gray-700">
        Chez Progineer, nous concevons des <strong>rénovations complètes personnalisées</strong> qui transforment votre habitat tout en respectant son caractère et son histoire. Notre accompagnement s'étend de l'état des lieux initial jusqu'à la livraison finale, avec une attention particulière au respect de votre budget et des délais.
      </p>

      <div className="mb-12">
        <img 
          src="https://images.unsplash.com/photo-1574739782594-db4ead022697?q=80&w=2070&auto=format&fit=crop" 
          alt="Exemple de rénovation complète réalisée par Progineer en PACA"
          className="w-full h-auto rounded-xl mb-4"
        />
        <p className="text-sm text-gray-500 text-center">Rénovation d'un appartement haussmannien à Marseille</p>
      </div>

      <RenovationProcess />

      <h3 className="text-2xl font-medium mb-4">Nos spécialités en rénovation</h3>
      <p className="mb-6 text-gray-700">
        Notre expertise couvre tous les aspects de la rénovation, des projets simples aux transformations complètes :
      </p>

      <div className="bg-gray-50 p-6 rounded-lg mb-10">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">•</span>
            <span>Rénovation d'appartements anciens</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">•</span>
            <span>Réhabilitation de maisons de caractère</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">•</span>
            <span>Rénovation énergétique complète</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">•</span>
            <span>Reconfiguration des espaces de vie</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">•</span>
            <span>Mise aux normes d'accessibilité</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">•</span>
            <span>Modernisation des installations techniques</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">•</span>
            <span>Transformation de locaux professionnels</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">•</span>
            <span>Adaptation PMR (Personnes à Mobilité Réduite)</span>
          </li>
        </ul>
      </div>

      <h3 className="text-2xl font-medium mb-4">Témoignages de clients</h3>
      <div className="mb-12 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-khaki-100 rounded-full flex items-center justify-center text-khaki-800 font-bold mr-4">
            MC
          </div>
          <div>
            <p className="font-medium">Marie & Claude</p>
            <p className="text-sm text-gray-500">Appartement à Aix-en-Provence</p>
          </div>
        </div>
        <p className="italic text-gray-700 mb-4">
          "Notre appartement du centre-ville avait besoin d'un sérieux rafraîchissement. L'équipe de Progineer a transformé notre espace vieillissant en un havre de paix moderne tout en conservant les éléments de caractère. Le résultat dépasse toutes nos attentes !"
        </p>
      </div>

      <div className="bg-khaki-50 p-6 rounded-lg">
        <h3 className="text-2xl font-medium mb-4">Vous avez un projet de rénovation ?</h3>
        <p className="mb-6">
          Contactez-nous pour un premier échange sans engagement. Nous serons ravis d'étudier votre projet et de vous proposer des solutions adaptées à vos besoins et à votre budget.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/estimation" className="bg-khaki-700 hover:bg-khaki-800 text-white">
            Estimer mon projet
          </Button>
          <Button href="/contact" variant="outline" className="border-khaki-300 hover:bg-khaki-50">
            Prendre rendez-vous
          </Button>
        </div>
      </div>
    </>
  );
};

export default RenovationContent;
