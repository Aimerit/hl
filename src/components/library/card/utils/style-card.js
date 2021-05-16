import styled from 'styled-components';

import colors from '../../../../config/colors';
import dimensions from '../../../../config/dimensions';

export default function (UnStyledCard) {
  return styled(UnStyledCard)`
    background: ${colors.white};
    border: 1px solid ${colors.card.border};
    border-radius: ${dimensions.radius};
  `;
}
