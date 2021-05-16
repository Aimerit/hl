import React from 'react';

import styleCard from './utils/style-card';

function UnStyledCard({ className, children }) {
  return <div className={className}>{children}</div>;
}

const StyledCard = styleCard(UnStyledCard);

export function Card(props) {
  return <StyledCard {...props} />;
}
