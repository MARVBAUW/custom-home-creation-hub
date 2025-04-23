import React, { useState, useEffect } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useHcaptcha } from '@/hooks/useHcaptcha';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'Le prénom doit contenir au moins 2 caractères'
  }),
  lastName: z.string().min(2, {
    message: 'Le nom doit contenir au moins 2 caractères'
  }),
  company: z.string().min(2, {
    message: 'Le nom de l\'entreprise doit contenir au moins 2 caractères'
  }),
  activity: z.string().min(1, {
    message: 'Veuillez sélectionner une activité'
  }),
  email: z.string().email({
    message: 'Veuillez entrer une adresse email valide'
  }),
  phone: z.string().min(10, {
    message: 'Veuillez entrer un numéro de téléphone valide'
  }),
  message: z.string().min(10, {
    message: 'Veuillez décrire votre activité (minimum 10 caractères)'
  }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter les conditions'
  })
});

type FormValues = z.infer<typeof formSchema>;

const PartnerContactForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      company: '',
      activity: '',
      email: '',
      phone: '',
      message: '',
      acceptTerms: false
    }
  });
  const { verifyToken, isVerifying, error: captchaError } = useHcaptcha();
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaVisible, setCaptchaVisible] = useState(true);
  
  useEffect(() => {
    // Vérifier si le captcha est correctement chargé après 2 secondes
    const timer = setTimeout(() => {
      const captchaIframe = document.querySelector('iframe[src*="hcaptcha"]');
      if (!captchaIframe) {
        console.error("hCaptcha iframe non trouvé, tentative de rechargement");
        setCaptchaVisible(false);
        // Réafficher après un court délai
        setTimeout(() => setCaptchaVisible(true), 500);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [captchaVisible]);

  const onSubmit = async (data: FormValues) => {
    if (!captchaVerified) {
      toast({
        title: "Erreur",
        description: "Veuillez compléter le captcha",
        variant: "destructive"
      });
      return;
    }

    console.log(data);
    // Ici vous enverriez normalement les données à votre backend

    toast({
      title: "Demande envoyée",
      description: "Votre demande de partenariat a bien été envoyée. Nous vous contacterons rapidement."
    });
    form.reset();
    setCaptchaVerified(false);
  };

  const handleCaptchaVerify = async (token: string) => {
    console.log("Token hCaptcha reçu:", token ? token.substring(0, 10) + '...' : 'null');
    if (!token) {
      setCaptchaVerified(false);
      toast({
        title: "Erreur",
        description: "Échec de vérification du captcha",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const isValid = await verifyToken(token);
      console.log("Résultat de la vérification:", isValid);
      setCaptchaVerified(isValid);
      if (!isValid) {
        toast({
          title: "Erreur",
          description: "Échec de vérification du captcha",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error("Erreur lors de la vérification:", err);
      setCaptchaVerified(false);
      toast({
        title: "Erreur",
        description: "Erreur lors de la vérification du captcha",
        variant: "destructive"
      });
    }
  };

  return (
    <div id="partner-form" className="scroll-mt-24">
      <h3 className="text-2xl font-semibold mb-6">Devenir partenaire Progineer</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField control={form.control} name="firstName" render={({
            field
          }) => <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre prénom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            
            <FormField control={form.control} name="lastName" render={({
            field
          }) => <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
          </div>
          
          <FormField control={form.control} name="company" render={({
          field
        }) => <FormItem>
                <FormLabel>Entreprise</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de votre entreprise" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />
          
          <FormField control={form.control} name="activity" render={({
          field
        }) => <FormItem>
                <FormLabel>Activité</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre activité" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="artisan">Artisan</SelectItem>
                    <SelectItem value="entreprise">Entreprise du BTP</SelectItem>
                    <SelectItem value="architecte">Architecte / Designer</SelectItem>
                    <SelectItem value="bureau-etudes">Bureau d'études</SelectItem>
                    <SelectItem value="immobilier">Professionnel de l'immobilier</SelectItem>
                    <SelectItem value="fournisseur">Fournisseur de matériaux</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField control={form.control} name="email" render={({
            field
          }) => <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="votre@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            
            <FormField control={form.control} name="phone" render={({
            field
          }) => <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre numéro de téléphone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
          </div>
          
          <FormField control={form.control} name="message" render={({
          field
        }) => <FormItem>
                <FormLabel>Présentez-vous et votre activité</FormLabel>
                <FormControl>
                  <Textarea placeholder="Parlez-nous de votre expérience, vos compétences et vos motivations pour rejoindre notre réseau." className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />
          
          <FormField control={form.control} name="acceptTerms" render={({
          field
        }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">
                    J'accepte que mes données personnelles soient traitées conformément à la politique de confidentialité.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>} />
          
          <div className="mb-4">
            {captchaVisible && (
              <div className="border border-gray-200 rounded-md p-3 bg-gray-50">
                <HCaptcha
                  sitekey="4670f13a-0fac-4c08-a15c-73729bda05fa"
                  onVerify={handleCaptchaVerify}
                  onError={(err) => {
                    console.error("Erreur hCaptcha:", err);
                    toast({
                      title: "Erreur",
                      description: "Erreur de chargement du captcha",
                      variant: "destructive"
                    });
                  }}
                  onLoad={() => {
                    console.log("hCaptcha chargé avec succès");
                  }}
                />
                <p className="text-xs text-gray-500 mt-2">Cette vérification est nécessaire pour éviter les soumissions automatisées.</p>
              </div>
            )}
            {!captchaVisible && (
              <div className="p-3 mb-2 text-center">
                <p className="text-sm text-amber-600">Chargement du captcha...</p>
              </div>
            )}
            {captchaError && (
              <p className="mt-1 text-sm text-red-600">{captchaError}</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#787346]"
            disabled={!captchaVerified}
          >
            Envoyer ma candidature
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PartnerContactForm;
