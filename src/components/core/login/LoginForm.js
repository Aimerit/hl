import React from 'react';
import PropTypes from 'prop-types';
import { VStack, FormControl, FormLabel, Text, Input, FormErrorMessage, Button } from '@chakra-ui/react';

import Form from '../../helpers/Form';
import Logo from '../../helpers/Logo';
import LoginFormContainer from './helpers/LoginFormContainer';

const errors = {};

function LoginForm({ onSignIn }) {
  return (
    <LoginFormContainer>
      <Form onSubmit={onSignIn}>
        <VStack width='50%' spacing={4} alignItems='flex-start'>
          <Logo />
          <Text fontSize='sm' color='gray.500'>
            Entrez vos idenfiants pour accéder à votre page d&apos;administration
          </Text>
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor='email'>Nom d&apos;utilisateur</FormLabel>
            <Input type='email' name='email' variant='filled' />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <FormLabel htmlFor='password'>Mot de passe</FormLabel>
            <Input type='password' name='password' variant='filled' />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>
          <FormControl py={2}>
            <Button type='submit' colorScheme='primary'>
              Accéder à mon espace
            </Button>
          </FormControl>
        </VStack>
      </Form>
    </LoginFormContainer>
  );
}

LoginForm.propTypes = {
  onSignIn: PropTypes.func.isRequired
};

export default LoginForm;
