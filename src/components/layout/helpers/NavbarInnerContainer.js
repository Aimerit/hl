import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > * {
    :first-child {
      margin-right: 1rem;
    }

    :last-child {
      margin-right: 0;
    }
  }
`;
