import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Settings, RotateCcw, Edit, Save, X } from 'lucide-react';
import type { Child, AppSettings } from '../types';

interface ParentDashboardProps {
  children: Child[];
  settings: AppSettings;
  onUpdateChild: (childId: string, updates: Partial<Child>) => void;
  onUpdateSettings: (settings: Partial<AppSettings>) => void;
  onResetWeeklyPoints: (childId: string) => void;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({
  children,
  settings,
  onUpdateChild,
  onUpdateSettings,
  onResetWeeklyPoints
}) => {
  const [editingSettings, setEditingSettings] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);

  const handleSaveSettings = () => {
    onUpdateSettings(tempSettings);
    setEditingSettings(false);
  };

  const handleCancelSettings = () => {
    setTempSettings(settings);
    setEditingSettings(false);
  };

  const handleUpdateChild = (childId: string, field: keyof Child, value: any) => {
    onUpdateChild(childId, { [field]: value });
  };

  return (
    <div className="container">
      <div className="header">
        <Link to="/" className="back-btn">
          <ArrowLeft />
        </Link>
        <h1>👨‍👩‍👧‍👦 Panneau Parent</h1>
        <p className="subtitle">Gestion des comptes enfants</p>
      </div>

      <div className="main-content">
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '15px' }}>
            <Settings style={{ marginRight: '10px' }} />
            Paramètres
          </h3>
          <div className="child-card">
            <div className="form-group">
              <label>Points nécessaires pour 1€</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="number"
                  value={editingSettings ? tempSettings.pointsToMoney : settings.pointsToMoney}
                  onChange={(e) => setTempSettings({
                    ...tempSettings,
                    pointsToMoney: parseInt(e.target.value) || 10
                  })}
                  disabled={!editingSettings}
                  style={{ flex: 1, marginRight: '10px' }}
                />
                {editingSettings ? (
                  <div>
                    <button
                      onClick={handleSaveSettings}
                      style={{
                        background: '#6BCF7F',
                        color: 'white',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '8px',
                        marginRight: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      <Save size={16} />
                    </button>
                    <button
                      onClick={handleCancelSettings}
                      style={{
                        background: '#FF8C94',
                        color: 'white',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditingSettings(true)}
                    style={{
                      background: '#45B7D1',
                      color: 'white',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <Edit size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '15px' }}>Statistiques des enfants</h3>
          {children.map((child) => (
            <div key={child.id} className="child-card">
              <div className="child-info">
                <div className="child-avatar">{child.avatar}</div>
                <div className="child-details">
                  <h3>{child.name}</h3>
                  <p>{child.age} ans</p>
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <div className="points-display">
                  <div>
                    <div className="points-current">{child.currentPoints} pts</div>
                    <div className="points-money">
                      {(child.currentPoints / settings.pointsToMoney).toFixed(2)} €
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      Total gagné: {child.totalPointsEarned} pts
                    </div>
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
                  Objectif: {child.currentPoints}/{child.weeklyGoal} pts
                </p>
              </div>

              <div className="form-group">
                <label>Objectif hebdomadaire</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="number"
                    value={child.weeklyGoal}
                    onChange={(e) => handleUpdateChild(child.id, 'weeklyGoal', parseInt(e.target.value) || 50)}
                    style={{ flex: 1, marginRight: '10px' }}
                  />
                  <span>pts</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => onResetWeeklyPoints(child.id)}
                  className="btn btn-warning"
                  style={{ flex: 1 }}
                >
                  <RotateCcw style={{ marginRight: '5px' }} size={16} />
                  Réinitialiser
                </button>
                <Link to={`/child/${child.id}`} style={{ flex: 1 }}>
                  <button className="btn btn-secondary" style={{ width: '100%' }}>
                    Voir profil
                  </button>
                </Link>
              </div>

              {child.pointsHistory.length > 0 && (
                <div style={{ marginTop: '15px' }}>
                  <h4 style={{ marginBottom: '10px' }}>Activité récente</h4>
                  <div style={{ maxHeight: '120px', overflowY: 'auto' }}>
                    {child.pointsHistory.slice(-5).reverse().map((entry) => (
                      <div key={entry.id} className="history-item">
                        <div className="history-date">
                          {new Date(entry.date).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                        <div className="history-task">{entry.taskName}</div>
                        <div className={`history-points ${entry.type}`}>
                          {entry.points > 0 ? '+' : ''}{entry.points}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {children.length === 0 && (
          <div className="celebration">
            <div className="celebration-icon">👶</div>
            <h2>Aucun enfant</h2>
            <p>Retournez à l'accueil pour ajouter un enfant</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;