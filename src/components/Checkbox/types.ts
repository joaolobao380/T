import { Control, FieldValues } from 'react-hook-form';

export interface CheckboxProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<any>;
  name: keyof TFieldValues;
  label: string;
  testID?: string;
  disabled?: boolean;
}
