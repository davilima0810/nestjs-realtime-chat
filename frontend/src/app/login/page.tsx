'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { AuthCard } from '@/components/molecules/AuthCard/AuthCard';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  async function handleLogin() {
    try {
      const response = await api.post('/auth/login', {
        username,
        password,
      });

      login(response.data.access_token, response.data.user);
      router.push('/chat');
    } catch (err) {
      setError('Usuário ou senha inválidos');
    }
  }

  return (
    <AuthCard
      title="Acesse sua conta"
      subtitle="Insira suas credenciais para fazer login"
      footer={
        <Link href="/register">Criar uma nova conta</Link>
      }
    >
      <h1>Login</h1>

      <input
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleLogin}>Entrar</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>
        Não tem conta?{' '}
        <a href="/register">Cadastre-se</a>
      </p>

    </AuthCard>
  );
}
