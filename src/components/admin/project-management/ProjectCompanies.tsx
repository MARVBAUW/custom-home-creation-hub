
import React, { useState } from 'react';
import { Plus, Edit, Trash, X } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import { Company } from '@/types/project';

interface ProjectCompaniesProps {
  projectId: string;
  companies?: Company[];
  onAddCompany?: (company: Company) => void;
  onUpdateCompany?: (index: number, company: Company) => void;
  onDeleteCompany?: (index: number) => void;
  readOnly?: boolean;
}

const ProjectCompanies = ({
  projectId,
  companies = [],
  onAddCompany,
  onUpdateCompany,
  onDeleteCompany,
  readOnly = false
}: ProjectCompaniesProps) => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Company>({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    role: 'Prestataire',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      contactName: '',
      email: '',
      phone: '',
      address: '',
      role: 'Prestataire',
    });
    setEditingIndex(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        title: "Champ requis",
        description: "Le nom de l'entreprise est requis",
        variant: "destructive",
      });
      return;
    }

    if (editingIndex !== null) {
      onUpdateCompany?.(editingIndex, formData);
      toast({
        title: "Entreprise modifiée",
        description: "Les informations de l'entreprise ont été mises à jour"
      });
    } else {
      onAddCompany?.(formData);
      toast({
        title: "Entreprise ajoutée",
        description: "L'entreprise a été ajoutée au projet"
      });
    }

    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEdit = (company: Company, index: number) => {
    setFormData(company);
    setEditingIndex(index);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (index: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette entreprise ?")) {
      onDeleteCompany?.(index);
      toast({
        title: "Entreprise supprimée",
        description: "L'entreprise a été retirée du projet"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Entreprises</CardTitle>
          {!readOnly && (
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => { resetForm(); setIsAddDialogOpen(true); }} 
                  className="bg-khaki-600 hover:bg-khaki-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une entreprise
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>
                      {editingIndex !== null ? "Modifier l'entreprise" : "Ajouter une entreprise"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingIndex !== null 
                        ? "Modifier les informations de l'entreprise pour ce projet" 
                        : "Ajouter une nouvelle entreprise à ce projet"}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 gap-2">
                      <Label htmlFor="name">Nom de l'entreprise *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contactName">Nom du contact</Label>
                        <Input
                          id="contactName"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="role">Rôle</Label>
                        <Input
                          id="role"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          placeholder="Prestataire"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Adresse</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" type="button" onClick={resetForm}>
                        Annuler
                      </Button>
                    </DialogClose>
                    <Button type="submit" className="bg-khaki-600 hover:bg-khaki-700 text-white">
                      {editingIndex !== null ? "Mettre à jour" : "Ajouter"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {companies.length > 0 ? (
          <div className="space-y-4">
            {companies.map((company, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">{company.name}</h3>
                  <div className="flex items-center">
                    <span className="bg-khaki-100 text-khaki-800 text-xs px-2 py-1 rounded">
                      {company.role || "Prestataire"}
                    </span>
                    
                    {!readOnly && (
                      <div className="flex ml-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEdit(company, index)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDelete(index)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Contact : </span>
                    {company.contactName || "Non défini"}
                  </div>
                  <div>
                    <span className="text-gray-500">Téléphone : </span>
                    {company.phone || "Non défini"}
                  </div>
                  <div>
                    <span className="text-gray-500">Email : </span>
                    {company.email || "Non défini"}
                  </div>
                  <div>
                    <span className="text-gray-500">Adresse : </span>
                    {company.address || "Non définie"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500">Aucune entreprise n'est rattachée à ce projet pour le moment.</p>
            {!readOnly && (
              <Button 
                className="mt-4 bg-khaki-600 hover:bg-khaki-700 text-white"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une entreprise
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCompanies;
