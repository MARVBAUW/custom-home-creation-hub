
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './index.css';

// Configure development mode logging for authentication
if (import.meta.env.DEV) {
  console.log('Supabase authentification est configurée et prête à être utilisée');
}

// Ajouter une balise d'application pour les robots
const metaRobots = document.createElement('meta');
metaRobots.name = 'robots';
metaRobots.content = 'index, follow';
document.head.appendChild(metaRobots);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
