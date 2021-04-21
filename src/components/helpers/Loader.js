import React from 'react';
import PropTypes from 'prop-types';

import styleLoader from './styles/style-loader';

import Icons from './Icons';

function UnStyledLoader({ className, colorScheme }) {
  return (
    <div className={className}>
      <img src={getIcon(colorScheme)} alt='Loader' />
    </div>
  );
}

function getIcon(colorScheme) {
  return { gray: Icons.logoGrayIcon, white: Icons.logoWhiteIcon }[colorScheme];
}

const StyledLoader = styleLoader(UnStyledLoader);

export default function Loader({ size = 'sm', colorScheme = 'gray', ...restProps }) {
  return <StyledLoader size={size} colorScheme={colorScheme} {...restProps} />;
}
Loader.propTypes = {
  size: PropTypes.oneOf(['sm', 'md']),
  colorScheme: PropTypes.oneOf(['gray', 'white'])
};
