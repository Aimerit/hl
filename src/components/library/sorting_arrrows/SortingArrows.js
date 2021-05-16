import React from 'react';
import PropTypes from 'prop-types';

import { SortingArrow } from './SortingArrow';
import styleSortingArrows from './utils/style-sorting-arrows';

function UnStyledSortingArrows({ className, size, onSortAscend, onSortDescend }) {
    return (
        <div className={className}>
            <SortingArrow variant='asc' size={size} onClick={onSortAscend} />
            <SortingArrow variant='desc' size={size} onClick={onSortDescend} />
        </div>
    );
}

const StyledSortingArrows = styleSortingArrows(UnStyledSortingArrows);

export function SortingArrows({ size = 'xs', ...restProps }) {
    return <StyledSortingArrows size={size} {...restProps} />;
}
SortingArrows.propTypes = {
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
    onSortAscend: PropTypes.func,
    onSortDescend: PropTypes.func
};
