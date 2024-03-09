import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';
import { NavigatatorRoutesUnAuthenticatedProps } from '@navigation/unAuthenticated';
import { useNavigation } from '@react-navigation/native';
import { messageToast, errorMessageFirebase, positionToast, textToast } from '@utils/enums';
import { LoginSchema } from '@validation/login';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import { styles } from './styles';
import { LoginProps } from './types';

export const Login = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { navigate } = useNavigation<NavigatatorRoutesUnAuthenticatedProps>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({ resolver: yupResolver(LoginSchema) });

  const onSubmit = async (data: LoginProps) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
    } catch (error: any) {
      if (error.code === errorMessageFirebase.INVALID_CREDENTIAL) {
        Toast.show({
          type: messageToast.ERROR,
          text1: textToast.ATTENTION,
          position: positionToast.POSITION,
          text2: 'Senha incorreta. Por favor, tente novamente.',
        });
      } else if (error.code === errorMessageFirebase.TOO_MANY) {
        Toast.show({
          type: messageToast.ERROR,
          text1: textToast.ATTENTION,
          text2: 'Seu acesso foi bloqueado.',
          text1Style: styles.textMessage,
          position: positionToast.POSITION,
          text2Style: styles.textMessage,
        });
      } else {
        Toast.show({
          type: messageToast.ERROR,
          text1: textToast.ATTENTION,
          text2: 'Não foi possível logar-se, tente novamente.',
          text1Style: styles.textMessage,
          position: positionToast.POSITION,
          text2Style: styles.textMessage,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      contentContainerStyle={styles.containerKeyboardAvoid}
      style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
      <ScrollView style={styles.containerScrollView}>
        <View>
          <View style={styles.containerImageBackground}>
            <Image
              style={styles.imageBackground}
              source={require('../../assets/background-login.png')}
            />
          </View>

          <View style={styles.containerForm}>
            <View>
              <Input
                control={control}
                label="E-mail"
                name="email"
                errorMessage={errors.email?.message}
                placeholder="Ex: email@email.com"
                inputType="email-address"
                testID="input_email_login_testID"
              />
            </View>
            <View style={styles.containerInputPassword}>
              <Input
                control={control}
                label="Senha"
                errorMessage={errors.password?.message}
                name="password"
                placeholder="Ex: •••••••••••"
                inputType="password"
                testID="input_password_login_testID"
              />
            </View>
            <View style={styles.containerButton}>
              <Button
                testID="button_login_testID"
                title="Entrar"
                isLoading={isLoading}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
            <View style={styles.containerForgotPassword}>
              <TouchableOpacity onPress={() => navigate('ForgotPassword')}>
                <Text style={styles.textForgotPassword}>Esqueci minha senha</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
