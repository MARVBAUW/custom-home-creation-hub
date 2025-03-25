
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
      <div className="mb-3">{icon}</div>
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm opacity-80">{description}</p>
    </div>
  );
};

export default FeatureCard;
