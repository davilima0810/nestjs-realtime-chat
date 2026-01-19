import { ReactNode } from 'react';
import styles from '@/styles/chat.module.css';

export function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      {children}
    </div>
  );
}
