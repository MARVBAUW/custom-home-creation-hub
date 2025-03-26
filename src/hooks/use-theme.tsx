
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('light');
  const [mounted, setMounted] = useState(false);

  // Cette fonction gère la mise à jour du DOM et du localStorage
  const applyTheme = (newTheme: ThemeType) => {
    const root = window.document.documentElement;
    
    // Supprimer les anciennes classes et ajouter la nouvelle
    root.classList.remove('light', 'dark');
    root.classList.add(newTheme);
    
    // Mettre à jour le localStorage
    localStorage.setItem('theme', newTheme);
  };

  // Effet initial pour charger le thème
  useEffect(() => {
    setMounted(true);
    // Récupérer le thème du localStorage ou utiliser la préférence système
    const storedTheme = localStorage.getItem('theme') as ThemeType | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  // Effet pour mettre à jour le DOM quand le thème change
  useEffect(() => {
    if (mounted) {
      applyTheme(theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log('Toggling theme to:', newTheme);
      return newTheme;
    });
  };

  const contextValue = {
    theme,
    setTheme,
    toggleTheme
  };

  // Return context provider with the value
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}
