
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import { useClientAuth } from '@/hooks/useClientAuth';
import AdminSwitch from '@/components/client/AdminSwitch';
import { toast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const AdminProjectCreation = () => {
  const { isLoaded, isSignedIn } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(true);
  const [selectedPhases, setSelectedPhases] = useState({
    feasibility: false,
    dce: false,
    act: false,
    exe: false,
    reception: false,
    delivery: false
  });
  const [selectedTechnicalOffices, setSelectedTechnicalOffices] = useState({
    structure: false,
    vrd: false,
    elect: false,
    cold: false,
    cvc: false,
    thermal: false,
    geotech: false,
    hydro: false,
    smokeExtraction: false,
    method: false
  });
  const [selectedTrades, setSelectedTrades] = useState({
    go: false,
    vrd: false,
    framework: false,
    cladding: false,
    roofing: false,
    joinery: false,
    locksmithing: false,
    flooring: false,
    isothermal: false,
    plastering: false,
    painting: false,
    demolition: false,
    plumbing: false,
    foodCold: false,
    cvc: false,
    arrangement: false,
    sprinklage: false,
    ria: false,
    ssi: false,
    electricity: false,
    interiorJoinery: false,
    sectionalDoor: false,
    levelingDock: false,
    fastDoor: false,
    specialFoundations: false,
    automaticDoor: false,
    flexibleFloor: false,
    tiling: false
  });

  // Handle admin mode toggle
  const handleAdminModeToggle = (checked: boolean) => {
    setIsAdminMode(checked);
    toast({
      title: checked ? "Mode administrateur activé" : "Mode client activé",
      description: checked 
        ? "Vous pouvez maintenant gérer les dossiers et les clients." 
        : "Vous voyez maintenant l'interface client standard.",
    });
  };

  // Handle phase checkbox change
  const handlePhaseChange = (phase: keyof typeof selectedPhases, checked: boolean) => {
    setSelectedPhases(prev => ({
      ...prev,
      [phase]: checked
    }));
  };

  // Handle technical office checkbox change
  const handleTechnicalOfficeChange = (office: keyof typeof selectedTechnicalOffices, checked: boolean) => {
    setSelectedTechnicalOffices(prev => ({
      ...prev,
      [office]: checked
    }));
  };

  // Handle trade checkbox change
  const handleTradeChange = (trade: keyof typeof selectedTrades, checked: boolean) => {
    setSelectedTrades(prev => ({
      ...prev,
      [trade]: checked
    }));
  };

  const form = useForm({
    defaultValues: {
      projectName: "",
      fileNumber: "",
      workAmount: "",
      projectOwner: "",
      projectType: "residential",
      adminAuthorization: "building_permit",
      automaticDates: false
    }
  });

  const onSubmit = (data: any) => {
    console.log("Form submitted", {
      ...data,
      phases: selectedPhases,
      technicalOffices: selectedTechnicalOffices,
      trades: selectedTrades
    });
    
    toast({
      title: "Projet créé avec succès",
      description: `Le projet ${data.projectName} a été créé.`,
    });
  };

  if (!isLoaded || !isSignedIn) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
    </div>;
  }

  return (
    <>
      <Helmet>
        <title>Création de Projet | Progineer</title>
        <meta name="description" content="Créez un nouveau projet client dans le système Progineer." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
                Administration
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                Création de Projet
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mb-8">
                Créez un nouveau projet client et définissez ses caractéristiques principales.
              </p>
            </div>
            
            {/* Admin Switch */}
            <div className="md:mt-0 mt-4">
              <AdminSwitch isAdminMode={isAdminMode} onToggle={handleAdminModeToggle} />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <ClientNavigation isAdminMode={isAdminMode} />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="border-gray-200">
                <CardContent className="p-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <Tabs defaultValue="general" className="w-full">
                        <TabsList className="mb-6 grid grid-cols-3 lg:grid-cols-6">
                          <TabsTrigger value="general">Générales</TabsTrigger>
                          <TabsTrigger value="phases">Phases</TabsTrigger>
                          <TabsTrigger value="dates">Dates</TabsTrigger>
                          <TabsTrigger value="team">Équipe</TabsTrigger>
                          <TabsTrigger value="execution">Exécution</TabsTrigger>
                          <TabsTrigger value="technical">Technique</TabsTrigger>
                        </TabsList>
                        
                        {/* GENERAL INFORMATION */}
                        <TabsContent value="general" className="space-y-4">
                          <h2 className="text-xl font-medium mb-4">Informations Générales</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <FormField
                                control={form.control}
                                name="projectName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Nom du projet</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Nouvelle résidence Marseille" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="space-y-2">
                              <FormField
                                control={form.control}
                                name="fileNumber"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Numéro de dossier</FormLabel>
                                    <FormControl>
                                      <Input placeholder="PRG-2023-001" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="space-y-2">
                              <FormField
                                control={form.control}
                                name="workAmount"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Montant de travaux</FormLabel>
                                    <FormControl>
                                      <Input type="number" placeholder="150000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="space-y-2">
                              <FormField
                                control={form.control}
                                name="projectOwner"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Maître d'ouvrage</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Dupont Immobilier" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="space-y-2">
                              <FormField
                                control={form.control}
                                name="projectType"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Typologie de projet</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Sélectionnez le type de projet" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="residential">Résidentiel</SelectItem>
                                        <SelectItem value="commercial">Commercial</SelectItem>
                                        <SelectItem value="industrial">Industriel</SelectItem>
                                        <SelectItem value="public">Établissement public</SelectItem>
                                        <SelectItem value="mixed">Mixte</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="space-y-2">
                              <FormField
                                control={form.control}
                                name="adminAuthorization"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Autorisation administrative</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Sélectionnez l'autorisation" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="building_permit">Permis de construire</SelectItem>
                                        <SelectItem value="prior_declaration">Déclaration préalable</SelectItem>
                                        <SelectItem value="demolition_permit">Permis de démolir</SelectItem>
                                        <SelectItem value="development_permit">Permis d'aménager</SelectItem>
                                        <SelectItem value="none">Aucune</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </TabsContent>
                        
                        {/* PROJECT PHASES */}
                        <TabsContent value="phases" className="space-y-4">
                          <h2 className="text-xl font-medium mb-4">Phases du Projet</h2>
                          <div className="bg-gray-50 p-4 rounded-md mb-6">
                            <h3 className="text-sm font-medium text-gray-600 mb-3">SÉLECTIONNEZ LES PHASES CONCERNÉES PAR LE PROJET</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                              <div className="flex items-start space-x-2">
                                <Checkbox 
                                  id="phase-feasibility" 
                                  checked={selectedPhases.feasibility}
                                  onCheckedChange={(checked) => handlePhaseChange('feasibility', Boolean(checked))}
                                />
                                <Label htmlFor="phase-feasibility" className="text-sm">FAISABILITÉ</Label>
                              </div>
                              <div className="flex items-start space-x-2">
                                <Checkbox 
                                  id="phase-dce" 
                                  checked={selectedPhases.dce}
                                  onCheckedChange={(checked) => handlePhaseChange('dce', Boolean(checked))}
                                />
                                <Label htmlFor="phase-dce" className="text-sm">DCE</Label>
                              </div>
                              <div className="flex items-start space-x-2">
                                <Checkbox 
                                  id="phase-act" 
                                  checked={selectedPhases.act}
                                  onCheckedChange={(checked) => handlePhaseChange('act', Boolean(checked))}
                                />
                                <Label htmlFor="phase-act" className="text-sm">ACT</Label>
                              </div>
                              <div className="flex items-start space-x-2">
                                <Checkbox 
                                  id="phase-exe" 
                                  checked={selectedPhases.exe}
                                  onCheckedChange={(checked) => handlePhaseChange('exe', Boolean(checked))}
                                />
                                <Label htmlFor="phase-exe" className="text-sm">EXE</Label>
                              </div>
                              <div className="flex items-start space-x-2">
                                <Checkbox 
                                  id="phase-reception" 
                                  checked={selectedPhases.reception}
                                  onCheckedChange={(checked) => handlePhaseChange('reception', Boolean(checked))}
                                />
                                <Label htmlFor="phase-reception" className="text-sm">RÉCEPTION</Label>
                              </div>
                              <div className="flex items-start space-x-2">
                                <Checkbox 
                                  id="phase-delivery" 
                                  checked={selectedPhases.delivery}
                                  onCheckedChange={(checked) => handlePhaseChange('delivery', Boolean(checked))}
                                />
                                <Label htmlFor="phase-delivery" className="text-sm">LIVRAISON</Label>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-md">
                            <div className="flex items-start space-x-2 mb-4">
                              <FormField
                                control={form.control}
                                name="automaticDates"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox 
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <FormLabel>
                                        DÉFINIR LES DATES DES DIFFÉRENTES PHASES DE PROJET DE MANIÈRE AUTOMATIQUE ?
                                      </FormLabel>
                                    </div>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </TabsContent>
                        
                        {/* DATES */}
                        <TabsContent value="dates" className="space-y-4">
                          <h2 className="text-xl font-medium mb-4">Dates des Phases</h2>
                          
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="global-start-date">Date de début globale</Label>
                                <Input type="date" id="global-start-date" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="global-end-date">Date de fin globale</Label>
                                <Input type="date" id="global-end-date" />
                              </div>
                            </div>
                            
                            {selectedPhases.feasibility && (
                              <div>
                                <h3 className="text-sm font-medium text-gray-600 mb-3 text-center bg-gray-100 py-1">FAISABILITÉ</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="feasibility-start-date">Date de début</Label>
                                    <Input type="date" id="feasibility-start-date" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="feasibility-end-date">Date de fin</Label>
                                    <Input type="date" id="feasibility-end-date" />
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {selectedPhases.dce && (
                              <div>
                                <h3 className="text-sm font-medium text-gray-600 mb-3 text-center bg-gray-100 py-1">DCE</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="dce-start-date">Date de début</Label>
                                    <Input type="date" id="dce-start-date" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="dce-end-date">Date de fin</Label>
                                    <Input type="date" id="dce-end-date" />
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {selectedPhases.act && (
                              <div>
                                <h3 className="text-sm font-medium text-gray-600 mb-3 text-center bg-gray-100 py-1">ACT</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="act-start-date">Date de début</Label>
                                    <Input type="date" id="act-start-date" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="act-end-date">Date de fin</Label>
                                    <Input type="date" id="act-end-date" />
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {selectedPhases.exe && (
                              <div>
                                <h3 className="text-sm font-medium text-gray-600 mb-3 text-center bg-gray-100 py-1">EXE</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="exe-start-date">Date de début</Label>
                                    <Input type="date" id="exe-start-date" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="exe-end-date">Date de fin</Label>
                                    <Input type="date" id="exe-end-date" />
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {selectedPhases.reception && (
                              <div>
                                <h3 className="text-sm font-medium text-gray-600 mb-3 text-center bg-gray-100 py-1">RÉCEPTION</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="reception-start-date">Date de début</Label>
                                    <Input type="date" id="reception-start-date" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="reception-end-date">Date de fin</Label>
                                    <Input type="date" id="reception-end-date" />
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {selectedPhases.delivery && (
                              <div>
                                <h3 className="text-sm font-medium text-gray-600 mb-3 text-center bg-gray-100 py-1">LIVRAISON</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="delivery-start-date">Date de début</Label>
                                    <Input type="date" id="delivery-start-date" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="delivery-end-date">Date de fin</Label>
                                    <Input type="date" id="delivery-end-date" />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </TabsContent>
                        
                        {/* TEAM */}
                        <TabsContent value="team" className="space-y-4">
                          <h2 className="text-xl font-medium mb-4">Personnes Allouées au Projet</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="project-manager">Chef de projet</Label>
                              <Input id="project-manager" placeholder="Nom du chef de projet" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="technical-director">Directeur technique</Label>
                              <Input id="technical-director" placeholder="Nom du directeur technique" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="draftsman">Dessinateur</Label>
                              <Input id="draftsman" placeholder="Nom du dessinateur" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="work-supervisor">Conducteur de travaux</Label>
                              <Input id="work-supervisor" placeholder="Nom du conducteur de travaux" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="admin-assistant">Assistant admin</Label>
                              <Input id="admin-assistant" placeholder="Nom de l'assistant administratif" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="division-director">Directeur de pôle</Label>
                              <Input id="division-director" placeholder="Nom du directeur de pôle" />
                            </div>
                          </div>
                        </TabsContent>
                        
                        {/* EXECUTION */}
                        <TabsContent value="execution" className="space-y-4">
                          <h2 className="text-xl font-medium mb-4">Informations Liées à l'Exécution</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="weekly-visits">Nb visite hebdo du conduc</Label>
                              <Input id="weekly-visits" type="number" placeholder="2" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="project-distance">Distance du projet</Label>
                              <Input id="project-distance" type="number" placeholder="25" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="meeting-day">Jour de réunion</Label>
                              <Select>
                                <SelectTrigger id="meeting-day">
                                  <SelectValue placeholder="Sélectionnez un jour" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="monday">Lundi</SelectItem>
                                  <SelectItem value="tuesday">Mardi</SelectItem>
                                  <SelectItem value="wednesday">Mercredi</SelectItem>
                                  <SelectItem value="thursday">Jeudi</SelectItem>
                                  <SelectItem value="friday">Vendredi</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="security-commission">Commission de sécurité</Label>
                              <Input id="security-commission" placeholder="Détails de la commission" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="control-office">Bureau de contrôle</Label>
                              <Input id="control-office" placeholder="Nom du bureau de contrôle" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="sps-coordinator">Coordinateur SPS</Label>
                              <Input id="sps-coordinator" placeholder="Nom du coordinateur SPS" />
                            </div>
                          </div>
                        </TabsContent>
                        
                        {/* TECHNICAL */}
                        <TabsContent value="technical" className="space-y-6">
                          <h2 className="text-xl font-medium mb-4">Informations Techniques</h2>
                          
                          <div className="space-y-6">
                            {/* TECHNICAL OFFICES */}
                            <div className="bg-gray-50 p-4 rounded-md">
                              <h3 className="text-sm font-medium text-gray-600 mb-3">SÉLECTIONNEZ LES BET ENGAGÉS SUR LE DOSSIER</h3>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="flex items-start space-x-2">
                                  <Checkbox 
                                    id="be-structure" 
                                    checked={selectedTechnicalOffices.structure}
                                    onCheckedChange={(checked) => handleTechnicalOfficeChange('structure', Boolean(checked))}
                                  />
                                  <Label htmlFor="be-structure" className="text-sm">BE STRUCTURE</Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <Checkbox 
                                    id="be-vrd" 
                                    checked={selectedTechnicalOffices.vrd}
                                    onCheckedChange={(checked) => handleTechnicalOfficeChange('vrd', Boolean(checked))}
                                  />
                                  <Label htmlFor="be-vrd" className="text-sm">BE VRD</Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <Checkbox 
                                    id="be-elect" 
                                    checked={selectedTechnicalOffices.elect}
                                    onCheckedChange={(checked) => handleTechnicalOfficeChange('elect', Boolean(checked))}
                                  />
                                  <Label htmlFor="be-elect" className="text-sm">BE ELECT</Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <Checkbox 
                                    id="be-cold" 
                                    checked={selectedTechnicalOffices.cold}
                                    onCheckedChange={(checked) => handleTechnicalOfficeChange('cold', Boolean(checked))}
                                  />
                                  <Label htmlFor="be-cold" className="text-sm">BE FROID</Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <Checkbox 
                                    id="be-cvc" 
                                    checked={selectedTechnicalOffices.cvc}
                                    onCheckedChange={(checked) => handleTechnicalOfficeChange('cvc', Boolean(checked))}
                                  />
                                  <Label htmlFor="be-cvc" className="text-sm">BE CVC</Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <Checkbox 
                                    id="be-thermal" 
                                    checked={selectedTechnicalOffices.thermal}
                                    onCheckedChange={(checked) => handleTechnicalOfficeChange('thermal', Boolean(checked))}
                                  />
                                  <Label htmlFor="be-thermal" className="text-sm">BE THERMIQUE</Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <Checkbox 
                                    id="be-geotech" 
                                    checked={selectedTechnicalOffices.geotech}
                                    onCheckedChange={(checked) => handleTechnicalOfficeChange('geotech', Boolean(checked))}
                                  />
                                  <Label htmlFor="be-geotech" className="text-sm">BE GEOTECH</Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <Checkbox 
                                    id="be-hydro" 
                                    checked={selectedTechnicalOffices.hydro}
                                    onCheckedChange={(checked) => handleTechnicalOfficeChange('hydro', Boolean(checked))}
                                  />
                                  <Label htmlFor="be-hydro" className="text-sm">BE HYDRO</Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <Checkbox 
                                    id="be-smoke" 
                                    checked={selectedTechnicalOffices.smokeExtraction}
                                    onCheckedChange={(checked) => handleTechnicalOfficeChange('smokeExtraction', Boolean(checked))}
                                  />
                                  <Label htmlFor="be-smoke" className="text-sm">BE DESENFUMAGE</Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <Checkbox 
                                    id="be-method" 
                                    checked={selectedTechnicalOffices.method}
                                    onCheckedChange={(checked) => handleTechnicalOfficeChange('method', Boolean(checked))}
                                  />
                                  <Label htmlFor="be-method" className="text-sm">BE METHODE</Label>
                                </div>
                              </div>
                            </div>
                            
                            {/* TRADES */}
                            <div className="bg-gray-50 p-4 rounded-md">
                              <h3 className="text-sm font-medium text-gray-600 mb-3">SÉLECTIONNEZ LES CORPS D'ÉTAT CONCERNÉS PAR LE DOSSIER</h3>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="flex items-start space-x-2">
                                  <Checkbox 
                                    id="trade-go" 
                                    checked={selectedTrades.go}
                                    onCheckedChange={(checked) => handleTradeChange('go', Boolean(checked))}
                                  />
                                  <Label htmlFor="trade-go" className="text-sm">GO</Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <Checkbox 
                                    id="trade-vrd" 
                                    checked={selectedTrades.vrd}
                                    onCheckedChange={(checked) => handleTradeChange('vrd', Boolean(checked))}
                                  />
                                  <Label htmlFor="trade-vrd" className="text-sm">VRD</Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <Checkbox 
                                    id="trade-framework" 
                                    checked={selectedTrades.framework}
                                    onCheckedChange={(checked) => handleTradeChange('framework', Boolean(checked))}
                                  />
                                  <Label htmlFor="trade-framework" className="text-sm">CHARPENTE</Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <Checkbox 
                                    id="trade-cladding" 
                                    checked={selectedTrades.cladding}
                                    onCheckedChange={(checked) => handleTradeChange('cladding', Boolean(checked))}
                                  />
                                  <Label htmlFor="trade-cladding" className="text-sm">BARDAGE</Label>
                                </div>
                                
                                {/* Add more trades here ... */}
                                <div className="flex items-start space-x-2">
                                  <Checkbox 
                                    id="trade-roofing" 
                                    checked={selectedTrades.roofing}
                                    onCheckedChange={(checked) => handleTradeChange('roofing', Boolean(checked))}
                                  />
                                  <Label htmlFor="trade-roofing" className="text-sm">COUVERTURE</Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <Checkbox 
                                    id="trade-joinery" 
                                    checked={selectedTrades.joinery}
                                    onCheckedChange={(checked) => handleTradeChange('joinery', Boolean(checked))}
                                  />
                                  <Label htmlFor="trade-joinery" className="text-sm">MENUISERIE</Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <Checkbox 
                                    id="trade-locksmithing" 
                                    checked={selectedTrades.locksmithing}
                                    onCheckedChange={(checked) => handleTradeChange('locksmithing', Boolean(checked))}
                                  />
                                  <Label htmlFor="trade-locksmithing" className="text-sm">SERRURERIE</Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <Checkbox 
                                    id="trade-flooring" 
                                    checked={selectedTrades.flooring}
                                    onCheckedChange={(checked) => handleTradeChange('flooring', Boolean(checked))}
                                  />
                                  <Label htmlFor="trade-flooring" className="text-sm">DALLAGE</Label>
                                </div>
                                
                                {/* And many more trades... Only showing a subset for brevity */}
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                      
                      <div className="flex justify-end pt-6">
                        <Button 
                          type="submit" 
                          className="bg-khaki-600 hover:bg-khaki-700 text-white"
                        >
                          Valider la saisie et enregistrer
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AdminProjectCreation;
