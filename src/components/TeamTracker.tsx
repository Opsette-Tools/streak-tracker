import { Card, List, Button, Select, Space, Typography, Modal, Empty, Tag } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, FireOutlined, StarOutlined, CrownOutlined, ReloadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import WinButton from './WinButton';
import AddRunnerModal from './AddRunnerModal';
import { useTeamStats } from '../hooks/useTeamStats';
import type { SortBy } from '../types';

const { Text } = Typography;

export default function TeamTracker() {
  const { runners, sortBy, setSortBy, addRunner, removeRunner, renameRunner, addWinToRunner, resetRunnerStreak, resetAll } = useTeamStats();
  const [addOpen, setAddOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const editRunner = runners.find(r => r.id === editId);

  const confirmRemove = (id: string, name: string) => {
    Modal.confirm({
      title: `Remove ${name}?`,
      content: 'Their stats will be permanently deleted.',
      okText: 'Remove',
      okButtonProps: { danger: true },
      onOk: () => removeRunner(id),
    });
  };

  const confirmResetAll = () => {
    Modal.confirm({
      title: 'Reset all players?',
      content: 'This will remove all players and their stats. This cannot be undone.',
      okText: 'Reset All',
      okButtonProps: { danger: true },
      onOk: resetAll,
    });
  };

  if (runners.length === 0) {
    return (
      <Card style={{ borderRadius: 16, textAlign: 'center' }} styles={{ body: { padding: 40 } }}>
        <Empty description="No players yet" style={{ marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => setAddOpen(true)}>
            Add Your First Player
          </Button>
        </Empty>
        <AddRunnerModal
          open={addOpen}
          title="Add Player"
          onOk={name => { addRunner(name); setAddOpen(false); }}
          onCancel={() => setAddOpen(false)}
        />
      </Card>
    );
  }

  return (
    <>
      <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 12 }} wrap>
        <Space size="small">
          <Button type="dashed" icon={<PlusOutlined />} onClick={() => setAddOpen(true)}>
            Add Player
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={confirmResetAll}>
            Reset All
          </Button>
        </Space>
        <Select
          value={sortBy}
          onChange={v => setSortBy(v as SortBy)}
          size="small"
          style={{ width: 150 }}
          options={[
            { label: 'Sort: Wins', value: 'wins' },
            { label: 'Sort: Streak', value: 'streak' },
            { label: 'Sort: Best Streak', value: 'bestStreak' },
          ]}
        />
      </Space>

      <List
        dataSource={runners}
        renderItem={(runner, idx) => (
          <Card
            key={runner.id}
            size="small"
            style={{ borderRadius: 12, marginBottom: 8 }}
            styles={{ body: { padding: '12px 16px' } }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 120 }}>
                <Space>
                  {idx === 0 && runners.length > 1 && <CrownOutlined style={{ color: '#faad14', fontSize: 18 }} />}
                  <Text strong style={{ fontSize: 16 }}>{runner.name}</Text>
                </Space>
                <div style={{ marginTop: 4 }}>
                  <Tag color="blue">{runner.winCount} wins</Tag>
                  <Tag icon={<FireOutlined />} color="orange">{runner.currentStreak} streak</Tag>
                  <Tag icon={<StarOutlined />} color="gold">{runner.bestStreak} best</Tag>
                </div>
              </div>
              <Space direction="vertical" size={4} align="end">
                <WinButton onClick={() => addWinToRunner(runner.id)} label="+1 Win" block={false} size="middle" />
                <Space size={4}>
                  <Button size="small" type="text" icon={<ReloadOutlined />} onClick={() => resetRunnerStreak(runner.id)} disabled={runner.winCount === 0} title="New Streak" />
                  <Button size="small" type="text" icon={<EditOutlined />} onClick={() => setEditId(runner.id)} />
                  <Button size="small" type="text" danger icon={<DeleteOutlined />} onClick={() => confirmRemove(runner.id, runner.name)} />
                </Space>
              </Space>
            </div>
          </Card>
        )}
      />

      <AddRunnerModal
        open={addOpen}
        title="Add Player"
        onOk={name => { addRunner(name); setAddOpen(false); }}
        onCancel={() => setAddOpen(false)}
      />
      <AddRunnerModal
        open={!!editId}
        title="Rename Player"
        initialName={editRunner?.name || ''}
        onOk={name => { if (editId) renameRunner(editId, name); setEditId(null); }}
        onCancel={() => setEditId(null)}
      />
    </>
  );
}
