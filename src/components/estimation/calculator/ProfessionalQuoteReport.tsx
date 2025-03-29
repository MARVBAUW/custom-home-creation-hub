import React from 'react';
import { FormData } from './types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Printer, Calendar } from 'lucide-react';
import Logo from '@/components/common/Logo';

interface QuoteItem {
  label: string;
  unit: string;
  quantity: number;
  priceHT: number;
  tva: number;
  totalHT: number;
}

interface ProfessionalQuoteReportProps {
  formData: FormData;
  estimationResult: number | null;
  onPrint: () => void;
}

const ProfessionalQuoteReport: React.FC<ProfessionalQuoteReportProps> = ({
  formData,
  estimationResult,
  onPrint
}) => {
  const { toast } = useToast();
  
  // Générer un numéro de devis aléatoire en fonction de la date
  const quoteNumber = `D${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}-${String(Math.floor(Math.random() * 100)).padStart(2, '0')}`;
  
  // Dates
  const issueDate = new Date().toLocaleDateString('fr-FR');
  const validUntilDate = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR');
  
  // Formater les nombres en EUR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    }).format(price);
  };
  
  // Calculer les items du devis en fonction des données
  const generateQuoteItems = (): QuoteItem[] => {
    const items: QuoteItem[] = [];
    
    // Si nous n'avons pas de résultat, retourner un tableau vide
    if (!estimationResult) return items;
    
    // Estimation de base: honoraires et coordination
    const baseHonoraires = Math.min(estimationResult * 0.07, 10000);
    items.push({
      label: 'DIRECTION, EXECUTION DES TRAVAUX / ORDONNACEMENT, PILOTAGE, COORDINATION',
      unit: 'Réunion(s)',
      quantity: 6,
      priceHT: Math.round(baseHonoraires / 6),
      tva: 20,
      totalHT: Math.round(baseHonoraires)
    });
    
    // Opérations préalables
    items.push({
      label: 'OPERATIONS PREALABLES A LA RECEPTION',
      unit: '',
      quantity: 1,
      priceHT: Math.round(baseHonoraires * 0.05),
      tva: 20,
      totalHT: Math.round(baseHonoraires * 0.05)
    });
    
    // Réception
    items.push({
      label: 'RECEPTION DES TRAVAUX',
      unit: '',
      quantity: 1,
      priceHT: Math.round(baseHonoraires * 0.1),
      tva: 20,
      totalHT: Math.round(baseHonoraires * 0.1)
    });
    
    return items;
  };
  
  const quoteItems = generateQuoteItems();
  
  // Calculer les totaux
  const totalHT = quoteItems.reduce((sum, item) => sum + item.totalHT, 0);
  const totalTVA = quoteItems.reduce((sum, item) => sum + (item.totalHT * item.tva / 100), 0);
  const totalTTC = totalHT + totalTVA;
  
  // Mission description based on project type
  const getMissionDescription = () => {
    const projectType = formData.projectType || "construction";
    const location = formData.city || "PACA";
    
    if (projectType.toLowerCase().includes('rénov')) {
      return `Mission OPC/DET pour la rénovation ${formData.surface ? `de ${formData.surface}m² ` : ''}à ${location}`;
    } else if (projectType.toLowerCase().includes('extension')) {
      return `Mission OPC/DET pour l'extension ${formData.surface ? `de ${formData.surface}m² ` : ''}à ${location}`;
    } else {
      return `Mission OPC/DET pour la construction ${formData.surface ? `de ${formData.surface}m² ` : ''}à ${location}`;
    }
  };
  
  const handlePrint = () => {
    onPrint();
    toast({
      title: "Impression lancée",
      description: "Votre devis est en cours d'impression",
    });
  };
  
  return (
    <Card className="w-full border shadow-lg print:shadow-none print:border-none">
      <CardContent className="p-0 relative">
        <div className="print:block" id="quote-to-print">
          {/* En-tête */}
          <div className="bg-stone-50 p-6 border-b print:bg-white">
            <div className="flex justify-center mb-6">
              <div className="h-12">
                <Logo variant="full" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <h3 className="font-bold text-gray-800 mb-1">PGR PROGINEER</h3>
                <p>229 Rue Saint-Honoré</p>
                <p>75001 Paris, France</p>
              </div>
              <div className="text-right">
                <h3 className="font-bold text-gray-800 mb-1">ACTIV TRAVAUX</h3>
                <p>5 Rue Augustin Fresnel</p>
                <p>44470 Carquefou, France</p>
                <p className="mt-2 font-medium">SIRET</p>
                <p>48305713900055</p>
              </div>
            </div>
          </div>
          
          {/* Informations du devis */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-progineer-gold mb-2">Devis {quoteNumber}</h2>
            <p className="text-gray-600 mb-4">{getMissionDescription()}</p>
            
            <div className="flex justify-between text-sm mt-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>Émis le {issueDate}</span>
              </div>
              <div>
                <span>Valide jusqu'au {validUntilDate}</span>
              </div>
            </div>
          </div>
          
          {/* Tableau du devis */}
          <ScrollArea className="h-auto max-h-[500px] print:max-h-none">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-progineer-gold/20">
                  <th className="py-3 px-4 text-left font-semibold text-gray-800 border-b">Libellé</th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-800 border-b">Unité</th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-800 border-b">Quantité</th>
                  <th className="py-3 px-4 text-right font-semibold text-gray-800 border-b">Prix u. HT</th>
                  <th className="py-3 px-4 text-right font-semibold text-gray-800 border-b">TVA</th>
                  <th className="py-3 px-4 text-right font-semibold text-gray-800 border-b">Total HT</th>
                </tr>
              </thead>
              <tbody>
                {quoteItems.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-3 px-4 border-b">
                      <div className="font-medium">{item.label}</div>
                      {index === 0 && (
                        <div className="text-gray-500 text-xs mt-1">
                          <p>Lancement de chantier,</p>
                          <p>Suivi de chantier comprenant des comptes rendus de chantier hebdomadaires,</p>
                          <p>Ordonnancement, pilotage et coordination du chantier.</p>
                        </div>
                      )}
                      {index === 1 && (
                        <div className="text-gray-500 text-xs mt-1">
                          <p>Relevés sur place,</p>
                          <p>Rapport photo,</p>
                          <p>Convocation des entreprises à pré-réception et</p>
                          <p>localisation et repérage des remarques pour envoi aux entreprises.</p>
                        </div>
                      )}
                      {index === 2 && (
                        <div className="text-gray-500 text-xs mt-1">
                          <p>Convocation des entreprises,</p>
                          <p>Relevés sur place,</p>
                          <p>Procès-verbal de réception avec localisation/repérage sur plan des remarques,</p>
                          <p>Suivi des levées de réserves et deadlines.</p>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 border-b text-center">{item.unit}</td>
                    <td className="py-3 px-4 border-b text-center">{item.quantity}</td>
                    <td className="py-3 px-4 border-b text-right">{formatPrice(item.priceHT)}</td>
                    <td className="py-3 px-4 border-b text-right">{item.tva.toFixed(2)}%</td>
                    <td className="py-3 px-4 border-b text-right">{formatPrice(item.totalHT)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100">
                  <td colSpan={4} className="py-3 px-4"></td>
                  <td className="py-3 px-4 font-medium text-right">Total HT</td>
                  <td className="py-3 px-4 font-medium text-right">{formatPrice(totalHT)}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td colSpan={4} className="py-3 px-4"></td>
                  <td className="py-3 px-4 font-medium text-right">TVA (20%)</td>
                  <td className="py-3 px-4 font-medium text-right">{formatPrice(totalTVA)}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td colSpan={4} className="py-3 px-4"></td>
                  <td className="py-3 px-4 font-bold text-right">Total TTC</td>
                  <td className="py-3 px-4 font-bold text-right">{formatPrice(totalTTC)}</td>
                </tr>
              </tfoot>
            </table>
          </ScrollArea>
          
          {/* Pied de page */}
          <div className="p-6 text-xs text-gray-600 border-t bg-gray-50 print:bg-white">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-medium mb-1">PGR PROGINEER</p>
                <p>SAS au capital de 1 500 €</p>
                <p>SIRET: 93518678500018</p>
                <p>RCS PARIS: 935186785 / RM: 935186785 75</p>
                <p>N°TVA Intracommunautaire: FR80935186785</p>
              </div>
              <div>
                <p className="font-medium mb-1">Mode de paiement</p>
                <p>IBAN: FR76 1751 5914 0508 0407 5262 387</p>
                <p>BIC: SXNBFRPP</p>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="text-center">
              <p>Devis {quoteNumber} • 1/2</p>
            </div>
          </div>
        </div>
        
        {/* Boutons d'action (visibles uniquement à l'écran, pas à l'impression) */}
        <div className="p-4 border-t bg-gray-50 flex justify-between print:hidden">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => {
              toast({
                title: "Devis téléchargé",
                description: "Votre devis a été téléchargé avec succès",
              });
            }}
          >
            <FileText className="h-4 w-4" />
            Télécharger PDF
          </Button>
          
          <Button 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4" />
            Imprimer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalQuoteReport;
