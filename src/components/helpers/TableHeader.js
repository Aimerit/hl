import React from 'react';
import { Flex, Box, Input } from '@chakra-ui/react';

function TableHeader() {
  return (
    <Flex padding={4}>
      <Box minWidth='15%'>
        <Input placeholder='Rechercher' />
      </Box>
    </Flex>
  );
}

export default TableHeader;
