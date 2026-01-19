'use client';

import { useEffect, useState } from 'react';
import { connectSocket, disconnectSocket } from '@/services/socket';
import { api } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/types/user';

import { ChatLayout } from '@/components/molecules/ChatLayout/ChatLayout';
import { ChatHeader } from '@/components/molecules/ChatHeader/ChatHeader';
import { ChatSidebar } from '@/components/molecules/ChatSidebar/ChatSidebar';
import { ChatMessages } from '@/components/molecules/ChatMessages/ChatMessages';
import { ChatInput } from '@/components/molecules/ChatInput/ChatInput';

import styles from '@/styles/chat.module.css';

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

export default function ChatPage() {
  const { token, user } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [unread, setUnread] = useState<Record<string, number>>({});

  const [messages, setMessages] = useState<Message[]>([]);

  async function loadMessages(userId: string) {
    const res = await api.get<Message[]>(`/messages/${userId}`);
    setMessages(res.data);
  }

  function handleSendMessage(text: string) {
    if (!text || !selectedUser || !token) return;

    const socket = connectSocket(token);

    socket.emit('send_message', {
      to: selectedUser._id,
      message: text,
    });
  }

  useEffect(() => {
    if (!token) return;

    async function loadUsers() {
      const res = await api.get<User[]>('/users');
      setUsers(res.data);
    }

    loadUsers();
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const socket = connectSocket(token);

    socket.on('new_message', (msg: Message) => {
      if (
        selectedUser &&
        (msg.from.userId === selectedUser._id ||
          msg.to === selectedUser._id)
      ) {
        setMessages((prev) => [...prev, msg]);
        return;
      }

      const otherUserId =
        msg.from.userId === user?.id
          ? msg.to
          : msg.from.userId;

      setUnread((prev) => ({
        ...prev,
        [otherUserId]: (prev[otherUserId] ?? 0) + 1,
      }));
    });

    socket.on(
      'user_status',
      ({ userId, online }: { userId: string; online: boolean }) => {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === userId ? { ...u, online } : u,
          ),
        );
      },
    );

    return () => {
      socket.off('new_message');
      socket.off('user_status');
      disconnectSocket();
    };
  }, [token, selectedUser]);


  return (
    <ChatLayout>
      <ChatHeader user={user} />

      <div className={styles.container}>
        <ChatSidebar
          users={users}
          selectedUser={selectedUser}
          unread={unread}
          onSelect={(user) => {
            setSelectedUser(user);
            loadMessages(user._id);

            setUnread((prev) => ({
              ...prev,
              [user._id]: 0,
            }));
          }}
        />

        <div className={styles.chatArea}>
           <ChatMessages
            messages={messages}
            currentUserId={user?.id}
            selectedUser={selectedUser}
          />

          {selectedUser && (
            <ChatInput onSend={handleSendMessage} />
          )}
        </div>
      </div>
    </ChatLayout>
  );
}
