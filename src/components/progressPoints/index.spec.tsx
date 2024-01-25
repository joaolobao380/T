import { render } from '@testing-library/react-native';
import React from 'react';

import { ProgressPoints } from '.';

describe('ProgressBar Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<ProgressPoints totalPoints={100} completedPoints={50} />);
    expect(getByText('0 SP')).toBeTruthy();
    expect(getByText('50 SP')).toBeTruthy();
    expect(getByText('100 SP')).toBeTruthy();
  });

  it('displays correct progress', () => {
    const totalPoints = 100;
    const completedPoints = 50;
    const { getByTestId } = render(
      <ProgressPoints totalPoints={totalPoints} completedPoints={completedPoints} />
    );

    const progressBar = getByTestId('progressPoints_testID');
    expect(progressBar.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: '50%',
        }),
      ])
    );
  });
});
