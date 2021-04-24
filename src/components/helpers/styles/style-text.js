import styled from 'styled-components';
import colors from '../../../config/colors';

export default function (UnStyledText) {
  return styled(UnStyledText)`
    color: ${getColor};
    font-weight: ${getFontWeight};
  `;
}

function getColor({ colorScheme }) {
  return colors[colorScheme];
}

function getFontWeight({ weight }) {
  return weight;
}
