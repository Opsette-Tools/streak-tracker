import { useState } from 'react';
import { ConfigProvider, theme, Button, Space } from 'antd';
import { InfoCircleOutlined, LockOutlined } from '@ant-design/icons';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import SoloTracker from './components/SoloTracker';
import TeamTracker from './components/TeamTracker';
import AboutPage from './components/AboutPage';
import PrivacyPage from './components/PrivacyPage';
import type { AppMode } from './types';

type Page = 'main' | 'about' | 'privacy';

const App = () => {
  const [dark, setDark] = useLocalStorage('wt-dark', false);
  const [mode, setMode] = useLocalStorage<AppMode>('wt-mode', 'solo');
  const [page, setPage] = useState<Page>('main');

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
        {page === 'main' && (
          <>
            <Header dark={dark} onToggleDark={setDark} />
            <ModeSelector mode={mode} onChange={setMode} />
            {mode === 'solo' ? <SoloTracker /> : <TeamTracker />}
            <div style={{ textAlign: 'center', marginTop: 32, paddingBottom: 16 }}>
              <Space split={<span style={{ opacity: 0.3 }}>|</span>}>
                <Button type="link" size="small" icon={<InfoCircleOutlined />} onClick={() => setPage('about')}>
                  How to Use
                </Button>
                <Button type="link" size="small" icon={<LockOutlined />} onClick={() => setPage('privacy')}>
                  Privacy
                </Button>
                <Button type="link" size="small" href="https://opsette.io" target="_blank" rel="noopener noreferrer">
                  By Opsette
                </Button>
              </Space>
            </div>
          </>
        )}
        {page === 'about' && <AboutPage onBack={() => setPage('main')} />}
        {page === 'privacy' && <PrivacyPage onBack={() => setPage('main')} />}
      </div>
    </ConfigProvider>
  );
};

export default App;
