
// Document types and interfaces
export interface Document {
  id: string;
  name: string;
  size: string;
  category: string;
  date: string;
  type: string;
}

export interface DocumentCategory {
  id: string;
  name: string;
  color: string;
}

// Document categories
export const documentCategories: DocumentCategory[] = [
  { id: "admin", name: "Administratif", color: "bg-blue-100 text-blue-800" },
  { id: "technical", name: "Technique", color: "bg-amber-100 text-amber-800" },
  { id: "contract", name: "Contrats", color: "bg-green-100 text-green-800" },
  { id: "financial", name: "Financier", color: "bg-purple-100 text-purple-800" },
  { id: "project", name: "Projet", color: "bg-khaki-100 text-khaki-800" },
];

// Mock document data for demonstration
export const mockDocuments: Document[] = [
  { 
    id: "1", 
    name: "Devis d'honoraires.pdf", 
    size: "245 KB", 
    category: "financial", 
    date: "15/07/2023",
    type: "pdf"
  },
  { 
    id: "2", 
    name: "Plans_DCE.pdf", 
    size: "1.2 MB", 
    category: "technical", 
    date: "20/07/2023",
    type: "pdf"
  },
  { 
    id: "3", 
    name: "Contrat_client.pdf", 
    size: "325 KB", 
    category: "contract", 
    date: "05/07/2023",
    type: "pdf"
  }
];
