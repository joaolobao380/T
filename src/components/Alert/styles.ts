import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#BAE6FC',
    padding: 16,
    width: '100%',
    borderRadius: 8,
  },

  containerDescription: {
    flex: 1,
  },

  closeButton: {
    position: 'absolute',
    right: 16,
    top: 8,
  },

  containerIconAndChildren: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    gap: 8,
  },
});
