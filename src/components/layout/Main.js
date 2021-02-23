import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import { privateRoutes } from '../../routes';

import PrivateRoute from '../helpers/PublicRoute';
import Navbar from './Navbar';
import ContentContainer from './helpers/ContentContainer';

function displayPrivateRoutes() {
  return privateRoutes.map(({ key, path, extactPath, component }) => (
    <PrivateRoute key={key} path={path} exact={!!extactPath} component={component} />
  ));
}

function Main() {
  return (
    <Flex flexDirection='column' minH='100vh'>
      <Navbar />

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
