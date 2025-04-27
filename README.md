# Architecture Micro-Frontend

Ce projet démontre une architecture micro-frontend avec chargement à la demande basé sur les permissions utilisateur.

## Structure du projet

- **shell**: Application conteneur qui orchestre les micro-frontends
- **user-app**: Micro-frontend pour la gestion des utilisateurs
- **finance-app**: Micro-frontend pour la gestion financière

## Fonctionnalités clés

- **Chargement à la demande**: Les micro-frontends sont chargés uniquement lorsqu'ils sont nécessaires
- **Contrôle d'accès**: Les micro-frontends ne sont chargés que si l'utilisateur a les permissions requises
- **Module Federation**: Utilisation de Webpack Module Federation pour partager des dépendances et réduire la taille des bundles

## Configuration technique

- React 18
- React Router 6
- Webpack 5 avec Module Federation
- Architecture basée sur les composants
- Authentification et autorisation intégrées

## Utilisateurs de démonstration

- **admin**: Accès à toutes les applications
- **user**: Accès uniquement à l'application "Utilisateur"
- **finance**: Accès uniquement à l'application "Finance"

## Installation

```bash
# Installation des dépendances
npm install

# Démarrage des applications en mode développement
npm start
```

## Fonctionnement de l'architecture

1. L'application shell gère l'authentification et l'autorisation des utilisateurs
2. Lorsqu'un utilisateur navigue vers une route, le composant `MicroFrontend` vérifie ses permissions
3. Si l'utilisateur a les permissions nécessaires, le micro-frontend correspondant est chargé dynamiquement
4. Si l'utilisateur n'a pas les permissions, un message d'erreur est affiché

Cette architecture permet:
- Une meilleure séparation des préoccupations
- Le développement indépendant des équipes
- L'optimisation des performances avec le chargement à la demande
- La sécurité par la gestion des permissions au niveau du chargement