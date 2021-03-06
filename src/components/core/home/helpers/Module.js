import React from 'react';
import PropTypes from 'prop-types';

import ModuleContainer, { ModuleIcon, ModuleDescription, ModuleTitle } from './ModuleContainer';

function Module({ variant = 'primary', module, onModuleClick }) {
  const { icon, title, description } = module;

  return (
    <ModuleContainer onClick={() => onModuleClick(module)}>
      <ModuleIcon src={icon} />
      <ModuleTitle variant={variant}>{title}</ModuleTitle>
      <ModuleDescription>{description}</ModuleDescription>
    </ModuleContainer>
  );
}

Module.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary']),
  module: PropTypes.shape({
    icon: PropTypes.any,
    title: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  onModuleClick: PropTypes.func.isRequired
};

export default Module;
