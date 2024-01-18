import { renderHook, act } from '@testing-library/react-hooks';
import { onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';

import useAuth from './index';
import { auth } from '../../../utils/firebase';

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
        user: { email: 'test@example.com', uuid: 'uuid do usuário' },
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
  it('Should sign in a user', async () => {
    const { result } = renderHook(() => useAuth());
    const email = 'test@example.com';
    const password = 'password';

    await act(async () => {
      await result.current.login(email, password);
    });
    expect(result.current.currentUser).toBeTruthy();
  });

  it('Should send a password reset email', async () => {
    const { result } = renderHook(() => useAuth());
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

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.currentUser).toBeNull();
  });
});
