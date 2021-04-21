import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Flex } from '@chakra-ui/react';

import { privateRoutes } from '../../routes';
import authActions from '../../store/actions/auth';

import PrivateRoute from '../helpers/PrivateRoute';
import Loading from '../helpers/Loading';
import ConfirmationDialog from '../helpers/ConfirmationDialog';
import Navbar from './Navbar';
import ContentContainer from './helpers/ContentContainer';

function displayPrivateRoutes() {
  return privateRoutes.map(({ key, path, extactPath, component }) => (
    <PrivateRoute key={key} path={path} exact={!!extactPath} component={component} />
  ));
}

function Main() {
  const dispatch = useDispatch();
  const { visibility } = useSelector((state) => state.ui.loadingState);

  useEffect(() => {
    dispatch(authActions.getProfile());
  }, [dispatch]);

  return (
    <Flex flexDirection='column' minH='100vh'>
      <Navbar />

      <Loading visibility={visibility} />

      <ConfirmationDialog />

      <ContentContainer>
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/home' />} />
          {displayPrivateRoutes()}
        </Switch>
      </ContentContainer>
    </Flex>
  );
}

export default Main;
