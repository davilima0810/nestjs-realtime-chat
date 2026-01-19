'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return null; // ou um loader
  }

  return <>{children}</>;
}
