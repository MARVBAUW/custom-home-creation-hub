
import React from 'react';
import { Simulation } from './SimulationTypes';
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SimulationContentProps {
  simulation: Simulation;
  onContentChange: (newContent: any) => void;
}

const SimulationContent: React.FC<SimulationContentProps> = ({ 
  simulation, 
  onContentChange 
}) => {
  const renderSimulationType = () => {
    switch (simulation.type) {
      case 'surface':
        return renderSurfaceSimulation();
      case 'frais-notaire':
        return renderFraisNotaireSimulation();
      case 'capacite-emprunt':
        return renderCapaciteEmpruntSimulation();
      case 'rentability':
        return renderRentabilitySimulation();
      case 'note':
        return renderNoteSimulation();
      default:
        return renderGenericSimulation();
    }
  };

  const renderSurfaceSimulation = () => {
    const data = simulation.content?.data || {};
    const results = simulation.content?.results || {};
    const rooms = data.rooms || [];

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Détails du calcul</h3>
          <p>Projet: {data.projectName || 'Non spécifié'}</p>
        </div>

        <div>
          <h4 className="font-medium">Liste des pièces</h4>
          <div className="mt-2 border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pièce</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Longueur (m)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Largeur (m)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Surface (m²)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rooms.map((room: any, index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{room.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{room.length}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{room.width}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{(room.length * room.width).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-md">
          <h4 className="font-medium mb-2">Résultats</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Surface habitable totale:</span>
              <span className="font-semibold">{results.totalSurfaceHabitable?.toFixed(2) || '0.00'} m²</span>
            </div>
            <div className="flex justify-between">
              <span>Surface hors œuvre brute (SHOB):</span>
              <span>{results.surfaceShob?.toFixed(2) || '0.00'} m²</span>
            </div>
            <div className="flex justify-between">
              <span>Surface hors œuvre nette (SHON):</span>
              <span>{results.surfaceShon?.toFixed(2) || '0.00'} m²</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderFraisNotaireSimulation = () => {
    const data = simulation.content?.data || {};
    const results = simulation.content?.results || {};

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Détails du calcul</h3>
          <p>Projet: {data.projectName || 'Non spécifié'}</p>
          <p>Prix du bien: {data.propertyValue?.toLocaleString('fr-FR') || '0'} €</p>
          <p>Type de bien: {data.propertyType === 'ancien' ? 'Bien ancien' : 'Bien neuf'}</p>
        </div>

        <div className="bg-slate-50 p-4 rounded-md">
          <h4 className="font-medium mb-2">Résultats</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Taxes départementales:</span>
              <span>{results.departmentTax?.toLocaleString('fr-FR') || '0'} €</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes communales:</span>
              <span>{results.communeTax?.toLocaleString('fr-FR') || '0'} €</span>
            </div>
            <div className="flex justify-between">
              <span>Émoluments du notaire:</span>
              <span>{results.notaryFee?.toLocaleString('fr-FR') || '0'} €</span>
            </div>
            <div className="flex justify-between">
              <span>TVA sur émoluments:</span>
              <span>{results.vatOnFees?.toLocaleString('fr-FR') || '0'} €</span>
            </div>
            <div className="flex justify-between">
              <span>Frais divers:</span>
              <span>{results.fixedCosts?.toLocaleString('fr-FR') || '0'} €</span>
            </div>
            <div className="h-px bg-gray-300 my-2"></div>
            <div className="flex justify-between font-semibold">
              <span>Total des frais de notaire:</span>
              <span>{results.totalCosts?.toLocaleString('fr-FR') || '0'} €</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Pourcentage du prix d'achat:</span>
              <span>{results.totalCosts && results.propertyValue 
                ? ((results.totalCosts / results.propertyValue) * 100).toFixed(2) 
                : '0.00'}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderCapaciteEmpruntSimulation = () => {
    // Implementation for capacity calculation visualization
    const data = simulation.content?.data || {};
    const results = simulation.content?.results || {};
    
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Paramètres du calcul</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>Revenus mensuels: {data.monthlyIncome?.toLocaleString('fr-FR') || '0'} €</div>
            <div>Charges mensuelles: {data.monthlyExpenses?.toLocaleString('fr-FR') || '0'} €</div>
            <div>Taux d'intérêt: {data.interestRate || '0'}%</div>
            <div>Durée du prêt: {data.loanTerm || '0'} ans</div>
          </div>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-md">
          <h4 className="font-medium mb-2">Capacité d'emprunt</h4>
          <div className="text-2xl font-bold text-center py-4">{results.loanAmount?.toLocaleString('fr-FR') || '0'} €</div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>Mensualité maximale: {results.monthlyPayment?.toLocaleString('fr-FR') || '0'} €</div>
            <div>Taux d'endettement: {results.debtRatio || '0'}%</div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderRentabilitySimulation = () => {
    // Implementation for rentability calculation visualization
    const data = simulation.content?.data || {};
    const result = simulation.content?.result || {};
    
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Paramètres de l'investissement</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>Valeur du bien: {data.propertyValue?.toLocaleString('fr-FR') || '0'} €</div>
            <div>Loyer mensuel: {data.rentalIncome?.toLocaleString('fr-FR') || '0'} €</div>
            <div>Charges mensuelles: {data.expenses?.toLocaleString('fr-FR') || '0'} €</div>
            <div>Montant du prêt: {data.loanAmount?.toLocaleString('fr-FR') || '0'} €</div>
            <div>Taux d'intérêt: {data.interestRate || '0'}%</div>
            <div>Durée du prêt: {data.loanDuration || '0'} ans</div>
            <div>Taux de vacance: {data.vacancyRate || '0'}%</div>
          </div>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-md">
          <h4 className="font-medium mb-2">Indicateurs de rentabilité</h4>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-sm">Cash Flow Annuel</p>
              <p className="text-xl font-bold">{result.cashFlow?.toLocaleString('fr-FR') || '0'} €</p>
            </div>
            <div>
              <p className="text-sm">Rendement</p>
              <p className="text-xl font-bold">{result.cashOnCash?.toFixed(2) || '0.00'}%</p>
            </div>
            <div>
              <p className="text-sm">Mensualité</p>
              <p className="text-xl font-bold">{result.monthlyPayment?.toLocaleString('fr-FR') || '0'} €</p>
            </div>
            <div>
              <p className="text-sm">ROI Total</p>
              <p className="text-xl font-bold">{result.roi?.toFixed(2) || '0.00'}%</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderNoteSimulation = () => {
    const data = simulation.content?.data || {};
    
    return (
      <div className="space-y-4 bg-slate-50 p-4 rounded-md">
        <textarea
          className="w-full h-64 p-4 border rounded-md"
          value={data.text || ''}
          onChange={(e) => onContentChange({ ...data, text: e.target.value })}
          placeholder="Saisissez votre note ici..."
        />
      </div>
    );
  };
  
  const renderGenericSimulation = () => {
    const data = simulation.content?.data || {};
    
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Contenu de la simulation</CardTitle>
            <CardDescription>Type: {simulation.type}</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="p-4 bg-slate-50 rounded-md overflow-auto text-xs">
              {JSON.stringify(simulation.content, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div>
      <Tabs defaultValue="preview">
        <TabsList className="mb-4">
          <TabsTrigger value="preview">Aperçu</TabsTrigger>
          <TabsTrigger value="json">Données JSON</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="space-y-4">
          {renderSimulationType()}
        </TabsContent>
        
        <TabsContent value="json">
          <div className="bg-slate-50 p-4 rounded-md">
            <pre className="text-xs overflow-auto">
              {JSON.stringify(simulation.content, null, 2)}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimulationContent;
