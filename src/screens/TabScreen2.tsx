import React from 'react';
import { Box, Center, Text } from 'native-base';

type Props = {};

export const TabScreen2: React.FC<Props> = ({}) => {
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
      <Center flex={1}>
        <Text>TabScreen2</Text>
      </Center>
    </Box>
  );
};
