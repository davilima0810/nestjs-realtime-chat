import styles from '@/styles/chat.module.css';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { AuthUser } from '@/types/auth-user';
import dynamic from 'next/dynamic';


interface Props {
  user: AuthUser | null;
}

export function ChatHeader({ user }: Props) {
  const { logout } = useAuth();

  const router = useRouter();

  const ChatHeader = dynamic(
    () =>
      import('@/components/molecules/ChatHeader/ChatHeader').then(
        (mod) => mod.ChatHeader,
      ),
    { ssr: false },
  );

  function handleLogout() {
    logout();
    router.push('/login');
  }

  return (
    <header className={styles.navbar}>
      <h2 className={styles.title}>Mensagens</h2>

      <div className={styles.userInfo}>
        <span className={styles.username}>
          {user?.name}
        </span>

        <button
          className={styles.logoutButton}
          onClick={handleLogout}
          title="Sair"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
