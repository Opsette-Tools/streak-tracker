import { Button, message } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface WinButtonProps {
  onClick: () => void;
  label?: string;
  block?: boolean;
  size?: 'large' | 'middle' | 'small';
}

const celebrations = [
  '🔥 Nice one!',
  '💪 Keep it up!',
  '🎯 On target!',
  '⚡ Unstoppable!',
  '🏆 Winner!',
  '🚀 Crushing it!',
  '✨ Brilliant!',
];

export default function WinButton({ onClick, label = 'Add Win', block = true, size = 'large' }: WinButtonProps) {
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    onClick();
    setAnimating(true);
    message.success(celebrations[Math.floor(Math.random() * celebrations.length)]);
    setTimeout(() => setAnimating(false), 300);
  };

  return (
    <Button
      type="primary"
      size={size}
      block={block}
      icon={<TrophyOutlined />}
      onClick={handleClick}
      style={{
        fontWeight: 600,
        transform: animating ? 'scale(1.08)' : 'scale(1)',
        transition: 'transform 0.15s ease-out',
      }}
    >
      {label}
    </Button>
  );
}
