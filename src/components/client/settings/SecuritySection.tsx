
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SecuritySection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sécurité du compte</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-1">Mot de passe</h3>
            <p className="text-sm text-gray-500 mb-3">Modifiez votre mot de passe à tout moment pour garder votre compte sécurisé.</p>
            <Button variant="outline">Changer le mot de passe</Button>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-1">Adresse email</h3>
            <p className="text-sm text-gray-500 mb-3">Mettez à jour votre adresse email associée à votre compte.</p>
            <Button variant="outline">Mettre à jour l'email</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySection;
