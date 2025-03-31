
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Send, Users, Wrench, Briefcase, FileText } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { supabase } from '@/integrations/supabase/client';

const PartnersSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    partnerType: 'artisan',
    experience: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.company || !formData.message) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Appel à la fonction Edge de Supabase
      const { data, error } = await supabase.functions.invoke('send-partnership-email', {
        body: formData
      });
      
      if (error) throw error;
      
      console.log("Partnership form submitted successfully:", data);
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        partnerType: 'artisan',
        experience: '',
        message: ''
      });
      
      toast({
        title: "Demande envoyée",
        description: "Nous avons bien reçu votre demande de partenariat et vous contacterons rapidement.",
      });
    } catch (error) {
      console.error("Error submitting partnership form:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de la demande. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Qui peut devenir partenaire ?</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Nous collaborons avec différents professionnels du bâtiment et de l'immobilier pour offrir des services complets à nos clients.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="p-6 hover:shadow-md transition-all">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-khaki-100 rounded-full flex items-center justify-center mb-4">
              <Wrench className="h-8 w-8 text-khaki-700" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Artisans & Entreprises</h3>
            <p className="text-gray-600">
              Tous corps de métiers pour la réalisation de travaux de qualité (électricité, plomberie, maçonnerie, menuiserie, etc.)
            </p>
          </div>
        </Card>
        
        <Card className="p-6 hover:shadow-md transition-all">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-khaki-100 rounded-full flex items-center justify-center mb-4">
              <Briefcase className="h-8 w-8 text-khaki-700" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Agents Commerciaux</h3>
            <p className="text-gray-600">
              Professionnels qui apportent des projets et participent au développement commercial de l'entreprise.
            </p>
          </div>
        </Card>
        
        <Card className="p-6 hover:shadow-md transition-all">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-khaki-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-khaki-700" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Bureaux d'Études</h3>
            <p className="text-gray-600">
              Structures techniques spécialisées (structure, thermique, acoustique, géotechnique, etc.)
            </p>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <h3 className="text-2xl font-bold mb-6">Rejoignez notre réseau</h3>
          <div className="space-y-4">
            <p className="text-gray-600">
              Devenir partenaire de Progineer, c'est rejoindre un réseau de professionnels partageant des valeurs communes :
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-khaki-600 mr-2 mt-0.5" />
                <span>Qualité et rigueur dans le travail</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-khaki-600 mr-2 mt-0.5" />
                <span>Engagement envers la satisfaction client</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-khaki-600 mr-2 mt-0.5" />
                <span>Respect des délais et des budgets</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-khaki-600 mr-2 mt-0.5" />
                <span>Transparence et communication efficace</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-khaki-600 mr-2 mt-0.5" />
                <span>Innovation et amélioration continue</span>
              </li>
            </ul>
            
            <div className="mt-8 p-4 bg-khaki-50 rounded-lg border border-khaki-100">
              <h4 className="text-lg font-semibold mb-2 flex items-center">
                <Users className="h-5 w-5 mr-2 text-khaki-700" />
                Avantages du partenariat
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-khaki-600 mr-2 mt-0.5" />
                  <span>Accès à des projets qualifiés</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-khaki-600 mr-2 mt-0.5" />
                  <span>Collaboration avec une équipe professionnelle</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-khaki-600 mr-2 mt-0.5" />
                  <span>Visibilité sur notre site et nos supports de communication</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-khaki-600 mr-2 mt-0.5" />
                  <span>Participation à nos événements réseau</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-khaki-600 mr-2 mt-0.5" />
                  <span>Recommandation auprès de nos clients</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div>
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">Formulaire de partenariat</h3>
            
            {isSubmitted ? (
              <div className="text-center py-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Demande envoyée avec succès</h3>
                <p className="text-gray-600 mb-6">
                  Merci pour votre intérêt. Notre équipe analysera votre demande et vous contactera dans les plus brefs délais.
                </p>
                <Button onClick={() => setIsSubmitted(false)}>
                  Envoyer une autre demande
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom et prénom"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email professionnel *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="06 xx xx xx xx"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Entreprise / Profession *</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nom de votre entreprise"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Type de partenariat *</Label>
                  <RadioGroup 
                    value={formData.partnerType} 
                    onValueChange={(value) => handleSelectChange('partnerType', value)}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="artisan" id="artisan" />
                      <Label htmlFor="artisan">Artisan / Entreprise du BTP</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="commercial" id="commercial" />
                      <Label htmlFor="commercial">Agent commercial</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bureau-etudes" id="bureau-etudes" />
                      <Label htmlFor="bureau-etudes">Bureau d'études</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="autre" id="autre" />
                      <Label htmlFor="autre">Autre</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Expérience</Label>
                  <Select 
                    value={formData.experience} 
                    onValueChange={(value) => handleSelectChange('experience', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Votre expérience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="moins-3">Moins de 3 ans</SelectItem>
                      <SelectItem value="3-5">3 à 5 ans</SelectItem>
                      <SelectItem value="5-10">5 à 10 ans</SelectItem>
                      <SelectItem value="plus-10">Plus de 10 ans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message / Motivations *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Présentez votre activité et expliquez pourquoi vous souhaitez devenir partenaire..."
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Envoyer ma demande
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-2">
                  * Champs obligatoires. Nous vous répondrons dans un délai de 48h ouvrées.
                </p>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;
