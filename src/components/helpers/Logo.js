import React from 'react';
import PropTypes from 'prop-types';
import { Image } from '@chakra-ui/react';
import styled from 'styled-components';

import logoIcon from '../../images/logo.svg';

const logoSizes = Object.freeze({
  default: '4.75rem',
  small: '3.125rem'
});

function Logo({ className }) {
  return <Image className={className} src={logoIcon} alt='logo' />;
}

Logo.propTypes = {
  className: PropTypes.string.isRequired
};

export default styled(Logo)`
  display: inline-block;
  height: ${(props) => (props.size ? logoSizes[props.size] : logoSizes.default)};
`;
