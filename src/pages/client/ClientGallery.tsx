
import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, ImageIcon, InfoIcon } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    title: "Fondations - Jour 1",
    date: "15/01/2023",
    url: "https://images.unsplash.com/photo-1621139265171-1440bb8dbac4?q=80&w=2574&auto=format&fit=crop",
    phase: "fondations"
  },
  {
    id: 2,
    title: "Fondations - Jour 3",
    date: "18/01/2023",
    url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop",
    phase: "fondations"
  },
  {
    id: 3,
    title: "Gros œuvre - Semaine 1",
    date: "25/01/2023",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
    phase: "gros-oeuvre"
  },
  {
    id: 4,
    title: "Gros œuvre - Murs",
    date: "01/02/2023",
    url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2574&auto=format&fit=crop",
    phase: "gros-oeuvre"
  },
  {
    id: 5,
    title: "Toiture - Installation",
    date: "15/02/2023",
    url: "https://images.unsplash.com/photo-1621439610416-a21a091ad91a?q=80&w=2670&auto=format&fit=crop",
    phase: "toiture"
  },
  {
    id: 6,
    title: "Second œuvre - Électricité",
    date: "01/03/2023",
    url: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=2670&auto=format&fit=crop",
    phase: "second-oeuvre"
  },
  {
    id: 7,
    title: "Second œuvre - Plomberie",
    date: "15/03/2023",
    url: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=2574&auto=format&fit=crop",
    phase: "second-oeuvre"
  },
  {
    id: 8,
    title: "Finitions - Peinture",
    date: "01/04/2023",
    url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2670&auto=format&fit=crop",
    phase: "finitions"
  }
];

const phases = [
  { id: "all", name: "Toutes les photos" },
  { id: "fondations", name: "Fondations" },
  { id: "gros-oeuvre", name: "Gros œuvre" },
  { id: "toiture", name: "Toiture" },
  { id: "second-oeuvre", name: "Second œuvre" },
  { id: "finitions", name: "Finitions" }
];

const ClientGallery = () => {
  return (
    <>
      <Helmet>
        <title>Galerie photos | Espace client Progineer</title>
      </Helmet>

      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">Galerie photos du projet</CardTitle>
            <ImageIcon className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-6">
              Suivez l'avancement de votre chantier en images. Ces photos sont prises régulièrement par notre équipe lors des visites de chantier.
            </p>

            <Tabs defaultValue="all" className="mt-2">
              <TabsList className="mb-6 flex flex-wrap border-b pb-0 pt-0 gap-1">
                {phases.map(phase => (
                  <TabsTrigger 
                    key={phase.id} 
                    value={phase.id}
                    className="data-[state=active]:bg-khaki-100 data-[state=active]:text-khaki-800 rounded-full px-4 py-1 data-[state=active]:shadow-none"
                  >
                    {phase.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {phases.map(phase => (
                <TabsContent key={phase.id} value={phase.id} className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryImages
                      .filter(img => phase.id === 'all' || img.phase === phase.id)
                      .map(image => (
                        <div key={image.id} className="group relative overflow-hidden rounded-lg bg-gray-100">
                          <img 
                            src={image.url} 
                            alt={image.title} 
                            className="h-52 w-full object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                            <h4 className="text-white font-medium">{image.title}</h4>
                            <div className="flex items-center mt-1 text-white/80 text-sm">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              {image.date}
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-white/90 text-xs px-2 py-1 rounded font-medium">
                            {phases.find(p => p.id === image.phase)?.name}
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Informations</CardTitle>
            <InfoIcon className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-600">
              Vous souhaitez recevoir plus de photos ou avez des questions sur une étape particulière ? 
              N'hésitez pas à contacter votre chef de projet via la messagerie de l'espace client.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ClientGallery;
