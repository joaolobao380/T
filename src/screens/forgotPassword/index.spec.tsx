import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { textToast } from '@utils/enums';
import React from 'react';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';

import { ForgotPassword } from '.';

const userUuid = 'uuid do usuário';
const emailTest = 'test@example.com';
const placeholderEmail = 'Ex: email@email.com';
const titleButton = 'Enviar';

const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
}));

const mockResetPassword = jest.fn();

jest.mock('@hooks/useAuth', () => ({
  __esModule: true,
  default: () => ({
    resetPassword: mockResetPassword,
  }),
}));

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

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

describe('ForgotPassword Screen', () => {
  it('Should submits the form with email', async () => {
    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);
    const emailInput = getByPlaceholderText(placeholderEmail);
    const submitButton = getByText(titleButton);

    fireEvent.changeText(emailInput, emailTest);
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith(emailTest);
    });
  });

  const mockReset = mockResetPassword as any;

  it('Should shows success toast message on successful password reset', async () => {
    mockReset.mockResolvedValueOnce();

    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);
    const emailInput = getByPlaceholderText(placeholderEmail);
    const submitButton = getByText(titleButton);

    fireEvent.changeText(emailInput, 'success@example.com');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          text1: textToast.SUCCESSFUL,
          text2: 'O e-mail de recuperação foi enviado.',
        })
      );
    });
  });

  it('Should shows error toast message on failed password reset', async () => {
    mockResetPassword.mockRejectedValueOnce(new Error('Failed'));

    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);
    const emailInput = getByPlaceholderText(placeholderEmail);
    const submitButton = getByText(titleButton);

    fireEvent.changeText(emailInput, 'fail@example.com');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          text1: textToast.ATTENTION,
          text2: 'Não foi possível enviar o e-mail, tente novamente.',
        })
      );
    });
  });
  it('renders correctly input', () => {
    const { getByText, getByPlaceholderText } = render(<ForgotPassword />);
    expect(
      getByText('Será enviado um e-mail de redefinição de senha para o e-mail digitado abaixo.')
    ).toBeTruthy();
    expect(getByPlaceholderText(placeholderEmail)).toBeTruthy();
  });

  it('calls goBack when back button is pressed', () => {
    const { getByTestId } = render(<ForgotPassword />);
    const backButton = getByTestId('forgot_passowrd_testID_back_button');
    fireEvent.press(backButton);

    expect(mockGoBack).toHaveBeenCalled();
  });

  it('renders correctly', () => {
    const { toJSON } = render(<ForgotPassword />);
    expect(toJSON()).toMatchSnapshot();
  });
});
