import React, { useCallback, useContext, useState } from 'react';
import { Box, Button, Center, Heading, HStack, ScrollView, Text, VStack } from 'native-base';
import { useFirebase, User } from '../hooks/useFirebase';

import { AuthUserContext } from '../contexts/AuthContext';

type Props = {};

export const TabScreen4: React.FC<Props> = ({}) => {
  const { user: currentUser } = useContext(AuthUserContext);
  const { getUsersCollection, setRoom, logout } = useFirebase();
  const [users, setUsers] = useState<User[] | null>(null);

  const getUsers = useCallback(async () => {
    const users = await getUsersCollection();
    setUsers(users);
  }, []);

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
            <Heading>TabScreen4</Heading>
            <HStack width='100%' justifyContent='center'>
              <Button ml='1' onPress={getUsers}>
                Get Users
              </Button>

              <Button ml='1' onPress={setRoom}>
                Set Room
              </Button>

              <Button ml='1' onPress={logout}>
                Logout
              </Button>
            </HStack>
            <VStack width='100%' alignItems='center' mt={2}>
              <Text>Login User</Text>
              <Text>
                {currentUser && currentUser.email}
                {'\n'}
                {currentUser && currentUser.uid}
              </Text>
            </VStack>
            <VStack width='100%' alignItems='center' mt={2}>
              <Text>Users</Text>
              {users?.map((user) => (
                <Text>
                  {user.id} {user.name}
                </Text>
              ))}
            </VStack>
          </Center>
        </ScrollView>
      </VStack>
    </Box>
  );
};
