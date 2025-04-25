
import React from "react";
import Container from "@/components/common/Container";
import TeamMemberCard from "./TeamMemberCard";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  skills: string[];
}

interface TeamMembersSectionProps {
  members: TeamMember[];
}

const TeamMembersSection: React.FC<TeamMembersSectionProps> = ({ members }) => (
  <section className="relative py-24 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden">
    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23787346\" fill-opacity=\"0.05\" fill-rule=\"evenodd\"%3E%3Cpath d=\"M0 40L40 0H20L0 20M40 40V20L20 40\"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20" />
    
    <Container>
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-khaki-700 rounded-full blur-[120px] opacity-20" />
        
        <div className="relative">
          <div className="text-center mb-16">
            <h2 className="inline-block text-3xl md:text-4xl font-semibold text-white mb-4 relative">
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-normal text-khaki-400 uppercase tracking-wider">
                Notre expertise à votre service
              </span>
              Notre équipe pluridisciplinaire
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Une équipe expérimentée de maîtres d'œuvre et d'ingénieurs spécialisés pour donner vie à vos projets de construction et rénovation en PACA.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {members.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  </section>
);

export default TeamMembersSection;
