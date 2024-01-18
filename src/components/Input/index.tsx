import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { View, Text, TextInput } from 'react-native';

import { styles } from './styles';

interface CustomInputProps {
  control: Control;
  name: string;
  label: string;
  inputType?: 'default' | 'email-address' | 'password';
  placeholder: string;
}

export const Input: React.FC<CustomInputProps> = ({
  control,
  name,
  label,
  inputType = 'default',
  placeholder = 'placeholder',
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            secureTextEntry={inputType === 'password'}
            keyboardType={inputType === 'email-address' ? 'email-address' : 'default'}
            {...props}
          />
        )}
      />
    </View>
  );
};
