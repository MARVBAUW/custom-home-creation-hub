
import React from 'react';
import Container from '@/components/common/Container';

const ClienteleSection = () => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-semibold mb-8 text-center text-khaki-800">Nos services par clientèle</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Pour les particuliers */}
        <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold mb-6 text-center text-khaki-800">Pour les particuliers</h3>
          <ul className="space-y-3">
            <li className="flex items-start p-3 bg-khaki-50 rounded-md">
              <span className="mr-2 text-khaki-600 font-bold">•</span>
              <span className="text-gray-700">Construction de maisons individuelles sur mesure</span>
            </li>
            <li className="flex items-start p-3 bg-khaki-50 rounded-md">
              <span className="mr-2 text-khaki-600 font-bold">•</span>
              <span className="text-gray-700">Rénovation et extension</span>
            </li>
            <li className="flex items-start p-3 bg-khaki-50 rounded-md">
              <span className="mr-2 text-khaki-600 font-bold">•</span>
              <span className="text-gray-700">Aménagement et design d'espace</span>
            </li>
            <li className="flex items-start p-3 bg-khaki-50 rounded-md">
              <span className="mr-2 text-khaki-600 font-bold">•</span>
              <span className="text-gray-700">Audit et diagnostic</span>
            </li>
            <li className="flex items-start p-3 bg-khaki-50 rounded-md">
              <span className="mr-2 text-khaki-600 font-bold">•</span>
              <span className="text-gray-700">Accompagnement administratif et technique</span>
            </li>
          </ul>
        </div>

        {/* Pour les professionnels */}
        <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold mb-6 text-center text-khaki-800">Pour les professionnels</h3>
          <ul className="space-y-3">
            <li className="flex items-start p-3 bg-khaki-50 rounded-md">
              <span className="mr-2 text-khaki-600 font-bold">•</span>
              <span className="text-gray-700">Construction ou aménagement de bureaux, commerces, hôtels</span>
            </li>
            <li className="flex items-start p-3 bg-khaki-50 rounded-md">
              <span className="mr-2 text-khaki-600 font-bold">•</span>
              <span className="text-gray-700">Accompagnement des marchands de biens et investisseurs</span>
            </li>
            <li className="flex items-start p-3 bg-khaki-50 rounded-md">
              <span className="mr-2 text-khaki-600 font-bold">•</span>
              <span className="text-gray-700">Solutions environnementales et énergétiques</span>
            </li>
            <li className="flex items-start p-3 bg-khaki-50 rounded-md">
              <span className="mr-2 text-khaki-600 font-bold">•</span>
              <span className="text-gray-700">Diagnostics techniques</span>
            </li>
            <li className="flex items-start p-3 bg-khaki-50 rounded-md">
              <span className="mr-2 text-khaki-600 font-bold">•</span>
              <span className="text-gray-700">Dossiers de subvention</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClienteleSection;
