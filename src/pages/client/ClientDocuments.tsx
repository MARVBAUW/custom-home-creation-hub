
import React from 'react';
import { Helmet } from 'react-helmet';
import { useUser } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FileText, 
  Calendar, 
  MessageSquare, 
  User, 
  FileCheck,
  FileLock,
  File,
  Download,
  Search
} from 'lucide-react';
import Container from '@/components/common/Container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Sample document data
const documents = [
  { 
    id: 1, 
    name: 'Contrat de maîtrise d\'œuvre', 
    type: 'Contrat', 
    date: '15/04/2023', 
    status: 'Signé',
    category: 'contractuel',
    fileType: 'PDF'
  },
  { 
    id: 2, 
    name: 'Plans de la maison', 
    type: 'Plan', 
    date: '20/04/2023', 
    status: 'Validé',
    category: 'technique',
    fileType: 'DWG'
  },
  { 
    id: 3, 
    name: 'Devis travaux', 
    type: 'Devis', 
    date: '25/04/2023', 
    status: 'En attente',
    category: 'financier',
    fileType: 'PDF'
  },
  { 
    id: 4, 
    name: 'Attestation d\'assurance', 
    type: 'Assurance', 
    date: '30/04/2023', 
    status: 'Validé',
    category: 'contractuel',
    fileType: 'PDF'
  },
  { 
    id: 5, 
    name: 'Facture acompte', 
    type: 'Facture', 
    date: '05/05/2023', 
    status: 'Payé',
    category: 'financier',
    fileType: 'PDF'
  },
  { 
    id: 6, 
    name: 'Rapport d\'étude de sol', 
    type: 'Rapport', 
    date: '10/05/2023', 
    status: 'Validé',
    category: 'technique',
    fileType: 'PDF'
  },
];

const ClientDocuments = () => {
  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('all');
  
  // Filtered documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/workspace/sign-in');
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded || !isSignedIn) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
    </div>;
  }

  return (
    <>
      <Helmet>
        <title>Documents | Espace Client Progineer</title>
        <meta name="description" content="Consultez et téléchargez tous vos documents liés à votre projet Progineer." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
                Espace Client
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                Documents
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mb-8">
                Retrouvez ici tous les documents liés à votre projet.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="font-medium">Navigation</h2>
                </div>
                <div className="p-2">
                  <Link to="/workspace/client-area" className="flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-50">
                    <User className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>Tableau de bord</span>
                  </Link>
                  <Link to="/workspace/client-area/documents" className="flex items-center p-3 rounded-md bg-khaki-50 text-khaki-800 font-medium">
                    <FileText className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>Documents</span>
                  </Link>
                  <Link to="/workspace/client-area/projects" className="flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-50">
                    <Calendar className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>Suivi de projet</span>
                  </Link>
                  <Link to="/workspace/client-area/messages" className="flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-50">
                    <MessageSquare className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>Messages</span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle>Documents sécurisés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Rechercher un document..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Tabs 
                      value={activeCategory} 
                      onValueChange={setActiveCategory} 
                      className="w-full md:w-auto"
                    >
                      <TabsList className="grid grid-cols-4 w-full">
                        <TabsTrigger value="all">Tous</TabsTrigger>
                        <TabsTrigger value="contractuel">Contractuels</TabsTrigger>
                        <TabsTrigger value="technique">Techniques</TabsTrigger>
                        <TabsTrigger value="financier">Financiers</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  <div className="overflow-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                        <tr>
                          <th className="px-4 py-3 text-left">Document</th>
                          <th className="px-4 py-3 text-left">Type</th>
                          <th className="px-4 py-3 text-left">Date</th>
                          <th className="px-4 py-3 text-left">Statut</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredDocuments.length > 0 ? (
                          filteredDocuments.map((doc) => (
                            <tr key={doc.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3">
                                <div className="flex items-center">
                                  {doc.fileType === 'PDF' ? (
                                    <FileLock className="h-5 w-5 mr-3 text-red-500" />
                                  ) : doc.fileType === 'DWG' ? (
                                    <FileCheck className="h-5 w-5 mr-3 text-blue-500" />
                                  ) : (
                                    <File className="h-5 w-5 mr-3 text-gray-500" />
                                  )}
                                  <span className="font-medium">{doc.name}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-gray-600">{doc.type}</td>
                              <td className="px-4 py-3 text-gray-600">{doc.date}</td>
                              <td className="px-4 py-3">
                                <Badge variant={
                                  doc.status === 'Validé' ? 'default' :
                                  doc.status === 'Signé' ? 'default' :
                                  doc.status === 'Payé' ? 'default' :
                                  doc.status === 'En attente' ? 'outline' : 'secondary'
                                } className={
                                  doc.status === 'Validé' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                                  doc.status === 'Signé' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                                  doc.status === 'Payé' ? 'bg-purple-100 text-purple-800 hover:bg-purple-100' :
                                  doc.status === 'En attente' ? 'bg-yellow-50 text-yellow-800 hover:bg-yellow-50' : ''
                                }>
                                  {doc.status}
                                </Badge>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4 mr-1" />
                                  Télécharger
                                </Button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                              Aucun document ne correspond à votre recherche
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ClientDocuments;
