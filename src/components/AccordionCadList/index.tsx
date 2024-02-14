import { ChevronDown, ChevronUp } from 'lucide-react-native'; // Import ChevronUp para indicar quando o acordeão está aberto
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { AccordionCadListProps } from './types';

export const AccordionCadList = ({
  children,
  title,
  testID = 'accordion_toggle_button',
}: AccordionCadListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleAccordion} testID={testID}>
        <View style={styles.containerTitleAndIcon}>
          <View>
            <Text style={styles.titleAccordion}>{title}</Text>
          </View>

          {isOpen ? <ChevronUp color="#444444" /> : <ChevronDown color="#444444" />}
        </View>
      </TouchableOpacity>

      {isOpen && <View>{children}</View>}
    </View>
  );
};
