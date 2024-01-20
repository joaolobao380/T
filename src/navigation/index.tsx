import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { ForgotPassword } from '@screens/forgotPassword';
import { Login } from '@screens/login';

import TabNavigator from './tab-navigator';
import Modal from '../screens/modal';

export type RootStackParamList = {
  TabNavigator: undefined;
  Modal: undefined;
  Login: undefined;
  ForgotPassword: undefined;
};

export type NavigatatorRoutesProps = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Modal" component={Modal} options={{ presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
