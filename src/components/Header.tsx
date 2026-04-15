import { Switch, Typography, Space } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';

const { Title, Text } = Typography;

interface HeaderProps {
  dark: boolean;
  onToggleDark: (v: boolean) => void;
}

export default function Header({ dark, onToggleDark }: HeaderProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
      <div>
        <Title level={3} style={{ margin: 0 }}>🏆 Win Tracker</Title>
        <Text type="secondary">Track your momentum. Stack your wins.</Text>
      </div>
      <Space>
        {dark ? <BulbFilled /> : <BulbOutlined />}
        <Switch checked={dark} onChange={onToggleDark} size="small" />
      </Space>
    </div>
  );
}
