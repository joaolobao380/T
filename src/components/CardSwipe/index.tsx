import { Trash2 } from 'lucide-react-native';
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import { styles } from './styles';
import { CardSwipeProps } from './types';

export const CardSwipe = ({ title, status }: CardSwipeProps) => {
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
        { text: 'Excluir', onPress: () => console.log('Excluído') },
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

  return (
    <Swipeable
      containerStyle={{ backgroundColor: '#2A2A2A', borderRadius: 8 }}
      renderRightActions={renderRightActions}
      ref={swipeableRef}
      onSwipeableOpen={handleDelete}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.title}>{title}</Text>

          <View style={status === 'on' ? styles.tagContainer : styles.tagContainerOff}>
            <Text style={styles.tag}>{status === 'on' ? 'Ligado' : 'Desligado'}</Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};
