
import React from 'react';
import Container from '@/components/common/Container';
import TeamMember, { TeamMemberProps } from './TeamMember';

const TeamProfiles = () => {
  const teamMembers: TeamMemberProps[] = [
    {
      image: "/lovable-uploads/e861b499-9056-4f3d-9e51-ba393450c8ac.png",
      name: "Marvin Bauwens",
      title: "PRÉSIDENT DIRECTEUR GÉNÉRAL",
      position: "PRÉSIDENT",
      skills: [
        { icon: "school", text: "Master Génie Civil Architecture et Urbanisme" },
        { icon: "briefcase", text: "Maîtrise d'œuvre, Maîtrise d'ouvrage, Économiste" },
        { icon: "building", text: "Tertiaire, Industrie, Résidentiel" },
        { icon: "award", text: "Tous corps d'état, Gros œuvre, Second œuvre, Charpente, CAO/DAO" }
      ]
    },
    {
      image: "/lovable-uploads/d674d37d-7176-457e-8dac-529981672eda.png",
      name: "Mael Allano",
      title: "DIRECTEUR GÉNÉRAL",
      position: "DIRECTEUR",
      skills: [
        { icon: "school", text: "Master Génie Civil Architecture et Urbanisme" },
        { icon: "briefcase", text: "Entreprise générale, Maîtrise d'œuvre, Contractant général" },
        { icon: "building", text: "Tertiaire, Industrie, Résidentiel" },
        { icon: "award", text: "Conception architecturale, Ingénierie des structures, Gestion de projet" }
      ]
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {teamMembers.map((member, index) => (
              <TeamMember 
                key={index}
                image={member.image}
                name={member.name}
                title={member.title}
                position={member.position}
                skills={member.skills}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TeamProfiles;
