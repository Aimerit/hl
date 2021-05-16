import React from 'react';

import { SortingArrows } from '../../components/library/sorting_arrrows';

export default {
  title: 'Library/SortingArrows',
  component: SortingArrows,
  argTypes: {
    onSortAscend: { action: 'clicked' },
    onSortDescend: { action: 'clicked' }
  }
};

const Template = (args) => <SortingArrows {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'md'
};
