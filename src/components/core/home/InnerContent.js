import React from 'react';
import PropTypes from 'prop-types';

import { childrenPropType } from '../../../utils/default-prop-types';

import InnerContentContainer, { InnerContentHeader, InnerContentTitle, InnerContentActions } from './helpers/InnerContentContainer';

function InnerContent({ title, actions, children }) {
  return (
    <InnerContentContainer>
      <InnerContentHeader>
        <InnerContentTitle>{title}</InnerContentTitle>
        <InnerContentActions>{actions}</InnerContentActions>
      </InnerContentHeader>
      {children}
    </InnerContentContainer>
  );
}

InnerContent.propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.node.isRequired,
  children: childrenPropType
};

export default InnerContent;
