import { Button } from '@components/Button';
import { useAuth } from '@hooks/useAuth';
import { StyleSheet, Text, View } from 'react-native';

import EditScreenInfo from '../components/edit-screen-info';

export default function TabOneScreen() {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} />
      <Button onPress={() => handleLogout()} title="Sair" isLoading={false} />
      <EditScreenInfo path="src/screens/one.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  separator: {
    backgroundColor: 'gray',
    height: 1,
    marginVertical: 30,
    opacity: 0.25,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
