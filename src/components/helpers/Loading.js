import React from 'react';
import PropTypes from 'prop-types';

import styleLoading from './styles/style-loading';
import { joinClassNames } from '../../utils/array';

import Loader from './Loader';

function UnStyledLoading({ className, visibility }) {
  return (
    <div className={joinClassNames(className, visibility)}>
      <Loader size='md' colorScheme='white' />
    </div>
  );
}

const StyledLoading = styleLoading(UnStyledLoading);

export default function Loading(props) {
  return <StyledLoading {...props} />;
}
Loading.propTypes = {
  visibility: PropTypes.oneOf(['shown', 'hidden', 'none'])
};
