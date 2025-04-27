// Imports doivent être au niveau supérieur du fichier
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log('Application shell en cours de démarrage...');

// Fonction pour vérifier si le DOM est chargé
function domReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}

// Fonction pour initialiser l'application
function initApp() {
  const container = document.getElementById('root');
  console.log('Élément root trouvé:', container);

  if (container) {
    try {
      const root = createRoot(container);
      console.log('Root créé, rendu de l\'application...');
      root.render(<App />);
      console.log('Rendu terminé');
    } catch (error) {
      console.error('Erreur lors du rendu de l\'application:', error);
      container.innerHTML = '<div style="text-align: center; padding: 20px;"><h2>Erreur de chargement</h2><p>Une erreur est survenue lors du chargement de l\'application.</p></div>';
    }
  } else {
    console.error('Élément root non trouvé dans le DOM');
  }
}

// Initialiser l'application quand le DOM est prêt
domReady(initApp); 