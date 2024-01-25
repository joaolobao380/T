import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 100,
    bottom: 20,
    marginHorizontal: 36,
    width: 167,
    height: 58,
    alignSelf: 'center',
    paddingHorizontal: 1,
    position: 'absolute',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBackground: {
    borderRadius: 100,
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 1,
  },
  containerIconComponentFocused: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 27,
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerIconComponenteNotFocused: {
    backgroundColor: '#2A2A2A',
    padding: 0,
    borderRadius: 0,
    width: 0,
    height: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
