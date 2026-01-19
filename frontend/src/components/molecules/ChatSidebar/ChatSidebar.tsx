import { User } from '@/types/user';
import styles from '@/styles/chat.module.css';
import { getAvatarUrl } from '@/utils/avatar';
import Image from 'next/image';

interface Props {
  users: User[];
  selectedUser: User | null;
  unread: Record<string, number>;
  onSelect: (user: User) => void;
}

export function ChatSidebar({
  users,
  selectedUser,
  unread,
  onSelect,
}: Props) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.contacts}>
        {users.map((user) => {
          const unreadCount = unread?.[user._id] ?? 0;

          return (
            <div
              key={user._id}
              className={`
                ${styles.contact}
                ${selectedUser?._id === user._id ? styles.active : ''}
                ${unreadCount > 0 ? styles.unread : ''}
              `}
              onClick={() => onSelect(user)}
            >
              {/* Lado esquerdo */}
              <div className={styles.contactLeft}>
                {/* Avatar + status */}
                <div className={styles.avatarWrapper}>
                  <Image
                    src={getAvatarUrl(user.username)}
                    alt={user.username}
                    width={36}
                    height={36}
                    className={styles.avatar}
                    unoptimized
                  />

                  <span
                    className={`${styles.statusDot} ${
                      user.online ? styles.online : styles.offline
                    }`}
                  />
                </div>

                {/* Textos */}
                <div className={styles.contactText}>
                  <strong>{user.name}</strong>
                  <span className={styles.usernameSmall}>
                    @{user.username}
                  </span>
                </div>
              </div>

              {unreadCount > 0 && (
                <span className={styles.badge}>
                  {unreadCount}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
