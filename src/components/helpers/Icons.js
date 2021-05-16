import React from 'react';

import { MdAddBox, MdKeyboardArrowDown } from 'react-icons/md';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

import logoIcon from '../../assets/images/logo-bold.svg';
import logoGrayIcon from '../../assets/images/logo-bold-gray.svg';
import logoWhiteIcon from '../../assets/images/logo-bold-white.svg';
import suppliersIcon from '../../assets/images/suppliers.svg';
import categoriesIcon from '../../assets/images/categories.svg';
import productsIcon from '../../assets/images/products.svg';
import arrowLeftIcon from '../../assets/images/arrow-left.svg';
import emptyIcon from '../../assets/images/empty.svg';
import stockManagementIcon from '../../assets/images/stock-management.svg';
import staffMemberManagementIcon from '../../assets/images/staff-member-management.svg';

import Icon from './Icon';

export default {
  logoIcon,
  logoGrayIcon,
  logoWhiteIcon,
  suppliersIcon,
  categoriesIcon,
  productsIcon,
  arrowLeftIcon,
  emptyIcon,
  stockManagementIcon,
  staffMemberManagementIcon,

  components: {
    Add: () => <Icon name='add' />,
    Edit: () => <Icon name='edit' />,
    Delete: () => <Icon name='delete' />,
    Logout: () => <Icon name='logout' />,
    Reset: (props) => <Icon name='restart_alt' {...props} />,
    Refresh: (props) => <Icon name='refresh' {...props} />,
    MoreHorizontal: (props) => <Icon name='more_horiz' {...props} />,
    MoreVertical: (props) => <Icon name='more_vert' {...props} />,
    Search: (props) => <Icon name='search' {...props} />,
    ArrowLeft: RiArrowLeftSLine,
    ArrowRight: RiArrowRightSLine,
    ArrowKeyboardDown: MdKeyboardArrowDown,
    AddBox: MdAddBox
  }
};
