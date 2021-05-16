import React from 'react';

import { SortingArrow } from '../../components/library/sorting_arrrows';

export default {
  title: 'Library/SortingArrow',
  component: SortingArrow,
  argTypes: {
    onClick: { action: 'clicked' }
  }
};

const Template = (args) => <SortingArrow {...args} />;

export const Default = Template.bind({});
Default.args = {
  variant: 'asc',
  size: 'md'
};
