import { LinearGradient } from 'expo-linear-gradient';
import { BarChartHorizontalBig, Home, Menu } from 'lucide-react-native';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { IconComponentsType } from './types';

const iconComponents: IconComponentsType = {
  Home,
  Report: BarChartHorizontalBig,
  Menu,
};

const FloatingTabBar: React.FC<any> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(46, 46, 46, 0.8)', '#111111', '#0A0A0A']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientBackground}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const IconComponent = iconComponents[route.name as keyof IconComponentsType];

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={styles.tabButton}>
              <View
                style={
                  isFocused
                    ? styles.containerIconComponentFocused
                    : styles.containerIconComponenteNotFocused
                }>
                <IconComponent color={isFocused ? '#2A2A2A' : 'white'} size={25} />
              </View>
            </TouchableOpacity>
          );
        })}
      </LinearGradient>
    </View>
  );
};

export default FloatingTabBar;
