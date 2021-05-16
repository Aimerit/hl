import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-date-picker';

import DatePickerContainer from './DatePickerContainer';

function DatePicker({ name, defaultValue, min, onChange }) {
  const [value, setValue] = useState();

  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);

  function handleChange(date) {
    setValue(date);
    onChange({ name, value: date });
  }

  return (
    <DatePickerContainer>
      <ReactDatePicker value={value} minDate={min} onChange={handleChange} locale='fr-Fr' clearIcon={null} calendarIcon={null} calendarClassName='date-time-picker-calendar' />
    </DatePickerContainer>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.any,
  min: PropTypes.any,
  onChange: PropTypes.func
};

export default DatePicker;
