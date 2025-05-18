
/**
 * Configuration des redirections 301 pour le SEO
 * Format: { [ancienChemin]: nouveauChemin }
 */
export const redirections301 = {
  "/old-feature": "/prestations-maitre-oeuvre",
  "/deprecated-page": "/",
  "/admin-panel": "/workspace/client-area/admin",
  "/api/secret-endpoint": "/"
};

/**
 * Vérifie si une URL actuelle correspond à une redirection 301
 * @param currentPath Le chemin actuel de l'URL
 * @returns Le chemin de redirection ou null si pas de redirection
 */
export const checkForRedirection = (currentPath: string): string | null => {
  return redirections301[currentPath] || null;
};
