import React from 'react';
import styled from 'styled-components';

function UnStyledTableHeaderCellContent({ className, children }) {
  return <div className={className}>{children}</div>;
}

const StyledTableHeaderCellContent = styled(UnStyledTableHeaderCellContent)`
  display: flex;

  > * {
    :last-child {
      margin-left: 0.5rem;
    }
  }
`;

export function TableHeaderCellContent(props) {
  return <StyledTableHeaderCellContent {...props} />;
}
