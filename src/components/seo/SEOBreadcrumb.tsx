
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface SEOBreadcrumbProps {
  items?: BreadcrumbItem[];
  currentPageName?: string;
  className?: string;
}

/**
 * Composant de fil d'Ariane optimisé pour le SEO avec données structurées
 */
const SEOBreadcrumb: React.FC<SEOBreadcrumbProps> = ({
  items = [],
  currentPageName,
  className = '',
}) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Générer les éléments de breadcrumb automatiquement si non fournis
  let breadcrumbItems: BreadcrumbItem[] = items.length > 0 ? items : [];
  
  if (breadcrumbItems.length === 0) {
    // Toujours commencer par l'accueil
    breadcrumbItems.push({ name: 'Accueil', path: '/' });
    
    // Construire le chemin de navigation à partir de l'URL
    let currentPath = '';
    
    pathSegments.forEach((segment, index) => {
      // Sauter le dernier segment si un nom de page est fourni
      if (currentPageName && index === pathSegments.length - 1) {
        return;
      }
      
      currentPath += `/${segment}`;
      
      // Transformer le segment en nom lisible
      const readableName = segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      
      breadcrumbItems.push({
        name: readableName,
        path: currentPath
      });
    });
    
    // Ajouter le nom de la page courante si fourni
    if (currentPageName) {
      breadcrumbItems.push({
        name: currentPageName,
        path: location.pathname
      });
    }
  }
  
  // Données structurées pour le breadcrumb
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://progineer.fr${item.path === '/' ? '' : item.path}`
    }))
  };
  
  return (
    <>
      {/* Données structurées pour les moteurs de recherche */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      
      {/* Affichage du fil d'Ariane */}
      <nav aria-label="Fil d'Ariane" className={`text-sm ${className}`}>
        <ol className="flex flex-wrap items-center space-x-2">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-400" aria-hidden="true">
                  /
                </span>
              )}
              
              {index < breadcrumbItems.length - 1 ? (
                <Link 
                  to={item.path} 
                  className="text-gray-600 hover:text-khaki-600 hover:underline"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="text-khaki-700 font-medium" aria-current="page">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default SEOBreadcrumb;
