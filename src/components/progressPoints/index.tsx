import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';
import { ProgressPointsProps } from './types';

export const ProgressPoints = ({ totalPoints, completedPoints }: ProgressPointsProps) => {
  const progress = (completedPoints / totalPoints) * 100;

  return (
    <View>
      <View style={styles.container}>
        <View
          style={[styles.progressBar, { width: `${progress}%` }]}
          testID="progressPoints_testID"
        />
      </View>
      <View style={styles.labels}>
        <Text style={styles.labelText}>0 SP</Text>
        <Text style={[styles.labelText, styles.midLabel]}>{totalPoints / 2} SP</Text>
        <Text style={styles.labelText}>{totalPoints} SP</Text>
      </View>
    </View>
  );
};
