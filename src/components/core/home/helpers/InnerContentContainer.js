import styled from 'styled-components';

import colors from '../../../../config/colors';

export const InnerContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.4rem 0;
`;

export const InnerContentTitle = styled.h2`
  font-weight: 700;
  font-size: 1.5rem;
  color: ${colors.primary};
  text-transform: capitalize;
`;

export const InnerContentActions = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

export default styled.div`
  display: flex;
  flex-direction: column;
`;
