import React, { useState } from 'react';
import { Text, ActivityIndicator, Pressable } from 'react-native';

import { styles } from './styles';

interface ButtonProps {
  isLoading: boolean;
  onPress: () => void;
  title: string;
  testID?: string;
}

export const Button = ({ isLoading, onPress, title, testID = '' }: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.button, isLoading && styles.loadingButton, isPressed && styles.pressedButton]}
      disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#FFFFFF" testID="activity-indicator" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </Pressable>
  );
};
