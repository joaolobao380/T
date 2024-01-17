const mockSignIn = jest.fn(() => Promise.resolve({ user: 'mockUser' }));
const mockSignOut = jest.fn(() => Promise.resolve());
const mockSendPasswordResetEmail = jest.fn((email) => Promise.resolve());

const mockOnAuthStateChanged = jest.fn((callback) => {
  const user = { email: 'test@example.com', uid: '12345' };
  callback(user);
  return jest.fn();
});

const simulateUserLogout = () => {
  mockOnAuthStateChanged.mockImplementation((callback) => {
    callback(null);
    return jest.fn();
  });
};

export default {
  simulateUserLogout,
  mockSendPasswordResetEmail,
  signInWithEmailAndPassword: mockSignIn,
  signOut: mockSignOut,
  onAuthStateChanged: mockOnAuthStateChanged,
  sendPasswordResetEmail: mockSendPasswordResetEmail,
};
