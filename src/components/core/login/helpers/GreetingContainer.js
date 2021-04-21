import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { childrenPropType } from '../../../../utils/default-prop-types';
import loginCoverImage from '../../../../assets/images/login-cover.jpg';

export const GreetingBody = styled.div``;

export const GreetingFooter = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-size: 0.75rem;
`;

export const GreetingTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
`;

export const GreetingSubTitle = styled.p`
  font-size: 0.875rem;
  margin-top: 1rem;
`;

function GreetingContainer({ className, children }) {
  return (
    <div className={className}>
      <div />
      <div>{children}</div>
    </div>
  );
}

GreetingContainer.propTypes = {
  className: PropTypes.string,
  children: childrenPropType
};

export default styled(GreetingContainer)`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;

  > div {
    :first-child {
      position: absolute;
      left: 0;
      top: 0;
      width: 98%;
      height: 100%;
      background-image: url(${loginCoverImage});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      filter: blur(20px) brightness(50%);
      -webkit-filter: blur(20px) brightness(50%);
    }

    :last-child {
      flex: 1;
      z-index: 1;
      background-color: rgba(13, 26, 101, 0.44);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 8rem 5rem 2rem 5rem;
      color: #ffffff;
      overflow-y: auto;
    }
  }
`;
