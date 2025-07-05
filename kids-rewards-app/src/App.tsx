import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppData } from './hooks/useAppData';
import HomePage from './components/HomePage';
import ChildDashboard from './components/ChildDashboard';
import ParentDashboard from './components/ParentDashboard';
import AddChildModal from './components/AddChildModal';

function App() {
  const { data, addChild, updateChild, addPoints, resetWeeklyPoints, toggleParentMode, updateSettings } = useAppData();
  const [showAddChildModal, setShowAddChildModal] = useState(false);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                children={data.children}
                onAddChild={() => setShowAddChildModal(true)}
                onToggleParentMode={toggleParentMode}
                parentMode={data.parentMode}
              />
            } 
          />
          <Route 
            path="/child/:childId" 
            element={
              <ChildDashboard 
                children={data.children}
                onAddPoints={addPoints}
                settings={data.settings}
              />
            } 
          />
          <Route 
            path="/parent" 
            element={
              <ParentDashboard 
                children={data.children}
                settings={data.settings}
                onUpdateChild={updateChild}
                onUpdateSettings={updateSettings}
                onResetWeeklyPoints={resetWeeklyPoints}
              />
            } 
          />
        </Routes>

        {showAddChildModal && (
          <AddChildModal 
            onClose={() => setShowAddChildModal(false)}
            onAddChild={(name: string, age: number, avatar: string) => {
              addChild(name, age, avatar);
              setShowAddChildModal(false);
            }}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
