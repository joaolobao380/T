import { AccordionCadList } from '@components/AccordionCadList';
import { motivationalPhrases } from '@components/AccordionCadList/phases';
import { Alert } from '@components/Alert';
import { Button } from '@components/Button';
import { Checkbox } from '@components/Checkbox';
import { FibonacciSequence } from '@components/FibonacciList';
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { listProps } from '@screens/home/types';
import { db } from '@services/firebase';
import { messageToast, positionToast, textToast } from '@utils/enums';
import { RegisterListItem } from '@validation/registerListItem';
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import { Trash2, Plus } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { View, SafeAreaView, Text, TouchableOpacity, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';

import { styles } from './styles';
import { FormValues } from './types';

export const RegisterList = () => {
  const { goBack } = useNavigation();
  const [title, setTitle] = useState('Tenha fé...');
  const [isLoading, setIsLoading] = useState(false);
  const [activeItem, setActiveItem] = useState<listProps[]>([]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(RegisterListItem),
    defaultValues: {
      futureDate: new Date(),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'actions',
  });

  const watchFieldFutureList = watch('futureList');

  useEffect(() => {
    const queryItemOn = query(collection(db, 'registerLists'), where('status', '==', 'on'));
    const unsubscribe = onSnapshot(
      queryItemOn,
      (snapshot) => {
        const listsArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as listProps[];
        setActiveItem(listsArray);
        if (listsArray.length) {
          setValue('futureList', true);
        }
      },
      (error) => {
        console.log("Erro ao buscar 'registerLists' com status 'on':", error);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const pickRandomTitle = () => {
      const randomIndex = Math.floor(Math.random() * motivationalPhrases.length);
      return motivationalPhrases[randomIndex];
    };

    setTitle(pickRandomTitle());
  }, []);
  console.log(activeItem);
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await addDoc(collection(db, 'registerLists'), {
        ...data,
        listName: title,
        status: activeItem.length ? 'pending' : 'on',
        futureDate: watchFieldFutureList ? new Date() : null,
        futureList: !!watchFieldFutureList,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      Toast.show({
        type: messageToast.SUCCESSFUL,
        text1: textToast.SUCCESSFUL,
        position: positionToast.POSITION,
        text2: 'Lista salva com sucesso!',
      });
      goBack();
    } catch (e) {
      Toast.show({
        type: messageToast.ERROR,
        text1: textToast.ATTENTION,
        position: positionToast.POSITION,
        text2: 'Não foi possível salvar a lista.',
      });
      console.log('Erro ao adicionar documento: ', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = (id: string) => {
    const getItemToremove = fields.findIndex((item) => item.id === id);
    remove(getItemToremove);
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader}>
        <Header title="Criação de lista" showCloseButton onClosePress={() => goBack()} />
      </View>
      <View style={styles.containerTitleAddAndIcon}>
        <View>
          <Text style={styles.textAddList}>Adicionar uma atividade</Text>
        </View>

        <TouchableOpacity
          style={styles.containerButtonAdd}
          onPress={() => {
            append({
              actionName: '',
              initialTime: new Date(),
              endTime: new Date(),
              storyPoints: 1,
              fixedAction: false,
              stayAction: false,
            });
          }}>
          <View>
            <Plus color="white" />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1, flexGrow: 1 }}>
        <View style={styles.containerAlert}>
          <Alert>
            <View>
              <Text style={styles.descriptionText}>
                Caso a função <Text style={styles.descriptionTextBold}>lista futura</Text> não for
                ativada, a lista iniciará imediatamente, após o cadastro.
              </Text>
            </View>
          </Alert>
        </View>
        <View style={styles.containerListName}>
          <Text style={styles.textAddList}>
            Nome da lista: <Text style={styles.titleBold}>{title}</Text>
          </Text>
        </View>
        <View style={styles.containerCheckbox}>
          <Checkbox
            disabled={!!activeItem.length}
            control={control}
            name="futureList"
            label="Lista futura"
          />
        </View>
        {watchFieldFutureList && (
          <View style={styles.containerFutureDate}>
            <Input
              control={control}
              label="Data futura"
              name="futureDate"
              errorMessage={errors.futureDate?.message}
              placeholder="Ex: 24/02/2024"
              minimumDate={tomorrow}
              inputType="date"
            />
          </View>
        )}
        {fields.map((item, index) => (
          <View style={styles.containerAccodion} key={item.id}>
            <AccordionCadList title={`Ação ${index + 1}`}>
              <View style={{ gap: 24 }}>
                <View style={{ marginTop: 24 }}>
                  <Input
                    control={control}
                    label="Nome da ação"
                    name={`actions[${index}].actionName`}
                    errorMessage={errors?.actions?.[index]?.actionName?.message}
                    placeholder="Ex: Jogar o lixo"
                    inputType="default"
                  />
                </View>
                <View style={styles.containerInputDate}>
                  <View style={styles.containerInitialTime}>
                    <Input
                      control={control}
                      mode="time"
                      label="Horário de início"
                      minimumDate={new Date()}
                      name={`actions[${index}].initialTime`}
                      errorMessage={errors?.actions?.[index]?.initialTime?.message}
                      placeholder="Ex: 24/02/2024"
                      inputType="date"
                    />
                  </View>
                  <View style={styles.containerEndTime}>
                    <Input
                      control={control}
                      mode="time"
                      label="Horário de fim"
                      minimumDate={new Date()}
                      name={`actions[${index}].endTime`}
                      errorMessage={errors?.actions?.[index]?.endTime?.message}
                      placeholder="Ex: 24/02/2024"
                      inputType="date"
                    />
                  </View>
                </View>
                <FibonacciSequence
                  control={control}
                  label="Story Points"
                  name={`actions[${index}].storyPoints`}
                  max={34}
                />
                <View>
                  <Checkbox
                    control={control}
                    name={`actions[${index}].fixedAction`}
                    label="Manter ação fixa"
                  />
                </View>
                <View>
                  <Checkbox
                    control={control}
                    name={`actions[${index}].stayAction`}
                    label="Mater na próxima lista, caso não seja concluída"
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleRemoveItem(item.id)}
                style={{
                  gap: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginTop: 24,
                }}>
                <Trash2 size={24} color="#ED5E5E" />
                <Text style={{ fontFamily: 'Poppins-Regular', color: '#ED5E5E' }}>
                  Deletar ação
                </Text>
              </TouchableOpacity>
            </AccordionCadList>
          </View>
        ))}
      </ScrollView>
      <View style={styles.containerSaveButton}>
        <Button isLoading={isLoading} onPress={handleSubmit(onSubmit)} title="Salvar" />
      </View>
    </SafeAreaView>
  );
};
