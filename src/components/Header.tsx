import { Switch, Typography, Space } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { ShareAppButton } from '@/components/opsette-share';

const { Title, Text } = Typography;

interface HeaderProps {
  dark: boolean;
  onToggleDark: (v: boolean) => void;
}

export default function Header({ dark, onToggleDark }: HeaderProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" width={28} height={28} />
          <Title level={3} style={{ margin: 0 }}>Streak Tracker</Title>
        </div>
        <Text type="secondary">Track your momentum. Stack your wins.</Text>
      </div>
      <Space size="small">
        <ShareAppButton />
        {dark ? <BulbFilled /> : <BulbOutlined />}
        <Switch checked={dark} onChange={onToggleDark} size="small" />
      </Space>
    </div>
  );
}
