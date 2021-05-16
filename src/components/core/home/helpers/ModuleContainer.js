import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colors from '../../../../config/colors';
import { childrenPropType } from '../../../../utils/default-prop-types';

export const ModuleIcon = styled.img`
  display: inline-block;
  width: 6rem;
  min-height: 6rem;
`;

export const ModuleTitle = styled.h5`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${colors.white};
  margin: 1rem 0 0.5rem 0;
`;

export const ModuleDescription = styled.p`
  color: ${colors.gray};
  font-size: 0.75rem;
`;

function ModuleContainer({ className, onClick, children }) {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
}

ModuleContainer.propTypes = {
  className: PropTypes.string,
  children: childrenPropType.isRequired,
  onClick: PropTypes.func.isRequired
};

export default styled(ModuleContainer)`
  background: ${colors.primary};
  min-width: 22.5rem;
  min-height: 22.5rem;
  padding: 3rem 2rem;
  border: 1px solid #e7eaf3;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 300ms ease-in-out;

  :hover {
    background: ${colors.primaryLight};
  }
`;
