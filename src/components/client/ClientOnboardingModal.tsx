
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { useForm, FormProvider, useFormContext, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

// Define the form schema
const projectFormSchema = z.object({
  // Personal information
  fullName: z.string().min(2, "Le nom complet est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  address: z.string().min(5, "Adresse requise"),
  
  // Project information
  projectTitle: z.string().min(2, "Titre du projet requis"),
  projectType: z.enum(["new", "renovation", "extension", "other"]),
  constructionType: z.enum(["residential", "commercial", "industrial", "other"]),
  projectDescription: z.string().min(30, "Description du projet requise (minimum 30 caractères)"),
  
  // Project details
  location: z.string().min(2, "Localisation requise"),
  surface: z.coerce.number().min(1, "Surface requise"),
  budget: z.coerce.number().min(1, "Budget requis"),
  
  // Options
  hasPool: z.boolean().default(false),
  hasSolarPanels: z.boolean().default(false),
  hasGarage: z.boolean().default(false),
  hasBasement: z.boolean().default(false),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

// Personal information form
const PersonalInfoForm = () => {
  const { register, formState: { errors } } = useFormContext<ProjectFormValues>();
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Nom complet*</Label>
        <Input id="fullName" {...register("fullName")} />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email*</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone*</Label>
        <Input id="phone" {...register("phone")} />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Adresse*</Label>
        <Input id="address" {...register("address")} />
        {errors.address && (
          <p className="text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>
    </div>
  );
};

// Project information form
const ProjectInfoForm = () => {
  const { register, formState: { errors } } = useFormContext<ProjectFormValues>();
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="projectTitle">Titre du projet*</Label>
        <Input id="projectTitle" {...register("projectTitle")} />
        {errors.projectTitle && (
          <p className="text-sm text-red-500">{errors.projectTitle.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="projectType">Type de projet*</Label>
        <Select defaultValue="new" {...register("projectType")}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">Construction neuve</SelectItem>
            <SelectItem value="renovation">Rénovation</SelectItem>
            <SelectItem value="extension">Extension</SelectItem>
            <SelectItem value="other">Autre</SelectItem>
          </SelectContent>
        </Select>
        {errors.projectType && (
          <p className="text-sm text-red-500">{errors.projectType.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="constructionType">Type de construction*</Label>
        <Select defaultValue="residential" {...register("constructionType")}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="residential">Résidentiel</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="industrial">Industriel</SelectItem>
            <SelectItem value="other">Autre</SelectItem>
          </SelectContent>
        </Select>
        {errors.constructionType && (
          <p className="text-sm text-red-500">{errors.constructionType.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="projectDescription">Description du projet*</Label>
        <Textarea 
          id="projectDescription" 
          {...register("projectDescription")} 
          rows={4} 
          placeholder="Décrivez votre projet en détail..."
        />
        {errors.projectDescription && (
          <p className="text-sm text-red-500">{errors.projectDescription.message}</p>
        )}
      </div>
    </div>
  );
};

// Project details form
const ProjectDetailsForm = () => {
  const { register, formState: { errors } } = useFormContext<ProjectFormValues>();
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="location">Localisation du projet*</Label>
        <Input id="location" {...register("location")} />
        {errors.location && (
          <p className="text-sm text-red-500">{errors.location.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="surface">Surface (m²)*</Label>
        <Input id="surface" type="number" {...register("surface")} />
        {errors.surface && (
          <p className="text-sm text-red-500">{errors.surface.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="budget">Budget estimé (€)*</Label>
        <Input id="budget" type="number" {...register("budget")} />
        {errors.budget && (
          <p className="text-sm text-red-500">{errors.budget.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label>Options</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="hasPool" {...register("hasPool")} className="h-4 w-4 rounded border-gray-300" />
            <Label htmlFor="hasPool" className="font-normal">Piscine</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="hasSolarPanels" {...register("hasSolarPanels")} className="h-4 w-4 rounded border-gray-300" />
            <Label htmlFor="hasSolarPanels" className="font-normal">Panneaux solaires</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="hasGarage" {...register("hasGarage")} className="h-4 w-4 rounded border-gray-300" />
            <Label htmlFor="hasGarage" className="font-normal">Garage</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="hasBasement" {...register("hasBasement")} className="h-4 w-4 rounded border-gray-300" />
            <Label htmlFor="hasBasement" className="font-normal">Sous-sol</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ClientOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillData?: Partial<ProjectFormValues>;
}

const ClientOnboardingModal: React.FC<ClientOnboardingModalProps> = ({ 
  isOpen, 
  onClose,
  prefillData 
}) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  
  const methods = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      projectTitle: "",
      projectType: "new",
      constructionType: "residential",
      projectDescription: "",
      location: "",
      surface: 0,
      budget: 0,
      hasPool: false,
      hasSolarPanels: false,
      hasGarage: false,
      hasBasement: false,
      ...prefillData
    }
  });
  
  // Use effect to set default email from user if available
  useEffect(() => {
    if (user?.email && !prefillData?.email) {
      methods.setValue("email", user.email);
    }
  }, [user, methods, prefillData]);
  
  const onSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour soumettre votre projet",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Save project information to Supabase
      const { error } = await supabase
        .from('client_projects')
        .upsert({
          user_id: user.id,
          title: data.projectTitle,
          project_type: data.projectType,
          construction_type: data.constructionType,
          description: data.projectDescription,
          location: data.location,
          surface: data.surface,
          budget: data.budget,
          has_pool: data.hasPool,
          has_solar_panels: data.hasSolarPanels,
          has_garage: data.hasGarage,
          has_basement: data.hasBasement,
          created_at: new Date().toISOString(),
          status: 'new'
        });
        
      // Update user profile information
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: data.fullName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          updated_at: new Date().toISOString()
        });
      
      if (error || profileError) {
        console.error("Error saving data:", error || profileError);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'enregistrement des données",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Succès",
          description: "Votre projet a été enregistré avec succès",
        });
        onClose();
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue est survenue",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Complétez votre profil projet</DialogTitle>
          <DialogDescription>
            Ces informations nous aideront à mieux comprendre votre projet et à vous fournir le meilleur service possible.
          </DialogDescription>
        </DialogHeader>
        
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
                <TabsTrigger value="project">Informations projet</TabsTrigger>
                <TabsTrigger value="details">Détails et options</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <PersonalInfoForm />
              </TabsContent>
              
              <TabsContent value="project">
                <ProjectInfoForm />
              </TabsContent>
              
              <TabsContent value="details">
                <ProjectDetailsForm />
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-between pt-4 border-t">
              {activeTab !== "personal" ? (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setActiveTab(activeTab === "details" ? "project" : "personal")}
                >
                  Précédent
                </Button>
              ) : (
                <div></div>
              )}
              
              {activeTab !== "details" ? (
                <Button 
                  type="button" 
                  onClick={() => setActiveTab(activeTab === "personal" ? "project" : "details")}
                >
                  Suivant
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting} className="bg-khaki-600 hover:bg-khaki-700 text-white">
                  {isSubmitting ? "Enregistrement..." : "Enregistrer le projet"}
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ClientOnboardingModal;
