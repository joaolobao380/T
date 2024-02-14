import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  buttonSelected: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#444444',
  },
  buttonNotSelected: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DBDBDB',
  },
  buttonTextSelected: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  buttonTextNotSelected: {
    color: '#000000',
    fontSize: 14,
  },
  label: {
    color: '#2A2A2A',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginBottom: 4,
  },
});
