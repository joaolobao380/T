import { AccordionCadList } from '@components/AccordionCadList';
import { Header } from '@components/Header';
import { useNavigation } from '@react-navigation/native';
import { Plus } from 'lucide-react-native';
import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';

export const RegisterList = () => {
  const { goBack } = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader}>
        <Header title="Criação de lista" showCloseButton onClosePress={() => goBack()} />
      </View>
      <View style={styles.containerTitleAddAndIcon}>
        <View>
          <Text style={styles.textAddList}>Adicionar uma atividade</Text>
        </View>
        <TouchableOpacity>
          <Plus color="#444444" />
        </TouchableOpacity>
      </View>
      <View style={styles.containerAccodion}>
        <AccordionCadList />
      </View>
    </SafeAreaView>
  );
};
