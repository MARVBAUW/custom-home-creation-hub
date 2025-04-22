
import React from "react";
import Container from "@/components/common/Container";

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
  <section className="py-16 bg-gray-900">
    <Container>
      <h2 className="text-3xl font-semibold mb-12 text-center text-white">Notre équipe pluridisciplinaire</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {members.map((member) => (
          <div 
            key={member.id}
            className="bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-white/10 p-6"
          >
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 relative mb-6 flex-shrink-0">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-contain rounded-xl bg-white"
                />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-progineer-gold mb-4">{member.role}</p>
                <p className="text-white/90 text-sm mb-6 max-w-lg">{member.bio}</p>
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2 text-progineer-gold">Compétences :</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-white/10 text-white rounded text-xs border border-white/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

export default TeamMembersSection;
