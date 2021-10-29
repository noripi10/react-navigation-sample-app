import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Center, Divider, Input, Stack, Text, VStack } from 'native-base';
import { useFirebase } from '../hooks/useFirebase';
import Storage from '@react-native-async-storage/async-storage';

type Props = {};

export const LoginScreen: React.FC<Props> = ({}) => {
  const { loginWithEmailPassword } = useFirebase();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = useCallback(() => {
    loginWithEmailPassword(userId, password).then(() => {
      Storage.setItem('user', JSON.stringify({ userId, password }));
    });
  }, [userId, password]);

  useEffect(() => {
    Storage.getItem('user').then((str) => {
      if (str) {
        const user = JSON.parse(str);
        setUserId(user.userId);
        setPassword(user.password);
      }
    });
  }, []);

  return (
    <Box
      flex={1}
      bg={{
        linearGradient: {
          colors: ['gray.600', 'gray.300'],
          start: [0, 0],
          end: [1, 1],
        },
      }}
    >
      <VStack safeArea flex={1} pt={12}>
        <Center>
          <Center width={'100%'} maxWidth={500} mb={3}>
            <Stack width={'80%'} pb={1}>
              <Text>User ID</Text>
            </Stack>
            <Stack width='80%'>
              <Input
                p={3}
                value={userId}
                onChangeText={(t) => setUserId(t)}
                keyboardType='email-address'
                fontSize={16}
              />
            </Stack>
          </Center>

          <Center width={'100%'} maxWidth={500} mb={3}>
            <Stack width={'80%'} pb={1}>
              <Text>Password</Text>
            </Stack>
            <Stack width='80%'>
              <Input
                p={3}
                secureTextEntry
                value={password}
                onChangeText={(t) => setPassword(t)}
                keyboardType='email-address'
                fontSize={16}
              />
            </Stack>
          </Center>

          <Divider my={3} width={'90%'} />

          <Button width='80%' maxWidth={500} onPress={onLogin} borderRadius={999} py={3}>
            login
          </Button>
        </Center>
      </VStack>
    </Box>
  );
};
