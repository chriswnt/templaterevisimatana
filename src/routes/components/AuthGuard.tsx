import type { ReactNode } from 'react';

import { Navigate, useLocation } from 'react-router';

import { useAuthContext } from 'src/components/providers';

export function AuthGuard({ children }: { children: ReactNode }) {
  const { hasEntered } = useAuthContext();
  const { pathname } = useLocation();

  if (!hasEntered) {
    return <Navigate to="/sign-in" state={{ from: pathname }} replace />;
  }

  return <>{children}</>;
}
