import FloatingTabBar from '@components/FloatingTabBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Account } from '@screens/account';
import { Home } from '@screens/home';
import Report from '@screens/report';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator tabBar={(props) => <FloatingTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Report" component={Report} />
      <Tab.Screen name="Menu" component={Account} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
