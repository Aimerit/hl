import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { childrenPropType } from '../../../../utils/default-prop-types';

function LoginFormContainer({ className, children }) {
  return <div className={className}>{children}</div>;
}

LoginFormContainer.propTypes = {
  className: PropTypes.string,
  children: childrenPropType
};

export default styled(LoginFormContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
`;
