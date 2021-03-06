import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@chakra-ui/react';

import textUtils from '../../../utils/text';

function Password({ name, placeholder, defaultValue, onChange, onBlur }) {
  function handleChange({ target: { value } }) {
    if (onChange) onChange({ name, value: textUtils.trim(value) });
  }

  function handleBlur({ target: { value } }) {
    if (onBlur) onBlur({ name, value: textUtils.trim(value) });
  }

  return <Input type='password' name={name} placeholder={placeholder} defaultValue={defaultValue} onChange={handleChange} onBlur={handleBlur} />;
}

Password.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

export default Password;
