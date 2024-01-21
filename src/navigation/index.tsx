import { useAuth } from '@hooks/useAuth';
import { NavigationContainer } from '@react-navigation/native';

import Authenticated from './authenticated';
import UnAuthenticated from './unAuthenticated';

export default function RootStack() {
  const { isLogged } = useAuth();

  return (
    <NavigationContainer>{isLogged ? <Authenticated /> : <UnAuthenticated />}</NavigationContainer>
  );
}
