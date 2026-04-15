import { Segmented } from 'antd';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import type { AppMode } from '../types';

interface Props {
  mode: AppMode;
  onChange: (mode: AppMode) => void;
}

export default function ModeSelector({ mode, onChange }: Props) {
  return (
    <Segmented
      block
      value={mode}
      onChange={v => onChange(v as AppMode)}
      options={[
        { label: 'Solo', value: 'solo', icon: <UserOutlined /> },
        { label: 'Team', value: 'team', icon: <TeamOutlined /> },
      ]}
      style={{ marginBottom: 16 }}
    />
  );
}
