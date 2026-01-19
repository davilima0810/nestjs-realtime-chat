import { useState } from 'react';
import { setAuthToken } from '@/services/api';
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
  const [{ token, user }, setAuth] = useState(getInitialAuth);

  function login(token: string, user: AuthUser) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    setAuthToken(token);
    setAuth({ token, user });
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setAuthToken('');
    setAuth({ token: null, user: null });
  }

  return {
    token,
    user,
    isAuthenticated: !!token,
    login,
    logout,
  };
}
