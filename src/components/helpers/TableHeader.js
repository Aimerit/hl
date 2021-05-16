import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Flex, Input, IconButton } from '@chakra-ui/react';

import Icons from './Icons';

import { isValidValue } from '../../utils';
import { SEARCH_STRING_MIN_LENGTH } from '../../utils/constants';

function TableHeader({ totalItemsCount, onSearch, onResetSearch }) {
  const [currentValue, setCurrentValue] = useState('');
  const [searchButtonShown, setSearchButtonShown] = useState(false);

  function handleChange(evt) {
    const { value } = evt.target;
    setCurrentValue(value);
    setSearchButtonShown(canPerformSeach(value));
  }

  function handleKeyUp(evt) {
    const {
      key,
      keyCode,
      target: { value }
    } = evt;
    if (isEnterKeyPressed(key, keyCode) && canPerformSeach(value)) {
      if (onSearch) onSearch({ searchString: value });
    }
  }

  function isEnterKeyPressed(key, keyCode) {
    return key === 'Enter' || keyCode === 13;
  }

  function canPerformSeach(value) {
    return isValidValue(value) && value.length > SEARCH_STRING_MIN_LENGTH;
  }

  function handleSearch() {
    if (onSearch) onSearch({ searchString: currentValue });
  }

  function handleResetSearch() {
    setCurrentValue('');
    if (onResetSearch) onResetSearch();
    setSearchButtonShown(false);
  }

  return (
    <Flex padding={6}>
      <Input width='15%' placeholder='Rechercher' value={currentValue} disabled={totalItemsCount === 0} onChange={handleChange} onKeyUp={handleKeyUp} />
      {searchButtonShown && <IconButton icon={<Icons.components.Search />} marginLeft='0.5rem' onClick={handleSearch} />}
      <IconButton icon={<Icons.components.Reset />} marginLeft='0.5rem' disabled={totalItemsCount === 0} onClick={handleResetSearch} />
    </Flex>
  );
}

TableHeader.propTypes = {
  totalItemsCount: PropTypes.number.isRequired,
  onSearch: PropTypes.func,
  onResetSearch: PropTypes.func
};

export default TableHeader;
