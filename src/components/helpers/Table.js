import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Table as ChakraTable, Thead, Tbody, Tr, Td, Th, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';

import colors from '../../config/colors';
import dateUtils from '../../utils/date';
import priceUtils from '../../utils/price';
import entitiesUtils from '../../utils/entities';
import diacriticsUtils from '../../utils/diacritics';
import { tableDataTypes } from '../../utils/enums';

import Card from '../helpers/Card';
import Loader from '../helpers/Loader';
import TableHeader from './TableHeader';
import Pagination, { itemsCountPerPageOptions } from './Pagination';
import TableEmpty from './TableEmpty';
import IconContainer from './IconContainer';
import { SortingArrows, TableHeaderCellContent, Text } from '../library';
import useTable from '../hooks/useTable';
import { isString, isValidValue } from '../../utils';
import Icons from './Icons';

function Table({ columns, dataSource = [], actions, requesting = false, noDataMessage, searchableDataIndexes = [], onSearch, onResetSearch }) {
  const {
    currentItems,
    currentItemsCountPerPage,
    pagesCount,
    currentPage,
    currentSearchString,
    handlePageChange,
    handleItemsCountPerPageChange,
    handleSortAscend,
    handleSortDesend,
    handleSearch,
    handleResetSearch
  } = useTable(dataSource, itemsCountPerPageOptions, onSearch, onResetSearch);

  return (
    <Card py='.5rem'>
      <TableHeader totalItemsCount={dataSource.length} onSearch={handleSearch} onResetSearch={handleResetSearch} />

      <ChakraTable>
        <Thead>
          <Tr>
            {columns.map(({ key, title, sortable = false, dataIndex, formatter, styles = {} }) => (
              <Th key={key} fontSize='md' color={colors.gray} background={colors.table.header} paddingY='16px' width={styles.width || 'initial'}>
                <TableHeaderCellContent>
                  {title}
                  {sortable && <SortingArrows onSortAscend={() => handleSortAscend({ dataIndex, formatter })} onSortDescend={() => handleSortDesend({ dataIndex, formatter })} />}
                </TableHeaderCellContent>
              </Th>
            ))}
            {actions && (
              <Th fontSize='md' color={colors.gray} background={colors.table.header}>
                Actions
              </Th>
            )}
          </Tr>
        </Thead>

        <Tbody>
          {currentItems.map((item, itemIndex) => (
            <Tr key={itemIndex}>
              {columns.map((column, columnIndex) => (
                <Td key={getCellKey(column, columnIndex)} fontSize='md'>
                  {displayCellContent(column, item, searchableDataIndexes, currentSearchString)}
                </Td>
              ))}
              <Td>{displayActions(actions, item)}</Td>
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>

      {requesting ? <Loader /> : displayNoDataBlock(noDataMessage, dataSource)}

      <Pagination
        currentPage={currentPage}
        currentItemsCountPerPage={currentItemsCountPerPage}
        pagesCount={pagesCount}
        onPageChange={handlePageChange}
        onItemsCountPerPageChange={handleItemsCountPerPageChange}
      />
    </Card>
  );
}

function getCellKey(column, columnIndex) {
  return [column.key, columnIndex].join('-');
}

function displayCellContent(column, item, searchableDataIndexes, currentSearchString) {
  if (!column.dataIndex && !column.render) throw new Error('Each column must have either <dataIndex> or <render> properties');

  return column.render ? column.render(item) : formatCellValue(column, item, searchableDataIndexes, currentSearchString);
}

function formatCellValue(column, item, searchableDataIndexes, currentSearchString) {
  const { dataIndex, dataType } = column;
  const value = item[dataIndex];
  if (!column.dataType || !Object.values(tableDataTypes).includes(dataType)) return getFinalValue(column, value, searchableDataIndexes, currentSearchString);

  const strategies = {
    [tableDataTypes.DATE]: dateUtils.formatDate,
    [tableDataTypes.DATE_TIME]: dateUtils.formatDateTime,
    [tableDataTypes.PRICE]: priceUtils.formatPrice,
    [tableDataTypes.CODE]: entitiesUtils.formatCode,
    [tableDataTypes.ADDRESS]: entitiesUtils.formatAddress,
    [tableDataTypes.PHONE]: entitiesUtils.formatPhoneNumber
  };

  return getFinalValue(column, strategies[dataType](value), searchableDataIndexes, currentSearchString);
}

function getFinalValue(column, value, searchableDataIndexes = [], currentSearchString) {
  const { dataIndex, defaultValue = '', textStyles = {} } = column;
  const finalValue = value || defaultValue;

  if (isValidValue(value) && isString(value) && isValidValue(currentSearchString) && searchableDataIndexes.includes(dataIndex)) {
    const sanitizedValue = diacriticsUtils.sanitize(value);
    const sanitizedCurrentSearchString = diacriticsUtils.sanitize(currentSearchString);
    const searchStringStartIndex = sanitizedValue.indexOf(sanitizedCurrentSearchString);
    if (searchStringStartIndex < 0) return formatValueAsText(finalValue, textStyles);

    const searchStringEndIndex = currentSearchString.length + searchStringStartIndex - 1;
    const textsGroup = [];
    if (searchStringStartIndex > 0) textsGroup.push(formatValueAsText(value.substring(0, searchStringStartIndex), textStyles));
    textsGroup.push(
      <Text highlight {...textStyles}>
        {value.substring(searchStringStartIndex, searchStringEndIndex + 1)}
      </Text>
    );
    if (searchStringEndIndex < value.length - 1) textsGroup.push(formatValueAsText(value.substring(searchStringEndIndex + 1, value.length), textStyles));

    return textsGroup.map((text, index) => <React.Fragment key={index}>{text}</React.Fragment>);
  }

  return formatValueAsText(finalValue, textStyles);
}

function formatValueAsText(value, textStyles) {
  return <Text {...textStyles}>{value}</Text>;
}

function displayActions(actions, item) {
  return (
    <Menu>
      <MenuButton as={IconButton} variant='outline' icon={<Icons.components.MoreVertical size='xs' />} />
      <MenuList>
        {filterActions(actions, item).map(({ icon, label, onClick }, index) => (
          <MenuItem key={index} fontWeight={500} color={colors.black} icon={<IconContainer icon={icon} />} onClick={() => onClick(item)}>
            {label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

function filterActions(actions, item) {
  return actions.filter(({ isDeletable }) => (isValidValue(isDeletable) ? isDeletable(item) : true));
}

function displayNoDataBlock(noDataMessage, dataSource) {
  return dataSource.length === 0 && <TableEmpty message={noDataMessage} />;
}

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      dataIndex: PropTypes.string.isRequired,
      dataType: PropTypes.oneOf(Object.values(tableDataTypes)),
      defaultValue: PropTypes.any,
      sortable: PropTypes.bool,
      styles: PropTypes.shape({
        width: PropTypes.string
      }),
      textStyles: PropTypes.shape({
        colorScheme: PropTypes.string,
        weight: PropTypes.number
      }),
      formatter: PropTypes.func,
      render: PropTypes.func
    })
  ).isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType,
      label: PropTypes.string,
      isDeletable: PropTypes.func,
      onClick: PropTypes.func
    })
  ),
  requesting: PropTypes.bool,
  noDataMessage: PropTypes.string,
  searchableDataIndexes: PropTypes.arrayOf(PropTypes.string),
  onSearch: PropTypes.func,
  onResetSearch: PropTypes.func
};

export default memo(Table);
