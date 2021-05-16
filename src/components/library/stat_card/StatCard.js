import React from 'react';
import PropTypes from 'prop-types';

import styleStatCard from './utils/style-stat-card';

import { Text } from '../text';
import { Card } from '../card';

function UnStyledStatCard({ className, colorScheme, title, subTitle }) {
  return (
    <Card className={className}>
      <Text colorScheme={colorScheme} weight={700} size='2xl'>
        {title}
      </Text>
      <Text colorScheme={colorScheme}>{subTitle}</Text>
    </Card>
  );
}

const StyledStatCard = styleStatCard(UnStyledStatCard);

export function StatCard({ colorScheme = 'primary', ...restProps }) {
  return <StyledStatCard colorScheme={colorScheme} {...restProps} />;
}
StatCard.propTypes = {
  colorScheme: PropTypes.oneOf(['primary', 'secondary', 'gray', 'warning', 'success', 'black']),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subTitle: PropTypes.string.isRequired
};
