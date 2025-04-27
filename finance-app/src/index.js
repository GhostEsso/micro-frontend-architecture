import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import FinanceApp from './FinanceApp';

const mount = () => {
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <FinanceApp />
    </BrowserRouter>
  );
};

// Si nous sommes en développement et isolés, montez l'application immédiatement
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('root');
  if (devRoot) {
    mount();
  }
}

// Si nous sommes exécutés via le conteneur, exportons le composant de montage
export default FinanceApp; 