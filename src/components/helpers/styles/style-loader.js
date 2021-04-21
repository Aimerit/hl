import styled, { keyframes } from 'styled-components';

const zoomPulseFade = keyframes`
  0% {
    opacity: 0.5;
    transform: scale(1) rotate(-360deg);
  }

  50% {
    opacity: 1;
    transform: scale(1.2)
  }

  100% {
    opacity: 0.5;
    transform: scale(1) rotate(360deg);
  }
`;

export default function (UnStyledLoader) {
  return styled(UnStyledLoader)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 2rem;

    > img {
      display: inline-block;
      width: ${(props) => getImageWidth(props)};
      height: ${(props) => getImageHeight(props)};
      animation: ${zoomPulseFade} 1s linear infinite;
    }
  `;
}

function getImageWidth({ size }) {
  return { sm: '3rem', md: '6rem' }[size];
}

function getImageHeight({ size }) {
  return { sm: '3rem', md: '6rem' }[size];
}
