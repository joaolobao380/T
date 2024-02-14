import { Info, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { AlertProps } from './types';

export const Alert = ({ children, testID }: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return isVisible ? (
    <View style={styles.container} testID={testID}>
      <TouchableOpacity style={styles.closeButton} onPress={handleClose} testID="closeAlert">
        <X stroke="#444444" size={20} />
      </TouchableOpacity>
      <View style={styles.containerIconAndChildren}>
        <View>
          <Info stroke="#444444" />
        </View>
        <View style={styles.containerDescription}>{children}</View>
      </View>
    </View>
  ) : null;
};
