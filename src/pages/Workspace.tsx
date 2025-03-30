
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import SEO from '@/components/common/SEO';
import Container from '@/components/common/Container';

const Workspace = () => {
  return (
    <>
      <SEO 
        title="Espace de travail | Progineer" 
        description="Accédez à l'espace de travail Progineer pour utiliser nos outils professionnels de construction et d'architecture"
      />
      
      <Navbar />
      
      <div className="pt-32 pb-16">
        <Container size="lg">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">Espace de travail Progineer</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Accédez à nos outils professionnels pour la construction et l'architecture
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Espace client */}
            <div className="glassmorphism rounded-lg p-6 hover:shadow-lg transition-all">
              <h2 className="text-xl font-medium mb-3">Espace client</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Suivez l'avancement de votre projet, consultez vos documents et échangez avec l'équipe.
              </p>
              <Button asChild variant="default" className="w-full">
                <a href="/workspace/client-area">Accéder à l'espace client</a>
              </Button>
            </div>
            
            {/* Veille réglementaire */}
            <div className="glassmorphism rounded-lg p-6 hover:shadow-lg transition-all">
              <h2 className="text-xl font-medium mb-3">Veille réglementaire</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Consultez les dernières actualités juridiques et réglementaires du secteur.
              </p>
              <Button asChild variant="outline" className="w-full">
                <a href="/workspace/reglementation">Consulter la veille</a>
              </Button>
            </div>
            
            {/* Calculateurs */}
            <div className="glassmorphism rounded-lg p-6 hover:shadow-lg transition-all">
              <h2 className="text-xl font-medium mb-3">Calculateurs</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Utilisez nos calculateurs spécialisés pour vos projets de construction.
              </p>
              <Button asChild variant="outline" className="w-full">
                <a href="/workspace/calculateurs">Accéder aux calculateurs</a>
              </Button>
            </div>
            
            {/* Guides pratiques */}
            <div className="glassmorphism rounded-lg p-6 hover:shadow-lg transition-all">
              <h2 className="text-xl font-medium mb-3">Guides pratiques</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Découvrez nos guides et ressources pour vous aider dans vos démarches.
              </p>
              <Button asChild variant="outline" className="w-full">
                <a href="/workspace/guides">Consulter les guides</a>
              </Button>
            </div>
            
            {/* DTU et normes */}
            <div className="glassmorphism rounded-lg p-6 hover:shadow-lg transition-all">
              <h2 className="text-xl font-medium mb-3">DTU et normes</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Accédez à notre base de données de DTU et normes de construction.
              </p>
              <Button asChild variant="outline" className="w-full">
                <a href="/workspace/dtu">Consulter les DTU</a>
              </Button>
            </div>
            
            {/* Fichiers et documents */}
            <div className="glassmorphism rounded-lg p-6 hover:shadow-lg transition-all">
              <h2 className="text-xl font-medium mb-3">Fichiers et documents</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Téléchargez nos modèles de documents et fiches techniques.
              </p>
              <Button asChild variant="outline" className="w-full">
                <a href="/workspace/documents">Accéder aux documents</a>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Workspace;
