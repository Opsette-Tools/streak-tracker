import { ConfigProvider, theme } from 'antd';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import SoloTracker from './components/SoloTracker';
import TeamTracker from './components/TeamTracker';
import type { AppMode } from './types';

const App = () => {
  const [dark, setDark] = useLocalStorage('wt-dark', false);
  const [mode, setMode] = useLocalStorage<AppMode>('wt-mode', 'solo');

  return (
    <ConfigProvider
      theme={{
        algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 8,
        },
      }}
    >
      <div
        style={{
          minHeight: '100vh',
          background: dark ? '#141414' : '#f5f5f5',
          padding: '0 16px 32px',
          maxWidth: 480,
          margin: '0 auto',
          transition: 'background 0.3s',
        }}
      >
        <Header dark={dark} onToggleDark={setDark} />
        <ModeSelector mode={mode} onChange={setMode} />
        {mode === 'solo' ? <SoloTracker /> : <TeamTracker />}
      </div>
    </ConfigProvider>
  );
};

export default App;
