// Mock des données utilisateurs avec leurs permissions
const users = {
  admin: {
    id: 1,
    name: 'Admin',
    permissions: ['user-app', 'finance-app']
  },
  user: {
    id: 2,
    name: 'User',
    permissions: ['user-app']
  },
  finance: {
    id: 3,
    name: 'Finance',
    permissions: ['finance-app']
  }
};

class AuthService {
  constructor() {
    this.currentUser = null;
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        this.currentUser = JSON.parse(storedUser);
        console.log('Utilisateur restauré depuis localStorage:', this.currentUser);
      } catch (e) {
        console.error('Erreur lors de la restauration de l\'utilisateur:', e);
        localStorage.removeItem('currentUser');
      }
    } else {
      console.log('Aucun utilisateur trouvé dans localStorage');
    }
  }

  login(username) {
    console.log(`Tentative de connexion pour: ${username}`);
    if (users[username]) {
      this.currentUser = users[username];
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      console.log('Connexion réussie pour:', this.currentUser);
      return true;
    }
    console.log('Échec de connexion: utilisateur non trouvé');
    return false;
  }

  logout() {
    console.log('Déconnexion de l\'utilisateur:', this.currentUser);
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  isAuthenticated() {
    const isAuth = !!this.currentUser;
    console.log('Vérification d\'authentification:', isAuth);
    return isAuth;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  hasPermission(appName) {
    if (!this.currentUser) {
      console.log(`Vérification de permission pour ${appName}: Échec - Non authentifié`);
      return false;
    }
    const hasPermission = this.currentUser.permissions.includes(appName);
    console.log(`Vérification de permission pour ${appName}: ${hasPermission ? 'Succès' : 'Échec'}`);
    return hasPermission;
  }
}

// Singleton instance
const authService = new AuthService();
export default authService; 