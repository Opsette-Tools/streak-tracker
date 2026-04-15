import { Card, Statistic, Button, Modal, Space, Row, Col } from 'antd';
import { UndoOutlined, DeleteOutlined, FireOutlined, StarOutlined } from '@ant-design/icons';
import WinButton from './WinButton';
import { useSoloStats } from '../hooks/useSoloStats';

export default function SoloTracker() {
  const { stats, addWin, undoWin, reset } = useSoloStats();

  const confirmReset = () => {
    Modal.confirm({
      title: 'Reset all solo stats?',
      content: 'This will clear your win count and streaks. This cannot be undone.',
      okText: 'Reset',
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
        <Space style={{ width: '100%', justifyContent: 'center' }}>
          <Button icon={<UndoOutlined />} onClick={undoWin} disabled={stats.winCount === 0}>
            Undo Last Win
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={confirmReset} disabled={stats.winCount === 0}>
            Reset
          </Button>
        </Space>
      </Space>
    </Card>
  );
}
