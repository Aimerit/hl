import React from 'react';
import { useHistory } from 'react-router-dom';
import { SimpleGrid } from '@chakra-ui/react';

import Greeting from '../core/login/Greeting';
import LoginForm from '../core/login/LoginForm';

function Login() {
  const history = useHistory();

  function handleSignIn(evt) {
    evt.preventDefault();

    history.push('/');
  }

  return (
    <SimpleGrid columns={2} spacing={0}>
      <Greeting />
      <LoginForm onSignIn={handleSignIn} />
    </SimpleGrid>
  );
}

export default Login;
