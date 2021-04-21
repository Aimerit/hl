import { MdDelete, MdEdit } from 'react-icons/md';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { MdAddBox } from 'react-icons/md';

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
    Edit: MdEdit,
    Delete: MdDelete,
    ArrowLeft: RiArrowLeftSLine,
    ArrowRight: RiArrowRightSLine,
    AddBox: MdAddBox
  }
};
