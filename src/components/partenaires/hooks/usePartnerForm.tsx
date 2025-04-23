
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHcaptcha } from '@/hooks/useHcaptcha';
import { toast } from '@/components/ui/use-toast';
import { partnerFormSchema, type PartnerFormValues } from '../schemas/partnerFormSchema';

export const usePartnerForm = () => {
  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerFormSchema),
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
    const timer = setTimeout(() => {
      const captchaIframe = document.querySelector('iframe[src*="hcaptcha"]');
      if (!captchaIframe) {
        console.error("hCaptcha iframe non trouvé, tentative de rechargement");
        setCaptchaVisible(false);
        setTimeout(() => setCaptchaVisible(true), 500);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [captchaVisible]);

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

  const onSubmit = async (data: PartnerFormValues) => {
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

  return {
    form,
    captchaVisible,
    captchaVerified,
    captchaError,
    handleCaptchaVerify,
    onSubmit
  };
};
