import { Modal, Input } from 'antd';
import { useState, useEffect } from 'react';

interface Props {
  open: boolean;
  initialName?: string;
  title?: string;
  onOk: (name: string) => void;
  onCancel: () => void;
}

export default function AddRunnerModal({ open, initialName = '', title = 'Add Runner', onOk, onCancel }: Props) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    if (open) setName(initialName);
  }, [open, initialName]);

  return (
    <Modal
      open={open}
      title={title}
      okText={initialName ? 'Save' : 'Add'}
      onOk={() => { if (name.trim()) { onOk(name.trim()); } }}
      onCancel={onCancel}
      okButtonProps={{ disabled: !name.trim() }}
    >
      <Input
        placeholder="Runner name"
        value={name}
        onChange={e => setName(e.target.value)}
        onPressEnter={() => { if (name.trim()) onOk(name.trim()); }}
        autoFocus
        maxLength={30}
        style={{ marginTop: 8 }}
      />
    </Modal>
  );
}
