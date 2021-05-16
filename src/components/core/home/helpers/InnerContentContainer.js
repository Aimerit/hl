import styled from 'styled-components';

import colors from '../../../../config/colors';

export const InnerContentHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 2rem 0;
  gap: 2rem;
`;

export const InnerContentTitle = styled.h2`
  font-weight: 700;
  font-size: 1.5rem;
  color: ${colors.primary};
  text-transform: capitalize;
`;

export const InnerContentActions = styled.div`
  flex: 1;
`;

export default styled.div`
  display: flex;
  flex-direction: column;
`;
