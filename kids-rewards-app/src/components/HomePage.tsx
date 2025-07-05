import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Plus, Crown } from 'lucide-react';
import type { Child } from '../types';

interface HomePageProps {
  children: Child[];
  onAddChild: () => void;
  onToggleParentMode: () => void;
  parentMode: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ 
  children, 
  onAddChild, 
  onToggleParentMode, 
  parentMode 
}) => {
  return (
    <div className="container">
      <div className="header">
        <h1>🌟 Mes Récompenses</h1>
        <p className="subtitle">Gagnez des points et devenez des champions !</p>
        <button 
          className="back-btn"
          onClick={onToggleParentMode}
          title={parentMode ? "Mode Enfant" : "Mode Parent"}
        >
          {parentMode ? <Crown /> : <Settings />}
        </button>
      </div>

      <div className="main-content">
        {children.length === 0 ? (
          <div className="celebration">
            <div className="celebration-icon">👶</div>
            <h2>Bienvenue !</h2>
            <p>Ajoutez votre premier enfant pour commencer l'aventure !</p>
          </div>
        ) : (
          <>
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>
              Choisissez votre profil
            </h2>
            {children.map((child) => (
              <Link 
                to={`/child/${child.id}`} 
                key={child.id}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="child-card">
                  <div className="child-info">
                    <div className="child-avatar">{child.avatar}</div>
                    <div className="child-details">
                      <h3>{child.name}</h3>
                      <p>{child.age} ans</p>
                    </div>
                  </div>
                  
                  <div className="points-display">
                    <div className="points-current">
                      {child.currentPoints} pts
                    </div>
                    <div className="points-money">
                      {(child.currentPoints / 10).toFixed(1)} €
                    </div>
                  </div>
                  
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${Math.min((child.currentPoints / child.weeklyGoal) * 100, 100)}%` 
                      }}
                    />
                  </div>
                  <p style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
                    Objectif: {child.weeklyGoal} pts
                  </p>
                </div>
              </Link>
            ))}
          </>
        )}

        {parentMode && (
          <Link to="/parent">
            <button className="btn btn-secondary">
              <Settings style={{ marginRight: '10px' }} />
              Panneau Parent
            </button>
          </Link>
        )}

        <button 
          className="btn btn-success"
          onClick={onAddChild}
        >
          <Plus style={{ marginRight: '10px' }} />
          Ajouter un enfant
        </button>
      </div>
    </div>
  );
};

export default HomePage;