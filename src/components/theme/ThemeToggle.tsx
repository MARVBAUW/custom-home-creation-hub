
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type ThemeType = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeType>("light");
  const { toast } = useToast();
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    // Check for theme in localStorage or use system preference
    const storedTheme = localStorage.getItem("theme") as ThemeType | null;
    
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else if (prefersDark) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, [prefersDark]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    
    // Notify user about theme change
    toast({
      title: newTheme === "light" ? "Mode clair activé" : "Mode sombre activé",
      description: "Les préférences d'affichage ont été mises à jour.",
      duration: 2000,
    });
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme}
      className="rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"}
    >
      {theme === "light" ? (
        <Moon className="h-[1.2rem] w-[1.2rem] text-gray-700 dark:text-gray-200" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400" />
      )}
    </Button>
  );
}

export default ThemeToggle;
