
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

// This would be populated from your actual pages in a real app
// For now, we'll mock some data
const mockSEOData = [
  { 
    path: '/', 
    title: 'Progineer | Architecte et maître d\'œuvre à Marseille et en PACA',
    description: 'Progineer, cabinet d\'architecte et maître d\'œuvre à Marseille et en PACA. Construction, rénovation et extension de maisons sur mesure. Devis gratuit.',
    hasH1: true,
    issues: []
  },
  { 
    path: '/prestations-maitre-oeuvre/renovation', 
    title: 'Rénovation complète de maisons et appartements en PACA | Progineer',
    description: 'Experts en rénovation à Marseille et en PACA. Transformez votre habitat avec Progineer, maître d\'œuvre spécialisé en rénovation complète de maisons et appartements.',
    hasH1: true,
    issues: []
  },
  { 
    path: '/workspace', 
    title: 'Workspace | Progineer - Architecte & Maître d\'œuvre en PACA',
    description: 'Workspace Progineer - Ressources et outils pour vos projets de construction, rénovation et extension en région PACA.',
    hasH1: false,
    issues: ['Missing H1 tag']
  },
  { 
    path: '/prestations-maitre-oeuvre/extension', 
    title: 'Extension de maison sur mesure en PACA | Maître d\'œuvre Progineer',
    description: 'Experts en rénovation à Marseille et en PACA. Transformez votre habitat avec Progineer, maître d\'œuvre spécialisé en rénovation complète de maisons et appartements.',
    hasH1: true,
    issues: ['Duplicate meta description']
  },
  { 
    path: '/estimation', 
    title: 'Estimation gratuite de projet de construction ou rénovation en PACA',
    description: 'Obtenez une estimation gratuite et détaillée pour votre projet de construction, rénovation ou extension avec Progineer, maître d\'œuvre expert en région PACA - Marseille, Nice, Toulon.',
    hasH1: true,
    issues: []
  }
];

const SEOMonitoring: React.FC = () => {
  const [seoData, setSeoData] = useState(mockSEOData);
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real app, this would fetch real data from your pages
  const refreshSEOData = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For demo, we're just reusing the same data
      setSeoData([...mockSEOData]);
    }, 1500);
  };
  
  // Count issues
  const totalIssues = seoData.reduce((count, page) => count + page.issues.length, 0);
  const pagesWithMissingH1 = seoData.filter(page => !page.hasH1).length;
  
  // Check for duplicate titles and descriptions
  const titles = seoData.map(page => page.title);
  const descriptions = seoData.map(page => page.description);
  
  const duplicateTitles = titles.filter((title, index) => 
    titles.indexOf(title) !== index
  ).length;
  
  const duplicateDescriptions = descriptions.filter((desc, index) => 
    descriptions.indexOf(desc) !== index
  ).length;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>SEO Monitoring</CardTitle>
            <CardDescription>Track and fix SEO issues across your site</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshSEOData}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{totalIssues}</div>
              <p className="text-sm text-muted-foreground">Total issues</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{duplicateTitles}</div>
              <p className="text-sm text-muted-foreground">Duplicate titles</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{duplicateDescriptions}</div>
              <p className="text-sm text-muted-foreground">Duplicate descriptions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{pagesWithMissingH1}</div>
              <p className="text-sm text-muted-foreground">Missing H1 tags</p>
            </CardContent>
          </Card>
        </div>
        
        <Table>
          <TableCaption>A list of all pages and their SEO status</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Page</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>H1</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {seoData.map((page) => (
              <TableRow key={page.path}>
                <TableCell className="font-medium">{page.path}</TableCell>
                <TableCell className="max-w-xs truncate" title={page.title}>{page.title}</TableCell>
                <TableCell className="max-w-xs truncate" title={page.description}>
                  {page.description}
                </TableCell>
                <TableCell>
                  {page.hasH1 ? 
                    <CheckCircle className="h-5 w-5 text-green-500" /> : 
                    <AlertCircle className="h-5 w-5 text-red-500" />}
                </TableCell>
                <TableCell>
                  {page.issues.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {page.issues.map((issue, i) => (
                        <Badge key={i} variant="destructive">{issue}</Badge>
                      ))}
                    </div>
                  ) : (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">OK</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SEOMonitoring;
