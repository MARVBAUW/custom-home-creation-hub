
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import SEO from '@/components/common/SEO';
import Container from '@/components/common/Container';
import { 
  parseLocalSEOUrl, 
  getTargetPageForProfession,
  generatePageTitle,
  generatePageDescription,
  generatePageH1,
  formatCityName
} from '@/utils/localSEOUtils';
import ConstructionNeuve from './prestations/ConstructionNeuve';
import Renovation from './prestations/Renovation';
import Extension from './prestations/Extension';
import OptimisationEspace from './prestations/OptimisationEspace';
import DesignInterieur from './prestations/DesignInterieur';

interface LocalSEOPageParams {
  '*': string;
}

const LocalSEOPage: React.FC = () => {
  const params = useParams<LocalSEOPageParams>();
  const location = useLocation();
  const [seoParams, setSeoParams] = useState<{
    profession: string;
    city: string;
    targetPage: string;
    title: string;
    description: string;
    h1: string;
  } | null>(null);
  
  useEffect(() => {
    // On parse l'URL pour extraire les paramètres
    const fullPath = params['*'] || '';
    const parsedParams = parseLocalSEOUrl(fullPath);
    
    if (parsedParams) {
      const { profession, city } = parsedParams;
      const targetPage = getTargetPageForProfession(profession);
      const title = generatePageTitle(profession, city);
      const description = generatePageDescription(profession, city);
      const h1 = generatePageH1(profession, city);
      
      setSeoParams({
        profession,
        city,
        targetPage,
        title,
        description,
        h1
      });
    } else {
      console.error("URL format incorrect ou paramètres non reconnus");
    }
  }, [params, location]);
  
  // Si les paramètres n'ont pas été reconnus, on redirige vers la page 404
  if (!seoParams) {
    return <Navigate to="/page-not-found" replace />;
  }
  
  // On affiche la page cible correspondante avec les paramètres SEO personnalisés
  let PageComponent;
  switch (seoParams.targetPage) {
    case 'construction-neuve':
      PageComponent = () => <ConstructionNeuve forcedSeoParams={seoParams} />;
      break;
    case 'renovation':
      PageComponent = () => <Renovation forcedSeoParams={seoParams} />;
      break;
    case 'extension':
      PageComponent = () => <Extension forcedSeoParams={seoParams} />;
      break;
    case 'optimisation-espace':
      PageComponent = () => <OptimisationEspace forcedSeoParams={seoParams} />;
      break;
    case 'design-interieur':
      PageComponent = () => <DesignInterieur forcedSeoParams={seoParams} />;
      break;
    default:
      PageComponent = () => <Renovation forcedSeoParams={seoParams} />;
  }
  
  return (
    <>
      <SEO
        title={seoParams.title}
        description={seoParams.description}
        canonicalUrl={`https://progineer.fr${location.pathname}`}
        keywords={`${seoParams.profession.replace(/-/g, ' ')}, ${formatCityName(seoParams.city)}, PACA, construction, rénovation, extension`}
      />
      <PageComponent />
    </>
  );
};

export default LocalSEOPage;
