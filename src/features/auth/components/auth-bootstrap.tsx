'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../store';
import { hydrateSessionFromStorage } from '@/lib/auth/session';

export function AuthBootstrap() {
  const setSession = useAuthStore((state) => state.setSession);
  const setHydrated = useAuthStore((state) => state.setHydrated);

  useEffect(() => {
    const session = hydrateSessionFromStorage();
    if (session) {
      setSession({
        accessToken: session.accessToken,
        user: session.user,
      });
    }
    setHydrated(true);
  }, [setHydrated, setSession]);

  return null;
}
