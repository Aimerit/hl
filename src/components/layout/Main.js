import React from 'react';
import { Flex } from '@chakra-ui/react';

import Navbar from './Navbar';
import ContentContainer from './helpers/ContentContainer';

function Main() {
  return (
    <Flex flexDirection='column' minH='100vh'>
      <Navbar />

      <ContentContainer></ContentContainer>
    </Flex>
  );
}

export default Main;
