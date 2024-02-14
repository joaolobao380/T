import { Control } from 'react-hook-form';

export interface FibonacciSequenceProps {
  control: Control<any>;
  max: number;
  name: string;
  label: string;
}
