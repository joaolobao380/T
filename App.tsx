import 'react-native-gesture-handler';

import Toast from 'react-native-toast-message';

import RootStack from './src/navigation';

export default function App() {
  return (
    <>
      <RootStack />
      <Toast />
    </>
  );
}
