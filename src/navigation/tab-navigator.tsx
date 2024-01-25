import FloatingTabBar from '@components/FloatingTabBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '@screens/home';
import Report from '@screens/report';

import Menu from '../screens/menu';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator tabBar={(props) => <FloatingTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Report" component={Report} />
      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  );
}
