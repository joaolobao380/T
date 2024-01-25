import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    paddingVertical: 24,

    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'white',
  },
  status: {
    fontSize: 14,
    color: 'gray',
  },
  tagContainer: {
    backgroundColor: '#6EFE85',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  tagContainerOff: {
    backgroundColor: '#DDDDDD',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  tag: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  deleteButton: {
    backgroundColor: '#EC4848',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    marginLeft: -8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
