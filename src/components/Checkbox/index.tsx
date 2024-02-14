import React from 'react';
import { Controller } from 'react-hook-form';
import { TouchableOpacity, View, Text } from 'react-native';

import { styles } from './styles';
import { CheckboxProps } from './types';

export const Checkbox = ({
  control,
  name,
  label,
  disabled = false,
  testID = 'checkbox_testID',
}: CheckboxProps) => {
  return (
    <View testID={testID}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity
            disabled={disabled}
            style={styles.container}
            onPress={() => onChange(!value)}
            testID={`${testID}_touchable`}>
            <View style={[styles.checkbox, value && styles.checked]} />
            <Text style={styles.label}>{label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
