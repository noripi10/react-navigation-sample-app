import React from 'react';
import { Box, Center, Heading, Text } from 'native-base';

type Props = {};

export const TabScreen3: React.FC<Props> = ({}) => {
  return (
    <Box
      flex={1}
      bg={{
        linearGradient: {
          colors: ['red.600', 'red.300'],
          start: [0, 0],
          end: [1, 1],
        },
      }}
    >
      <Center flex={1}>
        <Heading>TabScreen3</Heading>
      </Center>
    </Box>
  );
};
