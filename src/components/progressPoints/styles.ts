import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#B2B2B2',
    borderRadius: 16,
    // height: 32,
  },
  progressBar: {
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2A2A2A',
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  labelText: {
    color: '#2A2A2A',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  midLabel: {
    left: '50%',
    transform: [{ translateX: -50 }],
  },
});
