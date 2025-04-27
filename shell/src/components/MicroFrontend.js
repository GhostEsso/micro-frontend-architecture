import React, { lazy, Suspense, useState, useEffect } from 'react';
import authService from '../services/AuthService';

// Configuration des micro-frontends
const microFrontendConfig = {
  'user-app': {
    scope: 'userApp',
    module: './UserApp',
    url: 'http://localhost:3001/remoteEntry.js'
  },
  'finance-app': {
    scope: 'financeApp',
    module: './FinanceApp',
    url: 'http://localhost:3002/remoteEntry.js'
  }
};

// Fonction qui charge dynamiquement un micro-frontend
const loadComponent = (scope, module) => {
  return async () => {
    console.log(`Tentative de chargement du micro-frontend: ${scope}, module: ${module}`);
    
    try {
      // Récupérer la configuration du micro-frontend
      const config = Object.values(microFrontendConfig).find(config => config.scope === scope);
      
      if (!config) {
        throw new Error(`Configuration non trouvée pour le scope: ${scope}`);
      }
      
      console.log(`Configuration trouvée:`, config);
      
      // Initialise le conteneur partagé (shared scope)
      console.log('Initialisation du partage webpack...');
      await __webpack_init_sharing__('default');
      console.log('Partage webpack initialisé avec succès');
      
      // Vérifie si le conteneur distant est déjà chargé
      if (!window[scope]) {
        console.log(`Le conteneur ${scope} n'est pas chargé, chargement du script...`);
        // Si non, charge le script du point d'entrée distant
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = config.url;
          script.type = 'text/javascript';
          script.async = true;
          script.onload = () => {
            console.log(`Script ${scope} chargé avec succès`);
            resolve();
          };
          script.onerror = (error) => {
            console.error(`Erreur de chargement du script ${scope}:`, error);
            reject(new Error(`Erreur de chargement du script ${scope}: ${error}`));
          };
          document.head.appendChild(script);
        });
      } else {
        console.log(`Le conteneur ${scope} est déjà chargé`);
      }
      
      // Vérifie si le conteneur est disponible après chargement
      if (!window[scope]) {
        throw new Error(`Le conteneur ${scope} n'est pas disponible après chargement du script`);
      }
      
      // Initialise le conteneur distant
      console.log(`Initialisation du conteneur ${scope}...`);
      const container = window[scope];
      await container.init(__webpack_share_scopes__.default);
      console.log(`Conteneur ${scope} initialisé avec succès`);
      
      // Obtient la factory du module et crée un objet React
      console.log(`Récupération du module ${module} depuis ${scope}...`);
      const factory = await container.get(module);
      console.log(`Module ${module} récupéré avec succès:`, factory);
      
      const Module = factory();
      console.log(`Module ${module} créé avec succès:`, Module);
      
      if (Module.default && typeof Module.default === 'function') {
        console.log('Module a un export default, utilisation de celui-ci');
        return Module.default;
      }
      
      if (typeof Module === 'function') {
        console.log('Module est une fonction, utilisation directe');
        return Module;
      }
      
      console.error('Le module chargé n\'est pas un composant React valide:', Module);
      throw new Error('Le module chargé n\'est pas un composant React valide');
    } catch (error) {
      console.error(`Erreur lors du chargement du composant ${scope}/${module}:`, error);
      throw error;
    }
  };
};

const MicroFrontend = ({ name }) => {
  const [MicroFrontendComponent, setMicroFrontendComponent] = useState(null);
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur a la permission d'accéder à ce micro-frontend
    const checkPermission = authService.hasPermission(name);
    console.log(`Vérification des permissions pour ${name}: ${checkPermission}`);
    setHasPermission(checkPermission);

    if (checkPermission) {
      // Si l'utilisateur a la permission, charge le micro-frontend
      const config = microFrontendConfig[name];
      if (!config) {
        console.error(`Micro-frontend "${name}" non configuré`);
        setError(`Micro-frontend "${name}" non configuré`);
        return;
      }

      console.log(`Début du chargement du micro-frontend ${name}...`);
      // Charge le composant de manière dynamique
      const loadMicroFrontend = async () => {
        try {
          console.log(`Appel de loadComponent pour ${name} avec scope ${config.scope}...`);
          const Component = await loadComponent(config.scope, config.module)();
          console.log(`Composant ${name} chargé avec succès:`, Component);
          
          if (typeof Component !== 'function') {
            console.error(`Le composant chargé pour ${name} n'est pas une fonction:`, Component);
            throw new Error(`Le composant chargé pour ${name} n'est pas une fonction`);
          }
          
          setMicroFrontendComponent(() => Component);
        } catch (err) {
          console.error(`Erreur lors du chargement de ${name}:`, err);
          setError(`Impossible de charger le micro-frontend "${name}": ${err.message}`);
        }
      };

      loadMicroFrontend();
    }
  }, [name]);

  if (!hasPermission) {
    return <div>Vous n'avez pas les permissions nécessaires pour accéder à cette application.</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  if (!MicroFrontendComponent) {
    return <div>Chargement de l'application {name}...</div>;
  }

  try {
    console.log('Rendu du composant MicroFrontend:', MicroFrontendComponent);
    return <MicroFrontendComponent />;
  } catch (error) {
    console.error('Erreur lors du rendu du composant:', error);
    return <div>Erreur lors du rendu: {error.message}</div>;
  }
};

export default MicroFrontend; 