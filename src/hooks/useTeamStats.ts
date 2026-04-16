import { useLocalStorage } from './useLocalStorage';
import type { Runner, SortBy } from '../types';

export function useTeamStats() {
  const [runners, setRunners] = useLocalStorage<Runner[]>('wt-team', []);
  const [sortBy, setSortBy] = useLocalStorage<SortBy>('wt-sort', 'wins');

  const addRunner = (name: string) => {
    const runner: Runner = {
      id: crypto.randomUUID(),
      name,
      winCount: 0,
      currentStreak: 0,
      bestStreak: 0,
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
        const newStreak = r.currentStreak + 1;
        return {
          ...r,
          winCount: r.winCount + 1,
          currentStreak: newStreak,
          bestStreak: Math.max(r.bestStreak, newStreak),
        };
      })
    );
  };

  const resetRunnerStreak = (id: string) => {
    setRunners(prev =>
      prev.map(r => {
        if (r.id !== id) return r;
        return { ...r, winCount: 0, currentStreak: 0 };
      })
    );
  };

  const resetAll = () => setRunners([]);

  const sorted = [...runners].sort((a, b) => {
    if (sortBy === 'wins') return b.winCount - a.winCount;
    if (sortBy === 'streak') return b.currentStreak - a.currentStreak;
    return b.bestStreak - a.bestStreak;
  });

  return { runners: sorted, sortBy, setSortBy, addRunner, removeRunner, renameRunner, addWinToRunner, resetRunnerStreak, resetAll };
}
