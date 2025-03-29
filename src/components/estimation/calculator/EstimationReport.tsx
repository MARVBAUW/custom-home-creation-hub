
import React, { useState } from 'react';
import { 
  PieChart as PieChartIcon, 
  FileText, 
  Download, 
  Printer, 
  ChevronDown, 
  ChevronUp,
  CircleDollarSign,
  BarChart3,
  Building,
  Layers
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { FormData } from './types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// Interface pour les montants par corps d'état
interface CorpsEtatDetail {
  montantHT: number;
  details: string[];
}

// Interface pour le rapport détaillé
interface DetailedEstimation {
  totalHT: number;
  totalTTC: number;
  vat: number;
  corpsEtat: {
    [key: string]: CorpsEtatDetail;
  };
  honorairesHT: number;
  honorairesTTC: number;
  taxeAmenagement: number;
  garantieDecennale: number;
  etudesGeotechniques: number;
  etudeThermique: number;
  coutGlobalHT: number;
  coutGlobalTTC: number;
  terrainPrice?: number;
  coutTotalAvecTerrain?: number;
}

interface EstimationReportProps {
  estimation: DetailedEstimation;
  formData: FormData;
  includeTerrainPrice: boolean;
}

// Couleurs pour le graphique
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'];

const EstimationReport: React.FC<EstimationReportProps> = ({ estimation, formData, includeTerrainPrice }) => {
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    travaux: true,
    honoraires: false,
    taxes: false,
    etudes: false,
    global: false
  });

  // Fonction pour formater les montants
  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(montant);
  };

  // Fonction pour basculer l'état d'expansion d'une section
  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // Préparation des données pour le graphique en camembert
  const preparePieChartData = () => {
    const pieData = Object.entries(estimation.corpsEtat).map(([name, data]) => ({
      name,
      value: data.montantHT
    }));
    
    // Ajouter les autres coûts
    pieData.push({ name: "Honoraires", value: estimation.honorairesHT });
    pieData.push({ name: "Taxes", value: estimation.taxeAmenagement });
    pieData.push({ name: "Études & Garanties", value: estimation.etudesGeotechniques + estimation.etudeThermique + estimation.garantieDecennale });
    
    return pieData;
  };

  // Préparation des données pour le graphique en barres
  const prepareBarChartData = () => {
    return Object.entries(estimation.corpsEtat).map(([name, data]) => ({
      name,
      montant: data.montantHT
    }));
  };

  // Répartition globale des coûts
  const globalRepartition = () => {
    const travaux = estimation.totalHT;
    const honoraires = estimation.honorairesHT;
    const taxes = estimation.taxeAmenagement;
    const etudes = estimation.etudesGeotechniques + estimation.etudeThermique;
    const garanties = estimation.garantieDecennale;
    const terrain = includeTerrainPrice && formData.landPrice ? parseInt(formData.landPrice as string) : 0;
    
    return [
      { name: "Travaux", value: travaux },
      { name: "Honoraires", value: honoraires },
      { name: "Taxes", value: taxes },
      { name: "Études", value: etudes },
      { name: "Garanties", value: garanties },
      ...(terrain > 0 ? [{ name: "Terrain", value: terrain }] : [])
    ];
  };

  // Fonction pour imprimer le rapport
  const handlePrint = () => {
    window.print();
  };

  // Fonction pour télécharger le rapport (simulation)
  const handleDownload = () => {
    alert("La fonctionnalité de téléchargement sera disponible prochainement.");
  };

  return (
    <div className="space-y-4 print:p-4">
      <div className="flex justify-between items-center mb-4 print:hidden">
        <h2 className="text-lg font-bold flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-600" />
          Rapport d'estimation détaillée
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-1" />
            Imprimer
          </Button>
          <Button size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-1" />
            Télécharger
          </Button>
        </div>
      </div>

      {/* En-tête du rapport pour l'impression */}
      <div className="hidden print:block mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Estimation détaillée de projet</h1>
            <p className="text-gray-600">Progineer - Maître d'œuvre en PACA</p>
          </div>
          <div className="text-right">
            <p className="font-medium">Date: {new Date().toLocaleDateString('fr-FR')}</p>
            <p>{formData.email}</p>
            {formData.phone && <p>{formData.phone}</p>}
          </div>
        </div>
        <div className="mt-4 p-3 bg-gray-100 rounded-md">
          <h2 className="font-medium">Résumé du projet</h2>
          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
            <div>Type de projet: {formData.projectType}</div>
            <div>Surface: {formData.surface} m²</div>
            <div>Ville: {formData.city}</div>
            <div>Niveaux: {formData.levels}</div>
          </div>
        </div>
      </div>

      {/* Récapitulatif global */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <CircleDollarSign className="h-5 w-5 mr-2 text-blue-600" />
            Montant global estimé
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Coût des travaux HT</p>
              <p className="text-xl font-bold">{formatMontant(estimation.totalHT)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Coût des travaux TTC</p>
              <p className="text-xl font-bold">{formatMontant(estimation.totalTTC)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Coût global HT (avec frais)</p>
              <p className="text-xl font-bold">{formatMontant(estimation.coutGlobalHT)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Coût global TTC (avec frais)</p>
              <p className="text-xl font-bold">{formatMontant(estimation.coutGlobalTTC)}</p>
            </div>
            {includeTerrainPrice && formData.landPrice && (
              <>
                <div className="col-span-2 border-t pt-2 mt-2">
                  <p className="text-sm text-gray-500">Coût total avec terrain</p>
                  <p className="text-xl font-bold">{formatMontant(estimation.coutGlobalTTC + parseInt(formData.landPrice as string))}</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Visualisation de la répartition des coûts */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <PieChartIcon className="h-5 w-5 mr-2 text-blue-600" />
            Répartition des coûts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={globalRepartition()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {globalRepartition().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatMontant(value as number)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Détail par corps d'état */}
      <Collapsible
        open={expandedSections.travaux}
        onOpenChange={() => toggleSection('travaux')}
        className="border rounded-md overflow-hidden"
      >
        <CollapsibleTrigger className="flex w-full justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex items-center">
            <Building className="h-5 w-5 mr-2 text-blue-600" />
            <h3 className="font-medium">Détail par corps d'état</h3>
          </div>
          {expandedSections.travaux ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <div className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={prepareBarChartData()}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(value) => `${value} €`} />
                  <YAxis type="category" dataKey="name" width={120} />
                  <Tooltip formatter={(value) => formatMontant(value as number)} />
                  <Bar dataKey="montant" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3 mt-4">
              {Object.entries(estimation.corpsEtat).map(([name, data]) => (
                <div key={name} className="border p-3 rounded-md bg-gray-50">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{name}</h4>
                    <span className="font-bold">{formatMontant(data.montantHT)}</span>
                  </div>
                  {data.details.length > 0 && (
                    <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
                      {data.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Honoraires de maîtrise d'œuvre */}
      <Collapsible
        open={expandedSections.honoraires}
        onOpenChange={() => toggleSection('honoraires')}
        className="border rounded-md overflow-hidden"
      >
        <CollapsibleTrigger className="flex w-full justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex items-center">
            <Layers className="h-5 w-5 mr-2 text-blue-600" />
            <h3 className="font-medium">Honoraires de maîtrise d'œuvre</h3>
          </div>
          {expandedSections.honoraires ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border p-3 rounded-md">
                <h4 className="text-sm text-gray-500">Honoraires HT</h4>
                <p className="text-lg font-bold">{formatMontant(estimation.honorairesHT)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Calculés selon le barème Progineer, variable en fonction du montant des travaux et de la complexité du projet.
                </p>
              </div>
              <div className="border p-3 rounded-md">
                <h4 className="text-sm text-gray-500">Honoraires TTC</h4>
                <p className="text-lg font-bold">{formatMontant(estimation.honorairesTTC)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  TVA appliquée au taux de 20%.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium">Les honoraires comprennent :</h4>
              <ul className="mt-2 text-sm space-y-1">
                <li>• Études préliminaires et conception</li>
                <li>• Plans d'exécution et détails techniques</li>
                <li>• Consultation des entreprises</li>
                <li>• Direction et suivi des travaux</li>
                <li>• Assistance aux opérations de réception</li>
              </ul>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Taxes et frais réglementaires */}
      <Collapsible
        open={expandedSections.taxes}
        onOpenChange={() => toggleSection('taxes')}
        className="border rounded-md overflow-hidden"
      >
        <CollapsibleTrigger className="flex w-full justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
            <h3 className="font-medium">Taxes et garanties</h3>
          </div>
          {expandedSections.taxes ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border p-3 rounded-md">
                <h4 className="text-sm text-gray-500">Taxe d'aménagement</h4>
                <p className="text-lg font-bold">{formatMontant(estimation.taxeAmenagement)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Calculée sur la base de la surface construite et du taux en vigueur dans la commune de {formData.city}.
                </p>
              </div>
              <div className="border p-3 rounded-md">
                <h4 className="text-sm text-gray-500">Garantie décennale</h4>
                <p className="text-lg font-bold">{formatMontant(estimation.garantieDecennale)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Assurance obligatoire calculée en fonction du montant des travaux.
                </p>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Études techniques */}
      <Collapsible
        open={expandedSections.etudes}
        onOpenChange={() => toggleSection('etudes')}
        className="border rounded-md overflow-hidden"
      >
        <CollapsibleTrigger className="flex w-full justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            <h3 className="font-medium">Études techniques</h3>
          </div>
          {expandedSections.etudes ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border p-3 rounded-md">
                <h4 className="text-sm text-gray-500">Études géotechniques</h4>
                <p className="text-lg font-bold">{formatMontant(estimation.etudesGeotechniques)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Inclut les études jusqu'au niveau G2 PRO, nécessaires pour la conception des fondations.
                </p>
              </div>
              <div className="border p-3 rounded-md">
                <h4 className="text-sm text-gray-500">Étude thermique</h4>
                <p className="text-lg font-bold">{formatMontant(estimation.etudeThermique)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Étude réglementaire pour assurer la conformité aux normes énergétiques en vigueur.
                </p>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="text-xs text-gray-500 mt-4 print:mt-8">
        <p>Cette estimation est fournie à titre indicatif sur la base des informations communiquées.</p>
        <p>Les coûts définitifs peuvent varier en fonction des choix de matériaux, des contraintes du site et des entreprises.</p>
        <p className="mt-2">Pour une estimation plus précise, contactez Progineer au 04 XX XX XX XX ou par email à contact@progineer.fr</p>
      </div>
    </div>
  );
};

export default EstimationReport;
