import React, { useCallback, useLayoutEffect, useState, useEffect } from 'react';
import { Box, Button, Center, Divider, Input, ScrollView, Text, VStack } from 'native-base';
import { useFirebase } from '../hooks/useFirebase';
import Storage from '@react-native-async-storage/async-storage';

type Props = {};

export const LoginScreen: React.FC<Props> = ({}) => {
  const [userId, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const { loginWithEmailPassword, loginGoogle, loginFacebook, loginTwitter } = useFirebase();

  useEffect(() => {
    Storage.getItem('user').then((str) => {
      if (str) {
        const user = JSON.parse(str);
        setUserID(user.userId);
        setPassword(user.password);
      }
    });
  }, []);

  const onLogin = useCallback(async () => {
    const result = await loginWithEmailPassword(userId, password);
    if (result) {
      await Storage.setItem('user', JSON.stringify({ userId, password }));
    }
  }, [userId, password]);

  useLayoutEffect(() => {
    try {
      Storage.getItem('user').then((str) => {
        if (!!str) {
          const { userId, password } = JSON.parse(str);
          setUserID(userId);
          setPassword(password);
        }
      });
    } catch (error) {
      console.warn(error);
    }
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
      <VStack safeArea flex={1}>
        <ScrollView>
          <Center pt={6}>
            <Text>user id</Text>
            <Input width={'70%'} maxWidth={400} my={1} p={3} value={userId} onChangeText={(t) => setUserID(t)} />
            <Text>password</Text>
            <Input width={'70%'} maxWidth={400} my={1} p={3} value={password} onChangeText={(t) => setPassword(t)} />
          </Center>

          <Box pt={'2'} alignItems={'center'}>
            <Button width='80%' maxWidth={500} onPress={onLogin} borderRadius={999} py={3}>
              login
            </Button>
          </Box>

          <Divider my={3} width={'90%'} alignSelf='center' />

          <Box pt={'2'} alignItems='center'>
            <Button width='80%' maxWidth={500} onPress={loginGoogle} borderRadius={999} py={3}>
              google login
            </Button>
          </Box>
          <Box pt={'2'} alignItems='center'>
            <Button
              width='80%'
              maxWidth={500}
              onPress={loginFacebook}
              borderRadius={999}
              py={3}
              bgColor='teal.800'
              shadow={'3'}
              _pressed={{ style: { backgroundColor: 'red' } }}
            >
              facebook login
            </Button>
          </Box>

          <Box pt={'2'} alignItems='center'>
            <Button
              width='80%'
              maxWidth={500}
              onPress={loginTwitter}
              borderRadius={999}
              py={3}
              bgColor='teal.800'
              shadow={'3'}
              _pressed={{ style: { backgroundColor: 'blue' } }}
            >
              twitter login
            </Button>
          </Box>
        </ScrollView>
      </VStack>
    </Box>
  );
};
