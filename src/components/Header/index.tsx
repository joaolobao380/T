import { ArrowLeft, X } from 'lucide-react-native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { HeaderProps } from './types';

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  showCloseButton = false,
  onBackPress,
  onClosePress,
}) => {
  return (
    <View style={styles.containerHeader}>
      <TouchableOpacity onPress={onBackPress} testID="header_testID_back_button">
        <ArrowLeft size={24} color={showBackButton ? '#2A2A2A' : 'white'} />
      </TouchableOpacity>

      <Text style={styles.textTitle}>{title}</Text>

      {showCloseButton && (
        <TouchableOpacity onPress={onClosePress} testID="header_testID_close_button">
          <X size={24} color="#2A2A2A" />
        </TouchableOpacity>
      )}
    </View>
  );
};
