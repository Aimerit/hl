import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';

import { publicRoutes } from './routes';
import theme from './config/theme';

import NotificationProvider from './components/providers/Notification';
import PublicRoute from './components/helpers/PublicRoute';

function displayPublicRoutes() {
  return publicRoutes.map(({ key, path, component }) => <PublicRoute key={key} path={path} component={component} />);
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />

      <NotificationProvider>
        <Router>
          <Switch>{displayPublicRoutes()}</Switch>
        </Router>
      </NotificationProvider>
    </ChakraProvider>
  );
}

export default App;
