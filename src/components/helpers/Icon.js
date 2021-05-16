import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { iconSizes } from '../../config/sizes';
import { joinClassNames } from '../../utils';
import colors from '../../config/colors';

function UnStyledIcon({ className, variant, name }) {
  return <span className={joinClassNames(className, getClassName(variant))}>{name}</span>;
}

function getClassName(variant) {
  return { outlined: 'material-icons-outlined', filled: 'material-icons' }[variant];
}

const StyledIcon = styled(UnStyledIcon)`
  font-size: ${getFontSize};
  color: ${getColor};
`;

function getFontSize({ size }) {
  return iconSizes[size];
}

function getColor({ colorScheme }) {
  return colors[colorScheme];
}

export default function Icon({ variant = 'outlined', colorScheme = 'black', size = 'sm', ...restProps }) {
  return <StyledIcon variant={variant} colorScheme={colorScheme} size={size} {...restProps} />;
}
Icon.propTypes = {
  name: PropTypes.string,
  variant: PropTypes.oneOf(['outlined', 'filled']),
  colorScheme: PropTypes.oneOf(['black', 'primary', 'secondary', 'gray', 'white']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg'])
};
