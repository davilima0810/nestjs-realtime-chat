import styles from '@/styles/chat.module.css';
import { User } from '@/types/user';
import { formatMessageDate } from '@/utils/formatDate';
import { useEffect, useRef } from 'react';


interface Message {
  id: string;
  from: {
    userId: string;
    username: string;
  };
  to: string;
  content: string;
  createdAt: string;
}

interface Props {
  messages: Message[];
  currentUserId?: string;
  selectedUser: User | null;
}

export function ChatMessages({
  messages,
  currentUserId,
  selectedUser,
}: Props) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  if (!selectedUser) {
    return (
      <div className={styles.empty}>
        <p>Selecione uma conversa</p>
      </div>
    );
  }

  return (
    <div className={styles.messages}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={
            msg.from.userId === currentUserId
              ? styles.messageSent
              : styles.messageReceived
          }
        >
          <p>{msg.content}</p>
          <p className={msg.from.userId === currentUserId ? styles.timeSent : styles.timeReceived}>{formatMessageDate(msg.createdAt)}</p>
        </div>
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
}
