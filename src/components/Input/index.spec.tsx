import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Input } from './index';
import { styles } from './styles';

function WrapperComponent({ errorMessage }: any) {
  const { control } = useForm({
    defaultValues: {
      testInput: '',
    },
  });

  return (
    <Input
      control={control}
      name="testInput"
      label="E-mail"
      placeholder="Ex: fulano@t.com"
      errorMessage={errorMessage}
    />
  );
}

describe('CustomInput', () => {
  it('renders correctly', () => {
    const { getByText } = render(<WrapperComponent errorMessage="" />);
    expect(getByText('E-mail')).toBeTruthy();
  });

  it('should accept text', () => {
    const { getByPlaceholderText } = render(<WrapperComponent errorMessage="" />);
    const input = getByPlaceholderText('Ex: fulano@t.com');
    fireEvent.changeText(input, 'test@test.com');
    expect(input.props.value).toEqual('test@test.com');
  });

  it('Should display error message when errorMessage prop is provided', () => {
    const errorMessage = 'E-mail é obrigatório';
    const { getByText } = render(<WrapperComponent errorMessage={errorMessage} />);
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it('Should not display error message when errorMessage prop is not provided', () => {
    const { queryByText } = render(<WrapperComponent errorMessage="" />);
    expect(queryByText('E-mail é obrigatório')).toBeNull();
  });

  it('Should display red border and error message when errorMessage prop is provided', () => {
    const errorMessage = 'E-mail obrigatório';
    const { getByText, getByPlaceholderText } = render(
      <WrapperComponent errorMessage={errorMessage} />
    );
    expect(getByText(errorMessage)).toBeTruthy();
    const input = getByPlaceholderText('Ex: fulano@t.com');
    expect(input.props.style).toContainEqual(styles.errorInput);
  });

  it('renders a date picker when inputType is date', () => {
    jest.mock('@react-native-community/datetimepicker', () => 'DateTimePicker');

    const { getByTestId } = render(
      <WrapperComponent inputType="date" errorMessage="" defaultValue={new Date()} />
    );
    const datePicker = getByTestId('input_testID_normal');
    expect(datePicker).toBeTruthy();
  });

  it('renders correctly', () => {
    const { toJSON } = render(<WrapperComponent errorMessage="" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
