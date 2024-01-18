import {
  User,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth';
import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';

import { auth } from '../../../utils/firebase';

interface AuthHook {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const useAuth = (): AuthHook => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).catch((error) => {
      if (error.code === 'auth/wrong-password') {
        Toast.show({
          type: 'error',
          text2: 'Senha incorreta. Por favor, tente novamente.',
        });
      } else {
        Toast.show({
          type: 'error',
          text2: 'Tente novamente mais tarde.',
        });
      }
    });
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { currentUser, loading, login, logout, resetPassword };
};

export default useAuth;
