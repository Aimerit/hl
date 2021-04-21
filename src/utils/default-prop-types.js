import PropTypes from 'prop-types';

export const childrenPropType = PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]);

export const accountPropType = PropTypes.shape({
  username: PropTypes.string
});

export const staffMemberPropType = PropTypes.shape({
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  account: accountPropType
});

export const addressPropType = PropTypes.shape({
  city: PropTypes.string,
  neighborhood: PropTypes.string,
  indication: PropTypes.string
});

export const supplierPropType = PropTypes.shape({
  createdAt: PropTypes.string,
  code: PropTypes.string,
  companyName: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  officeAddress: addressPropType
});
