import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: 'white',
  },
  containerHeader: {
    marginTop: 80,
    marginHorizontal: 16,
  },
  containerCalender: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerCalendersDay: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#2A2A2A',
    gap: 4,
    padding: 8,
    borderRadius: 4,
  },
  containerButtonAdd: {
    backgroundColor: '#2A2A2A',
    padding: 16,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  containerLotties: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 80,
    marginHorizontal: 16,
  },
  containerProgress: {
    marginTop: 32,
    marginHorizontal: 16,
  },
  containerSwipe: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  containerTitleList: {
    marginTop: 40,
    marginHorizontal: 16,
  },
  titleList: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#2A2A2A',
  },
});
