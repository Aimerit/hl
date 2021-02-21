import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Button, IconButton } from '@chakra-ui/react';

import Icons from '../helpers/Icons';
import PaginationSelect from './PaginationSelect';

export const itemsCountPerPageOptions = [5, 10, 20];

function initVisiblePages(pagesCount = 0) {
  return Array(pagesCount)
    .fill()
    .map((value, index) => index + 1);
}

function getPageIndex(page) {
  return page - 1;
}

function getPage(pageIndex) {
  return pageIndex + 1;
}

function Pagination({ currentPage, pagesCount, visiblePagesCount = 5, onPageChange, onItemsCountPerPageChange }) {
  const [visiblePages, setVisiblePages] = useState([]);
  const [firstVisiblePageIndex, setFirstVisiblePageIndex] = useState(0);
  const [lastVisiblePageIndex, setLastVisiblePageIndex] = useState(visiblePagesCount);

  useEffect(() => {
    setVisiblePages(initVisiblePages(pagesCount));
  }, [pagesCount]);

  function handlePrevPage() {
    if (currentPage > 1) {
      const targetPageIndex = getPageIndex(currentPage - 1);
      if (firstVisiblePageIndex > targetPageIndex) {
        setFirstVisiblePageIndex(targetPageIndex);
        setLastVisiblePageIndex(targetPageIndex + visiblePagesCount);
      }
      onPageChange(getPage(targetPageIndex));
    }
  }

  function handleNextPage() {
    if (currentPage < pagesCount) {
      const targetPageIndex = getPageIndex(currentPage + 1);
      if (targetPageIndex === lastVisiblePageIndex) {
        const newLastVisiblePageIndex = targetPageIndex + 1;
        setLastVisiblePageIndex(newLastVisiblePageIndex);
        setFirstVisiblePageIndex(newLastVisiblePageIndex - visiblePagesCount);
      }
      onPageChange(getPage(targetPageIndex));
    }
  }

  function handleItemsCountPerPageChange(evt) {
    onItemsCountPerPageChange(Number(evt.target.value));
  }

  return (
    <Flex p={4} justifyContent='space-between'>
      <Box>
        <PaginationSelect size='md' borderRadius={5} fontWeight={600} onChange={handleItemsCountPerPageChange}>
          {itemsCountPerPageOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </PaginationSelect>
      </Box>
      <Flex flex={1} justifyContent='flex-end'>
        <IconButton
          variant='outline'
          size='md'
          icon={<Icons.components.ArrowLeft />}
          marginEnd={2}
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        />
        {visiblePages.slice(firstVisiblePageIndex, lastVisiblePageIndex).map((page, index) => (
          <Button key={index} size='md' variant='outline' marginEnd={2} disabled={page === currentPage} onClick={() => onPageChange(page)}>
            {page}
          </Button>
        ))}
        <IconButton
          variant='outline'
          size='md'
          icon={<Icons.components.ArrowRight />}
          disabled={currentPage === pagesCount}
          onClick={handleNextPage}
        />
      </Flex>
    </Flex>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pagesCount: PropTypes.number.isRequired,
  visiblePagesCount: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  onItemsCountPerPageChange: PropTypes.func.isRequired
};

export default Pagination;
