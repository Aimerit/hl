import styled from 'styled-components';

export default styled.div`
  padding: 0.454rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  transition: all 200ms ease-in-out;

  :hover {
    box-shadow: 0 0 0 1px #3182ce;
    border-color: #3182ce;
  }

  :focus {
    z-index: 1;
    box-shadow: 0 0 0 1px #3182ce;
    border-color: #3182ce;
  }
`;
