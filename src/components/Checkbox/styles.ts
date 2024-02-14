import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#444444',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  checked: {
    backgroundColor: '#444444',
  },
  label: {
    fontFamily: 'Poppins-Regular',
  },
});
