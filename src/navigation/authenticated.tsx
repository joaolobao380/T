import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { RegisterList } from '@screens/registerList';

import TabNavigator from './tab-navigator';
import Modal from '../screens/modal';

export type RootStackParamListAuthenticated = {
  TabNavigator: undefined;
  Modal: undefined;
  RegisterList: undefined;
};

export type NavigatatorRoutesAuthenticatedProps =
  StackNavigationProp<RootStackParamListAuthenticated>;

const Stack = createStackNavigator<RootStackParamListAuthenticated>();

export default function authenticated() {
  return (
    <Stack.Navigator initialRouteName="TabNavigator">
      <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Modal" component={Modal} options={{ presentation: 'modal' }} />
      <Stack.Screen name="RegisterList" component={RegisterList} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
