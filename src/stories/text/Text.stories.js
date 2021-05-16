import React from 'react';

import dataGenerator from '../../utils/data-generator';

import { Text } from '../../components/library/text';

export default {
  title: 'Library/Text',
  component: Text
};

const Template = (args) => <Text {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'xl',
  children: dataGenerator.generateText()
};
