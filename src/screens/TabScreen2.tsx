import React from 'react';
import { Box, Button, Center, ColorMode, Heading, Stack, Text, useColorMode, VStack } from 'native-base';

type Props = {};

export const TabScreen2: React.FC<Props> = ({}) => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <Box
      flex={1}
      bg={{
        linearGradient: {
          colors: ['teal.600', 'teal.300'],
          start: [0, 0],
          end: [1, 1],
        },
      }}
    >
      <VStack flex={1} safeArea alignItems={'center'}>
        <Heading>Screen2</Heading>
        <Stack bg='teal.400' width={'80%'} height={'30%'} borderRadius={12}>
          <Center flex={1}>
            <Text>colorMode : {colorMode}</Text>
            <Button onPress={() => setColorMode((pre: ColorMode) => (pre === 'dark' ? 'light' : 'dark'))}>
              change color mode
            </Button>
          </Center>
        </Stack>
      </VStack>
    </Box>
  );
};
