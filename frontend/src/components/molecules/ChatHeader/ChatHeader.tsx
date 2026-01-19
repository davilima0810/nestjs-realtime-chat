import styles from '@/styles/chat.module.css';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { AuthUser } from '@/types/auth-user';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { getAvatarUrl } from '@/utils/avatar';


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

        <Image
          src={getAvatarUrl(user?.username ?? 'user')}
          alt={user?.username ?? 'user'}
          width={40}
          height={40}
          className={styles.avatar}
          unoptimized
        />
        
        <div className={styles.userText}>
          <span className={styles.name}>
            {user?.name}
          </span>
          <span className={styles.usernameSmall}>
            @{user?.username}
          </span>
        </div>

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
