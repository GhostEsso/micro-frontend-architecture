import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './FinanceApp.css';

// Mock des données pour les graphiques
const transactionsData = [
  { month: 'Jan', income: 5000, expenses: 3200 },
  { month: 'Fév', income: 5100, expenses: 3000 },
  { month: 'Mar', income: 5300, expenses: 3400 },
  { month: 'Avr', income: 5200, expenses: 3100 },
  { month: 'Mai', income: 5400, expenses: 3200 },
  { month: 'Juin', income: 5600, expenses: 3500 },
];

const budgetData = [
  { category: 'Logement', allocated: 1200, spent: 1180 },
  { category: 'Alimentation', allocated: 600, spent: 580 },
  { category: 'Transport', allocated: 300, spent: 250 },
  { category: 'Loisirs', allocated: 400, spent: 450 },
  { category: 'Santé', allocated: 200, spent: 180 },
  { category: 'Autres', allocated: 300, spent: 320 },
];

const recentTransactions = [
  { id: 1, date: '27 juin 2023', description: 'Super Marché XYZ', amount: -85.50, category: 'Alimentation' },
  { id: 2, date: '25 juin 2023', description: 'Salaire Juin', amount: 2800.00, category: 'Revenu' },
  { id: 3, date: '22 juin 2023', description: 'Restaurant Le Gourmet', amount: -64.30, category: 'Loisirs' },
  { id: 4, date: '20 juin 2023', description: 'Pharmacie Centrale', amount: -22.45, category: 'Santé' },
  { id: 5, date: '18 juin 2023', description: 'Loyer Juin', amount: -950.00, category: 'Logement' },
];

// Composants du micro-frontend Finance
const Dashboard = () => {
  return (
    <div className="finance-dashboard">
      <h2>Tableau de bord financier</h2>
      
      <div className="dashboard-summary">
        <div className="summary-card positive">
          <h3>Solde actuel</h3>
          <p className="amount">€4,286.75</p>
        </div>
        <div className="summary-card">
          <h3>Dépenses ce mois</h3>
          <p className="amount">€2,310.50</p>
        </div>
        <div className="summary-card">
          <h3>Revenus ce mois</h3>
          <p className="amount">€3,500.00</p>
        </div>
      </div>

      <div className="chart-container">
        <h3>Revenus vs Dépenses (6 derniers mois)</h3>
        <div className="chart-placeholder">
          {/* En production, utilisez recharts ou une bibliothèque similaire */}
          <div className="chart-bars">
            {transactionsData.map((data, index) => (
              <div key={index} className="month-group">
                <div 
                  className="bar income" 
                  style={{ height: `${data.income / 100}px` }}
                  title={`Revenus ${data.month}: €${data.income}`}
                ></div>
                <div 
                  className="bar expenses" 
                  style={{ height: `${data.expenses / 100}px` }}
                  title={`Dépenses ${data.month}: €${data.expenses}`}
                ></div>
                <div className="month-label">{data.month}</div>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color income"></div>
              <span>Revenus</span>
            </div>
            <div className="legend-item">
              <div className="legend-color expenses"></div>
              <span>Dépenses</span>
            </div>
          </div>
        </div>
      </div>

      <div className="recent-transactions">
        <h3>Transactions récentes</h3>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Catégorie</th>
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td className={transaction.amount >= 0 ? 'positive' : 'negative'}>
                  {transaction.amount >= 0 ? '+' : ''}€{Math.abs(transaction.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Budget = () => {
  return (
    <div className="finance-budget">
      <h2>Budget Mensuel</h2>
      
      <div className="add-budget">
        <button className="add-button">+ Ajouter une catégorie de budget</button>
      </div>
      
      <div className="budget-categories">
        {budgetData.map((category, index) => {
          const percentage = Math.round((category.spent / category.allocated) * 100);
          const isOverBudget = category.spent > category.allocated;
          
          return (
            <div key={index} className="budget-category">
              <div className="category-header">
                <h3>{category.category}</h3>
                <div className="budget-amounts">
                  <span className={isOverBudget ? 'negative' : ''}>
                    €{category.spent} / €{category.allocated}
                  </span>
                </div>
              </div>
              
              <div className="progress-container">
                <div 
                  className={`progress-bar ${isOverBudget ? 'over-budget' : ''}`}
                  style={{ width: `${isOverBudget ? 100 : percentage}%` }}
                ></div>
              </div>
              
              <div className="percentage-text">
                {percentage}% {isOverBudget && <span className="warning">(Dépassement)</span>}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="budget-summary">
        <div className="summary-item">
          <h3>Budget total</h3>
          <p>€3,000.00</p>
        </div>
        <div className="summary-item">
          <h3>Dépensé</h3>
          <p>€2,960.00</p>
        </div>
        <div className="summary-item">
          <h3>Restant</h3>
          <p>€40.00</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  return (
    <div className="finance-transactions">
      <h2>Transactions</h2>
      
      <div className="transaction-filters">
        <div className="filter-group">
          <label>Période</label>
          <select>
            <option>Ce mois</option>
            <option>Mois dernier</option>
            <option>3 derniers mois</option>
            <option>Cette année</option>
            <option>Personnalisé</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Catégorie</label>
          <select>
            <option>Toutes</option>
            <option>Logement</option>
            <option>Alimentation</option>
            <option>Transport</option>
            <option>Loisirs</option>
            <option>Santé</option>
            <option>Revenu</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Type</label>
          <select>
            <option>Tous</option>
            <option>Dépenses</option>
            <option>Revenus</option>
          </select>
        </div>
      </div>
      
      <div className="add-transaction">
        <button className="add-button">+ Ajouter une transaction</button>
      </div>
      
      <div className="transactions-list">
        <table className="transactions-table full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Catégorie</th>
              <th>Montant</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...recentTransactions, ...recentTransactions].slice(0, 8).map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td className={transaction.amount >= 0 ? 'positive' : 'negative'}>
                  {transaction.amount >= 0 ? '+' : ''}€{Math.abs(transaction.amount).toFixed(2)}
                </td>
                <td className="actions">
                  <button className="action-btn">Modifier</button>
                  <button className="action-btn delete">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="pagination">
          <button disabled>Précédent</button>
          <span>Page 1 sur 4</span>
          <button>Suivant</button>
        </div>
      </div>
    </div>
  );
};

const FinanceHome = () => {
  return (
    <div className="finance-home">
      <h2>Application Finance</h2>
      <div className="nav-cards">
        <div className="nav-card" onClick={() => window.location.href = '/finance/dashboard'}>
          <div className="card-icon">📊</div>
          <h3>Tableau de bord</h3>
          <p>Vue d'ensemble de vos finances</p>
        </div>
        <div className="nav-card" onClick={() => window.location.href = '/finance/budget'}>
          <div className="card-icon">💰</div>
          <h3>Budget</h3>
          <p>Gérez votre budget mensuel</p>
        </div>
        <div className="nav-card" onClick={() => window.location.href = '/finance/transactions'}>
          <div className="card-icon">📝</div>
          <h3>Transactions</h3>
          <p>Consultez l'historique de toutes vos transactions</p>
        </div>
      </div>
    </div>
  );
};

const FinanceApp = () => {
  return (
    <div className="finance-app">
      <Routes>
        <Route path="/" element={<FinanceHome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </div>
  );
};

export default FinanceApp; 