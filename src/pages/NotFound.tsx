
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 pt-20">
      <Container size="sm" className="text-center py-20">
        <h1 className="text-5xl md:text-6xl font-semibold mb-6 text-khaki-800">404</h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          La page que vous recherchez n'existe pas
        </p>
        <p className="text-gray-500 mb-8">
          La page que vous essayez d'atteindre a peut-être été déplacée ou supprimée.
          N'hésitez pas à revenir à la page d'accueil.
        </p>
        <Button href="/" className="flex items-center">
          <Home className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Button>
      </Container>
    </div>
  );
};

export default NotFound;
