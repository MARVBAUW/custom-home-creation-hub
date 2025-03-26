
import React from 'react';
import { Briefcase, Building, School, Award } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface TeamMemberSkill {
  icon: 'school' | 'briefcase' | 'building' | 'award';
  text: string;
}

export interface TeamMemberProps {
  image: string;
  name: string;
  title: string;
  position: string;
  skills: TeamMemberSkill[];
}

const TeamMember = ({ image, name, title, position, skills }: TeamMemberProps) => {
  const renderIcon = (iconName: 'school' | 'briefcase' | 'building' | 'award') => {
    switch (iconName) {
      case 'school':
        return <School className="h-5 w-5 text-progineer-gold flex-shrink-0" />;
      case 'briefcase':
        return <Briefcase className="h-5 w-5 text-progineer-gold flex-shrink-0" />;
      case 'building':
        return <Building className="h-5 w-5 text-progineer-gold flex-shrink-0" />;
      case 'award':
        return <Award className="h-5 w-5 text-progineer-gold flex-shrink-0" />;
    }
  };

  return (
    <div className="text-center md:text-left">
      <div className="relative mb-6 inline-block">
        <img 
          src={image} 
          alt={name} 
          className="w-64 h-64 object-cover rounded-full mx-auto md:mx-0"
        />
        <div className="absolute bottom-0 right-0 bg-progineer-gold text-white text-xs font-semibold px-3 py-1 rounded-full">
          {position}
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-2 dark:text-white">{name}</h2>
      <h3 className="text-lg text-gray-700 dark:text-gray-300 mb-4">{title}</h3>

      <div className="flex flex-col gap-2 max-w-md mx-auto md:mx-0">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2">
            {renderIcon(skill.icon)}
            <span className="text-sm dark:text-gray-300">{skill.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMember;
