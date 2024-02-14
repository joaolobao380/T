import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Controller, Control } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import { styles } from './styles';

interface InputProps {
  control: Control<any>;
  name: string;
  label: string;
  inputType?: 'default' | 'email-address' | 'password' | 'date';
  placeholder: string;
  errorMessage?: string | any;
  defaultValue?: Date;
  testID?: string;
  mode?: 'date' | 'time' | 'datetime' | 'countdown';
  minimumDate?: Date;
  maximumDate?: Date;
}

export const Input: React.FC<InputProps> = ({
  control,
  name,
  label,
  inputType = 'default',
  placeholder,
  mode = 'date',
  errorMessage,
  testID = 'input_testID',
  defaultValue = null,
  minimumDate,
  maximumDate,
  ...props
}) => {
  const invalid = !!errorMessage;

  return (
    <View style={styles.container} testID={testID}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) =>
          inputType === 'date' ? (
            <View style={[styles.containerInputDate, invalid && styles.errorInput]}>
              <DateTimePicker
                testID={`${testID}_date`}
                value={value || defaultValue || new Date()}
                mode={mode}
                timeZoneName="Brazil/Recife"
                display="default"
                locale="pt-BR"
                onChange={(event, selectedDate) => {
                  onChange(selectedDate);
                }}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                {...props}
              />
            </View>
          ) : (
            <View style={styles.containerInput}>
              <TextInput
                testID={`${testID}_normal`}
                placeholderTextColor="#BBBBBB"
                style={[styles.input, invalid && styles.errorInput]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={placeholder}
                secureTextEntry={inputType === 'password'}
                keyboardType={inputType === 'email-address' ? 'email-address' : 'default'}
                {...props}
              />
            </View>
          )
        }
      />
      {invalid && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};
