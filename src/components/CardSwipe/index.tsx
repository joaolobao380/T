import { Trash2 } from 'lucide-react-native';
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import { styles } from './styles';
import { CardSwipeProps } from './types';

export const CardSwipe = ({ title, status, onPress }: CardSwipeProps) => {
  const swipeableRef = useRef<Swipeable>(null);
  const handleDelete = () => {
    Alert.alert(
      'Excluir Registro',
      'Deseja excluir o registro?',
      [
        {
          text: 'Cancelar',
          onPress: () => swipeableRef.current?.close(),
          style: 'cancel',
        },
        { text: 'Excluir', onPress },
      ],
      { cancelable: false }
    );
  };
  const renderRightActions = () => {
    return (
      <TouchableOpacity style={styles.deleteButton}>
        <Trash2 color="white" />
      </TouchableOpacity>
    );
  };

  const getStatusBasedInStatus = () => {
    if (status === 'on') {
      return {
        style: styles.tagContainer,
        title: 'Ligado',
      };
    } else if (status === 'off') {
      return {
        style: styles.tagContainerOff,
        title: 'Desligado',
      };
    } else {
      return {
        style: styles.tagContainerPending,
        title: 'Futura',
      };
    }
  };

  return (
    <Swipeable
      containerStyle={{ backgroundColor: '#2A2A2A', borderRadius: 8 }}
      renderRightActions={renderRightActions}
      ref={swipeableRef}
      onSwipeableOpen={handleDelete}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.title}>{title}</Text>

          <View style={getStatusBasedInStatus()?.style}>
            <Text style={styles.tag}>{getStatusBasedInStatus().title}</Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};
