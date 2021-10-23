import React from 'react';
import { Box, Center, Text } from 'native-base';

type Props = {};

export const TabScreen1: React.FC<Props> = ({}) => {
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
      </Center>
    </Box>
  );
};
