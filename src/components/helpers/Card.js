import styled from 'styled-components';

export default styled.div`
  background: #ffffff;
  border: 1px solid #e7eaf3;
  border-radius: 5px;
  padding: ${(props) => getPadding(props)};
`;

function getPadding({ py }) {
  if (py) return `${py} 0`;

  return 0;
}
