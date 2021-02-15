import React, { isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as SuppliersIcon } from '../../../../assets/images/suppliers.svg';
import { ReactComponent as CategoriesIcon } from '../../../../assets/images/categories.svg';
import { ReactComponent as ProductsIcon } from '../../../../assets/images/products.svg';

import sidebarMenuIcons from '../../../../config/sidebar-menu-icons';

function SidebarMenuIcon({ icon }) {
  let iconComponent;

  switch (icon) {
    case sidebarMenuIcons.SUPPLIERS:
      iconComponent = <SuppliersIcon />;
      break;

    case sidebarMenuIcons.CATEGORIES:
      iconComponent = <CategoriesIcon />;
      break;

    case sidebarMenuIcons.PRODUCTS:
      iconComponent = <ProductsIcon />;
      break;
  }

  return <>{isValidElement(iconComponent) && cloneElement(iconComponent)}</>;
}

SidebarMenuIcon.propTypes = {
  icon: PropTypes.oneOf(Object.values(sidebarMenuIcons)).isRequired
};

export default SidebarMenuIcon;
