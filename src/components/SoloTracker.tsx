import { Card, Statistic, Button, Modal, Space, Row, Col } from 'antd';
import { UndoOutlined, DeleteOutlined, FireOutlined, StarOutlined, ReloadOutlined } from '@ant-design/icons';
import WinButton from './WinButton';
import { useSoloStats } from '../hooks/useSoloStats';

export default function SoloTracker() {
  const { stats, addWin, undoWin, newStreak, reset } = useSoloStats();

  const confirmNewStreak = () => {
    Modal.confirm({
      title: 'Start a new streak?',
      content: 'This will reset your win count and current streak, but your best streak is preserved.',
      okText: 'New Streak',
      onOk: newStreak,
    });
  };

  const confirmReset = () => {
    Modal.confirm({
      title: 'Reset everything?',
      content: 'This will clear your win count, current streak, and best streak. This cannot be undone.',
      okText: 'Reset All',
      okButtonProps: { danger: true },
      onOk: reset,
    });
  };

  return (
    <Card
      style={{ borderRadius: 16, textAlign: 'center' }}
      styles={{ body: { padding: 24 } }}
    >
      <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, marginBottom: 8 }}>
        {stats.winCount}
      </div>
      <div style={{ marginBottom: 24, opacity: 0.6, fontSize: 14 }}>total wins</div>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Statistic
            title="Current Streak"
            value={stats.currentStreak}
            prefix={<FireOutlined style={{ color: '#fa8c16' }} />}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Best Streak"
            value={stats.bestStreak}
            prefix={<StarOutlined style={{ color: '#faad14' }} />}
          />
        </Col>
      </Row>

      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <WinButton onClick={addWin} />
        <Space style={{ width: '100%', justifyContent: 'center' }} wrap>
          <Button icon={<UndoOutlined />} onClick={undoWin} disabled={stats.winCount === 0}>
            Undo Last
          </Button>
          <Button icon={<ReloadOutlined />} onClick={confirmNewStreak} disabled={stats.winCount === 0}>
            New Streak
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={confirmReset} disabled={stats.winCount === 0 && stats.bestStreak === 0}>
            Reset All
          </Button>
        </Space>
      </Space>
    </Card>
  );
}
