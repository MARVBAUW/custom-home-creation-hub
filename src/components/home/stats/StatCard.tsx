
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { 
  Award, 
  MapPin, 
  Star 
} from 'lucide-react';

interface StatCardProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
  color: string;
  icon: 'award' | 'map' | 'star';
  index: number;
  animatedValue: number;
}

const icons = {
  'award': Award,
  'map': MapPin,
  'star': Star
};

const StatCard: React.FC<StatCardProps> = ({
  prefix,
  suffix,
  label,
  description,
  color,
  icon,
  index,
  animatedValue
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const IconComponent = icons[icon];
  
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      className={cn(
        "group rounded-xl p-6 transition-all duration-300",
        "hover:shadow-xl transform hover:-translate-y-1",
        "bg-gradient-to-br from-stone-50/90 to-white/80",
        "border border-stone-100 shadow-md"
      )}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Icon with background */}
        <div className={cn(
          "relative rounded-full p-4 mb-2",
          `bg-gradient-to-br ${color} bg-opacity-10`,
          "transform transition-transform group-hover:scale-110 duration-300"
        )}>
          <IconComponent 
            className={cn(
              "w-8 h-8",
              color.includes('amber') || color.includes('orange') ? 'text-amber-500' : 
              color.includes('emerald') || color.includes('teal') ? 'text-emerald-500' : 
              'text-sky-500'
            )} 
          />
        </div>
        
        {/* Value with animated counter */}
        <div className="relative">
          <span className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600">
            {prefix}{animatedValue}{suffix}
          </span>
        </div>
        
        {/* Label */}
        <h3 className="text-xl font-semibold text-gray-800">{label}</h3>
        
        {/* Description */}
        <p className="text-gray-600">{description}</p>
        
        {/* Bottom decorative element */}
        <div className={cn(
          "h-1 w-16 rounded-full mt-2",
          `bg-gradient-to-r ${color}`
        )}></div>
      </div>
    </motion.div>
  );
};

export default StatCard;
