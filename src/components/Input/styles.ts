import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    color: '#2A2A2A',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginBottom: 4,
  },
  input: {
    borderColor: '#2A2A2A',
    borderWidth: 1,
    backgroundColor: 'white',
    color: '#2A2A2A',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    padding: 16,
    borderRadius: 5,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
});
