import React from 'react';
import { Switch, Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import { stockManagementPrivateRoutes } from '../../../routes';
import sidebarMenuIcons from '../../../config/sidebar-menu-icons';
import stockManagementPageViewModel from '../../../utils/view_models/stock-management-page';

import PrivateRoute from '../../helpers/PublicRoute';
import Sidebar from '../../core/home/helpers/Sidebar';
import Content from '../../core/home/helpers/Content';

const menuItems = [
  { icon: sidebarMenuIcons.SUPPLIERS, title: 'Fournisseurs', url: '/home/stock-management/suppliers' },
  { icon: sidebarMenuIcons.CATEGORIES, title: 'Catégories', url: '/home/stock-management/categories' },
  { icon: sidebarMenuIcons.PRODUCTS, title: 'Produits', url: '/home/stock-management/products' }
];

function displayPrivateRoutes() {
  return stockManagementPrivateRoutes.map(({ key, path, component }) => <PrivateRoute key={key} path={path} component={component} />);
}

function StockManagement() {
  const { path } = useRouteMatch();
  stockManagementPageViewModel.init({ history: useHistory() });

  return (
    <Flex flex='1' flexDirection='column'>
      <Sidebar title='Gestion des stocks' menuItems={menuItems} onBackClick={() => stockManagementPageViewModel.handleBackClick()} />
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
