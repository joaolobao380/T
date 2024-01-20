import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerScrollView: {
    backgroundColor: 'white',
    flex: 1,
  },
  containerKeyboardAvoid: {
    flex: 1,
    flexGrow: 1,
  },
  containerImageBackground: {
    width: '100%',
  },
  imageBackground: {
    width: '100%',
  },
  containerForm: {
    paddingHorizontal: 16,
    marginTop: 40,
  },

  containerButton: {
    marginTop: 32,
  },
  textMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  containerToast: {
    backgroundColor: '#2A2A2A',
  },
  containerMessageSendEmail: {
    alignItems: 'center',
    marginTop: 32,
    marginHorizontal: 16,
  },
  messageSendEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#444444',
    textAlign: 'center',
  },
  containerIconBack: {
    position: 'absolute',
    zIndex: 200,
    marginTop: 64,
    marginLeft: 16,
  },
});
