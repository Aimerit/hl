import styled from 'styled-components';

import dimensions from '../../../../config/dimensions';

export default function (UnStyledStatCard) {
  return styled(UnStyledStatCard)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem 2rem;
    min-height: ${dimensions.header.height};
    border-radius: ${dimensions.radius};

    > span {
      line-height: 1;

      :first-child {
        display: inline-block;
        margin-bottom: 0.5rem;
      }
    }
  `;
}
