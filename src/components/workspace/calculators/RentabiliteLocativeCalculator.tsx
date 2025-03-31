
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Calculator, Download, FileText } from "lucide-react";

const RentabiliteLocativeCalculator: React.FC = () => {
  const [prixAchat, setPrixAchat] = useState<number>(200000);
  const [fraisNotaire, setFraisNotaire] = useState<number>(15000);
  const [travaux, setTravaux] = useState<number>(0);
  const [loyerMensuel, setLoyerMensuel] = useState<number>(1000);
  const [chargesAnnuelles, setChargesAnnuelles] = useState<number>(1200);
  const [tauxImposition, setTauxImposition] = useState<number>(30);
  const [tauxEmprunt, setTauxEmprunt] = useState<number>(2.5);
  const [dureeEmprunt, setDureeEmprunt] = useState<number>(20);
  const [apport, setApport] = useState<number>(20000);

  // Calculer le rendement brut
  const calculerRendementBrut = () => {
    const investissementTotal = prixAchat + fraisNotaire + travaux;
    const revenuAnnuel = loyerMensuel * 12;
    return (revenuAnnuel / investissementTotal) * 100;
  };

  // Calculer le rendement net
  const calculerRendementNet = () => {
    const investissementTotal = prixAchat + fraisNotaire + travaux;
    const revenuAnnuel = loyerMensuel * 12;
    const revenuNetAvantImpot = revenuAnnuel - chargesAnnuelles;
    const revenuNetApresImpot = revenuNetAvantImpot * (1 - tauxImposition / 100);
    return (revenuNetApresImpot / investissementTotal) * 100;
  };

  // Calculer le rendement avec effet de levier
  const calculerRendementLevier = () => {
    const investissementTotal = prixAchat + fraisNotaire + travaux;
    const montantEmprunte = investissementTotal - apport;
    const tauxMensuel = tauxEmprunt / 100 / 12;
    const nombreMensualites = dureeEmprunt * 12;
    
    // Formule de calcul de la mensualité d'un prêt amortissable
    const mensualite = montantEmprunte * (tauxMensuel * Math.pow(1 + tauxMensuel, nombreMensualites)) / (Math.pow(1 + tauxMensuel, nombreMensualites) - 1);
    
    const annuite = mensualite * 12;
    const revenuAnnuel = loyerMensuel * 12;
    const cashFlowAnnuel = revenuAnnuel - chargesAnnuelles - annuite;
    
    return (cashFlowAnnuel / apport) * 100;
  };

  const rendementBrut = calculerRendementBrut().toFixed(2);
  const rendementNet = calculerRendementNet().toFixed(2);
  const rendementLevier = calculerRendementLevier().toFixed(2);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Calculateur de Rentabilité Locative
        </CardTitle>
        <CardDescription>
          Estimez la rentabilité brute et nette de votre investissement locatif
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="inputs">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inputs">Données</TabsTrigger>
            <TabsTrigger value="results">Résultats</TabsTrigger>
            <TabsTrigger value="report">Rapport</TabsTrigger>
          </TabsList>
          
          <TabsContent value="inputs" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="prixAchat">Prix d'achat (€)</Label>
                  <Input
                    id="prixAchat"
                    type="number"
                    value={prixAchat}
                    onChange={(e) => setPrixAchat(Number(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="fraisNotaire">Frais de notaire (€)</Label>
                  <Input
                    id="fraisNotaire"
                    type="number"
                    value={fraisNotaire}
                    onChange={(e) => setFraisNotaire(Number(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="travaux">Montant des travaux (€)</Label>
                  <Input
                    id="travaux"
                    type="number"
                    value={travaux}
                    onChange={(e) => setTravaux(Number(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="loyerMensuel">Loyer mensuel (€)</Label>
                  <Input
                    id="loyerMensuel"
                    type="number"
                    value={loyerMensuel}
                    onChange={(e) => setLoyerMensuel(Number(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="chargesAnnuelles">Charges annuelles (€)</Label>
                  <Input
                    id="chargesAnnuelles"
                    type="number"
                    value={chargesAnnuelles}
                    onChange={(e) => setChargesAnnuelles(Number(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="tauxImposition">Taux d'imposition (%)</Label>
                  <Input
                    id="tauxImposition"
                    type="number"
                    value={tauxImposition}
                    onChange={(e) => setTauxImposition(Number(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="tauxEmprunt">Taux d'emprunt (%)</Label>
                  <Input
                    id="tauxEmprunt"
                    type="number"
                    step="0.01"
                    value={tauxEmprunt}
                    onChange={(e) => setTauxEmprunt(Number(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="dureeEmprunt">Durée de l'emprunt (années)</Label>
                  <Input
                    id="dureeEmprunt"
                    type="number"
                    value={dureeEmprunt}
                    onChange={(e) => setDureeEmprunt(Number(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="apport">Apport personnel (€)</Label>
                  <Input
                    id="apport"
                    type="number"
                    value={apport}
                    onChange={(e) => setApport(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Rendement Brut</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{rendementBrut}%</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Revenus annuels / Investissement total
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Rendement Net</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{rendementNet}%</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Revenus nets après charges et impôts / Investissement total
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Rendement avec Levier</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{rendementLevier}%</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Cash flow annuel / Apport personnel
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Détails de l'investissement</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Investissement total</h4>
                  <p className="text-xl font-semibold">{(prixAchat + fraisNotaire + travaux).toLocaleString('fr-FR')} €</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Revenus annuels</h4>
                  <p className="text-xl font-semibold">{(loyerMensuel * 12).toLocaleString('fr-FR')} €</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Charges annuelles</h4>
                  <p className="text-xl font-semibold">{chargesAnnuelles.toLocaleString('fr-FR')} €</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Revenus nets</h4>
                  <p className="text-xl font-semibold">{((loyerMensuel * 12) - chargesAnnuelles).toLocaleString('fr-FR')} €</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="report" className="pt-4">
            <div className="space-y-4">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <FileText className="h-4 w-4" />
                  Imprimer
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  Télécharger PDF
                </Button>
              </div>
              
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Rapport de Rentabilité Locative</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-md font-semibold mb-2">Données de l'investissement</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Prix d'achat:</div>
                        <div className="font-medium">{prixAchat.toLocaleString('fr-FR')} €</div>
                        <div>Frais de notaire:</div>
                        <div className="font-medium">{fraisNotaire.toLocaleString('fr-FR')} €</div>
                        <div>Travaux:</div>
                        <div className="font-medium">{travaux.toLocaleString('fr-FR')} €</div>
                        <div>Total investi:</div>
                        <div className="font-medium">{(prixAchat + fraisNotaire + travaux).toLocaleString('fr-FR')} €</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-md font-semibold mb-2">Revenus locatifs</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Loyer mensuel:</div>
                        <div className="font-medium">{loyerMensuel.toLocaleString('fr-FR')} €</div>
                        <div>Loyer annuel:</div>
                        <div className="font-medium">{(loyerMensuel * 12).toLocaleString('fr-FR')} €</div>
                        <div>Charges annuelles:</div>
                        <div className="font-medium">{chargesAnnuelles.toLocaleString('fr-FR')} €</div>
                        <div>Revenu net avant impôt:</div>
                        <div className="font-medium">{((loyerMensuel * 12) - chargesAnnuelles).toLocaleString('fr-FR')} €</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-md font-semibold mb-2">Rentabilité</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Rendement brut:</div>
                        <div className="font-medium">{rendementBrut}%</div>
                        <div>Rendement net:</div>
                        <div className="font-medium">{rendementNet}%</div>
                        <div>Rendement avec effet de levier:</div>
                        <div className="font-medium">{rendementLevier}%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RentabiliteLocativeCalculator;
