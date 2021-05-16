import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function UnStyledIconContainer({ className, icon }) {
  const Icon = icon;

  return <div className={className}>{Icon && <Icon />}</div>;
}

const StyledIconContainer = styled(UnStyledIconContainer)`
  height: 100%;
  display: flex;
  align-items: center;
`;

export default function IconContainer(props) {
  return <StyledIconContainer {...props} />;
}
IconContainer.propTypes = {
  icon: PropTypes.elementType
};
