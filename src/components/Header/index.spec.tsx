import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import { Header } from '.';

describe('Header Component', () => {
  it('Should renders correctly with mandatory props', () => {
    const { getByText } = render(<Header title="Test Title" />);
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('Should renders back button and triggers onBackPress', () => {
    const mockBackPress = jest.fn();
    const { getByTestId } = render(
      <Header title="Test Title" showBackButton onBackPress={mockBackPress} />
    );

    const backButton = getByTestId('header_testID_back_button');
    fireEvent.press(backButton);
    expect(mockBackPress).toHaveBeenCalled();
  });

  it('Should renders close button and triggers onClosePress', () => {
    const mockClosePress = jest.fn();
    const { getByTestId } = render(
      <Header title="Test Title" showCloseButton onClosePress={mockClosePress} />
    );

    const closeButton = getByTestId('header_testID_close_button');
    fireEvent.press(closeButton);
    expect(mockClosePress).toHaveBeenCalled();
  });
  it('renders correctly', () => {
    const mockClosePress = jest.fn();
    const { toJSON } = render(
      <Header title="Test Title" showCloseButton onClosePress={mockClosePress} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
