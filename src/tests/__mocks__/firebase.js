export const mockSignIn = jest.fn(() => Promise.resolve({ user: 'mockUser' }));
export const mockSignOut = jest.fn(() => Promise.resolve());
export const sendPasswordResetEmail = jest.fn((email) => Promise.resolve());

export const mockOnAuthStateChanged = jest.fn((callback) => {
  const user = { email: 'test@example.com', uid: '12345' };
  callback(user);
  return jest.fn();
});

export const simulateUserLogout = () => {
  mockOnAuthStateChanged.mockImplementation((callback) => {
    callback(null);
    return jest.fn();
  });
};
