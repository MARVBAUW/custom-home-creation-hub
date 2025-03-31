
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Send } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    projectType: '',
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
    
    if (!formData.name || !formData.email || !formData.message) {
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
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });
      
      if (error) throw error;
      
      console.log("Contact form submitted successfully:", data);
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        projectType: '',
        message: ''
      });
      
      toast({
        title: "Message envoyé",
        description: "Nous avons bien reçu votre message et vous répondrons rapidement.",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="p-6 bg-green-50 border-green-100">
        <div className="text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Message envoyé avec succès</h3>
          <p className="text-gray-600 mb-6">
            Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.
          </p>
          <Button onClick={() => setIsSubmitted(false)}>
            Envoyer un autre message
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
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
          <Label htmlFor="email">Email *</Label>
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
          <Label htmlFor="subject">Sujet</Label>
          <Select value={formData.subject} onValueChange={(value) => handleSelectChange('subject', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un sujet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="devis">Demande de devis</SelectItem>
              <SelectItem value="info">Information générale</SelectItem>
              <SelectItem value="partenariat">Partenariat</SelectItem>
              <SelectItem value="autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="projectType">Type de projet</Label>
          <Select value={formData.projectType} onValueChange={(value) => handleSelectChange('projectType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez votre projet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="construction">Construction neuve</SelectItem>
              <SelectItem value="renovation">Rénovation</SelectItem>
              <SelectItem value="extension">Extension</SelectItem>
              <SelectItem value="amenagement">Aménagement intérieur</SelectItem>
              <SelectItem value="autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Décrivez votre projet ou votre demande..."
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
              Envoyer le message
            </>
          )}
        </Button>
        
        <p className="text-xs text-gray-500 text-center mt-2">
          * Champs obligatoires. Vos données sont protégées conformément à notre politique de confidentialité.
        </p>
      </form>
    </Card>
  );
};

export default ContactForm;
