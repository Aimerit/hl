import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactDateTimePicker from 'react-datetime-picker';

import DatePickerContainer from './DatePickerContainer';

function DateTimePicker({ name, defaultValue = new Date(), onChange }) {
  const [value, setValue] = useState(defaultValue);

  function handleChange(date) {
    setValue(date);
    onChange({ name, value: date });
  }

  return (
    <DatePickerContainer>
      <ReactDateTimePicker
        value={value}
        onChange={handleChange}
        locale='fr-Fr'
        clearIcon={null}
        calendarIcon={null}
        calendarClassName='date-time-picker-calendar'
      />
    </DatePickerContainer>
  );
}

DateTimePicker.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func
};

export default DateTimePicker;
