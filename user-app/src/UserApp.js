import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './UserApp.css';

const UserProfile = () => {
  return (
    <div className="user-profile">
      <h2>Profil Utilisateur</h2>
      <div className="profile-card">
        <div className="avatar">
          <div className="avatar-placeholder">👤</div>
        </div>
        <div className="profile-info">
          <div className="info-row">
            <span className="label">Nom:</span>
            <span className="value">Jean Dupont</span>
          </div>
          <div className="info-row">
            <span className="label">Email:</span>
            <span className="value">jean.dupont@exemple.fr</span>
          </div>
          <div className="info-row">
            <span className="label">Téléphone:</span>
            <span className="value">+33 6 12 34 56 78</span>
          </div>
          <div className="info-row">
            <span className="label">Adresse:</span>
            <span className="value">123 Rue de Paris, 75001 Paris</span>
          </div>
        </div>
      </div>
      <div className="actions">
        <button className="action-button">Modifier le profil</button>
        <button className="action-button secondary">Changer le mot de passe</button>
      </div>
    </div>
  );
};

const UserSettings = () => {
  return (
    <div className="user-settings">
      <h2>Paramètres Utilisateur</h2>
      <div className="settings-form">
        <div className="form-group">
          <h3>Préférences de notification</h3>
          <div className="checkbox-option">
            <input type="checkbox" id="email-notifications" defaultChecked />
            <label htmlFor="email-notifications">Recevoir des notifications par email</label>
          </div>
          <div className="checkbox-option">
            <input type="checkbox" id="sms-notifications" />
            <label htmlFor="sms-notifications">Recevoir des notifications par SMS</label>
          </div>
        </div>
        
        <div className="form-group">
          <h3>Confidentialité</h3>
          <div className="checkbox-option">
            <input type="checkbox" id="profile-visibility" defaultChecked />
            <label htmlFor="profile-visibility">Rendre mon profil visible aux autres utilisateurs</label>
          </div>
        </div>
        
        <div className="form-group">
          <h3>Thème</h3>
          <div className="radio-option">
            <input type="radio" id="theme-light" name="theme" defaultChecked />
            <label htmlFor="theme-light">Clair</label>
          </div>
          <div className="radio-option">
            <input type="radio" id="theme-dark" name="theme" />
            <label htmlFor="theme-dark">Sombre</label>
          </div>
        </div>
        
        <button className="save-button">Enregistrer les modifications</button>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <h2>Tableau de bord</h2>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Activité récente</h3>
          <p className="stat-value">12</p>
          <p className="stat-label">sessions ce mois</p>
        </div>
        <div className="stat-card">
          <h3>Notifications</h3>
          <p className="stat-value">5</p>
          <p className="stat-label">non lues</p>
        </div>
        <div className="stat-card">
          <h3>Tâches</h3>
          <p className="stat-value">8</p>
          <p className="stat-label">en attente</p>
        </div>
      </div>
      <div className="recent-activity">
        <h3>Dernières activités</h3>
        <ul className="activity-list">
          <li className="activity-item">
            <div className="activity-icon">📝</div>
            <div className="activity-content">
              <p className="activity-title">Profil mis à jour</p>
              <p className="activity-time">Il y a 2 heures</p>
            </div>
          </li>
          <li className="activity-item">
            <div className="activity-icon">🔑</div>
            <div className="activity-content">
              <p className="activity-title">Connexion depuis un nouvel appareil</p>
              <p className="activity-time">Hier à 14:30</p>
            </div>
          </li>
          <li className="activity-item">
            <div className="activity-icon">📊</div>
            <div className="activity-content">
              <p className="activity-title">Rapport mensuel généré</p>
              <p className="activity-time">18 juin 2023</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

const UserHome = () => {
  return (
    <div className="user-home">
      <h2>Application Utilisateur</h2>
      <div className="nav-cards">
        <div className="nav-card" onClick={() => window.location.href = '/user/profile'}>
          <div className="card-icon">👤</div>
          <h3>Profil</h3>
          <p>Voir et modifier vos informations personnelles</p>
        </div>
        <div className="nav-card" onClick={() => window.location.href = '/user/settings'}>
          <div className="card-icon">⚙️</div>
          <h3>Paramètres</h3>
          <p>Gérer vos préférences et options de compte</p>
        </div>
        <div className="nav-card" onClick={() => window.location.href = '/user/dashboard'}>
          <div className="card-icon">📊</div>
          <h3>Tableau de bord</h3>
          <p>Consultez vos statistiques et activités récentes</p>
        </div>
      </div>
    </div>
  );
};

const UserApp = () => {
  return (
    <div className="user-app">
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/settings" element={<UserSettings />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </div>
  );
};

export default UserApp; 