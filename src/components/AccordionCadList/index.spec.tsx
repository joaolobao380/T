import { render, fireEvent, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import { AccordionCadList } from '.';

describe('AccordionCadList Component', () => {
  it('Should renders the title correctly', () => {
    const title = 'Test Title';
    const { getByText } = render(
      <AccordionCadList title={title}>
        <Text>Accordion Content</Text>
      </AccordionCadList>
    );

    expect(getByText(title)).toBeTruthy();
  });

  it('toggles accordion on press', async () => {
    const { getByTestId, queryByText } = render(
      <AccordionCadList title="Test Title">
        <Text>Accordion Content</Text>
      </AccordionCadList>
    );

    const toggleButton = getByTestId('accordion_toggle_button');
    fireEvent.press(toggleButton);
    await waitFor(() => {
      expect(queryByText('Accordion Content')).toBeTruthy();
    });

    fireEvent.press(toggleButton);
    await waitFor(() => {
      expect(queryByText('Accordion Content')).toBeNull();
    });
  });

  it('Renders correctly Accordion', () => {
    const { toJSON } = render(
      <AccordionCadList title="Test Title">
        <Text>Accordion Content</Text>
      </AccordionCadList>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
