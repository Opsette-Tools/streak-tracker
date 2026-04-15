import { useLocalStorage } from './useLocalStorage';
import type { Runner, SortBy } from '../types';

export function useTeamStats() {
  const [runners, setRunners] = useLocalStorage<Runner[]>('wt-team', []);
  const [sortBy, setSortBy] = useLocalStorage<SortBy>('wt-sort', 'wins');

  const today = () => new Date().toDateString();

  const addRunner = (name: string) => {
    const runner: Runner = {
      id: crypto.randomUUID(),
      name,
      winCount: 0,
      currentStreak: 0,
      bestStreak: 0,
      lastWinDate: null,
    };
    setRunners(prev => [...prev, runner]);
  };

  const removeRunner = (id: string) => {
    setRunners(prev => prev.filter(r => r.id !== id));
  };

  const renameRunner = (id: string, name: string) => {
    setRunners(prev => prev.map(r => (r.id === id ? { ...r, name } : r)));
  };

  const addWinToRunner = (id: string) => {
    setRunners(prev =>
      prev.map(r => {
        if (r.id !== id) return r;
        const isConsecutive =
          r.lastWinDate &&
          (r.lastWinDate === today() ||
            r.lastWinDate === new Date(Date.now() - 86400000).toDateString());
        const newStreak = isConsecutive ? r.currentStreak + 1 : 1;
        return {
          ...r,
          winCount: r.winCount + 1,
          currentStreak: newStreak,
          bestStreak: Math.max(r.bestStreak, newStreak),
          lastWinDate: today(),
        };
      })
    );
  };

  const sorted = [...runners].sort((a, b) => {
    if (sortBy === 'wins') return b.winCount - a.winCount;
    if (sortBy === 'streak') return b.currentStreak - a.currentStreak;
    return b.bestStreak - a.bestStreak;
  });

  return { runners: sorted, sortBy, setSortBy, addRunner, removeRunner, renameRunner, addWinToRunner };
}
