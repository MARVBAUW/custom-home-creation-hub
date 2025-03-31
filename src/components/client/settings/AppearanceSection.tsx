
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const AppearanceSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Apparence</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="dark-mode">Thème de l'interface</Label>
            <p className="text-sm text-gray-500">Choisissez entre le mode clair et sombre.</p>
          </div>
          <ThemeToggle />
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSection;
