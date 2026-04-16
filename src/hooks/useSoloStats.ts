import { useLocalStorage } from './useLocalStorage';
import type { SoloStats } from '../types';

const DEFAULT_SOLO: SoloStats = {
  winCount: 0,
  currentStreak: 0,
  bestStreak: 0,
};

export function useSoloStats() {
  const [stats, setStats] = useLocalStorage<SoloStats>('wt-solo', DEFAULT_SOLO);

  const addWin = () => {
    setStats(prev => {
      const newStreak = prev.currentStreak + 1;
      return {
        winCount: prev.winCount + 1,
        currentStreak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
      };
    });
  };

  const undoWin = () => {
    setStats(prev => {
      if (prev.winCount === 0) return prev;
      return {
        ...prev,
        winCount: prev.winCount - 1,
        currentStreak: Math.max(0, prev.currentStreak - 1),
      };
    });
  };

  const newStreak = () => {
    setStats(prev => ({
      winCount: 0,
      currentStreak: 0,
      bestStreak: prev.bestStreak,
    }));
  };

  const reset = () => setStats(DEFAULT_SOLO);

  return { stats, addWin, undoWin, newStreak, reset };
}
