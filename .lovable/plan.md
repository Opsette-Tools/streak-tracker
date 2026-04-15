

## Win Tracker — Implementation Plan

A mobile-first, gamified win/streak tracking app built with React + Vite + TypeScript + Ant Design. Supports Solo and Team modes with localStorage persistence, dark mode, and PWA installability.

### Key Changes

1. **Remove Tailwind, add Ant Design** — Uninstall Tailwind CSS and related config. Install `antd` and `vite-plugin-pwa`. Strip `index.css` of Tailwind directives and replace with Ant Design theme configuration.

2. **PWA setup** — Configure `vite-plugin-pwa` in `vite.config.ts` with manifest, icons, and workbox settings. Add SW registration guard in `main.tsx`. Update `index.html` with meta tags and apple-touch-icon link. Generate placeholder icons (`icon-192.png`, `icon-512.png`) in `/public`.

3. **App shell & dark mode** — Replace current `App.tsx` with Ant Design `ConfigProvider` wrapping the app. Implement dark mode toggle using Ant Design's `theme.darkAlgorithm`, persisted to localStorage. Clean header with title, subtitle, and theme toggle.

4. **Mode selector** — Ant Design `Segmented` control to switch between Solo and Team modes, persisted to localStorage.

5. **Solo mode tracker** — Large win count display, current streak, best streak, "Add Win" primary button with satisfying visual feedback (brief scale animation + success message), "Undo Last Win" secondary button, and reset with confirmation modal. All stats persisted to localStorage.

6. **Team mode tracker** — Add/remove/rename runners. Each runner has their own win count, streak, and best streak with individual "Add Win" buttons. Leaderboard view sorted by wins, current streak, or best streak (switchable). Empty state with CTA when no runners exist. All data persisted to localStorage.

7. **Data layer** — Custom hooks (`useLocalStorage`, `useSoloStats`, `useTeamStats`) managing all state and localStorage persistence. Data model: solo stats object, team runners array, mode, sort preference, theme preference.

8. **Styling** — Mobile-first layout using Ant Design's `Card`, `Space`, `Typography`, `Button`, `List`, `Modal`, `Segmented`, `Select`. Custom CSS for animations and spacing (no Tailwind). Rounded cards, high contrast dark mode, clean visual hierarchy.

### File Structure
```
src/
  App.tsx              — App shell, theme provider, dark mode
  main.tsx             — Entry + SW guard
  index.css            — Global styles (no Tailwind)
  hooks/
    useLocalStorage.ts — Generic localStorage hook
    useSoloStats.ts    — Solo mode state management
    useTeamStats.ts    — Team mode state management
  components/
    Header.tsx         — Title, subtitle, dark mode toggle
    ModeSelector.tsx   — Solo/Team segmented control
    SoloTracker.tsx    — Solo mode card
    TeamTracker.tsx    — Team mode with leaderboard
    AddRunnerModal.tsx — Modal for adding/renaming runners
    WinButton.tsx      — Satisfying "Add Win" button with animation
  types/
    index.ts           — Data type definitions
```

