import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Target, History } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Child, AppSettings } from '../types';

interface ChildDashboardProps {
  children: Child[];
  onAddPoints: (childId: string, taskId: string, points: number) => void;
  settings: AppSettings;
}

const ChildDashboard: React.FC<ChildDashboardProps> = ({ 
  children, 
  onAddPoints, 
  settings 
}) => {
  const { childId } = useParams<{ childId: string }>();
  const [showCelebration, setShowCelebration] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  const child = children.find(c => c.id === childId);
  
  if (!child) {
    return <div>Enfant non trouvé</div>;
  }

  const handleTaskClick = (taskId: string, points: number) => {
    onAddPoints(child.id, taskId, points);
    
    if (points > 0) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const positiveTasks = child.tasks.filter(task => task.category === 'positive');
  const negativeTasks = child.tasks.filter(task => task.category === 'negative');
  const moneyEarned = (child.currentPoints / settings.pointsToMoney).toFixed(2);
  const progressPercentage = Math.min((child.currentPoints / child.weeklyGoal) * 100, 100);

  return (
    <div className="container">
      <div className="header">
        <Link to="/" className="back-btn">
          <ArrowLeft />
        </Link>
        <h1>{child.avatar} {child.name}</h1>
        <p className="subtitle">{child.age} ans</p>
      </div>

      <div className="main-content">
        {showCelebration && (
          <motion.div 
            className="celebration animate-bounce"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="celebration-icon">🎉</div>
            <h2>Bravo !</h2>
            <p>Tu as gagné des points !</p>
          </motion.div>
        )}

        <div className="points-display">
          <div>
            <div className="points-current">{child.currentPoints} pts</div>
            <div className="points-money">{moneyEarned} €</div>
          </div>
          <div>
            <button 
              className="btn-secondary"
              onClick={() => setShowHistory(!showHistory)}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#2C3E50',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              <History />
            </button>
          </div>
        </div>

        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p style={{ fontSize: '14px', color: '#666', textAlign: 'center', marginBottom: '20px' }}>
          Objectif: {child.currentPoints}/{child.weeklyGoal} pts ({progressPercentage.toFixed(0)}%)
        </p>

        {showHistory && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ marginBottom: '15px' }}>
              <History style={{ marginRight: '10px' }} />
              Historique
            </h3>
            {child.pointsHistory.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666' }}>
                Aucune activité pour le moment
              </p>
            ) : (
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {child.pointsHistory.slice(-10).reverse().map((entry) => (
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
            )}
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '15px' }}>
            <Star style={{ marginRight: '10px' }} />
            Bonnes actions
          </h3>
          <div className="task-list">
            {positiveTasks.map((task) => (
              <motion.div
                key={task.id}
                className="task-item positive"
                onClick={() => handleTaskClick(task.id, task.points)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="task-icon">{task.icon}</div>
                <div className="task-info">
                  <div className="task-name">{task.name}</div>
                  <div className="task-description">{task.description}</div>
                </div>
                <div className="task-points positive">+{task.points}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '15px' }}>
            <Target style={{ marginRight: '10px' }} />
            À éviter
          </h3>
          <div className="task-list">
            {negativeTasks.map((task) => (
              <motion.div
                key={task.id}
                className="task-item negative"
                onClick={() => handleTaskClick(task.id, task.points)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="task-icon">{task.icon}</div>
                <div className="task-info">
                  <div className="task-name">{task.name}</div>
                  <div className="task-description">{task.description}</div>
                </div>
                <div className="task-points negative">{task.points}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {progressPercentage >= 100 && (
          <motion.div 
            className="celebration animate-pulse"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="celebration-icon">🏆</div>
            <h2>Objectif atteint !</h2>
            <p>Tu as atteint ton objectif de la semaine !</p>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
              Tu as gagné {moneyEarned} € !
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChildDashboard;