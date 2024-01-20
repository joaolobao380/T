import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import { Button } from '.';

describe('LoadingButton', () => {
  it('Should display the title', () => {
    const { getByText } = render(<Button title="Click Me" isLoading={false} onPress={() => {}} />);
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('Should show an activity indicator when loading', () => {
    const { getByTestId } = render(<Button title="Loading" isLoading onPress={() => {}} />);
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('Should call onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Press Me" isLoading={false} onPress={mockOnPress} />
    );

    const button = getByText('Press Me');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('Renders correctly', () => {
    const { toJSON } = render(<Button title="Click Me" isLoading={false} onPress={() => {}} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('Renders correctly when loading', () => {
    const { toJSON } = render(<Button title="Loading..." isLoading onPress={() => {}} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
