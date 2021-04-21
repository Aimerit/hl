import React from 'react';
import PropTypes from 'prop-types';
import { VStack, Text, Button } from '@chakra-ui/react';

import Form from '../../helpers/Form';
import FormField from '../../helpers/FormField';
import Logo from '../../helpers/Logo';
import LoginFormContainer from './helpers/LoginFormContainer';

function LoginForm({ requesting, formErrors = {}, onChange, onSubmit }) {
  return (
    <LoginFormContainer>
      <Form noValidate onSubmit={onSubmit}>
        <VStack width='50%' spacing={4} alignItems='flex-start'>
          <Logo />
          <Text fontSize='sm' color='gray.500'>
            Entrez vos idenfiants pour accéder à votre page d&apos;administration
          </Text>
          <FormField type='text' name='username' label="Nom d'utilisateur" error={formErrors.username} required onChange={onChange} />
          <FormField type='password' name='password' label='Mot de passe' error={formErrors.password} required onChange={onChange} />
          <Button type='submit' colorScheme='primary' py={2} isLoading={requesting}>
            Accéder à mon espace
          </Button>
        </VStack>
      </Form>
    </LoginFormContainer>
  );
}

LoginForm.propTypes = {
  requesting: PropTypes.bool.isRequired,
  formErrors: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default LoginForm;
