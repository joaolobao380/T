import 'react-native-gesture-handler';

import { toastConfig } from '@helpers/configToast';
import { AuthProvider } from '@hooks/useAuth';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import RootStack from './src/navigation';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // if (process.env.NODE_ENV === 'development') {
  //   const whyDidYouRender = require('@welldone-software/why-did-you-render');
  //   whyDidYouRender(React, {
  //     trackAllPureComponents: true,
  //   });
  // }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <AuthProvider>
        <RootStack />
        <Toast config={toastConfig} />
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
});
