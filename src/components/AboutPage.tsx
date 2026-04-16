import { Button, Typography, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface Props {
  onBack: () => void;
}

export default function AboutPage({ onBack }: Props) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 0', borderBottom: '1px solid rgba(128,128,128,0.2)' }}>
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={onBack} />
        <Title level={4} style={{ margin: 0 }}>How to Use</Title>
      </div>

      <div style={{ padding: '24px 0' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="Streak Tracker" width={48} height={48} />
            <Paragraph strong style={{ fontSize: 16, marginTop: 8 }}>
              Track wins. Build streaks. Stay motivated.
            </Paragraph>
          </div>

          <div>
            <Title level={5}>Solo Mode</Title>
            <ol style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li><Text strong>Add Win</Text> — tap it every time you close a deal, finish a task, or hit a goal. Your streak grows with each win.</li>
              <li><Text strong>New Streak</Text> — lost momentum? Start fresh. Your current streak resets but your best streak is preserved forever.</li>
              <li><Text strong>Undo Last</Text> — made a mistake? Roll back the last win.</li>
              <li><Text strong>Reset All</Text> — nuclear option. Clears everything including your best streak.</li>
            </ol>
          </div>

          <div>
            <Title level={5}>Team Mode</Title>
            <ol style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li><Text strong>Add players</Text> — create a player for each person on your team.</li>
              <li><Text strong>+1 Win</Text> — tap it next to a player's name when they score.</li>
              <li><Text strong>Leaderboard</Text> — players sort automatically by wins, current streak, or best streak.</li>
              <li><Text strong>New Streak</Text> — reset an individual player's streak without affecting their best.</li>
              <li><Text strong>Reset All</Text> — clear the entire board and start fresh.</li>
            </ol>
          </div>

          <div>
            <Title level={5}>Tips</Title>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li>Your data is saved locally in your browser — no account needed.</li>
              <li>Use dark mode for late-night grind sessions.</li>
              <li>Best streak is a permanent high-water mark. Chase it.</li>
            </ul>
          </div>
        </Space>
      </div>
    </div>
  );
}
