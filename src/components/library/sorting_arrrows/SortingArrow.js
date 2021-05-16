import React from 'react';
import PropTypes from 'prop-types';

import styleSortingArrow from './utils/style-sorting-arrow';

function UnStyledSortingArrow({ className, onClick }) {
    function handleClick() {
        if (onClick) onClick();
    }

    return <span className={className} onClick={handleClick} />;
}

const StyledSortingArrow = styleSortingArrow(UnStyledSortingArrow);

export function SortingArrow({ variant = 'asc', size = 'xs', ...restProps }) {
    return <StyledSortingArrow variant={variant} size={size} {...restProps} />;
}
SortingArrow.propTypes = {
    variant: PropTypes.oneOf(['asc', 'desc']),
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
    onClick: PropTypes.func
};
