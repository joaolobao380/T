import { View, Text, Dimensions } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

import { styles } from './styles';
const width = Dimensions.get('window').width;

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'blue' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        fontWeight: '400',
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 14,
        color: 'white',
      }}
      text2Style={{
        fontSize: 14,
        color: 'white',
      }}
      style={{ backgroundColor: 'red' }}
    />
  ),

  customError: ({ text1, text2, props }: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'red', backgroundColor: '#F3C9C9', width: width - 32 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1={text1}
      text2={text2}
      text1Style={{
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: '#2A2A2A',
      }}
      text2Style={{
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#2A2A2A',
      }}
    />
  ),

  successful: ({ text1, text2, props }: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#6FF374', backgroundColor: '#D0FFD2', width: width - 32 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1={text1}
      text2={text2}
      text1Style={{
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: '#2A2A2A',
      }}
      text2Style={{
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#2A2A2A',
      }}
    />
  ),

  tomatoToast: ({ text1, props }: any) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};
