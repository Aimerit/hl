import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { childrenPropType } from '../../../utils/default-prop-types';

function ContentContainer({ className, children }) {
  return <div className={className}>{children}</div>;
}

ContentContainer.propTypes = {
  className: PropTypes.string,
  children: childrenPropType
};

export default styled(ContentContainer)`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f9fbfd;
  overflow: hidden;
`;
