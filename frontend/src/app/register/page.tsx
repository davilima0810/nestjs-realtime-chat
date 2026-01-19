'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { AuthCard } from '@/components/molecules/AuthCard/AuthCard';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  async function handleRegister() {
    setError('');
    setSuccess('');

    try {
      await api.post('/auth/register', {
        name,
        username,
        password,
      });

      setSuccess('Usuário criado com sucesso!');
      setTimeout(() => router.push('/login'), 1500);
    } catch (err) {
      setError('Erro ao cadastrar usuário');
    }
  }

  return (
    <AuthCard
      title="Criar conta"
      subtitle="Preencha os dados para se cadastrar"
      footer={
        <Link href="/login">Já tenho uma conta</Link>
      }
    >
      <h1>Cadastro</h1>

      <input
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />

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

      <button onClick={handleRegister}>Cadastrar</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </AuthCard>
  );
}
