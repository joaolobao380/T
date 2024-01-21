import AsyncStorage from '@react-native-async-storage/async-storage';
import { keyAsyncUser } from '@utils/enums';
import {
  User,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth';
import { useState, useEffect, createContext, ReactNode, useContext } from 'react';

import { auth } from '../../services/firebase';

interface AuthContextData {
  currentUser: User | null;
  loading: boolean;
  isLogged: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    await AsyncStorage.setItem(keyAsyncUser.USER_TOKEN_KEY, token);
    setIsLogged(true);
  };

  const logout = async () => {
    await signOut(auth);
    await AsyncStorage.removeItem(keyAsyncUser.USER_TOKEN_KEY);
    setIsLogged(false);
  };

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const checkAuthState = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem(keyAsyncUser.USER_TOKEN_KEY);

      if (token) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
      setLoading(false);
    };
    checkAuthState();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, logout, resetPassword, isLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
