import React from 'react';
import PropTypes from 'prop-types';

import styleText from './styles/style-text';

function UnStyledText({ className, children }) {
  return <span className={className}>{children}</span>;
}

const StyledText = styleText(UnStyledText);

export default function Text({ colorScheme = 'black', weight = 400, ...restProps }) {
  return <StyledText colorScheme={colorScheme} weight={weight} {...restProps} />;
}
Text.propTypes = {
  colorScheme: PropTypes.oneOf(['black', 'primary']),
  weight: PropTypes.oneOf[(400, 500, 600, 700)]
};
