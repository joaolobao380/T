import { useAuth } from '@hooks/useAuth';
import { signOut } from 'firebase/auth';
import {
  User,
  Bell,
  AsteriskSquare,
  SquareUser,
  Settings,
  ShieldAlert,
  ChevronRight,
  Store,
  LogOut,
} from 'lucide-react-native';
import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export const Account = () => {
  const { logout } = useAuth();
  return (
    <SafeAreaView>
      <View
        style={{
          marginTop: 32,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 16,
          marginBottom: 8,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View
            style={{
              height: 56,
              width: 56,
              borderRadius: 28,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#444444',
            }}>
            <User color="white" />
          </View>
          <View>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16 }}>Olá, João Victor</Text>
          </View>
        </View>
        <View>
          <Bell color="#444444" />
        </View>
      </View>
      <ScrollView>
        <View style={{ marginHorizontal: 16, marginTop: 32 }}>
          <View>
            <Text style={{ fontFamily: 'Poppins-Regular', color: '#444444' }}>Dados pessoais</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 16, gap: 16 }}>
            <View
              style={{
                padding: 16,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#444444',
                gap: 2,
              }}>
              <View>
                <AsteriskSquare color="white" size={32} strokeWidth={1.5} />
              </View>
              <View>
                <Text style={{ color: 'white', fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                  Mudar senha
                </Text>
              </View>
            </View>
            <View
              style={{
                padding: 16,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#444444',
                gap: 2,
              }}>
              <View>
                <SquareUser color="white" size={32} strokeWidth={1.5} />
              </View>
              <View>
                <Text style={{ color: 'white', fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                  Alterar perfil
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View style={{ marginTop: 32 }}>
              <Text style={{ fontFamily: 'Poppins-Regular', color: '#444444' }}>Ajustes</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 16, gap: 16 }}>
              <View
                style={{
                  padding: 16,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#444444',
                  gap: 2,
                }}>
                <View>
                  <Settings color="white" size={32} strokeWidth={1.5} />
                </View>
                <View>
                  <Text style={{ color: 'white', fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                    Configurações
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={{ fontFamily: 'Poppins-Regular', color: '#444444' }}>Diversos</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 24 }}>
            <View>
              <ShieldAlert color="#444444" size={24} strokeWidth={1.5} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: 1,
              }}>
              <View>
                <Text style={{ fontFamily: 'Poppins-Regular', color: '#444444', fontSize: 16 }}>
                  Política de privacidade
                </Text>
              </View>
              <View>
                <ChevronRight color="#444444" size={24} strokeWidth={1.5} />
              </View>
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: '#B2B2B2', marginTop: 24 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 24 }}>
            <View>
              <Store color="#444444" size={24} strokeWidth={1.5} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: 1,
              }}>
              <View>
                <Text style={{ fontFamily: 'Poppins-Regular', color: '#444444', fontSize: 16 }}>
                  Sobre
                </Text>
              </View>
              <View>
                <ChevronRight color="#444444" size={24} strokeWidth={1.5} />
              </View>
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: '#B2B2B2', marginTop: 24 }} />
          <TouchableOpacity
            onPress={() => logout()}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 24 }}>
            <View>
              <LogOut color="#444444" size={24} strokeWidth={1.5} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: 1,
              }}>
              <View>
                <Text style={{ fontFamily: 'Poppins-Regular', color: '#444444', fontSize: 16 }}>
                  Sair do aplicativo
                </Text>
              </View>
              <View>
                <ChevronRight color="#444444" size={24} strokeWidth={1.5} />
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ height: 1, backgroundColor: '#B2B2B2', marginTop: 24 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
