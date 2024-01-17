import { renderHook, act } from '@testing-library/react-hooks';

import useAuth from './index';
// import firebase from '../../tests/__mocks__/firebase';

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
      callback(auth, { email: 'test@example.com', uuid: 'uuid do usuário' });
      return jest.fn();
    }),
    sendPasswordResetEmail: jest.fn(() => Promise.resolve()),
  };
});

describe('useAuth Hook', () => {
  it('Should sign in a user', async () => {
    const { result } = renderHook(() => useAuth());
    const email = 'test@example.com';
    const password = 'password';

    await act(async () => {
      await result.current.login(email, password);
    });

    expect(result.current.currentUser).toBeTruthy();
  });
});
