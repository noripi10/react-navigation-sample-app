import React from 'react';
import { Box, Center, Text, Button, HStack } from 'native-base';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../navigation/StackNavigator';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, 'Tabs'>;
};

export const TabScreen1: React.FC<Props> = ({ navigation }: Props) => {
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
      <Center flex={1}>
        <Text>TabScreen1</Text>

        <HStack w='100%' justifyContent='center'>
          <Button mr={2} onPress={() => navigation.navigate('Tabs', { screen: 'Tab4' })}>
            Cafe !
          </Button>
          <Button onPress={() => navigation.navigate('FullModal')}>Modal Camera Open!</Button>
        </HStack>
      </Center>
    </Box>
  );
};
