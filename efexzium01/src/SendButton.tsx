// SendButton.tsx
import React from 'react';
import { Send } from 'lucide-react';

interface SendButtonProps {
  onClick: () => void;
}

const SendButton: React.FC<SendButtonProps> = ({ onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      <Send />
    </button>
  );
};

export default SendButton;