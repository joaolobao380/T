import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerHeader: {
    marginHorizontal: 16,
  },
  textAddList: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#444444',
  },
  containerTitleAddAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 40,
  },
  containerAccodion: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 32,
  },
  containerListName: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  titleBold: {
    fontFamily: 'Poppins-SemiBold',
  },
  containerAlert: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  descriptionText: {
    fontFamily: 'Poppins-Regular',
    color: '#444444',
    fontSize: 14,
    lineHeight: 16,
  },
  descriptionTextBold: {
    fontFamily: 'Poppins-SemiBold',
    color: '#444444',
    fontSize: 14,
  },
  containerButtonAdd: {
    backgroundColor: '#2A2A2A',
    padding: 4,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSaveButton: {
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    backgroundColor: 'white',
    paddingVertical: 8,
  },
  containerCheckbox: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  containerFutureDate: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  containerInputDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  containerInitialTime: {
    flex: 1,
  },
  containerEndTime: {
    flex: 1,
  },
});
