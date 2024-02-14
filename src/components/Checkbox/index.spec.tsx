import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { Checkbox } from '.'; // Ajuste o caminho conforme necessário

// Um componente wrapper para integrar o useForm
interface FormWrapperProps {
  label: string;
  name: string;
}

const FormWrapper = ({ label, name }: FormWrapperProps) => {
  const { control } = useForm({
    defaultValues: {
      [name]: null,
    },
  });
  return <Checkbox control={control} label="Teste label" name="checkbox" />;
};

describe('Checkbox Component', () => {
  const checkboxLabel = 'Teste label';

  it('Should renders correctly with the label', () => {
    const { getByText } = render(<FormWrapper name="testCheckbox" label={checkboxLabel} />);

    expect(getByText(checkboxLabel)).toBeTruthy();
  });

  it('Renders correctly Checkbox', () => {
    const checkboxLabel = 'Teste label';
    const { toJSON } = render(<FormWrapper name="testCheckbox" label={checkboxLabel} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
