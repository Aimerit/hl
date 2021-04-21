import styled from 'styled-components';

import colors from '../../../config/colors';

export default function (UnStyledTableEmpty) {
  return styled(UnStyledTableEmpty)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;

    > img {
      display: inline-block;
      height: 3rem;
    }

    > span {
      display: inline-block;
      color: ${colors.grayLight};
      margin-top: 0.5rem;
      font-size: 0.75rem;
    }
  `;
}
