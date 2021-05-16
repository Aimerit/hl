import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select } from '@chakra-ui/react';

export default function AppSelect({ name, defaultValue, options = [], selectFirstOptionOnMount = true, onChange }) {
  useEffect(() => {
    if (!defaultValue && options.length > 0 && selectFirstOptionOnMount) onChange({ name, value: options[0].value });
  }, [defaultValue, options]);

  function handleChange({ target: { value } }) {
    if (onChange) onChange({ name, value });
  }

  return (
    <Select name={name} onChange={handleChange} defaultValue={defaultValue}>
      {displayOptions(options, defaultValue)}
    </Select>
  );
}
AppSelect.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  options: PropTypes.array,
  selectFirstOptionOnMount: PropTypes.bool,
  onChange: PropTypes.func
};

function displayOptions(options) {
  return options.map(({ label, value }, index) => (
    <option key={index} value={value}>
      {label}
    </option>
  ));
}
