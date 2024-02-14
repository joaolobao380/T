import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { FibonacciSequenceProps } from './types';

export const FibonacciSequence = ({ control, max, name, label }: FibonacciSequenceProps) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [selectedValue, setSelectedValue] = useState<number | null>(1);

  useEffect(() => {
    const generateSequence = (max: number): number[] => {
      const seq: number[] = [1, 2];
      for (let i = 2; i <= max; i++) {
        seq[i] = seq[i - 1] + seq[i - 2];
        if (seq[i] > max) break;
      }
      return seq.filter((n) => n <= max);
    };

    setSequence(generateSequence(max));
  }, [max]);

  return (
    <View>
      <View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Controller
        control={control}
        name={name}
        defaultValue={1}
        render={({ field: { onChange } }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {sequence.map((num, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedValue(num);
                  onChange(num);
                }}>
                <View
                  style={[
                    selectedValue === num ? styles.buttonSelected : styles.buttonNotSelected,
                  ]}>
                  <Text style={{ color: selectedValue === num ? '#FFFFFF' : '#000000' }}>
                    {num || 1}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
};
