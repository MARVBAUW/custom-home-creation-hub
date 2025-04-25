import React, { useEffect } from 'react';
import { Award, Building2, GraduationCap } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface TeamMemberCardProps {
  member: {
    id: number;
    name: string;
    role: string;
    image: string;
    bio: string;
    skills: string[];
  };
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  useEffect(() => {
    console.log('Image URL:', member.image);
    const img = new Image();
    img.onload = () => console.log('Image loaded successfully');
    img.onerror = () => console.error('Image failed to load');
    img.src = member.image;
  }, [member.image]);

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-khaki-700/20 to-khaki-800/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
      
      <div className="relative overflow-hidden rounded-2xl bg-gray-900/80 border border-white/10 backdrop-blur-sm p-8 transition-all duration-300 hover:border-khaki-700/50">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-khaki-700 to-khaki-500 opacity-50" />
        
        <div className="flex flex-col items-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-khaki-600 to-khaki-400 blur-xl opacity-20 animate-pulse" />
            <Avatar className="w-48 h-48 border-4 border-white/10 shadow-xl">
              {member.image && (
                <AvatarImage 
                  src={member.image} 
                  alt={member.name}
                  className="object-cover w-full h-full"
                  // Ajout d'un attribut onError pour le débogage
                  onError={(e) => {
                    console.error('Image load error:', e);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <AvatarFallback className="text-4xl bg-khaki-700 text-white">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
          </div>

          <h3 className="text-2xl font-semibold text-white mb-2 text-center">{member.name}</h3>
          <p className="text-khaki-400 mb-6 font-medium">{member.role}</p>
          
          <div className="w-full max-w-md">
            <p className="text-white/90 text-center mb-8 leading-relaxed">
              {member.bio}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-khaki-400">
                <GraduationCap className="h-5 w-5" />
                <span className="text-sm">Diplômé INSA - Master en génie civil</span>
              </div>
              
              <div className="flex items-center gap-3 text-khaki-400">
                <Building2 className="h-5 w-5" />
                <span className="text-sm">Expertise en construction industrielle, tertiaire et résidentielle</span>
              </div>
              
              <div className="flex items-center gap-3 text-khaki-400">
                <Award className="h-5 w-5" />
                <span className="text-sm">Certifications professionnelles en gestion de projets</span>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-sm font-medium mb-3 text-khaki-400">Domaines d'expertise :</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {member.skills.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 bg-khaki-700/20 text-khaki-400 rounded-full text-xs border border-khaki-600/20 backdrop-blur-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
