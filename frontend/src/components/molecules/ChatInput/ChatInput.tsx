import { useState } from 'react';
import styles from '@/styles/chat.module.css';

export function ChatInput({
  onSend,
}: {
  onSend: (text: string) => void;
}) {
  const [text, setText] = useState('');

  function handleSend() {
    if (!text) return;
    onSend(text);
    setText('');
  }

  return (
    <div className={styles.inputBox}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite sua mensagem..."
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend}>Enviar</button>
    </div>
  );
}
