import React from 'react';
import { Switch, Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import { stockManagementPrivateRoutes } from '../../../routes';
import stockManagementPageViewModel from '../../../utils/view_models/stock-management-page';

import PrivateRoute from '../../helpers/PublicRoute';
import Sidebar from '../../core/home/helpers/Sidebar';
import Content from '../../core/home/helpers/Content';

function displayPrivateRoutes() {
  return stockManagementPrivateRoutes.map(({ key, path, component }) => <PrivateRoute key={key} path={path} component={component} />);
}

function StockManagement() {
  const { path } = useRouteMatch();
  stockManagementPageViewModel.init({ history: useHistory() });

  return (
    <Flex flex='1'>
      <Sidebar title='Gestion des stocks' onBackClick={() => stockManagementPageViewModel.handleBackClick()} />
      <Content>
        <Switch>
          <Route exact path={path} render={() => <Redirect to={`${path}/suppliers`} />} />
          {displayPrivateRoutes()}
        </Switch>
      </Content>
    </Flex>
  );
}

export default StockManagement;
