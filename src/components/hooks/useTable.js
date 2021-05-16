import { useState, useEffect } from 'react';

import { isDateValue } from '../../utils';
import { tableSortingOrders } from '../../utils/enums';

export default function (dataSource = [], itemCountPerPageOptions, onSearch, onResetSearch) {
  const [currentItems, setCurrentItems] = useState([]);
  const [currentItemsCountPerPage, setCurrentItemsCountPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  const [currentSearchString, setCurrentSearchString] = useState('');

  function updateCurentItems(formattedDataSource = [], page = 1, itemsCountPerPage = itemCountPerPageOptions[0]) {
    const startIndex = (page - 1) * itemsCountPerPage;
    const endIndex = startIndex + itemsCountPerPage;
    setCurrentItems(formattedDataSource.slice(startIndex, endIndex));
    setCurrentPage(page);
    if (itemsCountPerPage !== currentItemsCountPerPage) setCurrentItemsCountPerPage(itemsCountPerPage);
  }

  function updatePageCount(formattedDataSource = [], itemsCountPerPage = itemCountPerPageOptions[0]) {
    const pagesCountDecimalValue = formattedDataSource.length / itemsCountPerPage;
    const pagesCountRoundedValue = formattedDataSource.length % itemsCountPerPage === 0 ? pagesCountDecimalValue : Math.ceil(pagesCountDecimalValue);
    setPagesCount(pagesCountRoundedValue);
  }

  function handlePageChange(page) {
    updateCurentItems(dataSource, page, currentItemsCountPerPage);
  }

  function handleItemsCountPerPageChange(itemsCountPerPage) {
    updateCurentItems(dataSource, 1, itemsCountPerPage);
    updatePageCount(dataSource, itemsCountPerPage);
  }

  function handleSortAscend({ dataIndex, formatter }) {
    applySorting({ dataIndex, formatter, sortingOrder: tableSortingOrders.ASCEND });
  }

  function handleSortDesend({ dataIndex, formatter }) {
    applySorting({ dataIndex, formatter, sortingOrder: tableSortingOrders.DESCEND });
  }

  function applySorting({ dataIndex, formatter, sortingOrder }) {
    const formattedDataSource = dataSource.sort((prevItem, nextItem) => {
      const prevItemValue = formatItemValue(prevItem, dataIndex, formatter);
      const nextItemValue = formatItemValue(nextItem, dataIndex, formatter);
      if (prevItemValue > nextItemValue) return { [tableSortingOrders.ASCEND]: 1, [tableSortingOrders.DESCEND]: -1 }[sortingOrder];
      if (prevItemValue < nextItemValue) return { [tableSortingOrders.ASCEND]: -1, [tableSortingOrders.DESCEND]: 1 }[sortingOrder];

      return 0;
    });
    updateCurentItems(formattedDataSource, 1, currentItemsCountPerPage);
  }

  function formatItemValue(item, dataIndex, formatter) {
    let formattedItemValue = formatter ? formatter(item[dataIndex]) : item[dataIndex];
    if (isDateValue(formattedItemValue)) formattedItemValue = Date.parse(formattedItemValue);

    return formattedItemValue;
  }

  useEffect(() => {
    updateCurentItems(dataSource);
    updatePageCount(dataSource);
  }, [dataSource]);

  function handleSearch({ searchString }) {
    setCurrentSearchString(searchString);
    if (onSearch) onSearch({ searchString });
  }

  function handleResetSearch() {
    setCurrentSearchString('');
    if (onResetSearch) onResetSearch();
  }

  return {
    currentItems,
    currentItemsCountPerPage,
    currentPage,
    pagesCount,
    currentSearchString,
    handlePageChange,
    handleItemsCountPerPageChange,
    handleSortAscend,
    handleSortDesend,
    handleSearch,
    handleResetSearch
  };
}
