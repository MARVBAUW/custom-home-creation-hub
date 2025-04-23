
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import APIKeyManager from '@/components/admin/APIKeyManager';
import BacklinksManager from '@/components/admin/BacklinksManager';
import { Separator } from '@/components/ui/separator';

const AdminSettings = () => {
  return (
    <>
      <Helmet>
        <title>Paramètres Admin | Progineer</title>
      </Helmet>

      <div className="py-10">
        <Container>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Paramètres Administrateur
              </h2>
              <p className="text-gray-500">
                Gérez les paramètres administratifs de Progineer
              </p>
            </div>

            <Separator />

            <div className="grid gap-6">
              <APIKeyManager />
              <BacklinksManager />
              
              {/* Backlink verification section - more visible for crawlers */}
              <div className="mt-8 p-6 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                <h3 className="text-lg font-medium mb-3">Liens de partenariat</h3>
                <p className="mb-4 text-sm text-gray-600">
                  Vérifiez nos partenaires et ressources externes pour la maîtrise d'œuvre et l'architecture:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="mr-2">•</span>
                    <a 
                      href="https://www.maitredoeuvre.com/" 
                      className="text-blue-600 hover:underline"
                      rel="noopener"
                      target="_blank"
                    >
                      Trouver un maitre d'oeuvre
                    </a>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">•</span>
                    <a 
                      href="https://www.architectes-paca.org/" 
                      className="text-blue-600 hover:underline"
                      rel="noopener"
                      target="_blank"
                    >
                      Ordre des Architectes PACA
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AdminSettings;
