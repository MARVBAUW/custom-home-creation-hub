import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import APIKeyManager from '@/components/admin/APIKeyManager';
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
              {/* Add other admin settings sections here */}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AdminSettings;
