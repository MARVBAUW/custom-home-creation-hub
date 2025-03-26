
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";

type ThemeType = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeType>("light");
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
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
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme}
      className="rounded-full"
      aria-label={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"}
    >
      {theme === "light" ? (
        <Moon className="h-[1.2rem] w-[1.2rem] text-gray-700" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400" />
      )}
    </Button>
  );
}

export default ThemeToggle;
