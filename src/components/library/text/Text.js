import React from 'react';
import PropTypes from 'prop-types';

import styleText from './utils/style-text';

function UnStyledText({ className, children }) {
  return <span className={className}>{children}</span>;
}

const StyledText = styleText(UnStyledText);

export function Text({ colorScheme = 'black', size = 'md', weight = 400, highlight = false, ...restProps }) {
  return <StyledText colorScheme={colorScheme} size={size} weight={weight} highlight={highlight} {...restProps} />;
}
Text.propTypes = {
  colorScheme: PropTypes.oneOf(['black', 'primary', 'secondary', 'gray']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']),
  weight: PropTypes.oneOf([400, 500, 600, 700]),
  highlight: PropTypes.bool
};
