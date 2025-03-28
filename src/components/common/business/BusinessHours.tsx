
import React from 'react';
import { Clock } from 'lucide-react';

interface BusinessHoursProps {
  openingHours: { weekday_text: string[] };
}

const BusinessHours: React.FC<BusinessHoursProps> = ({ openingHours }) => {
  if (!openingHours || !openingHours.weekday_text) return null;

  // Fonction pour traduire les jours en français
  const translateDayToFrench = (day: string) => {
    const translations: Record<string, string> = {
      'Monday': 'Lundi',
      'Tuesday': 'Mardi',
      'Wednesday': 'Mercredi',
      'Thursday': 'Jeudi',
      'Friday': 'Vendredi',
      'Saturday': 'Samedi',
      'Sunday': 'Dimanche'
    };
    
    return translations[day] || day;
  };

  // Fonction pour formater les horaires en français
  const formatHoursInFrench = (dayText: string) => {
    if (!dayText) return '';
    
    const [day, hours] = dayText.split(': ');
    const translatedDay = translateDayToFrench(day);
    
    // Convertir les formats AM/PM en format 24h
    const formattedHours = hours.replace(/(\d+):(\d+) (AM|PM) – (\d+):(\d+) (AM|PM)/g, (match, h1, m1, ampm1, h2, m2, ampm2) => {
      const hour1 = parseInt(h1) + (ampm1 === 'PM' && h1 !== '12' ? 12 : 0);
      const hour2 = parseInt(h2) + (ampm2 === 'PM' && h2 !== '12' ? 12 : 0);
      return `${hour1}h${m1 !== '00' ? m1 : ''} - ${hour2}h${m2 !== '00' ? m2 : ''}`;
    });
    
    return `${translatedDay}: ${formattedHours}`;
  };

  return (
    <div className="border-t border-stone-200 p-4">
      <div className="flex items-center mb-2">
        <Clock className="h-4 w-4 text-progineer-gold mr-2" />
        <h4 className="text-sm font-medium">Horaires d'ouverture</h4>
      </div>
      <ul className="text-xs text-stone-600 space-y-1">
        {openingHours.weekday_text.map((day: string, index: number) => (
          <li key={index}>{formatHoursInFrench(day)}</li>
        ))}
      </ul>
    </div>
  );
};

export default BusinessHours;
