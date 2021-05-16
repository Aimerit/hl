import React from 'react';
import PropTypes from 'prop-types';
import { NumberInput, NumberInputField } from '@chakra-ui/react';

function Numeric({ name, placeholder, defaultValue, onChange, onBlur }) {
  function handleChange(value) {
    if (onChange) onChange({ name, value: Number(value) });
  }

  function handleBlur({ target: { value } }) {
    if (onBlur) onBlur({ name, value: Number(value) });
  }

  return (
    <NumberInput name={name} placeholder={placeholder} defaultValue={defaultValue} precision={2} onChange={handleChange} onBlur={handleBlur}>
      <NumberInputField />
    </NumberInput>
  );
}

Numeric.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

export default Numeric;
