import Logo from '@assets/logoSvg.svg';
import { CardSwipe } from '@components/CardSwipe';
import { ProgressPoints } from '@components/progressPoints';
import { NavigatatorRoutesAuthenticatedProps } from '@navigation/authenticated';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import LottieView from 'lottie-react-native';
import { CalendarDays, FilePlus2 } from 'lucide-react-native';
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { mockToDo } from './__mocks__';
import { styles } from './styles';

export const Home = () => {
  const { navigate } = useNavigation<NavigatatorRoutesAuthenticatedProps>();
  const today = new Date();
  const dayOfWeek = format(today, 'EEEE', { locale: ptBR });
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
        data={mockToDo}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.containerSwipe}>
            <CardSwipe status={item.status} title={item.title} />
          </View>
        )}
      />
    </View>
  );
};
