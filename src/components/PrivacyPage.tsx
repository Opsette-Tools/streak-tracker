import { Button, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface Props {
  onBack: () => void;
}

export default function PrivacyPage({ onBack }: Props) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 0', borderBottom: '1px solid rgba(128,128,128,0.2)' }}>
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={onBack} />
        <Title level={4} style={{ margin: 0 }}>Privacy Policy</Title>
      </div>

      <div style={{ padding: '24px 0' }}>
        <Paragraph strong style={{ fontSize: 16 }}>Streak Tracker respects your privacy.</Paragraph>

        <Title level={5}>No Data Collection</Title>
        <Paragraph>
          Streak Tracker runs entirely in your browser. We do not collect, store, or transmit any
          personal information. All data stays on your device in local storage.
        </Paragraph>

        <Title level={5}>No Cookies or Tracking</Title>
        <Paragraph>
          We do not use cookies, analytics, or any third-party tracking services.
        </Paragraph>

        <Title level={5}>No Account Required</Title>
        <Paragraph>
          There is no sign-up, no login, and no data stored on any server.
          Your win counts, streaks, and team data are never shared with anyone.
        </Paragraph>

        <Title level={5}>Contact</Title>
        <Paragraph>
          If you have questions about this policy, you can reach us through the app's GitHub repository.
        </Paragraph>
      </div>
    </div>
  );
}
