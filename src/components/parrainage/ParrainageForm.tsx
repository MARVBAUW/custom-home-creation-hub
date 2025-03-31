
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Send } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

const ParrainageForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    yourName: '',
    yourEmail: '',
    yourPhone: '',
    friendName: '',
    friendEmail: '',
    friendPhone: '',
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
    
    if (!formData.yourName || !formData.yourEmail || !formData.friendName || !formData.friendEmail) {
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
      const { data, error } = await supabase.functions.invoke('send-referral-email', {
        body: formData
      });
      
      if (error) throw error;
      
      console.log("Referral form submitted successfully:", data);
      
      setIsSubmitted(true);
      setFormData({
        yourName: '',
        yourEmail: '',
        yourPhone: '',
        friendName: '',
        friendEmail: '',
        friendPhone: '',
        projectType: '',
        message: ''
      });
      
      toast({
        title: "Parrainage envoyé",
        description: "Nous avons bien reçu votre parrainage et contacterons votre ami rapidement.",
      });
    } catch (error) {
      console.error("Error submitting referral form:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du parrainage. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-6">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Parrainage envoyé avec succès</h3>
        <p className="text-gray-600 mb-6">
          Merci pour votre recommandation ! Nous contacterons votre ami dans les plus brefs délais.
        </p>
        <Button onClick={() => setIsSubmitted(false)}>
          Parrainer une autre personne
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">Recommander un ami</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Vos informations</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="yourName">Votre nom *</Label>
              <Input
                id="yourName"
                name="yourName"
                value={formData.yourName}
                onChange={handleChange}
                placeholder="Votre nom et prénom"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="yourEmail">Votre email *</Label>
              <Input
                id="yourEmail"
                name="yourEmail"
                type="email"
                value={formData.yourEmail}
                onChange={handleChange}
                placeholder="votre@email.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="yourPhone">Votre téléphone</Label>
              <Input
                id="yourPhone"
                name="yourPhone"
                value={formData.yourPhone}
                onChange={handleChange}
                placeholder="06 xx xx xx xx"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-2">
          <h3 className="text-lg font-medium mb-3">Informations de votre ami</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="friendName">Nom de votre ami *</Label>
              <Input
                id="friendName"
                name="friendName"
                value={formData.friendName}
                onChange={handleChange}
                placeholder="Nom et prénom"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="friendEmail">Email de votre ami *</Label>
              <Input
                id="friendEmail"
                name="friendEmail"
                type="email"
                value={formData.friendEmail}
                onChange={handleChange}
                placeholder="ami@email.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="friendPhone">Téléphone de votre ami</Label>
              <Input
                id="friendPhone"
                name="friendPhone"
                value={formData.friendPhone}
                onChange={handleChange}
                placeholder="06 xx xx xx xx"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="projectType">Type de projet</Label>
              <Select value={formData.projectType} onValueChange={(value) => handleSelectChange('projectType', value)}>
                <SelectTrigger id="projectType">
                  <SelectValue placeholder="Sélectionnez le type de projet" />
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
              <Label htmlFor="message">Message (optionnel)</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Ajoutez des informations supplémentaires sur le projet de votre ami..."
                rows={3}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700 my-4">
          <p className="font-medium">Comment fonctionne le parrainage ?</p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Vous nous recommandez à un ami ayant un projet</li>
            <li>Nous contactons votre ami pour discuter de son projet</li>
            <li>Si votre ami signe un contrat avec nous, vous recevez votre prime</li>
          </ol>
        </div>
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
              Envoi en cours...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Envoyer le parrainage
            </>
          )}
        </Button>
        
        <p className="text-xs text-gray-500 text-center">
          * Champs obligatoires. En soumettant ce formulaire, vous acceptez que nous contactions votre ami pour lui présenter nos services.
        </p>
      </form>
    </div>
  );
};

export default ParrainageForm;
