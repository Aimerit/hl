import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Input } from '@chakra-ui/react';

function TableHeader({ onChange }) {
  function handleChange(evt) {
    if (onChange) onChange({ value: evt.target.value });
  }

  return (
    <Flex padding={6}>
      <Box minWidth='15%'>
        <Input variant='filled' placeholder='Rechercher' onChange={handleChange} />
      </Box>
    </Flex>
  );
}

TableHeader.propTypes = {
  onChange: PropTypes.func
};

export default TableHeader;
