import { useEffect, useState } from 'react';
import { api, setAuthToken } from '@/services/api';
import { AuthUser } from '@/types/auth-user';

function getInitialAuth() {
  if (typeof window === 'undefined') {
    return { token: null, user: null };
  }

  const token = localStorage.getItem('token');
  const userRaw = localStorage.getItem('user');

  let user: AuthUser | null = null;

  if (userRaw) {
    try {
      user = JSON.parse(userRaw);
    } catch {
      localStorage.removeItem('user');
    }
  }

  if (token) {
    setAuthToken(token);
  }

  return { token, user };
}

export function useAuth() {
  const [{ token, user, loading }, setAuth] = useState(() => ({
    ...getInitialAuth(),
    loading: true,
  }));

  function login(token: string, user: AuthUser) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    setAuthToken(token);
    setAuth({ token, user, loading: false });
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setAuthToken('');
    setAuth({ token: null, user: null, loading: false });
  }

  useEffect(() => {
    async function validateToken() {
      if (!token) {
        setAuth((prev) => ({ ...prev, loading: false }));
        return;
      }

      try {
        const res = await api.get<AuthUser>('/auth/me');

        setAuth({
          token,
          user: res.data,
          loading: false,
        });
      } catch {
        logout();
      }
    }

    validateToken();
  }, []);

  return {
    token,
    user,
    loading,
    isAuthenticated: !!token,
    login,
    logout,
  };
}
