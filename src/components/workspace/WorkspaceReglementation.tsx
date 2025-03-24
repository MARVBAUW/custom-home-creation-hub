
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileCheck, Clock, Calendar, ArrowUpRight, Bell } from 'lucide-react';
import Button from '@/components/common/Button';

// Articles d'actualité générés
const actualites = [
  {
    id: 1,
    title: "La RE2020 : nouvelles exigences pour les constructions à partir de septembre 2024",
    description: "La Réglementation Environnementale 2020 entre dans sa phase finale avec des seuils plus stricts pour les émissions de carbone et la performance énergétique des bâtiments neufs.",
    date: "2024-05-15",
    category: "réglementation",
    source: "Ministère de la Transition Écologique",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "Aides MaPrimeRénov' 2024 : ce qui change pour les propriétaires",
    description: "Les nouveaux critères d'éligibilité et plafonds de l'aide à la rénovation énergétique évoluent en faveur des rénovations d'ampleur et des ménages modestes.",
    date: "2024-05-12",
    category: "financement",
    source: "ANAH",
    readTime: "4 min"
  },
  {
    id: 3,
    title: "DPE correctif : nouvelles mesures pour les logements mal évalués",
    description: "Le gouvernement met en place un dispositif permettant de faire réviser les Diagnostics de Performance Énergétique jugés défavorables après vérification technique.",
    date: "2024-05-08",
    category: "diagnostic",
    source: "ADEME",
    readTime: "3 min"
  },
  {
    id: 4,
    title: "Fin des passoires thermiques : le calendrier s'accélère pour les propriétaires bailleurs",
    description: "À partir de 2025, les logements classés G ne pourront plus être proposés à la location, une échéance qui inquiète les propriétaires de biens anciens.",
    date: "2024-05-03",
    category: "réglementation",
    source: "Ministère du Logement",
    readTime: "6 min"
  },
  {
    id: 5,
    title: "Obligation d'un audit énergétique : les notaires en première ligne",
    description: "L'obligation d'un audit énergétique pour les ventes de maisons individuelles classées F et G est désormais en vigueur, les notaires doivent vérifier la conformité des dossiers.",
    date: "2024-04-28",
    category: "diagnostic",
    source: "Chambre des Notaires",
    readTime: "4 min"
  },
  {
    id: 6,
    title: "TVA à 5,5% pour les travaux d'isolation : quels matériaux sont éligibles ?",
    description: "La liste des matériaux d'isolation bénéficiant du taux réduit de TVA a été étendue pour inclure les isolants biosourcés à haute performance environnementale.",
    date: "2024-04-22",
    category: "fiscalité",
    source: "Direction Générale des Finances Publiques",
    readTime: "5 min"
  },
  {
    id: 7,
    title: "Loi Climat et Résilience : impact sur l'artificialisation des sols",
    description: "Les collectivités locales doivent désormais réviser leurs documents d'urbanisme pour respecter l'objectif de réduction de l'artificialisation des sols de 50% d'ici 2030.",
    date: "2024-04-18",
    category: "urbanisme",
    source: "France Urbaine",
    readTime: "7 min"
  },
  {
    id: 8,
    title: "BIM obligatoire pour les marchés publics de construction supérieurs à 5 millions d'euros",
    description: "Une nouvelle directive rend obligatoire l'utilisation du Building Information Modeling (BIM) pour tous les marchés publics de construction dépassant un certain seuil.",
    date: "2024-04-15",
    category: "construction",
    source: "Ministère de l'Économie",
    readTime: "4 min"
  },
  {
    id: 9,
    title: "Nouvelles normes parasismiques pour les constructions en zone 3",
    description: "Les règles de construction parasismique évoluent pour les zones à risque modéré, avec des exigences renforcées pour certains types de structures.",
    date: "2024-04-10",
    category: "sécurité",
    source: "BRGM",
    readTime: "5 min"
  },
];

// Simulation de l'IA qui publie 3 articles par semaine
const WorkspaceReglementation = () => {
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<typeof actualites>([]);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [nextScheduledUpdate, setNextScheduledUpdate] = useState<string>("");
  const itemsPerPage = 4;
  
  useEffect(() => {
    // Simulation de l'IA qui met à jour les articles
    const now = new Date();
    
    // Format pour la dernière mise à jour
    const formatLastUpdate = new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(now);
    
    // Calcul de la prochaine mise à jour (prochains jours de la semaine : lundi, mercredi, vendredi)
    const daysToAdd = [1, 3, 5]; // Lundi, Mercredi, Vendredi (0 = dimanche, 1 = lundi, etc.)
    const currentDay = now.getDay();
    
    let nextUpdateDay = daysToAdd.find(day => day > currentDay);
    if (!nextUpdateDay) nextUpdateDay = daysToAdd[0] + 7; // Si on dépasse vendredi, on va au lundi suivant
    
    const daysUntilNext = nextUpdateDay - currentDay;
    const nextUpdate = new Date(now);
    nextUpdate.setDate(now.getDate() + (daysUntilNext <= 0 ? daysUntilNext + 7 : daysUntilNext));
    nextUpdate.setHours(8, 0, 0, 0); // 8h du matin
    
    const formatNextUpdate = new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(nextUpdate);
    
    setArticles(actualites);
    setLastUpdate(formatLastUpdate);
    setNextScheduledUpdate(formatNextUpdate);
  }, []);
  
  // Pagination
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const paginatedArticles = articles.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Veille réglementaire</h2>
        <p className="text-gray-600">L'actualité juridique et réglementaire du secteur de la construction et de l'immobilier.</p>
      </div>
      
      <Alert className="bg-khaki-50 border-khaki-200 mb-6">
        <Bell className="h-4 w-4 text-khaki-700" />
        <AlertTitle className="text-khaki-800">Publication automatisée</AlertTitle>
        <AlertDescription className="text-khaki-700">
          Notre IA analyse et publie automatiquement 3 articles par semaine sur les nouvelles réglementations.
          <div className="mt-2 text-sm flex flex-col sm:flex-row sm:gap-4 text-khaki-600">
            <span className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" /> Dernière mise à jour : {lastUpdate}
            </span>
            <span className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" /> Prochaine publication : {nextScheduledUpdate}
            </span>
          </div>
        </AlertDescription>
      </Alert>
      
      <div className="space-y-6">
        {paginatedArticles.map((article) => (
          <Card key={article.id} className="border-l-4 border-l-khaki-500 border-t-0 border-r-0 border-b-0 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div className="bg-khaki-100 text-khaki-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {article.category}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  {article.readTime}
                </div>
              </div>
              <CardTitle className="mt-2 text-xl font-semibold">{article.title}</CardTitle>
              <CardDescription className="mt-1 text-gray-600">{article.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-2 pb-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {new Date(article.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                <span className="mx-2">•</span>
                <span className="italic">{article.source}</span>
              </div>
              <Button variant="outline" size="sm" className="text-khaki-600 border-khaki-200">
                Lire l'article
                <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink 
                  onClick={() => setPage(i + 1)}
                  isActive={page === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                className={page === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <div className="bg-khaki-50 p-6 rounded-lg mt-8">
        <h3 className="text-lg font-medium mb-3 text-khaki-800">Documents réglementaires essentiels</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Mise à jour</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">RE2020 - Guide d'application</TableCell>
              <TableCell>Mars 2024</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">Télécharger</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">DTU 20.1 - Ouvrages en maçonnerie</TableCell>
              <TableCell>Janvier 2024</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">Télécharger</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Loi Climat et Résilience - Texte intégral</TableCell>
              <TableCell>Décembre 2023</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">Télécharger</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WorkspaceReglementation;
