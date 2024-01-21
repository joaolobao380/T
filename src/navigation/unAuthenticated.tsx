import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { ForgotPassword } from '@screens/forgotPassword';
import { Login } from '@screens/login';

import TabNavigator from './tab-navigator';
import Modal from '../screens/modal';

export type RootStackParamListUnAuthenticated = {
  TabNavigator: undefined;
  Modal: undefined;
  Login: undefined;
  ForgotPassword: undefined;
};

export type NavigatatorRoutesUnAuthenticatedProps =
  StackNavigationProp<RootStackParamListUnAuthenticated>;

const Stack = createStackNavigator<RootStackParamListUnAuthenticated>();

export default function UnAuthenticated() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
