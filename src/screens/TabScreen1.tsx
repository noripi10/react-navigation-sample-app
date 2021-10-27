import React, { useEffect, useState } from 'react';
import { Alert, Dimensions } from 'react-native';
import { Box, Button, HStack, VStack, Heading } from 'native-base';
import { Circle, Svg } from 'react-native-svg';
import SvgUri from 'react-native-svg-uri';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../navigation/StackNavigator';

// import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
// import { BottomNavigatorParamList } from '../navigation/BottomNavigator';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, 'Tabs'>;
};

// type Props = {
//   navigation: BottomTabNavigationProp<BottomNavigatorParamList, 'Tab1'>
// }

export const TabScreen1: React.FC<Props> = ({ navigation }: Props) => {
  const [mouted, setMounted] = useState(false);
  const { width, height } = Dimensions.get('screen');

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <Box
      flex={1}
      bg={{
        linearGradient: {
          colors: ['blue.600', 'blue.300'],
          start: [0, 0],
          end: [1, 1],
        },
      }}
    >
      <VStack flex={1} alignItems='center' safeAreaTop>
        <Heading>TabScreen1</Heading>
        {mouted && (
          <SvgUri
            source={require('../../assets/images/undraw_react_y7wq.svg')}
            width={width * 0.7}
            height={height * 0.3}
          />
        )}

        <Svg width={width * 0.9} height={100} viewBox={`0 0 ${width * 0.9} 100`}>
          <Circle cx='10' cy='10' r='5' stroke='#500' strokeWidth='2' fill='#800' onPress={() => Alert.alert('1')} />
          <Circle cx='25' cy='10' r='5' stroke='#050' strokeWidth='2' fill='#080' onPress={() => Alert.alert('2')} />
          <Circle cx='40' cy='10' r='5' stroke='#005' strokeWidth='2' fill='#008' onPress={() => Alert.alert('3')} />
          <Circle cx='55' cy='10' r='5' stroke='#290' strokeWidth='2' fill='#a9c' onPress={() => Alert.alert('4')} />
          <Circle cx='70' cy='10' r='5' stroke='#829' strokeWidth='2' fill='#15d' onPress={() => Alert.alert('5')} />
        </Svg>

        <HStack w='100%' justifyContent='center'>
          <Button mr={2} onPress={() => navigation.navigate('Tabs', { screen: 'Tab4' })} borderRadius={999}>
            Cafe !
          </Button>
          <Button onPress={() => navigation.navigate('FullModal')} borderRadius={999}>
            Modal Camera Open!
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};
