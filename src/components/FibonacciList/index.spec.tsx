import { render } from '@testing-library/react-native';
import React from 'react';
import { useForm } from 'react-hook-form';

import { FibonacciSequence } from '.';

interface FarmWrapperProps {
  max: number;
  name: string;
}

const FormWrapper = ({ max, name }: FarmWrapperProps) => {
  const { control } = useForm({
    defaultValues: {
      [name]: null,
    },
  });

  return <FibonacciSequence control={control} max={max} name={name} label="Story points" />;
};

describe('FibonacciSequence Component', () => {
  it('renders correctly', () => {
    const max = 10;
    const name = 'fibonacciValue';
    const { getAllByText } = render(<FormWrapper max={max} name={name} />);
    expect(getAllByText('1').length).toBe(1);
    expect(getAllByText('2').length).toBe(1);
    expect(getAllByText('3').length).toBe(1);
    expect(getAllByText('5').length).toBe(1);
    expect(getAllByText('8').length).toBe(1);
  });

  it('Renders correctly Accordion', () => {
    const max = 10;
    const name = 'fibonacciValue';
    const { toJSON } = render(<FormWrapper max={max} name={name} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
