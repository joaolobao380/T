import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { View, Text, TextInput } from 'react-native';

import { styles } from './styles';

interface InputProps {
  control: Control<any>;
  name: string;
  label: string;
  inputType?: 'default' | 'email-address' | 'password';
  placeholder: string;
  errorMessage?: string;
}

export const Input: React.FC<InputProps> = ({
  control,
  name,
  label,
  inputType = 'default',
  placeholder = 'placeholder',
  errorMessage,
  ...props
}) => {
  const invalid = !!errorMessage;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholderTextColor="#BBBBBB"
            style={[styles.input, !!errorMessage && styles.errorInput]}
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
      {invalid && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};
