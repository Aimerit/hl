import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';

import Text from './form_fields/Text';
import Numeric from './form_fields/Numeric';
import Email from './form_fields/Email';
import Password from './form_fields/Password';
import Tel from './form_fields/Tel';
import DatePicker from './form_fields/DatePicker';
import DateTimePicker from './form_fields/DateTimePicker';
import Select from './form_fields/Select';

const formFieldTypes = Object.freeze({
  TEXT: 'text',
  NUMBER: 'number',
  TEL: 'tel',
  EMAIL: 'email',
  PASSWORD: 'password',
  DATE: 'date',
  DATE_TIME: 'datetime',
  SELECT: 'select',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  RADIO_GROUP: 'radio-group',
  SWITCH: 'swicth',
  TEXT_AREA: 'text-area'
});

function displayFormField(type, name, placeholder, defaultValue, options, onChange, onBlur) {
  const components = {
    [formFieldTypes.TEXT]: Text,
    [formFieldTypes.NUMBER]: Numeric,
    [formFieldTypes.EMAIL]: Email,
    [formFieldTypes.PASSWORD]: Password,
    [formFieldTypes.TEL]: Tel,
    [formFieldTypes.DATE]: DatePicker,
    [formFieldTypes.DATE_TIME]: DateTimePicker,
    [formFieldTypes.SELECT]: Select
  };
  const ChoosenComponent = components[type];

  return cloneElement(<ChoosenComponent />, { name, placeholder, defaultValue, options, onChange, onBlur });
}

function FormField({ type, name, label, placeholder, defaultValue, options, error, required = false, disabled = false, onChange, onBlur }) {
  return (
    <FormControl isInvalid={!!error} isRequired={required} isDisabled={disabled}>
      {label && <FormLabel color='gray.700'>{label}</FormLabel>}
      {displayFormField(type, name, placeholder, defaultValue, options, onChange, onBlur)}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(formFieldTypes)).isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.any,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any
    })
  ),
  error: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

export default FormField;
