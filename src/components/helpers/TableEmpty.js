import React from 'react';
import PropTypes from 'prop-types';

import styleTableEmpty from './styles/style-table-empty';

import Icons from './Icons';

const UnStyledTableEmpty = ({ className, message }) => {
  return (
    <div className={className}>
      <img src={Icons.emptyIcon} alt='' />
      <span>{message}</span>
    </div>
  );
};

const StyledTableEmpty = styleTableEmpty(UnStyledTableEmpty);

export default function TableEmpty(props) {
  return <StyledTableEmpty {...props} />;
}
TableEmpty.propTypes = {
  message: PropTypes.string.isRequired
};
