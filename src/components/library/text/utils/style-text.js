import styled from 'styled-components';

import colors from '../../../../config/colors';
import { fontSizes } from '../../../../config/sizes';

export default function (UnStyledText) {
  return styled(UnStyledText)`
    color: ${getColor};
    font-size: ${getFontSize};
    font-weight: ${getFontWeight};
    background: ${getBackground};
  `;
}

function getColor({ colorScheme, highlight }) {
  return highlight ? colors.white : colors[colorScheme];
}

function getFontSize({ size }) {
  return fontSizes[size];
}

function getFontWeight({ weight }) {
  return weight;
}

function getBackground({ highlight }) {
  return highlight ? colors.success : 'none';
}
