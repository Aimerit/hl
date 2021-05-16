import styled, { keyframes } from 'styled-components';

import zIndices from '../../../config/z-indices';

export const fadeIn = keyframes`
  from {
    opacity: 0;
    z-index: ${zIndices.hidden}
  }

  to {
    opacity: 1;
    z-index: ${zIndices.loading}
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
    z-index: ${zIndices.loading}
  }

  to {
    opacity: 0;
    z-index: ${zIndices.hidden}
  }
`;

export default function (UnStyledLoading) {
  return styled(UnStyledLoading)`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(13, 25, 90, 0.6);
    opacity: 0;
    z-index: -1;

    &.shown {
      animation: ${fadeIn} 500ms forwards;
    }

    &.hidden {
      animation: ${fadeOut} 300ms forwards;
    }
  `;
}
