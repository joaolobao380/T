import AsyncStorage from '@react-native-async-storage/async-storage';
import { renderHook, act } from '@testing-library/react-hooks';
import { keyAsyncUser } from '@utils/enums';
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { AuthProvider, useAuth } from './index';
import { auth } from '../../services/firebase';

jest.mock('firebase/app', () => {
  return {
    initializeApp: jest.fn(() => {}),
  };
});

jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(() => ({})),
    signInWithEmailAndPassword: jest.fn(() =>
      Promise.resolve({
        user: {
          email: 'test@example.com',
          uuid: 'uuid do usuário',
          getIdToken: jest.fn(() => Promise.resolve('mockToken')),
        },
      })
    ),
    signOut: jest.fn(() => Promise.resolve()),
    onAuthStateChanged: jest.fn((auth, callback) => {
      callback({ email: 'test@example.com', uuid: 'uuid do usuário' });
      return jest.fn();
    }),
    sendPasswordResetEmail: jest.fn((auth, email) => Promise.resolve()),
  };
});

describe('useAuth Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const Wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;

  it('Should sign in a user and save token', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });
    const email = 'test@example.com';
    const password = 'password';

    await act(async () => {
      await result.current.login(email, password);
    });

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(keyAsyncUser.USER_TOKEN_KEY, 'mockToken');
  });

  it('Should send a password reset email', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });
    const email = 'forgot@example.com';

    await act(async () => {
      await result.current.resetPassword(email);
    });
    expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, email);
  });

  const authState = onAuthStateChanged as any;

  it('Should log out a user', async () => {
    authState.mockImplementation((auth: any, callback: any) => {
      callback(null);
      return jest.fn();
    });

    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.currentUser).toBeNull();
  });
});
