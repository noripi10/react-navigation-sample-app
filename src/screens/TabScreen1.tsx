import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Platform, View } from 'react-native';
import {
  Box,
  Button,
  HStack,
  VStack,
  Heading,
  useBreakpointValue,
  Text,
  Center,
  Spinner,
  Stack,
  Image,
} from 'native-base';
import { Circle, Svg } from 'react-native-svg';
import { useAssets } from 'expo-asset';
// import SvgUri from 'react-native-svg-uri';

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
  const assets = useAssets([require('../../assets/images/undraw_react_y7wq.png')]);
  const { width, height } = Dimensions.get('screen');
  const flexDir = useBreakpointValue({ base: 'column', lg: 'row' });
  const display = useBreakpointValue({ base: 'none', lg: 'flex' });

  if (!assets) {
    return (
      <Center flex={1}>
        <Spinner accessibilityLabel='Loading now...' size='lg' color='indigo.500' />
      </Center>
    );
  }

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
      flexDirection={flexDir}
    >
      <VStack flex={1} alignItems='center' safeAreaTop>
        <Heading>TabScreen1</Heading>
        <Stack width={'100%'} height={'35%'} p={4} justifyContent='center' alignItems='center'>
          <Image
            borderRadius={8}
            width={Dimensions.get('window').width * 0.85}
            height={Dimensions.get('window').height * 0.3}
            source={require('../../assets/images/undraw_react_y7wq.png')}
            alt='logo'
            resizeMode='cover'
          />
        </Stack>

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
        <View
          onLayout={(e) => {
            console.info(e.nativeEvent.layout);
          }}
        >
          <Text>{flexDir}</Text>
        </View>
      </VStack>
      <VStack display={display} flex={2} flexDirection={flexDir}>
        <Box flex={1} bgColor={'purple.900'} />
      </VStack>
    </Box>
  );
};
