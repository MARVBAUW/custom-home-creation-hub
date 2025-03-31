
import React, { useState } from 'react';
import { Plus, Edit, Trash, FileText, Calendar, User, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { SiteReport, Company } from '@/types/project';
import { formatDateFrench } from '@/utils/dateUtils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SiteReportsProps {
  projectId: string;
  reports?: SiteReport[];
  companies?: Company[];
  onAddReport?: (report: SiteReport) => void;
  onUpdateReport?: (id: string, report: SiteReport) => void;
  onDeleteReport?: (id: string) => void;
  readOnly?: boolean;
}

const SiteReports = ({
  projectId,
  reports = [],
  companies = [],
  onAddReport,
  onUpdateReport,
  onDeleteReport,
  readOnly = false
}: SiteReportsProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<SiteReport | null>(null);
  const [formData, setFormData] = useState<Omit<SiteReport, 'id' | 'createdAt'>>({
    date: new Date().toISOString().split('T')[0],
    title: '',
    content: '',
    author: '',
    companies: [],
    photos: []
  });

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      title: '',
      content: '',
      author: '',
      companies: [],
      photos: []
    });
    setEditingReport(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCompanyToggle = (companyName: string) => {
    setFormData(prev => {
      const companies = [...prev.companies];
      if (companies.includes(companyName)) {
        return { ...prev, companies: companies.filter(c => c !== companyName) };
      } else {
        return { ...prev, companies: [...companies, companyName] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date) {
      toast({
        title: "Champs requis",
        description: "Le titre et la date sont requis",
        variant: "destructive",
      });
      return;
    }

    if (editingReport) {
      onUpdateReport?.(editingReport.id, {
        ...editingReport,
        ...formData,
      });
      toast({
        title: "CR modifié",
        description: "Le compte-rendu a été mis à jour"
      });
    } else {
      const newReport: SiteReport = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
      };
      onAddReport?.(newReport);
      toast({
        title: "CR ajouté",
        description: "Le compte-rendu a été ajouté au projet"
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (report: SiteReport) => {
    setEditingReport(report);
    setFormData({
      date: report.date,
      title: report.title,
      content: report.content,
      author: report.author,
      companies: report.companies,
      photos: report.photos || []
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce compte-rendu ?")) {
      onDeleteReport?.(id);
      toast({
        title: "CR supprimé",
        description: "Le compte-rendu a été supprimé"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Comptes-rendus de chantier</CardTitle>
          {!readOnly && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => { resetForm(); setIsDialogOpen(true); }} 
                  className="bg-khaki-600 hover:bg-khaki-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau CR
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>
                      {editingReport ? "Modifier le compte-rendu" : "Nouveau compte-rendu"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingReport 
                        ? "Modifier les informations du compte-rendu" 
                        : "Créer un nouveau compte-rendu de chantier"}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <ScrollArea className="max-h-[60vh]">
                    <div className="grid gap-4 py-4 px-1">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date">Date de visite *</Label>
                          <Input
                            id="date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="author">Auteur *</Label>
                          <Input
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="title">Titre *</Label>
                        <Input
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="content">Contenu</Label>
                        <Textarea
                          id="content"
                          name="content"
                          value={formData.content}
                          onChange={handleInputChange}
                          className="min-h-[150px]"
                        />
                      </div>
                      
                      <div>
                        <Label className="mb-2 block">Entreprises présentes</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {companies.length > 0 ? (
                            companies.map((company) => (
                              <div key={company.name} className="flex items-center">
                                <input 
                                  type="checkbox" 
                                  id={`company-${company.name}`}
                                  checked={formData.companies.includes(company.name)}
                                  onChange={() => handleCompanyToggle(company.name)}
                                  className="mr-2"
                                />
                                <Label htmlFor={`company-${company.name}`} className="text-sm cursor-pointer">
                                  {company.name}
                                </Label>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-500 col-span-2">
                              Aucune entreprise associée au projet
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="photos">Photos (URLs séparées par des virgules)</Label>
                        <Input
                          id="photos"
                          name="photos"
                          value={formData.photos?.join(', ') || ''}
                          onChange={(e) => 
                            setFormData({
                              ...formData, 
                              photos: e.target.value ? e.target.value.split(',').map(url => url.trim()) : []
                            })
                          }
                          placeholder="http://image1.jpg, http://image2.jpg"
                        />
                      </div>
                    </div>
                  </ScrollArea>
                  
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" type="button" onClick={resetForm}>
                        Annuler
                      </Button>
                    </DialogClose>
                    <Button type="submit" className="bg-khaki-600 hover:bg-khaki-700 text-white">
                      {editingReport ? "Mettre à jour" : "Ajouter"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {reports.length > 0 ? (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between mb-3">
                  <h3 className="font-medium">{report.title}</h3>
                  {!readOnly && (
                    <div className="flex">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEdit(report)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDelete(report.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm mb-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-3.5 w-3.5 mr-1.5" />
                    {formatDateFrench(new Date(report.date))}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User className="h-3.5 w-3.5 mr-1.5" />
                    {report.author}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FileText className="h-3.5 w-3.5 mr-1.5" />
                    Créé le {formatDateFrench(new Date(report.createdAt))}
                  </div>
                </div>
                
                {report.content && (
                  <div className="mb-3 text-sm bg-white p-3 border rounded">
                    {report.content}
                  </div>
                )}
                
                {report.companies && report.companies.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-gray-500 mb-1">Entreprises présentes:</p>
                    <div className="flex flex-wrap gap-1">
                      {report.companies.map((company) => (
                        <span key={company} className="bg-khaki-100 text-khaki-800 text-xs px-2 py-0.5 rounded">
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {report.photos && report.photos.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1 flex items-center">
                      <Camera className="h-3 w-3 mr-1" />
                      Photos ({report.photos.length})
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {report.photos.slice(0, 3).map((photo, index) => (
                        <a 
                          key={index} 
                          href={photo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="aspect-square bg-gray-200 rounded overflow-hidden"
                        >
                          <img 
                            src={photo} 
                            alt={`Photo ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </a>
                      ))}
                    </div>
                    {report.photos.length > 3 && (
                      <p className="text-xs text-center text-khaki-700 mt-1">
                        +{report.photos.length - 3} photos supplémentaires
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500">Aucun compte-rendu n'est disponible pour le moment.</p>
            {!readOnly && (
              <Button 
                className="mt-4 bg-khaki-600 hover:bg-khaki-700 text-white"
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Créer un compte-rendu
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SiteReports;
