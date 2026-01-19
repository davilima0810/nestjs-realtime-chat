import { User } from '@/types/user';
import styles from '@/styles/chat.module.css';

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
                ${unread?.[user._id] > 0 ? styles.unread : ''}
              `}
              onClick={() => onSelect(user)}
            >

              <div className={styles.contactInfo}>
                <strong>{user.username}</strong>

                <span
                  className={
                    user.online ? styles.online : styles.offline
                  }
                >
                  {user.online ? 'Online' : 'Offline'}
                </span>
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
