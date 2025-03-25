
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Shield, FileText, Calendar, MessageSquare, User, Bell, Download, Info } from 'lucide-react';
import Container from '@/components/common/Container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ClientDocumentation = () => {
  return (
    <>
      <Helmet>
        <title>Documentation Espace Client | Progineer - Architecte & Maître d'œuvre en PACA</title>
        <meta name="description" content="Découvrez toutes les fonctionnalités disponibles dans votre espace client Progineer et apprenez à les utiliser efficacement." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Espace Client
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Documentation
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Découvrez toutes les fonctionnalités disponibles dans votre espace client et apprenez à les utiliser efficacement.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container size="lg">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <Tabs defaultValue="dashboard" className="p-6">
              <TabsList className="w-full max-w-4xl mx-auto bg-khaki-50 p-1 flex flex-wrap justify-center mb-8">
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Tableau de bord</span>
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Documents</span>
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Suivi de projet</span>
                </TabsTrigger>
                <TabsTrigger value="messages" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Messages</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Sécurité</span>
                </TabsTrigger>
              </TabsList>

              {/* Tableau de bord */}
              <TabsContent value="dashboard" className="space-y-8">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-khaki-600" />
                    Tableau de bord
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Le tableau de bord est le point central de votre espace client. Il vous offre une vue d'ensemble de votre projet et regroupe les informations essentielles.
                  </p>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">Vue d'ensemble</CardTitle>
                        <CardDescription>
                          Visualisez rapidement l'état de votre projet et accédez aux fonctionnalités principales
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                          <h3 className="font-medium mb-2">Fonctionnalités principales</h3>
                          <ul className="space-y-2 ml-6 list-disc text-gray-600">
                            <li>Accès rapide aux documents, au suivi de projet et aux messages</li>
                            <li>Vue synthétique de l'avancement global de votre projet</li>
                            <li>Indication de la prochaine étape prévue</li>
                            <li>Affichage des dernières notifications importantes</li>
                          </ul>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                          <h3 className="font-medium mb-2 text-blue-800">Astuce</h3>
                          <p className="text-blue-700">
                            Consultez votre tableau de bord régulièrement pour rester informé de l'évolution de votre projet et ne manquer aucune étape importante.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">Navigation</CardTitle>
                        <CardDescription>
                          Comment naviguer efficacement dans votre espace client
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                          <h3 className="font-medium mb-2">Menu latéral</h3>
                          <p className="text-gray-600">
                            Le menu de navigation situé sur la gauche de l'écran vous permet d'accéder rapidement aux différentes sections de votre espace client :
                          </p>
                          <ul className="space-y-2 ml-6 mt-2 list-disc text-gray-600">
                            <li><span className="font-medium">Tableau de bord</span> : Vue d'ensemble de votre projet</li>
                            <li><span className="font-medium">Documents</span> : Accès à tous vos documents</li>
                            <li><span className="font-medium">Suivi de projet</span> : Plannings et avancement</li>
                            <li><span className="font-medium">Messages</span> : Communication avec l'équipe projet</li>
                          </ul>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                          <h3 className="font-medium mb-2">Onglets</h3>
                          <p className="text-gray-600">
                            Certaines pages sont organisées en onglets pour faciliter l'accès aux différentes informations :
                          </p>
                          <ul className="space-y-2 ml-6 mt-2 list-disc text-gray-600">
                            <li><span className="font-medium">Vue d'ensemble</span> : Informations principales</li>
                            <li><span className="font-medium">Notifications</span> : Dernières alertes et mises à jour</li>
                            <li><span className="font-medium">Documents récents</span> : Derniers documents ajoutés</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Documents */}
              <TabsContent value="documents" className="space-y-8">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-khaki-600" />
                    Documents
                  </h2>
                  <p className="text-gray-600 mb-6">
                    La section Documents vous permet d'accéder à l'ensemble des fichiers relatifs à votre projet, organisés par catégories.
                  </p>
                  
                  <Accordion type="single" collapsible className="space-y-4">
                    <AccordionItem value="types" className="border rounded-lg p-2">
                      <AccordionTrigger className="px-4 hover:no-underline">
                        <span className="text-lg font-medium">Types de documents</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-2">
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                            <h3 className="font-medium mb-2">Administratifs</h3>
                            <p className="text-gray-600">Documents officiels liés à votre projet :</p>
                            <ul className="space-y-1 ml-6 mt-2 list-disc text-gray-600">
                              <li>Contrats et avenants</li>
                              <li>Permis de construire</li>
                              <li>Autorisations administratives</li>
                              <li>Attestations d'assurance</li>
                            </ul>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                            <h3 className="font-medium mb-2">Techniques</h3>
                            <p className="text-gray-600">Documents relatifs à la conception et l'exécution :</p>
                            <ul className="space-y-1 ml-6 mt-2 list-disc text-gray-600">
                              <li>Plans et dessins</li>
                              <li>Études techniques</li>
                              <li>Notices descriptives</li>
                              <li>Fiches produits</li>
                            </ul>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                            <h3 className="font-medium mb-2">Financiers</h3>
                            <p className="text-gray-600">Documents liés aux aspects financiers :</p>
                            <ul className="space-y-1 ml-6 mt-2 list-disc text-gray-600">
                              <li>Devis et factures</li>
                              <li>Situations de travaux</li>
                              <li>Échéanciers de paiement</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="actions" className="border rounded-lg p-2">
                      <AccordionTrigger className="px-4 hover:no-underline">
                        <span className="text-lg font-medium">Actions possibles</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-2">
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                            <h3 className="font-medium mb-2 flex items-center">
                              <Download className="h-4 w-4 mr-2" />
                              Téléchargement
                            </h3>
                            <p className="text-gray-600">
                              Tous les documents peuvent être téléchargés sur votre appareil en cliquant sur le bouton "Télécharger" à côté de chaque document.
                            </p>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                            <h3 className="font-medium mb-2">Recherche et filtrage</h3>
                            <p className="text-gray-600">
                              Utilisez la barre de recherche pour trouver rapidement un document spécifique par son nom ou son contenu. Vous pouvez également filtrer les documents par :
                            </p>
                            <ul className="space-y-1 ml-6 mt-2 list-disc text-gray-600">
                              <li>Type de document</li>
                              <li>Date d'ajout</li>
                              <li>Statut</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="statuts" className="border rounded-lg p-2">
                      <AccordionTrigger className="px-4 hover:no-underline">
                        <span className="text-lg font-medium">Statuts des documents</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-2">
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                            <p className="text-gray-600">
                              Chaque document peut avoir l'un des statuts suivants :
                            </p>
                            <ul className="space-y-3 ml-6 mt-3 list-disc">
                              <li className="text-blue-700"><span className="font-medium">Nouveau</span> - Document récemment ajouté</li>
                              <li className="text-amber-700"><span className="font-medium">Mis à jour</span> - Document modifié récemment</li>
                              <li className="text-green-700"><span className="font-medium">Validé</span> - Document approuvé</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabsContent>

              {/* Suivi de projet */}
              <TabsContent value="projects" className="space-y-8">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-khaki-600" />
                    Suivi de projet
                  </h2>
                  <p className="text-gray-600 mb-6">
                    La section Suivi de projet vous permet de visualiser l'avancement global et détaillé de votre projet, ainsi que le planning prévisionnel.
                  </p>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Avancement global</CardTitle>
                      <CardDescription>
                        Visualisation de la progression de votre projet
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                        <h3 className="font-medium mb-2">Barre de progression</h3>
                        <p className="text-gray-600">
                          La barre de progression indique le pourcentage d'avancement global de votre projet, calculé en fonction des étapes terminées.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                        <h3 className="font-medium mb-2">Étapes du projet</h3>
                        <p className="text-gray-600 mb-3">
                          Votre projet est divisé en plusieurs étapes majeures :
                        </p>
                        <ul className="space-y-2 ml-6 list-disc text-gray-600">
                          <li><span className="font-medium">Conception</span> - Élaboration des plans et études</li>
                          <li><span className="font-medium">Dépôt de permis</span> - Préparation et dépôt des autorisations</li>
                          <li><span className="font-medium">Obtention du permis</span> - Réception des autorisations</li>
                          <li><span className="font-medium">Préparation chantier</span> - Organisation avant démarrage</li>
                          <li><span className="font-medium">Gros œuvre</span> - Fondations, structure, toiture</li>
                          <li><span className="font-medium">Second œuvre</span> - Plomberie, électricité, isolation</li>
                          <li><span className="font-medium">Finitions</span> - Peinture, revêtements, aménagements</li>
                          <li><span className="font-medium">Livraison</span> - Réception des travaux</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-xl">Calendrier</CardTitle>
                      <CardDescription>
                        Planification temporelle de votre projet
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                        <h3 className="font-medium mb-2">Planning prévisionnel</h3>
                        <p className="text-gray-600">
                          Le planning prévisionnel présente les dates clés de votre projet :
                        </p>
                        <ul className="space-y-2 ml-6 mt-2 list-disc text-gray-600">
                          <li>Dates de début et fin des différentes étapes</li>
                          <li>Réunions de chantier et rendez-vous importants</li>
                          <li>Jalons administratifs (dépôt de permis, validation, etc.)</li>
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                        <h3 className="font-medium mb-2 text-blue-800">Rappels automatiques</h3>
                        <p className="text-blue-700">
                          Vous recevez automatiquement des notifications avant chaque événement important prévu dans le calendrier.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Messages */}
              <TabsContent value="messages" className="space-y-8">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-khaki-600" />
                    Messages
                  </h2>
                  <p className="text-gray-600 mb-6">
                    La messagerie intégrée vous permet de communiquer directement avec votre chef de projet et les différents intervenants.
                  </p>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Fonctionnalités de messagerie</CardTitle>
                      <CardDescription>
                        Outils de communication disponibles
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                        <h3 className="font-medium mb-2">Conversations</h3>
                        <p className="text-gray-600">
                          Vous pouvez échanger des messages avec :
                        </p>
                        <ul className="space-y-2 ml-6 mt-2 list-disc text-gray-600">
                          <li>Votre chef de projet (interlocuteur principal)</li>
                          <li>L'architecte en charge de votre dossier</li>
                          <li>Le service administratif pour les questions contractuelles</li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                        <h3 className="font-medium mb-2">Pièces jointes</h3>
                        <p className="text-gray-600">
                          Vous pouvez joindre des fichiers à vos messages :
                        </p>
                        <ul className="space-y-2 ml-6 mt-2 list-disc text-gray-600">
                          <li>Photos (format JPG, PNG)</li>
                          <li>Documents (PDF, Word, Excel)</li>
                          <li>Taille maximale : 10 Mo par fichier</li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                        <h3 className="font-medium mb-2">Notifications</h3>
                        <p className="text-gray-600">
                          Vous êtes notifié par email lorsque vous recevez un nouveau message, afin de ne manquer aucune communication importante.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-xl">Bonnes pratiques</CardTitle>
                      <CardDescription>
                        Conseils pour une communication efficace
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-khaki-50 p-4 rounded-md border border-khaki-100">
                        <ul className="space-y-2 ml-6 list-disc text-gray-700">
                          <li>Précisez clairement l'objet de votre message</li>
                          <li>Pour les questions urgentes, privilégiez l'appel téléphonique en complément</li>
                          <li>Regroupez vos questions dans un seul message lorsque c'est possible</li>
                          <li>Conservez l'historique des échanges pour le suivi</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Notifications */}
              <TabsContent value="notifications" className="space-y-8">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-khaki-600" />
                    Notifications
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Le système de notifications vous tient informé des événements importants liés à votre projet.
                  </p>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Types de notifications</CardTitle>
                      <CardDescription>
                        Différentes catégories d'alertes
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                        <h3 className="font-medium mb-2">Document</h3>
                        <p className="text-gray-600">
                          Notifications liées aux documents :
                        </p>
                        <ul className="space-y-1 ml-6 mt-2 list-disc text-gray-600">
                          <li>Ajout d'un nouveau document</li>
                          <li>Mise à jour d'un document existant</li>
                          <li>Demande de validation d'un document</li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                        <h3 className="font-medium mb-2">Événement</h3>
                        <p className="text-gray-600">
                          Rappels concernant les événements à venir :
                        </p>
                        <ul className="space-y-1 ml-6 mt-2 list-disc text-gray-600">
                          <li>Réunions de chantier</li>
                          <li>Rendez-vous importants</li>
                          <li>Dates clés du planning</li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                        <h3 className="font-medium mb-2">Message</h3>
                        <p className="text-gray-600">
                          Alertes liées à la messagerie :
                        </p>
                        <ul className="space-y-1 ml-6 mt-2 list-disc text-gray-600">
                          <li>Réception d'un nouveau message</li>
                          <li>Réponse à l'un de vos messages</li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                        <h3 className="font-medium mb-2">Projet</h3>
                        <p className="text-gray-600">
                          Informations sur l'avancement :
                        </p>
                        <ul className="space-y-1 ml-6 mt-2 list-disc text-gray-600">
                          <li>Validation d'une étape</li>
                          <li>Changement de statut</li>
                          <li>Modification importante</li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                        <h3 className="font-medium mb-2">Paiement</h3>
                        <p className="text-gray-600">
                          Rappels concernant les échéances financières :
                        </p>
                        <ul className="space-y-1 ml-6 mt-2 list-disc text-gray-600">
                          <li>Échéance de paiement à venir</li>
                          <li>Confirmation de réception d'un paiement</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-xl">Paramètres de notification</CardTitle>
                      <CardDescription>
                        Personnalisation des alertes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                        <p className="text-gray-600">
                          Vous pouvez personnaliser les notifications que vous recevez :
                        </p>
                        <ul className="space-y-2 ml-6 mt-2 list-disc text-gray-600">
                          <li>Choisir les types de notifications à recevoir</li>
                          <li>Définir le mode de réception (email, notification dans l'application)</li>
                          <li>Régler la fréquence des rappels pour les événements</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Sécurité */}
              <TabsContent value="security" className="space-y-8">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-khaki-600" />
                    Sécurité
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Votre espace client est sécurisé pour garantir la confidentialité de vos données et documents.
                  </p>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Authentification</CardTitle>
                      <CardDescription>
                        Protection de votre compte
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                        <h3 className="font-medium mb-2">Connexion sécurisée</h3>
                        <p className="text-gray-600">
                          Votre espace client est protégé par :
                        </p>
                        <ul className="space-y-2 ml-6 mt-2 list-disc text-gray-600">
                          <li>Authentification par email et mot de passe</li>
                          <li>Connexion sécurisée via HTTPS</li>
                          <li>Déconnexion automatique après une période d'inactivité</li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                        <h3 className="font-medium mb-2">Recommandations</h3>
                        <p className="text-gray-600">
                          Pour sécuriser votre compte :
                        </p>
                        <ul className="space-y-2 ml-6 mt-2 list-disc text-gray-600">
                          <li>Utilisez un mot de passe unique et complexe</li>
                          <li>Ne partagez pas vos identifiants</li>
                          <li>Déconnectez-vous après chaque session</li>
                          <li>Signalez immédiatement toute activité suspecte</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-xl">Protection des données</CardTitle>
                      <CardDescription>
                        Confidentialité et sécurité de vos informations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                        <h3 className="font-medium mb-2">Mesures de sécurité</h3>
                        <p className="text-gray-600 mb-3">
                          Nous protégeons vos données par :
                        </p>
                        <ul className="space-y-2 ml-6 list-disc text-gray-600">
                          <li>Chiffrement des données sensibles</li>
                          <li>Hébergement sécurisé sur des serveurs en France</li>
                          <li>Sauvegardes régulières</li>
                          <li>Accès restreint aux personnels autorisés</li>
                        </ul>
                      </div>
                      
                      <div className="bg-khaki-50 p-4 rounded-md border border-khaki-100 mt-4">
                        <h3 className="font-medium mb-2 flex items-center">
                          <Info className="h-4 w-4 mr-2 text-khaki-700" />
                          Conformité RGPD
                        </h3>
                        <p className="text-gray-700">
                          Toutes vos données sont traitées dans le strict respect du Règlement Général sur la Protection des Données (RGPD). Pour plus d'informations, consultez notre politique de confidentialité.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="border-t border-gray-200 mt-12 pt-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Besoin d'aide supplémentaire ?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Si vous avez des questions ou besoin d'assistance pour utiliser votre espace client, 
                n'hésitez pas à contacter notre équipe support.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/workspace/client-area">
                  <Button className="bg-khaki-600 hover:bg-khaki-700">
                    Accéder à votre espace client
                  </Button>
                </Link>
                
                <Link to="/contact">
                  <Button variant="outline">
                    Contacter le support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ClientDocumentation;
