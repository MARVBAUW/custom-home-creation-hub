
import React from 'react';
import { Helmet } from 'react-helmet';
import TeamHero from '@/components/team/TeamHero';
import TeamProfiles from '@/components/team/TeamProfiles';
import TeamProjects from '@/components/team/TeamProjects';
import TeamHistory from '@/components/team/TeamHistory';
import ExpertiseSection from '@/components/team/ExpertiseSection';
import CTACTA from '@/components/common/CTACTA';
import SEOFooter from '@/components/common/SEOFooter';

const Equipe = () => {
  return (
    <>
      <Helmet>
        <title>Rencontrez Notre Équipe d'Experts en Maîtrise d'œuvre</title>
        <meta name="description" content="Découvrez l'équipe de Progineer, des professionnels expérimentés en architecture et maîtrise d'œuvre pour vos projets de construction et rénovation à Marseille et en PACA." />
        <meta name="keywords" content="équipe architecture, professionnels maîtrise d'œuvre, experts construction PACA, architectes Marseille" />
      </Helmet>

      <TeamHero />
      <TeamProfiles />
      <ExpertiseSection />
      <TeamProjects />
      <TeamHistory />
      <CTACTA />
      
      <SEOFooter 
        text="Découvrez l'équipe de Progineer, des professionnels qualifiés en architecture et maîtrise d'œuvre. Nos experts en construction, rénovation et extension vous accompagnent dans tous vos projets immobiliers à Marseille et dans toute la région PACA."
      />
    </>
  );
};

export default Equipe;
