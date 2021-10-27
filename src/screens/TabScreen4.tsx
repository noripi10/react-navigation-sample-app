import React from 'react';
import { Box, Button, Center, ScrollView, Text, VStack } from 'native-base';
import { useFirebase } from '../hooks/useFirebase';

type Props = {};

export const TabScreen4: React.FC<Props> = ({}) => {
  const { logined, currentUser, loginWithEmailPassword, logout } = useFirebase();
  return (
    <Box
      flex={1}
      bg={{
        linearGradient: {
          colors: ['orange.600', 'orange.300'],
          start: [0, 0],
          end: [1, 1],
        },
      }}
    >
      <VStack safeArea flex={1}>
        <ScrollView>
          <Center px={1}>
            <Text>TabScreen4</Text>
            <Text>{logined ? 'login' : 'not login'}</Text>
            {logined ? (
              <Button onPress={logout}>logout</Button>
            ) : (
              <Button onPress={() => loginWithEmailPassword('hrnr1177@yahoo.co.jp', '62486248hs')}>login</Button>
            )}
            <Text>{JSON.stringify(currentUser, null, 2)}</Text>
          </Center>
        </ScrollView>
      </VStack>
    </Box>
  );
};
