// CustomInput.test.tsx
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { messageToast, errorMessageFirebase } from '@utils/enums';
import React from 'react';
import Toast from 'react-native-toast-message';

import { Login } from './index';

const emailTest = 'test@example.com';
const placeholderEmail = 'Ex: email@email.com';
const placeholderPassword = 'Ex: •••••••••••';
const nameFieldPassword = 'password';
const userUuid = 'uuid do usuário';
const titleButton = 'Entrar';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

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
        user: { email: emailTest, uuid: userUuid },
      })
    ),
    signOut: jest.fn(() => Promise.resolve()),
    onAuthStateChanged: jest.fn((auth, callback) => {
      callback({ email: emailTest, uuid: userUuid });
      return jest.fn();
    }),
    sendPasswordResetEmail: jest.fn((auth, email) => Promise.resolve()),
  };
});

jest.mock('react-native-toast-message', () => {
  return {
    show: jest.fn(),
  };
});

const mockLogin = jest.fn();
jest.mock('@hooks/useAuth', () => ({
  __esModule: true,
  default: () => ({
    login: mockLogin,
  }),
}));

describe('Login screen', () => {
  it('Should call login function with correct credentials on submit', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    const emailInput = getByPlaceholderText(placeholderEmail);
    const passwordInput = getByPlaceholderText(placeholderPassword);
    const submitButton = getByText(titleButton);

    fireEvent.changeText(emailInput, emailTest);
    fireEvent.changeText(passwordInput, nameFieldPassword);
    fireEvent.press(submitButton);

    await waitFor(() => expect(mockLogin).toHaveBeenCalledWith(emailTest, nameFieldPassword));
  });

  it('Should show error toast on login failure auth/invalid-credential', async () => {
    mockLogin.mockRejectedValueOnce({ code: errorMessageFirebase.INVALID_CREDENTIAL });

    const { getByPlaceholderText, getByText } = render(<Login />);
    const emailInput = getByPlaceholderText(placeholderEmail);
    const passwordInput = getByPlaceholderText(placeholderPassword);
    const submitButton = getByText(titleButton);

    fireEvent.changeText(emailInput, emailTest);
    fireEvent.changeText(passwordInput, nameFieldPassword);
    fireEvent.press(submitButton);

    await waitFor(
      () => {
        expect(Toast.show).toHaveBeenCalledWith(
          expect.objectContaining({
            type: messageToast.ERROR,
            text2: 'Senha incorreta. Por favor, tente novamente.',
          })
        );
      },
      { timeout: 1000 }
    );
  });

  it('Should show error toast on login failure auth/too-many-requests', async () => {
    mockLogin.mockRejectedValueOnce({ code: errorMessageFirebase.TOO_MANY });

    const { getByPlaceholderText, getByText } = render(<Login />);
    const emailInput = getByPlaceholderText(placeholderEmail);
    const passwordInput = getByPlaceholderText(placeholderPassword);
    const submitButton = getByText(titleButton);

    fireEvent.changeText(emailInput, emailTest);
    fireEvent.changeText(passwordInput, nameFieldPassword);
    fireEvent.press(submitButton);

    await waitFor(
      () => {
        expect(Toast.show).toHaveBeenCalledWith(
          expect.objectContaining({
            type: messageToast.ERROR,
            text2: 'Seu acesso foi bloqueado.',
          })
        );
      },
      { timeout: 1000 }
    );
  });

  it('Should show error toast on login failure auth/too-many-requests', async () => {
    mockLogin.mockRejectedValueOnce({ code: 'qualquer error' });

    const { getByPlaceholderText, getByText } = render(<Login />);
    const emailInput = getByPlaceholderText(placeholderEmail);
    const passwordInput = getByPlaceholderText(placeholderPassword);
    const submitButton = getByText(titleButton);

    fireEvent.changeText(emailInput, emailTest);
    fireEvent.changeText(passwordInput, nameFieldPassword);
    fireEvent.press(submitButton);

    await waitFor(
      () => {
        expect(Toast.show).toHaveBeenCalledWith(
          expect.objectContaining({
            type: messageToast.ERROR,
            text2: 'Não foi possível logar-se, tente novamente.',
          })
        );
      },
      { timeout: 1000 }
    );
  });

  it('Should navigate to ForgotPassword screen on forgot password button press', () => {
    const { getByText } = render(<Login />);
    const forgotPasswordButton = getByText('Esqueci minha senha');
    fireEvent.press(forgotPasswordButton);
    expect(mockNavigate).toHaveBeenCalledWith('ForgotPassword');
  });

  it('renders correctly', () => {
    const { toJSON } = render(<Login />);
    expect(toJSON()).toMatchSnapshot();
  });
});
