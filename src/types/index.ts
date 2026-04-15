export interface SoloStats {
  winCount: number;
  currentStreak: number;
  bestStreak: number;
  lastWinDate: string | null;
}

export interface Runner {
  id: string;
  name: string;
  winCount: number;
  currentStreak: number;
  bestStreak: number;
  lastWinDate: string | null;
}

export type AppMode = 'solo' | 'team';
export type SortBy = 'wins' | 'streak' | 'bestStreak';
