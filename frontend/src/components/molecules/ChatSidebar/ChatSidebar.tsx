import { User } from '@/types/user';
import styles from '@/styles/chat.module.css';

interface Props {
  users: User[];
  selectedUser: User | null;
  onSelect: (user: User) => void;
}

export function ChatSidebar({
  users,
  selectedUser,
  onSelect,
}: Props) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.contacts}>
        {users.map((user) => (
          <div
            key={user._id}
            className={`${styles.contact} ${
              selectedUser?._id === user._id ? styles.active : ''
            }`}
            onClick={() => onSelect(user)}
          >
            <strong>{user.username}   </strong>
            <span className={user.online ? styles.online : styles.offline}>
              {user.online ? 'Online' : 'Offline'}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
