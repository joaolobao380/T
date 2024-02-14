import { db } from '@services/firebase'; // Ajuste conforme necessário
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { addDoc } from 'firebase/firestore';
import React from 'react';
import Toast from 'react-native-toast-message';

import { RegisterList } from '.';

// Mocks adicionais conforme necessário...

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

jest.mock('firebase/app', () => {
  return {
    initializeApp: jest.fn(() => {}),
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      goBack: jest.fn(),
    }),
  };
});

jest.mock('firebase/firestore', () => {
  return {
    getFirestore: jest.fn(() => ({})),
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

describe('<RegisterList />', () => {
  it('renderiza corretamente', () => {
    const { getByText, getByTestId } = render(<RegisterList />);

    expect(getByText('Criação de lista')).toBeTruthy();
    expect(getByText('Adicionar uma atividade')).toBeTruthy();
    // Verifique outros elementos importantes...
  });
  it('permite adicionar uma nova atividade', () => {
    const { getByText, getByTestId } = render(<RegisterList />);

    const addButton = getByTestId('add-activity-button'); // Garanta que você tenha testID no seu TouchableOpacity
    fireEvent.press(addButton);
  });
  it('salva a nova lista no Firestore', async () => {
    const { getByText } = render(<RegisterList />);

    const saveButton = getByText('Salvar');
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(addDoc).toHaveBeenCalled();
      // Verifique se addDoc foi chamado com os argumentos esperados, se necessário.
    });
  });
  it('exibe um toast após salvar com sucesso', async () => {
    // Simule a ação de salvar aqui, como no teste anterior

    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
          text1: 'Sucesso',
          // Outros parâmetros conforme necessário...
        })
      );
    });
  });
});
