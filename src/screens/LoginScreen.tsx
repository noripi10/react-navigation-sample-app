import React, { useCallback, useState } from 'react';
import { Box, Button, Center, Divider, Input, Stack, Text, VStack } from 'native-base';
import { useFirebase } from '../hooks/useFirebase';

type Props = {};

export const LoginScreen: React.FC<Props> = ({}) => {
  const { loginWithEmailPassword } = useFirebase();
  const [userId, setUserId] = useState('hrnr1177@yahoo.co.jp');
  const [password, setPassword] = useState('62486248hs');

  const onLogin = useCallback(async () => {
    console.log(userId, password);
    await loginWithEmailPassword(userId, password);
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
