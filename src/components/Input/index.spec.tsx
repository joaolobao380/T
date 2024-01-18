// CustomInput.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '.';

function WrapperComponent() {
  const { control } = useForm();
  return <Input control={control} name="testInput" label="E-mail" placeholder="Ex: fulano@t.com" />;
}

describe('CustomInput', () => {
  it('renders correctly', () => {
    const { getByText } = render(<WrapperComponent />);
    expect(getByText('E-mail')).toBeTruthy();
  });

  it('should accept text', () => {
    const { getByPlaceholderText } = render(<WrapperComponent />);
    const input = getByPlaceholderText('Ex: fulano@t.com');
    fireEvent.changeText(input, 'test@test.com');
    expect(input.props.value).toEqual('test@test.com');
  });
  it('renders correctly', () => {
    const { toJSON } = render(<WrapperComponent />);
    expect(toJSON()).toMatchSnapshot();
  });
});
