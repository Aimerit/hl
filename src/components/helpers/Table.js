import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Table, Thead, Tbody, Tr, Td, Th, Menu, MenuButton, MenuList, MenuItem, IconButton, Icon } from '@chakra-ui/react';
import { MdMoreVert } from 'react-icons/md';

import colors from '../../config/colors';
import dateUtils from '../../utils/date';
import priceUtils from '../../utils/price';
import entitiesUtils from '../../utils/entities';

import Card from '../helpers/Card';
import Loader from '../helpers/Loader';
import TableHeader from './TableHeader';
import Pagination, { itemsCountPerPageOptions } from './Pagination';
import TableEmpty from './TableEmpty';

const dataTypes = Object.freeze({
  DATE: 'date',
  PRICE: 'price',
  CODE: 'code',
  ADDRESS: 'address',
  PHONE: 'phone'
});

function formatCellValue(column, item) {
  const { dataIndex, dataType } = column;
  const value = item[dataIndex];
  if (!column.dataType || !Object.values(dataTypes).includes(dataType)) return value;

  const strategies = {
    [dataTypes.DATE]: dateUtils.formatDate,
    [dataTypes.PRICE]: priceUtils.formatPrice,
    [dataTypes.CODE]: entitiesUtils.formatCode,
    [dataTypes.ADDRESS]: entitiesUtils.formatAddress,
    [dataTypes.PHONE]: entitiesUtils.formatPhoneNumber
  };

  return strategies[dataType](value);
}

function getCellKey(column, columnIndex) {
  return [column.key, columnIndex].join('-');
}

function displayCellContent(column, item) {
  if (Object.keys(item).includes(column.dataIndex)) {
    return column.render ? column.render(item) : formatCellValue(column, item);
  }

  return column.render(item);
}

function isNumeric(column, item) {
  return typeof item[column.dataIndex] === 'number';
}

function displayActions(actions, item) {
  return (
    <Menu>
      <MenuButton as={IconButton} variant='outline' icon={<MdMoreVert />} />
      <MenuList>
        {actions.map(({ icon, label, onActionClick }, index) => (
          <MenuItem
            key={index}
            fontWeight={600}
            color={colors.black}
            icon={<Icon as={icon} w={5} h={5} color={colors.black} />}
            onClick={() => onActionClick(item)}
          >
            {label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

function displayNoDataBlock(noDataMessage, dataSource) {
  return dataSource.length === 0 && <TableEmpty message={noDataMessage} />;
}

function AppTable({ columns, dataSource = [], actions, requesting = false, noDataMessage, onSearch }) {
  const [currentItems, setCurrentItems] = useState([]);
  const [currentItemsCountPerPage, setCurrentItemsCountPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);

  function updateCurentItems(page = 1, itemsCountPerPage = itemsCountPerPageOptions[0]) {
    const startIndex = (page - 1) * itemsCountPerPage;
    const endIndex = startIndex + itemsCountPerPage;
    setCurrentItems(dataSource.slice(startIndex, endIndex));
    setCurrentPage(page);
    setCurrentItemsCountPerPage(itemsCountPerPage);
  }

  function updatePageCount(itemsCountPerPage = itemsCountPerPageOptions[0]) {
    const pagesCountDecimalValue = dataSource.length / itemsCountPerPage;
    const pagesCountRoundedValue = dataSource.length % itemsCountPerPage === 0 ? pagesCountDecimalValue : Math.ceil(pagesCountDecimalValue);
    setPagesCount(pagesCountRoundedValue);
  }

  function handlePageChange(page) {
    updateCurentItems(page);
  }

  function handleItemsCountPerPageChange(itemsCountPerPage) {
    updateCurentItems(1, itemsCountPerPage);
    updatePageCount(itemsCountPerPage);
  }

  useEffect(() => {
    if (Array.isArray(dataSource)) {
      updateCurentItems();
      updatePageCount();
    }
  }, [dataSource]);

  return (
    <Card py='.5rem'>
      <TableHeader onChange={onSearch} />

      <Table>
        <Thead>
          <Tr>
            {columns.map(({ key, title }) => (
              <Th key={key} fontSize='md' color={colors.gray} paddingY='16px'>
                {title}
              </Th>
            ))}
            {actions && (
              <Th fontSize='md' color={colors.gray}>
                Actions
              </Th>
            )}
          </Tr>
        </Thead>

        <Tbody>
          {currentItems.map((item, itemIndex) => (
            <Tr key={itemIndex}>
              {columns.map((column, columnIndex) => (
                <Td key={getCellKey(column, columnIndex)} fontSize='md' isNumeric={isNumeric(column, item)}>
                  {displayCellContent(column, item)}
                </Td>
              ))}
              <Td>{displayActions(actions, item)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

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

AppTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      dataIndex: PropTypes.string.isRequired,
      dataType: PropTypes.oneOf(Object.values(dataTypes)),
      render: PropTypes.func
    })
  ).isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      onActionClick: PropTypes.func
    })
  ),
  requesting: PropTypes.bool,
  noDataMessage: PropTypes.string,
  onSearch: PropTypes.func.isRequired
};

export default memo(AppTable);
