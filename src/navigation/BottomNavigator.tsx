import React, { ComponentProps } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { Center, Text } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TabScreen1 } from '../screens/TabScreen1';
import { TabScreen4 } from '../screens/TabScreen4';
import { TabScreen3 } from '../screens/TabScreen3';
import { TabScreen2 } from '../screens/TabScreen2';

export type BottomNavigatorParamList = {
  Tab1: undefined;
  Tab2: undefined;
  Tab3: undefined;
  Tab4: undefined;
  Modal: undefined;
};

const Tab = createBottomTabNavigator<BottomNavigatorParamList>();

export const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const name: ComponentProps<typeof Feather>['name'] =
            route.name === 'Tab1'
              ? 'airplay'
              : route.name === 'Tab2'
              ? 'anchor'
              : route.name === 'Tab3'
              ? 'award'
              : route.name === 'Tab4'
              ? 'coffee'
              : 'camera';

          return (
            <Center top={Platform.select({ ios: 3, android: 0 })}>
              {route.name === 'Modal' ? (
                <Center position='absolute' top={-48} w={75} h={75} borderRadius={999} bgColor='amber.400'>
                  <Feather name={name} color={color} size={size * 1.3} />
                </Center>
              ) : (
                <Feather name={name} color={color} size={size} />
              )}
            </Center>
          );
        },
        tabBarButton: (props: BottomTabBarButtonProps) => {
          return <TouchableOpacity {...props} />;
        },
        tabBarLabel: (props) => {
          const name =
            route.name === 'Modal'
              ? 'CAMERA'
              : route.name === 'Tab1'
              ? 'TV'
              : route.name === 'Tab2'
              ? 'SHIP'
              : route.name === 'Tab3'
              ? 'EVENT'
              : route.name === 'Tab4'
              ? 'CAFE'
              : '';
          return (
            <Center position='absolute' bottom={Platform.select({ ios: -30, android: 0 })} mb={1}>
              <Text color={props.focused ? 'red.800' : 'warmGray.500'} fontSize={11}>
                {name}
              </Text>
            </Center>
          );
        },
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#ddd',
          borderRadius: 999,
          position: 'absolute',
          bottom: 24,
          left: 12,
          right: 12,
          height: 70,
          elevation: 0,
          margin: 0,
          padding: 0,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarActiveTintColor: '#991b1b',
        tabBarInactiveTintColor: '#78716c',
        headerShown: false,
      })}
    >
      <Tab.Screen name='Tab1' component={TabScreen1} />
      <Tab.Screen name='Tab2' component={TabScreen2} />
      <Tab.Screen
        name='Modal'
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('FullModal');
          },
        })}
      >
        {() => <React.Fragment />}
      </Tab.Screen>
      <Tab.Screen name='Tab3' component={TabScreen3} />
      <Tab.Screen name='Tab4' component={TabScreen4} />
    </Tab.Navigator>
  );
};
