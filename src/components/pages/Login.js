import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SimpleGrid } from '@chakra-ui/react';

import authActions from '../../store/actions/auth';
import formValidation from '../../utils/form_validation';
import { signInFormFields } from '../../utils/form_fields';

import { NotificationContext } from '../providers/Notification';
import Greeting from '../core/login/Greeting';
import LoginForm from '../core/login/LoginForm';
import useForm from '../hooks/useForm';

function Login() {
  const dispatch = useDispatch();
  const { requesting } = useSelector((state) => state.authState);
  const history = useHistory();
  const notification = useContext(NotificationContext);
  const signInForm = useForm(handleSignIn);

  function handleSignIn() {
    const { formState, setFormErrors } = signInForm;
    const { validForm, formErrors } = formValidation.validateForm(formState, signInFormFields);
    setFormErrors(formErrors);
    if (validForm) dispatch(authActions.signIn({ credentials: formState, notification, history }));
  }

  return (
    <SimpleGrid columns={2} spacing={0}>
      <Greeting />
      <LoginForm requesting={requesting} formErrors={signInForm.formErrors} onChange={signInForm.handleChange} onSubmit={signInForm.handleSubmit} />
    </SimpleGrid>
  );
}

export default Login;
