import { render } from '@testing-library/react-native';
import React from 'react';

import { CardSwipe } from '.';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('CardSwipe Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<CardSwipe title="Test Card" status="on" />);
    expect(getByText('Test Card')).toBeTruthy();
    expect(getByText('Ligado')).toBeTruthy();
  });

  it('displays the correct status', () => {
    const { getByText, rerender } = render(<CardSwipe title="Test Card" status="on" />);
    expect(getByText('Ligado')).toBeTruthy();

    rerender(<CardSwipe title="Test Card" status="off" />);
    expect(getByText('Desligado')).toBeTruthy();
  });

  it('renders correctly', () => {
    const { toJSON } = render(<CardSwipe title="Test Card" status="on" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
