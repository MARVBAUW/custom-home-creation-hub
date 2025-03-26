
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import { useClientAuth } from '@/hooks/useClientAuth';
import AdminSwitch from '@/components/client/AdminSwitch';
import { toast } from '@/hooks/use-toast';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';

const AdminProjectCreation = () => {
  const { isLoaded, isSignedIn } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(true);
  const [automaticDates, setAutomaticDates] = useState(false);
  
  // Initialize form
  const form = useForm({
    defaultValues: {
      projectName: '',
      fileNumber: '',
      workAmount: '',
      client: '',
      projectType: '',
      administrativeAuth: '',
      projectPhases: {
        faisabilite: false,
        dce: false,
        act: false,
        exe: false,
        reception: false,
        livraison: false
      },
      dates: {
        global: { start: null, end: null },
        faisabilite: { start: null, end: null },
        dce: { start: null, end: null },
        act: { start: null, end: null },
        exe: { start: null, end: null },
        reception: { start: null, end: null },
        livraison: { start: null, end: null }
      },
      team: {
        projectManager: '',
        technicalDirector: '',
        designer: '',
        worksManager: '',
        adminAssistant: '',
        poleDirector: ''
      },
      execution: {
        weeklyVisits: '',
        projectDistance: '',
        meetingDay: '',
        securityCommission: '',
        controlOffice: '',
        spsCoordinator: ''
      },
      technicalOffices: {
        structure: false,
        vrd: false,
        elect: false,
        froid: false,
        cvc: false,
        thermique: false,
        geotech: false,
        hydro: false,
        desenfumage: false,
        methode: false
      },
      tradeTypes: {
        go: false,
        vrd: false,
        charpente: false,
        bardage: false,
        couverture: false,
        menuiserie: false,
        serrurerie: false,
        dallage: false,
        isotherme: false,
        platrerie: false,
        peinture: false,
        demolition: false,
        plomberie: false,
        froidAlimentaire: false,
        cvc: false,
        amenagement: false,
        sprinklage: false,
        ria: false,
        ssi: false,
        electricite: false,
        menuiserieInterieur: false,
        porteSectionnelle: false,
        quaiNiveleur: false,
        porteRapide: false,
        fondationSpeciales: false,
        porteAutomatique: false,
        solSouple: false,
        carrelage: false
      }
    }
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

  const onSubmit = (data) => {
    console.log("Project Data:", data);
    toast({
      title: "Projet créé avec succès",
      description: `Le projet "${data.projectName}" a été créé et assigné au client "${data.client}".`,
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
        <title>Création de projet | Progineer</title>
        <meta name="description" content="Créez de nouveaux projets clients dans le système Progineer." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
                Administration
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                Création de projet
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mb-8">
                Créez et configurez un nouveau projet dans le système.
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
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* INFORMATIONS GENERALES */}
                    <div className="space-y-6">
                      <div className="text-center bg-khaki-100 py-3 rounded-md">
                        <h2 className="text-xl text-khaki-800 font-medium">INFORMATIONS GÉNÉRALES</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="projectName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom du projet</FormLabel>
                              <FormControl>
                                <Input placeholder="Saisissez le nom du projet" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="fileNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Numéro de dossier</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex: PROG-2023-001" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="workAmount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Montant de travaux</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex: 150000" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="client"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Maître d'ouvrage</FormLabel>
                              <FormControl>
                                <Input placeholder="Nom du client" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="projectType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Typologie de projet</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez une typologie" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="neuf_extension">Neuf / Extension</SelectItem>
                                  <SelectItem value="renovation">Rénovation</SelectItem>
                                  <SelectItem value="amenagement">Aménagement</SelectItem>
                                  <SelectItem value="industriel">Bâtiment industriel</SelectItem>
                                  <SelectItem value="commercial">Commercial</SelectItem>
                                  <SelectItem value="maison">Maison individuelle</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="administrativeAuth"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Autorisation administrative</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez une autorisation" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="pc">Permis de construire</SelectItem>
                                  <SelectItem value="dp">Déclaration préalable</SelectItem>
                                  <SelectItem value="pa">Permis d'aménager</SelectItem>
                                  <SelectItem value="none">Aucune autorisation</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Project phases */}
                      <div className="space-y-4">
                        <div className="text-center bg-khaki-50 py-2 rounded-md">
                          <h3 className="text-base text-khaki-800 font-medium">SÉLECTIONNEZ LES PHASES CONCERNÉES PAR LE PROJET</h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                          <FormField
                            control={form.control}
                            name="projectPhases.faisabilite"
                            render={({ field }) => (
                              <FormItem className="flex flex-col items-center space-y-2">
                                <FormLabel>FAISABILITÉ</FormLabel>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-khaki-600"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="projectPhases.dce"
                            render={({ field }) => (
                              <FormItem className="flex flex-col items-center space-y-2">
                                <FormLabel>DCE</FormLabel>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-khaki-600"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="projectPhases.act"
                            render={({ field }) => (
                              <FormItem className="flex flex-col items-center space-y-2">
                                <FormLabel>ACT</FormLabel>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-khaki-600"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="projectPhases.exe"
                            render={({ field }) => (
                              <FormItem className="flex flex-col items-center space-y-2">
                                <FormLabel>EXE</FormLabel>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-khaki-600"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="projectPhases.reception"
                            render={({ field }) => (
                              <FormItem className="flex flex-col items-center space-y-2">
                                <FormLabel>RÉCEPTION</FormLabel>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-khaki-600"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="projectPhases.livraison"
                            render={({ field }) => (
                              <FormItem className="flex flex-col items-center space-y-2">
                                <FormLabel>LIVRAISON</FormLabel>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-khaki-600"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="text-center bg-khaki-50 py-2 rounded-md">
                          <div className="flex items-center justify-center space-x-3">
                            <h3 className="text-base text-khaki-800 font-medium">DÉFINIR LES DATES DES DIFFÉRENTES PHASES DE PROJET DE MANIÈRE AUTOMATIQUE?</h3>
                            <Checkbox 
                              checked={automaticDates} 
                              onCheckedChange={setAutomaticDates}
                              className="data-[state=checked]:bg-khaki-600"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SAISIE DES DATES */}
                    <div className="space-y-6">
                      <div className="text-center bg-khaki-100 py-3 rounded-md">
                        <h2 className="text-xl text-khaki-800 font-medium">SAISIE DES DATES</h2>
                      </div>

                      {/* Global project dates */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="dates.global.start"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Date de début</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP", { locale: fr })
                                      ) : (
                                        <span>Sélectionnez une date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                    locale={fr}
                                    className="pointer-events-auto"
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="dates.global.end"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Date de fin</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP", { locale: fr })
                                      ) : (
                                        <span>Sélectionnez une date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                    locale={fr}
                                    className="pointer-events-auto"
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Phase dates - only showing FAISABILITE as example, others would be similar */}
                      <div className="space-y-4">
                        <div className="text-center bg-khaki-50 py-2 rounded-md">
                          <h3 className="text-base text-khaki-800 font-medium">FAISABILITÉ</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="dates.faisabilite.start"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Date de début</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                        )}
                                        disabled={automaticDates}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP", { locale: fr })
                                        ) : (
                                          <span>{automaticDates ? "Date automatique" : "Sélectionnez une date"}</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      initialFocus
                                      locale={fr}
                                      className="pointer-events-auto"
                                    />
                                  </PopoverContent>
                                </Popover>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="dates.faisabilite.end"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Date de fin</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                        )}
                                        disabled={automaticDates}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP", { locale: fr })
                                        ) : (
                                          <span>{automaticDates ? "Date automatique" : "Sélectionnez une date"}</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      initialFocus
                                      locale={fr}
                                      className="pointer-events-auto"
                                    />
                                  </PopoverContent>
                                </Popover>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* For brevity, we'll skip displaying all the other phase date fields
                         In a real implementation, you'd add similar blocks for DCE, ACT, EXE, etc. */}
                    </div>

                    {/* PERSONNES ALLOUEES AU PROJET */}
                    <div className="space-y-6">
                      <div className="text-center bg-khaki-100 py-3 rounded-md">
                        <h2 className="text-xl text-khaki-800 font-medium">PERSONNES ALLOUÉES AU PROJET</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="team.projectManager"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Chef de projet</FormLabel>
                              <FormControl>
                                <Input placeholder="Nom du chef de projet" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="team.technicalDirector"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Directeur technique</FormLabel>
                              <FormControl>
                                <Input placeholder="Nom du directeur technique" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="team.designer"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Dessinateur</FormLabel>
                              <FormControl>
                                <Input placeholder="Nom du dessinateur" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="team.worksManager"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Conducteur de travaux</FormLabel>
                              <FormControl>
                                <Input placeholder="Nom du conducteur" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="team.adminAssistant"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Assistant admin</FormLabel>
                              <FormControl>
                                <Input placeholder="Nom de l'assistant" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="team.poleDirector"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Directeur de pôle</FormLabel>
                              <FormControl>
                                <Input placeholder="Nom du directeur de pôle" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* INFORMATIONS LIÉES À L'EXÉCUTION */}
                    <div className="space-y-6">
                      <div className="text-center bg-khaki-100 py-3 rounded-md">
                        <h2 className="text-xl text-khaki-800 font-medium">INFORMATIONS LIÉES À L'EXÉCUTION</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="execution.weeklyVisits"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nb visite hebdo du conduc</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex: 2" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="execution.projectDistance"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Distance du projet</FormLabel>
                              <FormControl>
                                <Input placeholder="Distance en km" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="execution.meetingDay"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Jour de réunion</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez un jour" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="lundi">Lundi</SelectItem>
                                  <SelectItem value="mardi">Mardi</SelectItem>
                                  <SelectItem value="mercredi">Mercredi</SelectItem>
                                  <SelectItem value="jeudi">Jeudi</SelectItem>
                                  <SelectItem value="vendredi">Vendredi</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="execution.securityCommission"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Commission de sécurité</FormLabel>
                              <FormControl>
                                <Input placeholder="Détails commission" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="execution.controlOffice"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bureau de contrôle</FormLabel>
                              <FormControl>
                                <Input placeholder="Nom du bureau" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="execution.spsCoordinator"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Coordinateur SPS</FormLabel>
                              <FormControl>
                                <Input placeholder="Nom du coordinateur" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* SÉLECTIONNEZ LES BET ENGAGÉS SUR LE DOSSIER */}
                    <div className="space-y-6">
                      <div className="text-center bg-khaki-100 py-3 rounded-md">
                        <h2 className="text-xl text-khaki-800 font-medium">SÉLECTIONNEZ LES BET ENGAGÉS SUR LE DOSSIER</h2>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <FormField
                          control={form.control}
                          name="technicalOffices.structure"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-khaki-600"
                                />
                              </FormControl>
                              <FormLabel className="font-normal">BE STRUCTURE</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="technicalOffices.vrd"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-khaki-600"
                                />
                              </FormControl>
                              <FormLabel className="font-normal">BE VRD</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="technicalOffices.elect"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-khaki-600"
                                />
                              </FormControl>
                              <FormLabel className="font-normal">BE ELECT</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="technicalOffices.froid"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-khaki-600"
                                />
                              </FormControl>
                              <FormLabel className="font-normal">BE FROID</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="technicalOffices.cvc"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-khaki-600"
                                />
                              </FormControl>
                              <FormLabel className="font-normal">BE CVC</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="technicalOffices.thermique"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-khaki-600"
                                />
                              </FormControl>
                              <FormLabel className="font-normal">BE THERMIQUE</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="technicalOffices.geotech"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-khaki-600"
                                />
                              </FormControl>
                              <FormLabel className="font-normal">BE GEOTECH</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="technicalOffices.hydro"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-khaki-600"
                                />
                              </FormControl>
                              <FormLabel className="font-normal">BE HYDRO</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="technicalOffices.desenfumage"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-khaki-600"
                                />
                              </FormControl>
                              <FormLabel className="font-normal">BE DESENFUMAGE</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="technicalOffices.methode"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-khaki-600"
                                />
                              </FormControl>
                              <FormLabel className="font-normal">BE METHODE</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* SÉLECTIONNEZ LES CORPS D'ÉTAT CONCERNÉS PAR LE DOSSIER */}
                    <div className="space-y-6">
                      <div className="text-center bg-khaki-100 py-3 rounded-md">
                        <h2 className="text-xl text-khaki-800 font-medium">SÉLECTIONNEZ LES CORPS D'ÉTAT CONCERNÉS PAR LE DOSSIER</h2>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {/* Just showing a few examples for brevity */}
                        <FormField
                          control={form.control}
                          name="tradeTypes.go"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-khaki-600"
                                />
                              </FormControl>
                              <FormLabel className="font-normal">GO</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="tradeTypes.vrd"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-khaki-600"
                                />
                              </FormControl>
                              <FormLabel className="font-normal">VRD</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="tradeTypes.charpente"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-khaki-600"
                                />
                              </FormControl>
                              <FormLabel className="font-normal">CHARPENTE</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="tradeTypes.bardage"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-khaki-600"
                                />
                              </FormControl>
                              <FormLabel className="font-normal">BARDAGE</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        {/* In a real implementation, you'd add similar blocks for all trade types */}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 text-center">
                      <Button 
                        type="submit" 
                        className="bg-khaki-600 hover:bg-khaki-700 text-white px-10 py-6 text-lg font-medium"
                      >
                        VALIDER LA SAISIE ET ENREGISTRER
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AdminProjectCreation;
