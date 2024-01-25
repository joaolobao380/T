import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
  },
  containerImageBackground: {
    width: '100%',
  },
  containerScrollView: {
    flex: 1,
  },
  containerKeyboardAvoid: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#FFF',
  },
  imageBackground: {
    width: '100%',

    marginBottom: 16,
  },
  containerForm: {
    paddingHorizontal: 16,
    marginTop: 40,
  },
  containerInputPassword: {
    marginTop: 16,
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
  containerForgotPassword: {
    marginTop: 24,
    alignItems: 'center',
  },
  textForgotPassword: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#2A2A2A',
  },
});
