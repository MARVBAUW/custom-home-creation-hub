
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EngagementCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  index: number;
}

const EngagementCard = ({ icon: Icon, title, description, gradient, index }: EngagementCardProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 12,
            delay: index * 0.1
          }
        }
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="group h-full"
    >
      <div className={cn(
        "relative h-full p-6 rounded-xl overflow-hidden backdrop-blur-sm",
        "bg-white/5 hover:bg-white/10",
        "border border-white/10 hover:border-white/20",
        "transition-all duration-500 ease-out",
        "shadow-[0_8px_16px_rgba(0,0,0,0.2)]",
      )}>
        {/* Background gradient */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500",
          gradient
        )} />

        <div className="relative z-10">
          <div className="mb-4">
            <div className={cn(
              "inline-flex items-center justify-center w-12 h-12 rounded-lg",
              "bg-gradient-to-br from-white/10 to-white/5",
              "group-hover:scale-110 transition-transform duration-500"
            )}>
              <Icon className="w-6 h-6 text-progineer-gold" />
            </div>
          </div>

          <h3 className={cn(
            "text-xl font-semibold mb-2 text-white",
            "group-hover:text-progineer-gold transition-colors duration-300"
          )}>
            {title}
          </h3>

          <p className="text-gray-300 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute -bottom-1 -right-1 w-16 h-16 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-br from-transparent via-progineer-gold/20 to-progineer-gold/40 rounded-tl-3xl" />
        </div>
      </div>
    </motion.div>
  );
};

export default EngagementCard;
