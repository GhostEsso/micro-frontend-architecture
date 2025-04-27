import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import MicroFrontend from './components/MicroFrontend';
import authService from './services/AuthService';
import './App.css';

const Home = () => {
  return (
    <div className="home">
      <h2>Bienvenue dans l'architecture micro-frontend</h2>
      <p>
        Cliquez sur les liens de navigation pour accéder aux différentes applications.
        Seules les applications pour lesquelles vous avez des permissions seront chargées.
      </p>
    </div>
  );
};

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authService.login(username)) {
      onLogin();
    } else {
      setError('Utilisateur invalide. Essayez "admin", "user", ou "finance"');
    }
  };

  return (
    <div className="login">
      <h2>Connexion</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nom d'utilisateur:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin, user, ou finance"
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

// HOC pour protéger les routes
const ProtectedRoute = ({ children }) => {
  return authService.isAuthenticated() ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

const App = () => {
  const [, forceUpdate] = useState({});
  const [initialCheck, setInitialCheck] = useState(false);

  useEffect(() => {
    // Vérifier l'authentification au chargement
    console.log("Vérification de l'authentification initiale");
    setInitialCheck(true);
  }, []);

  const handleLogin = () => {
    console.log("Connexion réussie");
    forceUpdate({});
  };

  const handleLogout = () => {
    authService.logout();
    forceUpdate({});
  };

  const user = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  console.log("État d'authentification:", isAuthenticated);
  console.log("Utilisateur actuel:", user);

  // Afficher directement le formulaire de connexion si l'utilisateur n'est pas authentifié
  if (!isAuthenticated) {
    return (
      <div className="app">
        <header>
          <h1>Application Shell</h1>
        </header>
        <main>
          <Login onLogin={handleLogin} />
        </main>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <header>
          <h1>Application Shell</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Accueil</Link>
              </li>
              {authService.hasPermission('user-app') && (
                <li>
                  <Link to="/user">Application Utilisateur</Link>
                </li>
              )}
              {authService.hasPermission('finance-app') && (
                <li>
                  <Link to="/finance">Application Finance</Link>
                </li>
              )}
            </ul>
          </nav>
          <div className="user-info">
            <span>Bonjour, {user.name}</span>
            <button onClick={handleLogout}>Déconnexion</button>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/user/*"
              element={
                <ProtectedRoute>
                  <MicroFrontend name="user-app" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/finance/*"
              element={
                <ProtectedRoute>
                  <MicroFrontend name="finance-app" />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; 