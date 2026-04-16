export interface SoloStats {
  winCount: number;
  currentStreak: number;
  bestStreak: number;
}

export interface Runner {
  id: string;
  name: string;
  winCount: number;
  currentStreak: number;
  bestStreak: number;
}

export type AppMode = 'solo' | 'team';
export type SortBy = 'wins' | 'streak' | 'bestStreak';
