import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import { Alert } from '.';

describe('Alert Component', () => {
  it('Renders children and an info icon', () => {
    const testMessage = 'Test Alert Message';
    const { getByText } = render(
      <Alert>
        <Text>{testMessage}</Text>
      </Alert>
    );

    expect(getByText(testMessage)).toBeTruthy();
  });

  it('Should hides Alert on close button press', () => {
    const testMessage = 'Test Alert Message';
    const { getByTestId, queryByText } = render(
      <Alert>
        <Text>{testMessage}</Text>
      </Alert>
    );

    const closeButton = getByTestId('closeAlert');
    fireEvent.press(closeButton);

    expect(queryByText(testMessage)).toBeNull();
  });

  it('Renders correctly Alert', () => {
    const testMessage = 'Test Alert Message';
    const { toJSON } = render(
      <Alert>
        <Text>{testMessage}</Text>
      </Alert>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
