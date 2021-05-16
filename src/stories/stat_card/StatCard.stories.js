import React from 'react';

import { StatCard } from '../../components/library/stat_card';

export default {
  title: 'Library/StatCard',
  component: StatCard
};

const Template = (args) => <StatCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  subTitle: 'subTitle'
};
