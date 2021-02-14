import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { childrenPropType } from '../../../utils/default-prop-types';

function NavbarContainer({ className, children }) {
  return <div className={className}>{children}</div>;
}

NavbarContainer.propTypes = {
  className: PropTypes.string,
  children: childrenPropType
};

export default styled(NavbarContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  height: 80px;
  position: sticky;
  background: #ffffff;
  top: 0;
  left: 0;
  z-index: 10;

  ::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: #e7eaf3;
  }
`;
