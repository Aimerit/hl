import styled from 'styled-components';

const InnerContentHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`;

const InnerContentMain = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InnerContent = styled.div`
  display: flex;
  flex-direction: column;

  > * {
    :not(:last-child) {
      margin-bottom: 2rem;
    }
  }
`;
InnerContent.Header = InnerContentHeader;
InnerContent.Main = InnerContentMain;
