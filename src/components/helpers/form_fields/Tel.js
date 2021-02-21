import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@chakra-ui/react';

import textUtils from '../../../utils/text-utils';

function Tel({ name, placeholder, defaultValue, onChange, onBlur }) {
  function handleChange({ target: { value } }) {
    if (onChange) onChange({ name, value: textUtils.trim(value) });
  }

  function handleBlur({ target: { value } }) {
    if (onBlur) onBlur({ name, value: textUtils.trim(value) });
  }

  return (
    <Input
      type='tel'
      pattern='[0-9]{9}'
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
}

Tel.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

export default Tel;
