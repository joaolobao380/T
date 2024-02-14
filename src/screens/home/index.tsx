import Logo from '@assets/logoSvg.svg';
import { CardSwipe } from '@components/CardSwipe';
import { ProgressPoints } from '@components/progressPoints';
import { NavigatatorRoutesAuthenticatedProps } from '@navigation/authenticated';
import { useNavigation } from '@react-navigation/native';
import { db } from '@services/firebase';
import { messageToast, positionToast, textToast } from '@utils/enums';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import LottieView from 'lottie-react-native';
import { CalendarDays, FilePlus2 } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import { styles } from './styles';
import { listProps } from './types';

export const Home = () => {
  const { navigate } = useNavigation<NavigatatorRoutesAuthenticatedProps>();
  const [lists, setLists] = useState<listProps[]>([]);
  const today = new Date();
  const dayOfWeek = format(today, 'EEEE', { locale: ptBR });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'registerLists'),
      (snapshot) => {
        const listsArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as listProps[];
        setLists(listsArray);
      },
      (error) => {
        console.log("Erro ao buscar 'registerLists':", error);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleDeleteList = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'registerLists', id));
      Toast.show({
        type: messageToast.SUCCESSFUL,
        text1: textToast.SUCCESSFUL,
        position: positionToast.POSITION,
        text2: 'Sua lista foi excluída!',
      });
    } catch (error) {
      Toast.show({
        type: messageToast.ERROR,
        text1: textToast.ATTENTION,
        position: positionToast.POSITION,
        text2: 'Não foi possível excluir sua lista.',
      });
      console.log('Erro ao deletar lista:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.containerCalender}>
          <Logo />
          <View style={styles.containerCalendersDay}>
            <View>
              <CalendarDays color="white" />
            </View>
            <View>
              <Text style={styles.dayText}>{dayOfWeek}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.containerButtonAdd}
            onPress={() => navigate('RegisterList')}>
            <View>
              <FilePlus2 color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerLotties}>
        <View>
          <LottieView
            source={require('../../assets/starsLottie.json')}
            style={{ width: 97, height: 97 }}
            autoPlay
            loop
          />
        </View>
        <View>
          <LottieView
            source={require('../../assets/boyWalkingLottie.json')}
            style={{ width: 97, height: 97 }}
            autoPlay
            loop
          />
        </View>
        <View>
          <LottieView
            source={require('../../assets/starsLottie.json')}
            style={{ width: 97, height: 97 }}
            autoPlay
            loop
          />
        </View>
      </View>
      <View style={styles.containerProgress}>
        <ProgressPoints completedPoints={40} totalPoints={100} />
      </View>
      <View style={styles.containerTitleList}>
        <Text style={styles.titleList}>Listas</Text>
      </View>
      <FlatList
        data={lists}
        contentContainerStyle={styles.containerFlatList}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View style={styles.emptyList}>
            <Text style={styles.textEmptyList}>Você ainda não possui listas.</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.containerSwipe}>
            <CardSwipe
              status={item.status}
              title={item.listName}
              onPress={() => handleDeleteList(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
};
