import styled from 'styled-components';

import colors from '../../../../config/colors';
import dimensions from '../../../../config/dimensions';

export default function (UnStyledSortingArrow) {
  return styled(UnStyledSortingArrow)`
    display: inline-block;
    width: 0;
    height: 0;
    border-left: ${getHeight} solid transparent;
    border-right: ${getHeight} solid transparent;
    border-bottom: ${getWidth} solid ${getBackgroundColor()};
    transform: ${getTransform};
    transition: border-bottom-color 200ms ease-out;
    cursor: pointer;

    :hover {
      border-bottom-color: ${getBackgroundColor(true)};
    }
  `;
}

function getBackgroundColor(hovered = false) {
  return hovered ? colors.primaryLight : colors.arrow;
}

function getTransform({ variant }) {
  return { asc: 'none', desc: 'rotate(180deg)' }[variant];
}

function getWidth({ size }) {
  return dimensions.sortingArrow.width[size];
}

function getHeight({ size }) {
  return dimensions.sortingArrow.height[size];
}
