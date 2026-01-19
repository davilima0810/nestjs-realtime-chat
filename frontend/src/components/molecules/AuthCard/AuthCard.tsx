import { ReactNode } from 'react';
import styles from '@/styles/auth.module.css';

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}

        <div className={styles.content}>{children}</div>

        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
}
