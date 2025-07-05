export interface Task {
  id: string;
  name: string;
  description: string;
  points: number;
  icon: string;
  category: 'positive' | 'negative';
}

export interface Child {
  id: string;
  name: string;
  age: number;
  avatar: string;
  currentPoints: number;
  totalPointsEarned: number;
  weeklyGoal: number;
  tasks: Task[];
  pointsHistory: PointsEntry[];
}

export interface PointsEntry {
  id: string;
  date: string;
  taskId: string;
  taskName: string;
  points: number;
  type: 'earned' | 'lost';
}

export interface AppSettings {
  pointsToMoney: number; // 1 euro = X points
  weeklyReset: boolean;
  resetDay: number; // 0-6 (dimanche-samedi)
}

export interface AppData {
  children: Child[];
  settings: AppSettings;
  parentMode: boolean;
}