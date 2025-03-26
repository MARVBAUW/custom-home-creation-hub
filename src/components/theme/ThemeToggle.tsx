
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const handleToggleTheme = () => {
    toggleTheme();
    
    // Notify user about theme change
    toast({
      title: theme === "light" ? "Mode sombre activé" : "Mode clair activé",
      description: "Les préférences d'affichage ont été mises à jour.",
      duration: 2000,
    });
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={handleToggleTheme}
      className={cn(
        "rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 relative z-50 btn-enhanced",
        "shadow-md border-2",
        "dark:border-gray-700 light:border-gray-300",
        className
      )}
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
