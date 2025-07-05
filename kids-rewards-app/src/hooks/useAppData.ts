import { useState, useEffect } from 'react';
import type { AppData, Child, Task, PointsEntry } from '../types';

const DEFAULT_TASKS: Task[] = [
  {
    id: '1',
    name: 'Se brosser les dents',
    description: 'Brossage matin et soir',
    points: 2,
    icon: '🦷',
    category: 'positive'
  },
  {
    id: '2',
    name: 'Ranger ses jouets',
    description: 'Mettre tous les jouets à leur place',
    points: 3,
    icon: '🧸',
    category: 'positive'
  },
  {
    id: '3',
    name: 'Faire ses devoirs',
    description: 'Terminer tous les devoirs',
    points: 5,
    icon: '📚',
    category: 'positive'
  },
  {
    id: '4',
    name: 'Aider en cuisine',
    description: 'Aider à préparer le repas',
    points: 4,
    icon: '👨‍🍳',
    category: 'positive'
  },
  {
    id: '5',
    name: 'Laisser traîner ses affaires',
    description: 'Vêtements ou jouets au sol',
    points: -1,
    icon: '👕',
    category: 'negative'
  },
  {
    id: '6',
    name: 'Être impoli',
    description: 'Manquer de respect',
    points: -2,
    icon: '😤',
    category: 'negative'
  }
];

const DEFAULT_DATA: AppData = {
  children: [],
  settings: {
    pointsToMoney: 10, // 10 points = 1 euro
    weeklyReset: true,
    resetDay: 0 // Dimanche
  },
  parentMode: false
};

export const useAppData = () => {
  const [data, setData] = useState<AppData>(DEFAULT_DATA);

  useEffect(() => {
    const savedData = localStorage.getItem('kidsRewardsApp');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setData(parsedData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
  }, []);

  const saveData = (newData: AppData) => {
    setData(newData);
    localStorage.setItem('kidsRewardsApp', JSON.stringify(newData));
  };

  const addChild = (name: string, age: number, avatar: string = '👦') => {
    const newChild: Child = {
      id: Date.now().toString(),
      name,
      age,
      avatar,
      currentPoints: 0,
      totalPointsEarned: 0,
      weeklyGoal: 50,
      tasks: DEFAULT_TASKS,
      pointsHistory: []
    };

    const newData = {
      ...data,
      children: [...data.children, newChild]
    };
    saveData(newData);
  };

  const updateChild = (childId: string, updates: Partial<Child>) => {
    const newData = {
      ...data,
      children: data.children.map(child =>
        child.id === childId ? { ...child, ...updates } : child
      )
    };
    saveData(newData);
  };

  const addPoints = (childId: string, taskId: string, points: number) => {
    const child = data.children.find(c => c.id === childId);
    const task = child?.tasks.find(t => t.id === taskId);
    
    if (child && task) {
      const entry: PointsEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        taskId,
        taskName: task.name,
        points,
        type: points > 0 ? 'earned' : 'lost'
      };

      const newData = {
        ...data,
        children: data.children.map(c =>
          c.id === childId
            ? {
                ...c,
                currentPoints: c.currentPoints + points,
                totalPointsEarned: c.totalPointsEarned + (points > 0 ? points : 0),
                pointsHistory: [...c.pointsHistory, entry]
              }
            : c
        )
      };
      saveData(newData);
    }
  };

  const resetWeeklyPoints = (childId: string) => {
    const newData = {
      ...data,
      children: data.children.map(c =>
        c.id === childId
          ? { ...c, currentPoints: 0, pointsHistory: [] }
          : c
      )
    };
    saveData(newData);
  };

  const toggleParentMode = () => {
    const newData = {
      ...data,
      parentMode: !data.parentMode
    };
    saveData(newData);
  };

  const updateSettings = (settings: Partial<AppData['settings']>) => {
    const newData = {
      ...data,
      settings: { ...data.settings, ...settings }
    };
    saveData(newData);
  };

  return {
    data,
    addChild,
    updateChild,
    addPoints,
    resetWeeklyPoints,
    toggleParentMode,
    updateSettings
  };
};