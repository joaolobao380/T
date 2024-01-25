import { ChevronDown } from 'lucide-react-native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export const AccordionCadList = ({ children }: React.ReactNode) => {
  const [title, setTitle] = useState('Tenha fé...');

  return (
    <View style={{ backgroundColor: '#EBEBEB', padding: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View>
          <Text>{title}</Text>
        </View>
        <TouchableOpacity>
          <ChevronDown color="#444444" />
        </TouchableOpacity>
      </View>
      <View>{children}</View>
    </View>
  );
};
