import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { messageToast, positionToast, textToast } from '@utils/enums';
import { ForgotPasswordSchema } from '@validation/forgotPassword';
import { ChevronLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  StatusBar,
  View,
  Image,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import { styles } from './styles';
import { ForgotPasswordProps } from './types';

export const ForgotPassword = () => {
  const { goBack } = useNavigation();
  const { resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ForgotPasswordProps>({ resolver: yupResolver(ForgotPasswordSchema) });

  const onSubmit = async (data: ForgotPasswordProps) => {
    setIsLoading(true);
    try {
      await resetPassword(data?.email);
      Toast.show({
        type: messageToast.SUCCESSFUL,
        text1: textToast.SUCCESSFUL,
        position: positionToast.POSITION,
        text2: 'O e-mail de recuperação foi enviado.',
      });
      setValue('email', '');
    } catch {
      Toast.show({
        type: messageToast.ERROR,
        text1: textToast.ATTENTION,
        position: positionToast.POSITION,
        text2: 'Não foi possível enviar o e-mail, tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      contentContainerStyle={styles.containerKeyboardAvoid}
      testID="forgot_password_testID_keyboard_avoiding_view"
      style={styles.container}>
      <BorderlessButton
        testID="forgot_passowrd_testID_back_button"
        style={styles.containerIconBack}
        onPress={() => goBack()}>
        <ChevronLeft color="white" size={32} />
      </BorderlessButton>
      <ScrollView style={styles.container}>
        <View>
          <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />

          <View style={styles.containerImageBackground}>
            <Image
              style={styles.imageBackground}
              source={require('../../assets/background-login.png')}
              resizeMode="cover"
            />
          </View>
          <View style={styles.containerMessageSendEmail}>
            <Text style={styles.messageSendEmail}>
              Será enviado um e-mail de redefinição de senha para o e-mail digitado abaixo.
            </Text>
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
              />
            </View>

            <View style={styles.containerButton}>
              <Button title="Enviar" isLoading={isLoading} onPress={handleSubmit(onSubmit)} />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
