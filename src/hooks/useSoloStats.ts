import { useLocalStorage } from './useLocalStorage';
import type { SoloStats } from '../types';

const DEFAULT_SOLO: SoloStats = {
  winCount: 0,
  currentStreak: 0,
  bestStreak: 0,
  lastWinDate: null,
};

export function useSoloStats() {
  const [stats, setStats] = useLocalStorage<SoloStats>('wt-solo', DEFAULT_SOLO);

  const today = () => new Date().toDateString();

  const addWin = () => {
    setStats(prev => {
      const isConsecutiveDay =
        prev.lastWinDate &&
        (prev.lastWinDate === today() ||
          prev.lastWinDate === new Date(Date.now() - 86400000).toDateString());
      const newStreak = isConsecutiveDay ? prev.currentStreak + 1 : 1;
      return {
        winCount: prev.winCount + 1,
        currentStreak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
        lastWinDate: today(),
      };
    });
  };

  const undoWin = () => {
    setStats(prev => {
      if (prev.winCount === 0) return prev;
      const newCount = prev.winCount - 1;
      const newStreak = Math.max(0, prev.currentStreak - 1);
      return {
        ...prev,
        winCount: newCount,
        currentStreak: newStreak,
      };
    });
  };

  const reset = () => setStats(DEFAULT_SOLO);

  return { stats, addWin, undoWin, reset };
}
