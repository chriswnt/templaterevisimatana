import type { AcademicRole } from 'src/lib/types';

import { useNavigate } from 'react-router';
import { useMemo, useState, useContext, useCallback, createContext, type ReactNode } from 'react';

export type AuthContextValue = {
  hasEntered: boolean;
  currentRole: AcademicRole;
  setCurrentRole: (role: AcademicRole) => void;
  signIn: (role: AcademicRole) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY_ENTERED = 'hasEntered';
const STORAGE_KEY_ROLE = 'currentRole';

function getStoredEntered(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY_ENTERED) === 'true';
  } catch {
    return false;
  }
}

function getStoredRole(): AcademicRole {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_ROLE);
    if (stored === 'Admin Akademik' || stored === 'Staf Admisi' || stored === 'Dosen') {
      return stored;
    }
    return 'Admin Akademik';
  } catch {
    return 'Admin Akademik';
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [hasEntered, setHasEntered] = useState(getStoredEntered);
  const [currentRole, setCurrentRoleState] = useState<AcademicRole>(getStoredRole);

  const setCurrentRole = useCallback((role: AcademicRole) => {
    setCurrentRoleState(role);
    try {
      localStorage.setItem(STORAGE_KEY_ROLE, role);
    } catch {
      /* noop */
    }
  }, []);

  const signIn = useCallback(
    (role: AcademicRole) => {
      setCurrentRoleState(role);
      setHasEntered(true);
      try {
        localStorage.setItem(STORAGE_KEY_ENTERED, 'true');
        localStorage.setItem(STORAGE_KEY_ROLE, role);
      } catch {
        /* noop */
      }
      navigate('/dashboard');
    },
    [navigate]
  );

  const signOut = useCallback(() => {
    setHasEntered(false);
    try {
      localStorage.removeItem(STORAGE_KEY_ENTERED);
      localStorage.removeItem(STORAGE_KEY_ROLE);
    } catch {
      /* noop */
    }
    navigate('/sign-in');
  }, [navigate]);

  const value = useMemo(
    () => ({ hasEntered, currentRole, setCurrentRole, signIn, signOut }),
    [hasEntered, currentRole, setCurrentRole, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
