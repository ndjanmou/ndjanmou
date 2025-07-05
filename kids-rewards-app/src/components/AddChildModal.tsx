import React, { useState } from 'react';
import { X, User, Calendar } from 'lucide-react';

interface AddChildModalProps {
  onClose: () => void;
  onAddChild: (name: string, age: number, avatar: string) => void;
}

const AVATARS = ['👦', '👧', '🧒', '👶', '🧑', '👨', '👩', '🦸‍♂️', '🦸‍♀️', '🧙‍♂️', '🧙‍♀️', '🎨', '⚽', '🎮'];

const AddChildModal: React.FC<AddChildModalProps> = ({ onClose, onAddChild }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(6);
  const [selectedAvatar, setSelectedAvatar] = useState('👦');
  const [errors, setErrors] = useState<{ name?: string; age?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; age?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Le nom est requis';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères';
    }
    
    if (age < 3 || age > 12) {
      newErrors.age = 'L\'âge doit être entre 3 et 12 ans';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddChild(name.trim(), age, selectedAvatar);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Ajouter un enfant</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '5px'
            }}
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <User style={{ marginRight: '5px' }} size={16} />
              Nom de l'enfant
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrez le nom de l'enfant"
              style={{
                borderColor: errors.name ? '#FF8C94' : '#E0E0E0'
              }}
            />
            {errors.name && (
              <p style={{ color: '#FF8C94', fontSize: '12px', marginTop: '5px' }}>
                {errors.name}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>
              <Calendar style={{ marginRight: '5px' }} size={16} />
              Âge
            </label>
            <select
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              style={{
                borderColor: errors.age ? '#FF8C94' : '#E0E0E0'
              }}
            >
              {Array.from({ length: 10 }, (_, i) => i + 3).map(ageOption => (
                <option key={ageOption} value={ageOption}>
                  {ageOption} ans
                </option>
              ))}
            </select>
            {errors.age && (
              <p style={{ color: '#FF8C94', fontSize: '12px', marginTop: '5px' }}>
                {errors.age}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Choisir un avatar</label>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))',
              gap: '10px',
              marginTop: '10px'
            }}>
              {AVATARS.map((avatar) => (
                <button
                  key={avatar}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar)}
                  style={{
                    background: selectedAvatar === avatar ? '#4ECDC4' : '#F8F9FA',
                    border: selectedAvatar === avatar ? '2px solid #4ECDC4' : '2px solid #E0E0E0',
                    borderRadius: '15px',
                    padding: '10px',
                    fontSize: '24px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Aperçu</label>
            <div className="child-card" style={{ marginTop: '10px' }}>
              <div className="child-info">
                <div className="child-avatar">{selectedAvatar}</div>
                <div className="child-details">
                  <h3>{name || 'Nom de l\'enfant'}</h3>
                  <p>{age} ans</p>
                </div>
              </div>
              <div className="points-display">
                <div className="points-current">0 pts</div>
                <div className="points-money">0.0 €</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn btn-success"
              style={{ flex: 1 }}
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChildModal;