import { MdDelete, MdEdit } from 'react-icons/md';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

import suppliersIcon from '../../assets/images/suppliers.svg';
import categoriesIcon from '../../assets/images/categories.svg';
import productsIcon from '../../assets/images/products.svg';

export default {
  suppliersIcon,
  categoriesIcon,
  productsIcon,

  components: {
    Edit: MdEdit,
    Delete: MdDelete,
    ArrowLeft: RiArrowLeftSLine,
    ArrowRight: RiArrowRightSLine
  }
};
