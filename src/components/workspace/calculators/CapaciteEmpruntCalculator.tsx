
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, CreditCard, Percent } from "lucide-react";
import { Separator } from '@/components/ui/separator';

const CapaciteEmpruntCalculator: React.FC = () => {
  const [revenuMensuel, setRevenuMensuel] = useState<number>(3000);
  const [autresRevenus, setAutresRevenus] = useState<number>(0);
  const [chargesMensuelles, setChargesMensuelles] = useState<number>(500);
  const [tauxEndettement, setTauxEndettement] = useState<number>(33);
  const [tauxInteret, setTauxInteret] = useState<number>(3.5);
  const [dureeEmprunt, setDureeEmprunt] = useState<number>(20);
  const [apportPersonnel, setApportPersonnel] = useState<number>(20000);
  const [capacite, setCapacite] = useState<number>(0);
  const [mensualite, setMensualite] = useState<number>(0);

  // Calcul de la capacité d'emprunt
  useEffect(() => {
    const revenus = revenuMensuel + autresRevenus;
    const capaciteRemboursement = (revenus * (tauxEndettement / 100)) - chargesMensuelles;
    
    if (capaciteRemboursement <= 0) {
      setCapacite(0);
      setMensualite(0);
      return;
    }
    
    // Calcul du montant empruntable
    const tauxMensuel = tauxInteret / 100 / 12;
    const nombreMensualites = dureeEmprunt * 12;
    
    // Formule : Mensualité = Montant emprunté * (Taux mensuel / (1 - (1 + Taux mensuel)^-nombre de mensualités))
    // On inverse la formule pour trouver le montant empruntable
    const montantEmpruntable = capaciteRemboursement / (tauxMensuel / (1 - Math.pow(1 + tauxMensuel, -nombreMensualites)));
    
    // Capacité d'emprunt = montant empruntable + apport personnel
    setCapacite(Math.round(montantEmpruntable) + apportPersonnel);
    setMensualite(Math.round(capaciteRemboursement));
  }, [revenuMensuel, autresRevenus, chargesMensuelles, tauxEndettement, tauxInteret, dureeEmprunt, apportPersonnel]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Calculateur de Capacité d'Emprunt
        </CardTitle>
        <CardDescription>
          Estimez votre capacité d'emprunt et votre mensualité maximale
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="inputs">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inputs">Simulation</TabsTrigger>
            <TabsTrigger value="results">Résultats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="inputs" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="revenuMensuel">Revenu mensuel net (€)</Label>
                  <Input
                    id="revenuMensuel"
                    type="number"
                    value={revenuMensuel}
                    onChange={(e) => setRevenuMensuel(Number(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="autresRevenus">Autres revenus mensuels (€)</Label>
                  <Input
                    id="autresRevenus"
                    type="number"
                    value={autresRevenus}
                    onChange={(e) => setAutresRevenus(Number(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="chargesMensuelles">Charges mensuelles (€) (hors logement)</Label>
                  <Input
                    id="chargesMensuelles"
                    type="number"
                    value={chargesMensuelles}
                    onChange={(e) => setChargesMensuelles(Number(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="apportPersonnel">Apport personnel (€)</Label>
                  <Input
                    id="apportPersonnel"
                    type="number"
                    value={apportPersonnel}
                    onChange={(e) => setApportPersonnel(Number(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="tauxEndettement">Taux d'endettement (%)</Label>
                    <span className="text-sm font-medium">{tauxEndettement}%</span>
                  </div>
                  <Slider
                    id="tauxEndettement"
                    min={0}
                    max={50}
                    step={1}
                    value={[tauxEndettement]}
                    onValueChange={(value) => setTauxEndettement(value[0])}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Le taux d'endettement maximum généralement accepté par les banques est de 35%.
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="tauxInteret">Taux d'intérêt (%)</Label>
                    <span className="text-sm font-medium">{tauxInteret}%</span>
                  </div>
                  <Slider
                    id="tauxInteret"
                    min={0.5}
                    max={10}
                    step={0.1}
                    value={[tauxInteret]}
                    onValueChange={(value) => setTauxInteret(value[0])}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="dureeEmprunt">Durée de l'emprunt (années)</Label>
                    <span className="text-sm font-medium">{dureeEmprunt} ans</span>
                  </div>
                  <Slider
                    id="dureeEmprunt"
                    min={5}
                    max={30}
                    step={1}
                    value={[dureeEmprunt]}
                    onValueChange={(value) => setDureeEmprunt(value[0])}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span>Capacité d'emprunt</span>
                    <Percent className="h-5 w-5 text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{capacite.toLocaleString('fr-FR')} €</div>
                  <div className="text-sm font-medium mt-1 text-muted-foreground">
                    Dont apport personnel: {apportPersonnel.toLocaleString('fr-FR')} €
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span>Mensualité maximale</span>
                    <CreditCard className="h-5 w-5 text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{mensualite.toLocaleString('fr-FR')} €</div>
                  <div className="text-sm font-medium mt-1 text-muted-foreground">
                    Sur {dureeEmprunt} ans ({dureeEmprunt * 12} mensualités)
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Détails du calcul</h3>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Revenus mensuels totaux:</div>
                <div className="font-medium">{(revenuMensuel + autresRevenus).toLocaleString('fr-FR')} €</div>
                
                <div>Charges mensuelles:</div>
                <div className="font-medium">{chargesMensuelles.toLocaleString('fr-FR')} €</div>
                
                <div>Capacité de remboursement:</div>
                <div className="font-medium">{mensualite.toLocaleString('fr-FR')} €</div>
                
                <div>Taux d'endettement réel:</div>
                <div className="font-medium">
                  {(mensualite / (revenuMensuel + autresRevenus) * 100).toFixed(1)}%
                </div>
                
                <div>Coût total du crédit:</div>
                <div className="font-medium">
                  {((mensualite * dureeEmprunt * 12) - (capacite - apportPersonnel)).toLocaleString('fr-FR')} €
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  Exporter PDF
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CapaciteEmpruntCalculator;
